import { format } from 'date-fns';
import type { QuestionnaireSection, QuestionnaireType } from './questionnaire-data';
import type { Language } from './translations';
import {
  type ContactData,
  type FormAdditionalData,
  type QuestionnaireFormData,
  type SourceData,
  generatePlainTextForPdf,
} from './form-utils';

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
 * Собирает PDF-файл в браузере (кириллица через рендер HTML → canvas → PDF).
 * Вызывать только в клиенте (после submit, не в SSR).
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

  const html2pdf = (await import('html2pdf.js')).default;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'position: fixed',
    'left: -12000px',
    'top: 0',
    'width: 190mm',
    'padding: 10mm 12mm',
    'box-sizing: border-box',
    'background: #ffffff',
  ].join('; ');

  const pre = document.createElement('pre');
  pre.style.cssText = [
    'margin: 0',
    'font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    'font-size: 10pt',
    'line-height: 1.45',
    'color: #1a1a1a',
    'white-space: pre-wrap',
    'word-wrap: break-word',
  ].join('; ');
  pre.textContent = text;
  wrapper.appendChild(pre);
  document.body.appendChild(wrapper);

  const name = pdfFileName(type, formData);

  try {
    const blob = (await html2pdf()
      .set({
        margin: [6, 6, 6, 6],
        filename: name,
        image: { type: 'jpeg', quality: 0.92 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(wrapper)
      .outputPdf('blob')) as Blob;

    return new File([blob], name, { type: 'application/pdf' });
  } finally {
    document.body.removeChild(wrapper);
  }
}
