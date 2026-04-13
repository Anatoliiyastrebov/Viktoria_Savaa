import { format } from 'date-fns';
import { QuestionnaireSection, QuestionnaireType } from './questionnaire-data';
import { Language, translations } from './translations';

export interface QuestionnaireFormData {
  [key: string]: string | string[];
}

export interface FormAdditionalData {
  [key: string]: string;
}

export type PreferredContactMethod = '' | 'telegram' | 'instagram' | 'phone';

export interface ContactData {
  preferredContactMethod: PreferredContactMethod;
  telegram: string;
  instagram: string;
  phone: string;
}

const emptyContactData = (): ContactData => ({
  preferredContactMethod: '',
  telegram: '',
  instagram: '',
  phone: '',
});

/** Normalize @username for Telegram if legacy data had no @ */
const normalizeTelegramStored = (s: string): string => {
  const t = s.trim();
  if (!t) return '';
  if (t.startsWith('@')) return t;
  if (/^[a-zA-Z0-9_]{5,32}$/.test(t)) return `@${t}`;
  return t;
};

/** Extract Instagram username from URL or @handle */
export const extractInstagramUsername = (raw: string): string | null => {
  const v = raw.trim();
  if (!v) return null;
  const urlMatch = v.match(/instagram\.com\/([^/?#]+)/i) || v.match(/instagr\.am\/([^/?#]+)/i);
  if (urlMatch) {
    const u = decodeURIComponent(urlMatch[1].replace(/^@/, ''));
    if (u && u !== 'p' && u !== 'reel' && u !== 'stories') return u;
  }
  const noAt = v.replace(/^@/, '').trim();
  if (!noAt || /\s/.test(noAt)) return null;
  if (/^[a-zA-Z0-9._]{1,30}$/.test(noAt) && !/^\.|\.\.|\.$/.test(noAt)) return noAt;
  return null;
};

export function migrateContactData(raw: unknown): ContactData {
  const base = emptyContactData();
  if (!raw || typeof raw !== 'object') return base;
  const o = raw as Record<string, unknown>;
  const telegram = normalizeTelegramStored(String(o.telegram ?? ''));
  const instagram = String(o.instagram ?? '').trim();
  const phone = String(o.phone ?? '').trim().replace(/\s/g, '');

  return {
    preferredContactMethod: '',
    telegram,
    instagram,
    phone,
  };
}

export interface SourceData {
  source: string;
  recommender: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Storage keys
const getStorageKey = (type: QuestionnaireType, lang: Language) => 
  `health_questionnaire_${type}_${lang}`;

// Save form data to localStorage
export const saveFormData = (
  type: QuestionnaireType,
  lang: Language,
  formData: QuestionnaireFormData,
  additionalData: FormAdditionalData,
  contactData: ContactData,
  sourceData?: SourceData
) => {
  try {
    const data = { formData, additionalData, contactData, sourceData: sourceData || { source: '', recommender: '' }, timestamp: Date.now() };
    localStorage.setItem(getStorageKey(type, lang), JSON.stringify(data));
  } catch (err) {
    console.error('Error saving form data:', err);
  }
};

// Load form data from localStorage
export const loadFormData = (type: QuestionnaireType, lang: Language) => {
  try {
    const stored = localStorage.getItem(getStorageKey(type, lang));
    if (stored) {
      const data = JSON.parse(stored);
      // Only return if data is less than 24 hours old
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        let contactData: ContactData;
        const rawContact = data.contactData;
        if (rawContact && typeof rawContact === 'object' && 'method' in rawContact && 'username' in rawContact) {
          const oldData = rawContact as { method?: string; username?: string };
          contactData = migrateContactData({
            telegram: oldData.method === 'telegram' ? oldData.username || '' : '',
            instagram: oldData.method === 'instagram' ? oldData.username || '' : '',
            phone: '',
          });
        } else {
          contactData = migrateContactData(rawContact);
        }
        
        return {
          formData: data.formData as QuestionnaireFormData,
          additionalData: data.additionalData as FormAdditionalData,
          contactData,
          sourceData: (data.sourceData as SourceData) || { source: '', recommender: '' },
        };
      }
    }
  } catch (err) {
    console.error('Error loading form data:', err);
  }
  return null;
};

// Clear form data from localStorage
export const clearFormData = (type: QuestionnaireType, lang: Language) => {
  try {
    localStorage.removeItem(getStorageKey(type, lang));
  } catch (err) {
    console.error('Error clearing form data:', err);
  }
};

export type ContactValidation = { valid: boolean; error?: string };

export const validateTelegramUsername = (raw: string): ContactValidation => {
  const value = raw.replace(/^@/, '').trim();
  if (!value) return { valid: false, error: 'empty' };
  if (value.length < 5) return { valid: false, error: 'telegram_too_short' };
  if (value.length > 32) return { valid: false, error: 'telegram_too_long' };
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return { valid: false, error: 'telegram_invalid_chars' };
  return { valid: true };
};

export const validateInstagramUsername = (raw: string): ContactValidation => {
  const value = raw.replace(/^@/, '').trim();
  if (!value) return { valid: false, error: 'empty' };
  if (value.length > 30) return { valid: false, error: 'instagram_too_long' };
  if (!/^[a-zA-Z0-9._]+$/.test(value)) return { valid: false, error: 'instagram_invalid_chars' };
  if (/^\.|\.\.|\.$/.test(value)) return { valid: false, error: 'instagram_dots' };
  return { valid: true };
};

/** Telegram: must start with @, no spaces */
export const validateTelegramAtFormat = (raw: string): ContactValidation => {
  const s = raw.trim();
  if (!s) return { valid: false, error: 'empty' };
  if (/\s/.test(s)) return { valid: false, error: 'telegram_spaces' };
  if (!s.startsWith('@')) return { valid: false, error: 'telegram_must_start_at' };
  const user = s.slice(1);
  if (user.length < 5) return { valid: false, error: 'telegram_too_short' };
  if (user.length > 32) return { valid: false, error: 'telegram_too_long' };
  if (!/^[a-zA-Z0-9_]+$/.test(user)) return { valid: false, error: 'telegram_invalid_chars' };
  return { valid: true };
};

/** Instagram: username or profile URL */
export const validateInstagramInput = (raw: string): ContactValidation => {
  if (!raw.trim()) return { valid: false, error: 'empty' };
  const u = extractInstagramUsername(raw);
  if (!u) return { valid: false, error: 'instagram_invalid_input' };
  if (u.length > 30) return { valid: false, error: 'instagram_too_long' };
  if (/^\.|\.\.|\.$/.test(u)) return { valid: false, error: 'instagram_dots' };
  return { valid: true };
};

/** Phone: digits only, optional + at start */
export const validatePhoneInput = (raw: string): ContactValidation => {
  const s = raw.trim().replace(/\s/g, '');
  if (!s) return { valid: false, error: 'empty' };
  if (!/^\+?[0-9]+$/.test(s)) return { valid: false, error: 'phone_invalid_chars' };
  const digits = s.startsWith('+') ? s.slice(1) : s;
  if (digits.length < 10) return { valid: false, error: 'phone_too_short' };
  if (digits.length > 15) return { valid: false, error: 'phone_too_long' };
  return { valid: true };
};

export const normalizePhoneInput = (raw: string | undefined | null): string =>
  String(raw ?? '')
    .trim()
    .replace(/\s/g, '');

export function isContactPhoneValid(contactData: ContactData): boolean {
  const s = normalizePhoneInput(contactData?.phone);
  if (!s) return false;
  return validatePhoneInput(s).valid;
}

/** Human-readable phone error for forms; null if OK */
export function getContactPhoneErrorMessage(contactData: ContactData, lang: Language): string | null {
  if (isContactPhoneValid(contactData)) return null;
  const tr = translations[lang] as Record<string, string>;
  const s = normalizePhoneInput(contactData?.phone);
  if (!s) return tr.phoneRequired ?? tr.required;
  const pr = validatePhoneInput(s);
  if (!pr.valid && pr.error && pr.error !== 'empty') {
    return tr[pr.error] || tr.phoneRequired || tr.required;
  }
  return tr.phoneRequired ?? tr.required;
}

// Validate form
export const validateForm = (
  sections: QuestionnaireSection[],
  formData: QuestionnaireFormData,
  contactData: ContactData,
  lang: Language,
  additionalData?: FormAdditionalData
): FormErrors => {
  const errors: FormErrors = {};
  const t = translations[lang];

  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if (question.required) {
        const value = formData[question.id];
        
        if (question.type === 'checkbox') {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            errors[question.id] = t.selectAtLeastOne;
          }
        } else if (question.type === 'number') {
          if (!value || value === '' || isNaN(Number(value))) {
            errors[question.id] = t.required;
          }
        } else {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            errors[question.id] = t.required;
          }
        }
      }
    });
  });

  // Special validation: if operations is "yes", additional field is required
  if (formData['operations'] === 'yes' && additionalData) {
    const operationsAdditional = additionalData['operations_additional'];
    if (!operationsAdditional || operationsAdditional.trim() === '') {
      errors['operations_additional'] = t.required;
    }
  }

  // Special validation: if injuries has any option selected except "no_issues", additional field is required
  if (formData['injuries'] && additionalData) {
    const injuriesValue = formData['injuries'];
    const injuriesArray = Array.isArray(injuriesValue) ? injuriesValue : [injuriesValue];
    // Check if any option other than "no_issues" is selected
    const hasOtherThanNoIssues = injuriesArray.some((val: string) => val !== 'no_issues');
    if (hasOtherThanNoIssues) {
      const injuriesAdditional = additionalData['injuries_additional'];
      if (!injuriesAdditional || injuriesAdditional.trim() === '') {
        errors['injuries_additional'] = t.required;
      }
    }
  }

  // Universal validation: if any question has "other" selected, additional field is required (не принимать пустое)
  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if ((question.type === 'checkbox' || question.type === 'radio') && question.options) {
        const hasOtherOption = question.options.some(opt => opt.value === 'other');
        if (hasOtherOption) {
          const questionValue = formData[question.id];
          if (questionValue) {
            const valueArray = Array.isArray(questionValue) ? questionValue : [questionValue];
            const hasOther = valueArray.includes('other');
            if (hasOther) {
              const additionalKey = `${question.id}_additional`;
              const additionalValue = additionalData?.[additionalKey];
              const isEmpty = additionalValue === undefined || additionalValue === null || String(additionalValue).trim() === '';
              if (isEmpty) {
                errors[additionalKey] = t.required;
              }
            }
          }
        }
      }
    });
  });

  // Special validation: if medications is "yes", additional field is required
  if (formData['medications'] === 'yes' && additionalData) {
    const medicationsAdditional = additionalData['medications_additional'];
    if (!medicationsAdditional || medicationsAdditional.trim() === '') {
      errors['medications_additional'] = t.required;
    }
  }
  
  // Special validation: if what_else is "yes", additional field is required
  if (formData['what_else'] === 'yes' && additionalData) {
    const whatElseAdditional = additionalData['what_else_additional'];
    if (!whatElseAdditional || whatElseAdditional.trim() === '') {
      errors['what_else_additional'] = t.required;
    }
  }
  // Special validation: if pregnancy_problems is "yes", additional field is required
  if (formData['pregnancy_problems'] === 'yes' && additionalData) {
    const pregnancyProblemsAdditional = additionalData['pregnancy_problems_additional'];
    if (!pregnancyProblemsAdditional || pregnancyProblemsAdditional.trim() === '') {
      errors['pregnancy_problems_additional'] = t.required;
    }
  }
  
  // Note: Universal validation for "other" options is handled above, but medications, what_else, main_concern, and pregnancy_problems use "yes" instead of "other"

  // Special validation: if illness_antibiotics has "took_antibiotics" or "took_other_medications" selected, additional field is required
  if (formData['illness_antibiotics'] && additionalData) {
    const illnessAntibioticsValue = formData['illness_antibiotics'];
    const illnessAntibioticsArray = Array.isArray(illnessAntibioticsValue) ? illnessAntibioticsValue : [illnessAntibioticsValue];
    const hasAntibiotics = illnessAntibioticsArray.includes('took_antibiotics');
    const hasOtherMedications = illnessAntibioticsArray.includes('took_other_medications');
    if (hasAntibiotics || hasOtherMedications) {
      const illnessAntibioticsAdditional = additionalData['illness_antibiotics_additional'];
      if (!illnessAntibioticsAdditional || illnessAntibioticsAdditional.trim() === '') {
        errors['illness_antibiotics_additional'] = t.required;
      }
    }
  }

  // weight_satisfaction: when want_to_lose or want_to_gain
  if (formData['weight_satisfaction'] && additionalData) {
    const vals = Array.isArray(formData['weight_satisfaction']) ? formData['weight_satisfaction'] : [];
    if (vals.includes('want_to_lose') || vals.includes('want_to_gain')) {
      const v = additionalData['weight_satisfaction_additional'];
      if (!v || v.trim() === '') errors['weight_satisfaction_additional'] = t.required;
    }
  }
  // stones: when stones_kidneys or stones_gallbladder or both
  if (formData['stones'] && additionalData) {
    const vals = Array.isArray(formData['stones']) ? formData['stones'] : [];
    if (vals.includes('stones_kidneys') || vals.includes('stones_gallbladder') || vals.includes('both')) {
      const v = additionalData['stones_additional'];
      if (!v || v.trim() === '') errors['stones_additional'] = t.required;
    }
  }
  // operations_injuries: when operations or organ_removed
  if (formData['operations_injuries'] && additionalData) {
    const vals = Array.isArray(formData['operations_injuries']) ? formData['operations_injuries'] : [];
    if (vals.includes('operations') || vals.includes('organ_removed') || vals.includes('injuries')) {
      const v = additionalData['operations_injuries_additional'];
      if (!v || v.trim() === '') errors['operations_injuries_additional'] = t.required;
    }
  }
  // pressure: when high
  if (formData['pressure'] && additionalData) {
    const vals = Array.isArray(formData['pressure']) ? formData['pressure'] : [];
    if (vals.includes('high')) {
      const v = additionalData['pressure_additional'];
      if (!v || v.trim() === '') errors['pressure_additional'] = t.required;
    }
  }
  // covid_times and covid_complications: only when была болезнь
  if (formData['covid_status']) {
    const raw = formData['covid_status'];
    const vals = Array.isArray(raw) ? raw : [raw];
    const hadCovid = vals.includes('had_covid') || vals.includes('both');
    if (hadCovid) {
      const times = formData['covid_times'];
      if (!times || times === '' || isNaN(Number(times))) {
        errors['covid_times'] = t.required;
      }
      const complications = formData['covid_complications'];
      if (!complications || (Array.isArray(complications) && complications.length === 0)) {
        errors['covid_complications'] = t.selectAtLeastOne;
      }
    }
  }
  // cysts_polyps: when cysts, polyps, fibroids, tumors, hernias
  if (formData['cysts_polyps'] && additionalData) {
    const vals = Array.isArray(formData['cysts_polyps']) ? formData['cysts_polyps'] : [];
    if (vals.some((v: string) => ['cysts', 'polyps', 'fibroids', 'tumors', 'hernias'].includes(v))) {
      const v = additionalData['cysts_polyps_additional'];
      if (!v || v.trim() === '') errors['cysts_polyps_additional'] = t.required;
    }
  }

  const tr = t as Record<string, string>;

  const phoneErr = getContactPhoneErrorMessage(contactData, lang);
  if (phoneErr) errors['phone'] = phoneErr;

  const telegramRaw = String(contactData?.telegram ?? '').trim();
  if (telegramRaw) {
    const r = validateTelegramAtFormat(String(contactData?.telegram ?? ''));
    if (!r.valid && r.error && r.error !== 'empty') {
      errors['telegram'] = tr[r.error] || t.required;
    }
  }
  const instagramRaw = String(contactData?.instagram ?? '').trim();
  if (instagramRaw) {
    const r = validateInstagramInput(String(contactData?.instagram ?? ''));
    if (!r.valid && r.error && r.error !== 'empty') {
      errors['instagram'] = tr[r.error] || t.required;
    }
  }

  return errors;
};

// Generate Markdown
export const generateMarkdown = (
  type: QuestionnaireType,
  sections: QuestionnaireSection[],
  formData: QuestionnaireFormData,
  additionalData: FormAdditionalData,
  contactData: ContactData,
  lang: Language,
  sourceData?: SourceData
): string => {
  const t = translations[lang];
  const headers = {
    infant: t.mdInfant,
    child: t.mdChild,
    woman: t.mdWoman,
    man: t.mdMan,
  };

  const dateStr = format(new Date(), 'dd.MM.yyyy, HH:mm');
  let md = `📋 Новая анкета: ${headers[type]}\n\n📅 Дата: ${dateStr}\n\n`;

  let questionNumber = 1;
  let healthSectionStarted = false;
  let isFirstSection = true;

  sections.forEach((section) => {
    // Skip empty sections
    const hasAnswers = section.questions.some((question) => {
      const value = formData[question.id];
      return value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '');
    });

    if (!hasAnswers) return;

    // Section header (compact)
    if (!isFirstSection) {
      md += `\n`;
    }
    md += `**${section.title[lang]}**\n`;
    isFirstSection = false;

    // Check if this is the health section - start numbering from here
    if (section.id === 'health') {
      healthSectionStarted = true;
    }

    section.questions.forEach((question) => {
      const value = formData[question.id];
      const additional = additionalData[`${question.id}_additional`];

      if (value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '')) {
        const label = question.label[lang];
        
        // Question number and label - start numbering from first question in "health" section
        let questionPrefix = '';
        if (healthSectionStarted) {
          questionPrefix = `${questionNumber}. `;
          questionNumber++;
        }
        
        // Format answer
        let answerText = '';
        if (Array.isArray(value)) {
          const optionLabels = value.map((v) => {
            const opt = question.options?.find((o) => o.value === v);
            return opt ? opt.label[lang] : v;
          });
          answerText = optionLabels.join(', ');
        } else if (question.options) {
          const opt = question.options.find((o) => o.value === value);
          answerText = opt ? opt.label[lang] : value;
        } else {
          answerText = value;
        }

        // Enhanced format: Question in bold, Answer in bold with arrow
        md += `${questionPrefix}**${label}**\n`;
        md += `➤ **${answerText}**`;
        
        if (additional && additional.trim() !== '') {
          md += `\n   _${additional}_`;
        }
        
        md += `\n`;
      }
    });
  });

  // Source section
  if (sourceData?.source) {
    const sourceLabels = { telegram: 'Telegram', instagram: 'Instagram', recommendation: lang === 'ru' ? 'По рекомендации' : 'By recommendation' };
    md += `\n**${lang === 'ru' ? 'Откуда узнали' : 'Source'}:** ${sourceLabels[sourceData.source as keyof typeof sourceLabels] || sourceData.source}`;
    if (sourceData.source === 'recommendation' && sourceData.recommender?.trim()) {
      md += `\n➤ _${sourceData.recommender.trim()}_`;
    }
    md += '\n';
  }

  const contacts: string[] = [];
  if (contactData.phone && contactData.phone.trim() !== '') {
    const ph = contactData.phone.trim().replace(/\s/g, '');
    contacts.push(
      `📞 ${lang === 'ru' ? 'Телефон (основной)' : 'Phone (primary)'}: ${ph}`,
    );
  }
  if (contactData.telegram && contactData.telegram.trim() !== '') {
    const cleanTelegram = contactData.telegram.replace(/^@/, '').trim();
    contacts.push(`📱 Telegram: @${cleanTelegram}\n🔗 https://t.me/${cleanTelegram}`);
  }
  if (contactData.instagram && contactData.instagram.trim() !== '') {
    const igUser = extractInstagramUsername(contactData.instagram);
    const cleanInstagram = igUser || contactData.instagram.replace(/^@/, '').trim();
    contacts.push(`📷 Instagram: @${cleanInstagram}\n🔗 https://instagram.com/${cleanInstagram}`);
  }

  if (contacts.length > 0) {
    md += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    md += `**${t.mdContacts}**\n`;
    contacts.forEach((contact) => {
      md += `➤ ${contact}\n`;
    });
  }

  return md;
};

export const sendToTelegram = async (
  markdown: string,
  contactData?: ContactData
): Promise<{ success: boolean; error?: string }> => {
  if (contactData && !isContactPhoneValid(contactData)) {
    return { success: false, error: 'PHONE_REQUIRED' };
  }
  const creds = getTelegramCredentials();
  if ('error' in creds) return { success: false, error: creds.error };

  const { BOT_TOKEN, CHAT_ID } = creds;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: markdown,
          parse_mode: 'Markdown',
        }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return { success: false, error: `Ошибка Telegram API: ${data.description || response.status}` };
    }
    return { success: true };
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return { success: false, error: 'Превышено время ожидания. Проверьте интернет-соединение.' };
    }
    return { success: false, error: error.message || 'Ошибка сети' };
  }
};

const getTelegramCredentials = (): { BOT_TOKEN: string; CHAT_ID: string } | { error: string } => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || BOT_TOKEN.trim() === '' || !CHAT_ID || CHAT_ID.trim() === '') {
    return { error: 'Telegram Bot Token or Chat ID not configured.' };
  }
  return { BOT_TOKEN, CHAT_ID };
};

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/** Send a file to the same Telegram chat. Images are sent via sendPhoto for inline preview. */
export const sendDocumentToTelegram = async (
  file: File,
  caption?: string
): Promise<{ success: boolean; error?: string }> => {
  const creds = getTelegramCredentials();
  if ('error' in creds) return { success: false, error: creds.error };

  const { BOT_TOKEN, CHAT_ID } = creds;
  const isImage = IMAGE_TYPES.includes(file.type);
  const method = isImage ? 'sendPhoto' : 'sendDocument';
  const fieldName = isImage ? 'photo' : 'document';

  const body = new globalThis.FormData();
  body.append('chat_id', CHAT_ID);
  body.append(fieldName, file, file.name);
  if (caption && caption.trim()) {
    body.append('caption', caption.trim());
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120_000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: 'POST',
      body,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return { success: false, error: data.description || `HTTP ${response.status}` };
    }
    return { success: true };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const message = err instanceof Error ? err.message : 'Ошибка отправки файла';
    return { success: false, error: message };
  }
};
