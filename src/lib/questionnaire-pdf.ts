import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import type { QuestionnaireSection, QuestionnaireType } from './questionnaire-data';
import type { Language } from './translations';
import {
  type ContactData,
  type FormAdditionalData,
  type QuestionnaireFormData,
  type SourceData,
  generatePlainTextForPdf,
} from './form-utils';

/** DejaVu Sans — кириллица; загрузка один раз, кэш в памяти. */
const DEJAVU_CDN = 'https://unpkg.com/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans.ttf';
const DEJAVU_VFS = 'DejaVuSans.ttf';
const DEJAVU_KEY = 'DejaVu';

let dejaVuBase64: string | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    const slice = bytes.subarray(i, i + chunk);
    binary += String.fromCharCode.apply(null, Array.from(slice) as unknown as number[]);
  }
  return btoa(binary);
}

async function loadDejaVuBase64IfNeeded(): Promise<string> {
  if (dejaVuBase64) return dejaVuBase64;
  let res = await fetch('/fonts/DejaVuSans.ttf', { cache: 'force-cache' });
  if (!res.ok) {
    res = await fetch(DEJAVU_CDN, { cache: 'force-cache' });
  }
  if (!res.ok) {
    throw new Error('FONT_LOAD_FAILED');
  }
  dejaVuBase64 = arrayBufferToBase64(await res.arrayBuffer());
  return dejaVuBase64;
}

/** Каждый новый jsPDF — своя VFS, шрифт регистрируем заново. */
function registerDejaVuOnDoc(doc: jsPDF, b64: string) {
  doc.addFileToVFS(DEJAVU_VFS, b64);
  doc.addFont(DEJAVU_VFS, DEJAVU_KEY, 'normal', undefined, 'Identity-H');
  doc.setFont(DEJAVU_KEY, 'normal');
  doc.setTextColor(0, 0, 0);
}

/**
 * Кладёт многострочный UTF-8 текст в PDF (перенос по ширине, разрыв страниц).
 * Без рендера в canvas — стабильно в Telegram и в браузерах.
 */
function writeTextToPdfPages(doc: jsPDF, text: string, lineHeightMm: number) {
  const marginMm = 12;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxW = pageW - 2 * marginMm;
  // y — baseline; отступ сверху чуть больше margin, чтобы буквы не обрезались
  let y = marginMm + 2;
  const bottom = pageH - 6;
  const blocks = text.split('\n');

  for (const block of blocks) {
    if (block === '') {
      y += lineHeightMm;
      if (y > bottom) {
        doc.addPage();
        y = marginMm + 2;
      }
      continue;
    }
    const splitLines = doc.splitTextToSize(block, maxW);
    for (const line of splitLines) {
      if (y + lineHeightMm > bottom) {
        doc.addPage();
        y = marginMm + 2;
      }
      doc.text(line, marginMm, y);
      y += lineHeightMm;
    }
  }
}

/** Безопасное имя файла: без путей и недопустимых символов. */
function sanitizeFileNameBase(raw: string, maxLen: number): string {
  return raw
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[._]+|[._]+$/g, '')
    .slice(0, maxLen);
}

/**
 * PDF: «Имя_Фамилия_дата» по полям name и last_name; если пусто — anketa_тип_дата.
 */
function pdfFileName(
  type: QuestionnaireType,
  formData: QuestionnaireFormData,
): string {
  const dateStamp = format(new Date(), 'yyyy-MM-dd');
  const first = sanitizeFileNameBase(String(formData['name'] ?? '').trim(), 60);
  const last = sanitizeFileNameBase(String(formData['last_name'] ?? '').trim(), 60);
  const parts = [first, last].filter((p) => p.length > 0);
  if (parts.length === 0) {
    return `anketa_${type}_${dateStamp}.pdf`;
  }
  return `${parts.join('_')}_${dateStamp}.pdf`;
}

export interface BuildQuestionnairePdfParams {
  type: QuestionnaireType;
  sections: QuestionnaireSection[];
  formData: QuestionnaireFormData;
  additionalData: FormAdditionalData;
  contactData: ContactData;
  lang: Language;
  sourceData?: SourceData;
}

/**
 * Собирает PDF в браузере через jsPDF + DejaVu (полный UTF-8, не html2canvas).
 */
export async function buildQuestionnairePdfFile(params: BuildQuestionnairePdfParams): Promise<File> {
  const { type, sections, formData, additionalData, contactData, lang, sourceData } = params;
  const text = generatePlainTextForPdf(
    type,
    sections,
    formData,
    additionalData,
    contactData,
    lang,
    sourceData,
  );

  const fileName = pdfFileName(type, formData);
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const b64 = await loadDejaVuBase64IfNeeded();
  registerDejaVuOnDoc(doc, b64);

  const fontSizePt = 9;
  // ~1.2× высота строки 9pt в мм (pt→мм × 0.352778)
  const lineH = 4.2;
  doc.setFontSize(fontSizePt);
  writeTextToPdfPages(doc, text, lineH);

  const blob = doc.output('blob') as Blob;
  return new File([blob], fileName, { type: 'application/pdf' });
}
