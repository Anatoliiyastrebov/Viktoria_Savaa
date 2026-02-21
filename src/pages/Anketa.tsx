import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuestionField } from '@/components/form/QuestionField';
import { ContactSection } from '@/components/form/ContactSection';
import { SourceSection } from '@/components/form/SourceSection';
import { DSGVOCheckbox } from '@/components/form/DSGVOCheckbox';
import { MarkdownPreview } from '@/components/form/MarkdownPreview';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionIcon } from '@/components/icons/SectionIcons';
import {
  getQuestionnaire,
  getQuestionnaireTitle,
  QuestionnaireType,
} from '@/lib/questionnaire-data';
import {
  QuestionnaireFormData,
  FormAdditionalData,
  ContactData,
  SourceData,
  FormErrors,
  validateForm,
  generateMarkdown,
  saveFormData,
  loadFormData,
  clearFormData,
  sendToTelegram,
  sendDocumentToTelegram,
} from '@/lib/form-utils';
import { Eye, Send, Trash2, Loader2, AlertCircle, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Anketa: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const type = (searchParams.get('type') as QuestionnaireType) || 'infant';
  const sections = useMemo(() => getQuestionnaire(type), [type]);
  const title = getQuestionnaireTitle(type, language);

  const isEnvConfigured = useMemo(() => {
    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    return !!(BOT_TOKEN && CHAT_ID && BOT_TOKEN.trim() !== '' && CHAT_ID.trim() !== '');
  }, []);

  const [formData, setFormData] = useState<QuestionnaireFormData>({});
  const [additionalData, setAdditionalData] = useState<FormAdditionalData>({});
  const [contactData, setContactData] = useState<ContactData>({
    telegram: '',
    instagram: '',
  });
  const [sourceData, setSourceData] = useState<SourceData>({ source: '', recommender: '' });
  const [dsgvoAccepted, setDsgvoAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const attachmentFilesRef = useRef<File[]>([]);

  // Load saved form data on mount
  useEffect(() => {
    const saved = loadFormData(type, language);
    if (saved) {
      setFormData(saved.formData || {});
      setAdditionalData(saved.additionalData || {});
      // Ensure contactData has the correct structure
      const contact = saved.contactData || { telegram: '', instagram: '' };
      setContactData({
        telegram: contact.telegram || '',
        instagram: contact.instagram || '',
      });
    }
  }, [type, language]);

  // Auto-save form data
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(type, language, formData, additionalData, contactData, sourceData);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [formData, additionalData, contactData, sourceData, type, language]);

  const handleFieldChange = (questionId: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
    // If operations changed to "no", clear additional field error
    if (questionId === 'operations' && value === 'no') {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors['operations_additional'];
        return newErrors;
      });
    }
    // If injuries changed to only "no_issues" or empty, clear additional field error
    if (questionId === 'injuries') {
      const injuriesArray = Array.isArray(value) ? value : [value];
      const hasOtherThanNoIssues = injuriesArray.some((val: string) => val !== 'no_issues');
      if (!hasOtherThanNoIssues) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors['injuries_additional'];
          return newErrors;
        });
      }
    }
    // If illness_antibiotics changed and no longer has "took_antibiotics" or "took_other_medications", clear additional field error
    if (questionId === 'illness_antibiotics') {
      const illnessAntibioticsArray = Array.isArray(value) ? value : [value];
      const hasAntibiotics = illnessAntibioticsArray.includes('took_antibiotics');
      const hasOtherMedications = illnessAntibioticsArray.includes('took_other_medications');
      if (!hasAntibiotics && !hasOtherMedications) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors['illness_antibiotics_additional'];
          return newErrors;
        });
      }
    }
    // Universal handling: if any question with "other" option changed and "other" is not selected, clear additional field error
    const question = sections.flatMap(s => s.questions).find(q => q.id === questionId);
    if (question && (question.type === 'checkbox' || question.type === 'radio') && question.options) {
      const hasOtherOption = question.options.some(opt => opt.value === 'other');
      if (hasOtherOption) {
        const valueArray = Array.isArray(value) ? value : [value];
        const hasOther = valueArray.includes('other') || value === 'other';
        if (!hasOther) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[`${questionId}_additional`];
            return newErrors;
          });
        }
      }
    }
    // If medications changed and "yes" is not selected, clear additional field error
    if (questionId === 'medications') {
      if (value !== 'yes') {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors['medications_additional'];
          return newErrors;
        });
      }
    }
    // If what_else changed and "yes" is not selected, clear additional field error
    if (questionId === 'what_else') {
      if (value !== 'yes') {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors['what_else_additional'];
          return newErrors;
        });
      }
    }
    // If main_concern changed and "yes" is not selected, clear additional field error
    if (questionId === 'main_concern') {
      if (value !== 'yes') {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors['main_concern_additional'];
          return newErrors;
        });
      }
    }
    // If pregnancy_problems changed and "yes" is not selected, clear additional field error
    if (questionId === 'pregnancy_problems') {
      if (value !== 'yes') {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors['pregnancy_problems_additional'];
          return newErrors;
        });
      }
    }
    if (questionId === 'tests' && value !== 'yes') {
      setAttachmentFiles([]);
      attachmentFilesRef.current = [];
    }
    // Clear additional field errors when selection changes
    const clearAdditionalFor = (qId: string) => {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`${qId}_additional`];
        return next;
      });
    };
    if (['weight_satisfaction', 'stones', 'operations_injuries', 'pressure', 'cysts_polyps'].includes(questionId)) {
      const vals = Array.isArray(value) ? value : [value];
      const needsAdditional = {
        weight_satisfaction: vals.includes('want_to_lose') || vals.includes('want_to_gain'),
        stones: vals.includes('stones_kidneys') || vals.includes('stones_gallbladder') || vals.includes('both'),
        operations_injuries: vals.includes('operations') || vals.includes('organ_removed'),
        pressure: vals.includes('low') || vals.includes('high') || vals.includes('other'),
        cysts_polyps: vals.some((v: string) => ['cysts', 'polyps', 'fibroids', 'tumors', 'hernias'].includes(v)),
      };
      if (!needsAdditional[questionId as keyof typeof needsAdditional]) clearAdditionalFor(questionId);
    }
  };

  const handleAdditionalChange = (questionId: string, value: string) => {
    setAdditionalData((prev) => ({ ...prev, [`${questionId}_additional`]: value }));
    // Clear error when user starts typing in additional field
    const additionalKey = `${questionId}_additional`;
    if (errors[additionalKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[additionalKey];
        return newErrors;
      });
    }
  };

  const handleClearForm = () => {
    setFormData({});
    setAdditionalData({});
    setContactData({ telegram: '', instagram: '' });
    setDsgvoAccepted(false);
    setErrors({});
    setAttachmentFiles([]);
    attachmentFilesRef.current = [];
    clearFormData(type, language);
    toast.success(language === 'ru' ? 'Форма очищена' : 'Form cleared');
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newList = Array.from(files);
    attachmentFilesRef.current = [...attachmentFilesRef.current, ...newList];
    setAttachmentFiles(attachmentFilesRef.current);
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    attachmentFilesRef.current = attachmentFilesRef.current.filter((_, i) => i !== index);
    setAttachmentFiles(attachmentFilesRef.current);
  };

  const markdown = useMemo(() => {
    return generateMarkdown(type, sections, formData, additionalData, contactData, language, sourceData);
  }, [type, sections, formData, additionalData, contactData, sourceData, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(sections, formData, contactData, language, additionalData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error(t('required'));
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!dsgvoAccepted) {
      toast.error(language === 'ru' ? 'Необходимо принять условия DSGVO' : 'You must accept GDPR terms');
      return;
    }

    setIsSubmitting(true);

    // Берём актуальный список файлов (ref обновляется сразу при выборе)
    const filesToSend = attachmentFilesRef.current.slice();

    try {
      const result = await sendToTelegram(markdown);
      if (!result.success) {
        const errorMsg = result.error || t('submitError');
        console.error('Failed to send form:', errorMsg);
        toast.error(errorMsg, { duration: 5000 });
        return;
      }
      for (const file of filesToSend) {
        const docResult = await sendDocumentToTelegram(file, title);
        if (!docResult.success) {
          toast.error(
            language === 'ru'
              ? `Не удалось отправить файл «${file.name}»: ${docResult.error}`
              : `Failed to send file «${file.name}»: ${docResult.error}`,
            { duration: 5000 }
          );
          return;
        }
      }
      clearFormData(type, language);
      setAttachmentFiles([]);
      attachmentFilesRef.current = [];
      navigate(`/success?lang=${language}`);
    } catch (error: unknown) {
      console.error('Submit error:', error);
      const errorMsg = error instanceof Error ? error.message : t('submitError');
      toast.error(errorMsg, { duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 min-w-[70vw]">
        <h1 className="text-3xl font-bold text-foreground text-center mb-8 animate-fade-in">
          {title}
        </h1>

        {!isEnvConfigured && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Настройки не завершены</AlertTitle>
            <AlertDescription>
              Telegram Bot Token или Chat ID не настроены. Настройте переменные окружения VITE_TELEGRAM_BOT_TOKEN и VITE_TELEGRAM_CHAT_ID.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="card-wellness space-y-6"
              style={{ animationDelay: `${sectionIndex * 0.1}s` }}
            >
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <SectionIcon name={section.icon} className="w-6 h-6 text-primary" />
                {section.title[language]}
              </h2>

              <div className={section.id === 'personal' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-6'}>
                {section.questions.map((question) => {
                  // Показ COVID-полей только если была болезнь
                  if (question.id === 'covid_times' || question.id === 'covid_complications') {
                    const rawStatus = formData['covid_status'];
                    const statusVals = Array.isArray(rawStatus) ? rawStatus : rawStatus ? [rawStatus] : [];
                    const hadCovid = statusVals.includes('had_covid') || statusVals.includes('both');
                    if (!hadCovid) {
                      return null;
                    }
                  }
                  const containerClass =
                    section.id === 'personal' && question.id === 'weight_satisfaction'
                      ? 'md:col-span-2 xl:col-span-3'
                      : '';

                  return (
                  <div
                    key={question.id}
                    data-error={!!errors[question.id]}
                    className={containerClass}
                  >
                    <QuestionField
                      question={question}
                      value={formData[question.id] || (question.type === 'checkbox' ? [] : '')}
                      additionalValue={additionalData[`${question.id}_additional`] || ''}
                      error={errors[question.id]}
                      additionalError={errors[`${question.id}_additional`]}
                      onChange={(value) => handleFieldChange(question.id, value)}
                      onAdditionalChange={(value) =>
                        handleAdditionalChange(question.id, value)
                      }
                    />
                    {/* Загрузка файлов сразу под вопросом «Анализы крови / УЗИ» */}
                    {question.id === 'tests' && formData['tests'] === 'yes' && (
                      <div className="mt-4 pl-0 space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                        <p className="text-sm font-medium text-foreground">
                          {language === 'ru'
                            ? 'Прикрепите файлы (анализы, УЗИ — любой формат):'
                            : 'Attach files (blood tests, ultrasound — any format):'}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium">
                            <Upload className="w-4 h-4 shrink-0" />
                            {language === 'ru' ? 'Выбрать файлы' : 'Choose files'}
                            <input
                              type="file"
                              multiple
                              accept="*/*"
                              className="sr-only"
                              onChange={handleAttachmentChange}
                            />
                          </label>
                          {attachmentFiles.length > 0 && (
                            <div className="flex flex-col gap-2 w-full">
                              <span className="text-xs text-muted-foreground font-medium">
                                {language === 'ru' ? 'Выбранные файлы (будут отправлены в Telegram):' : 'Selected files (will be sent to Telegram):'}
                              </span>
                              <ul className="flex flex-wrap gap-2 list-none">
                                {attachmentFiles.map((file, index) => (
                                  <li
                                    key={`${file.name}-${index}-${file.size}`}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border text-sm shadow-sm"
                                  >
                                    <span className="truncate max-w-[220px] font-medium text-foreground" title={file.name}>
                                      {file.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground shrink-0">
                                      ({(file.size / 1024).toFixed(1)} KB)
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => removeAttachment(index)}
                                      className="ml-1 p-1 rounded-md hover:bg-destructive/20 text-destructive shrink-0"
                                      aria-label={language === 'ru' ? 'Удалить файл' : 'Remove file'}
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {language === 'ru' ? 'Макс. 50 МБ на файл.' : 'Max 50 MB per file.'}
                        </p>
                      </div>
                    )}
                  </div>
                );
                })}
              </div>
            </div>
          ))}

          {/* Source Section */}
          <SourceSection
            source={sourceData.source}
            recommender={sourceData.recommender}
            error={errors['source_recommender']}
            recommenderError={errors['source_recommender']}
            onSourceChange={(value) => {
              setSourceData((prev) => ({ ...prev, source: value }));
              setErrors((prev) => {
                const next = { ...prev };
                delete next['source_recommender'];
                return next;
              });
            }}
            onRecommenderChange={(value) => {
              setSourceData((prev) => ({ ...prev, recommender: value }));
              if (errors['source_recommender']) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next['source_recommender'];
                  return next;
                });
              }
            }}
          />

          {/* Contact Section */}
          <ContactSection
            telegram={contactData.telegram}
            instagram={contactData.instagram}
            error={errors['contact']}
            telegramError={errors['telegram']}
            instagramError={errors['instagram']}
            onTelegramChange={(value) => {
              setContactData((prev) => ({ ...prev, telegram: value }));
              setErrors((prev) => {
                const next = { ...prev };
                delete next['contact'];
                delete next['telegram'];
                return next;
              });
            }}
            onInstagramChange={(value) => {
              setContactData((prev) => ({ ...prev, instagram: value }));
              setErrors((prev) => {
                const next = { ...prev };
                delete next['contact'];
                delete next['instagram'];
                return next;
              });
            }}
          />

          {/* DSGVO Checkbox */}
          <DSGVOCheckbox checked={dsgvoAccepted} onChange={setDsgvoAccepted} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="btn-secondary flex items-center justify-center gap-2 flex-1"
            >
              <Eye className="w-5 h-5" />
              {t('previewMarkdown')}
            </button>

            <button
              type="button"
              onClick={handleClearForm}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              {t('clearForm')}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!dsgvoAccepted || isSubmitting || !isEnvConfigured}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('submit')}
              </>
            )}
          </button>
        </form>

        {/* Markdown Preview Modal */}
        {showPreview && (
          <MarkdownPreview markdown={markdown} onClose={() => setShowPreview(false)} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Anketa;
