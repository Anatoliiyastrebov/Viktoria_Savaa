import React, { useMemo, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ContactData } from '@/lib/form-utils';
import { extractInstagramUsername, validateTelegramAtFormat } from '@/lib/form-utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MessageCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface ContactSectionErrors {
  contact_method?: string;
  contact_primary?: string;
  telegram?: string;
  instagram?: string;
  phone?: string;
}

interface ContactSectionProps {
  contactData: ContactData;
  onPatch: (patch: Partial<ContactData>) => void;
  errors: ContactSectionErrors;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactData, onPatch, errors }) => {
  const { t, language } = useLanguage();

  const telegramValue = String(contactData?.telegram ?? '');
  const instagramValue = String(contactData?.instagram ?? '');
  const phoneValue = String(contactData?.phone ?? '');

  const hasSocialFill = telegramValue.trim().length > 0 || instagramValue.trim().length > 0;
  const hasSocialErrors = !!(errors.telegram || errors.instagram);

  const [extrasOpen, setExtrasOpen] = useState(false);

  useEffect(() => {
    if (hasSocialFill || hasSocialErrors) setExtrasOpen(true);
  }, [hasSocialFill, hasSocialErrors]);

  const cleanTelegram = useMemo(
    () => telegramValue.replace(/^@/, '').trim(),
    [telegramValue],
  );
  const telegramLink = useMemo(
    () => (cleanTelegram ? `https://t.me/${cleanTelegram}` : ''),
    [cleanTelegram],
  );
  const igUser = useMemo(
    () => extractInstagramUsername(instagramValue),
    [instagramValue],
  );
  const instagramLink = useMemo(
    () => (igUser ? `https://instagram.com/${igUser}` : ''),
    [igUser],
  );

  const showTelegramPreview =
    telegramValue.trim() &&
    validateTelegramAtFormat(telegramValue).valid &&
    !!telegramLink;

  const anyError = !!(errors.telegram || errors.instagram || errors.phone);

  const primaryShell =
    'rounded-xl border-2 border-primary bg-primary/5 p-4 md:p-5 shadow-sm';
  const socialFieldsShell =
    'rounded-xl border border-border bg-muted/20 p-4 md:p-5 space-y-4 mt-3';

  return (
    <div className="card-wellness space-y-5" data-error={anyError} data-contact-section>
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary shrink-0" aria-hidden />
          {t('contactSectionTitle')}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{t('contactSectionHelp')}</p>
      </div>

      <div className={primaryShell}>
        <Label htmlFor="contact-phone-input" className="text-sm font-medium text-foreground mb-2 block">
          {t('phone')} <span className="text-destructive">*</span>
        </Label>
        <input
          id="contact-phone-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-required="true"
          className={cn('input-field', errors.phone ? 'input-error' : '')}
          value={phoneValue}
          onChange={(e) => onPatch({ phone: e.target.value })}
          placeholder={t('phonePlaceholderFlexible')}
        />
        <p className="text-xs text-muted-foreground mt-1.5">{t('phonePlaceholderFlexible')}</p>
        {errors.phone && (
          <p className="error-message mt-2" role="alert">
            <AlertCircleIcon />
            {errors.phone}
          </p>
        )}
      </div>

      <div className="border-t border-border pt-5">
        <Collapsible open={extrasOpen} onOpenChange={setExtrasOpen}>
          <CollapsibleTrigger
            type="button"
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors',
              'hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            )}
            aria-expanded={extrasOpen}
          >
            <span>{extrasOpen ? t('contactHideExtras') : t('contactExtrasShowFields')}</span>
            {extrasOpen ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            )}
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden">
            <div className={socialFieldsShell}>
              <div>
                <p className="text-sm font-medium text-foreground">{t('contactOptionalSocialTitle')}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t('contactExtrasOptionalHint')}
                </p>
              </div>

              <div>
                <Label htmlFor="contact-telegram-input" className="text-sm text-foreground mb-2 block">
                  {t('telegram')}
                </Label>
                <input
                  id="contact-telegram-input"
                  type="text"
                  inputMode="text"
                  autoComplete="username"
                  className={cn('input-field', errors.telegram ? 'input-error' : '')}
                  value={telegramValue}
                  onChange={(e) => onPatch({ telegram: e.target.value })}
                  placeholder={t('telegramPlaceholderAt')}
                />
                <p className="text-xs text-muted-foreground mt-1.5">{t('telegramFormatHint')}</p>
                {errors.telegram && (
                  <p className="error-message mt-2" role="alert">
                    <AlertCircleIcon />
                    {errors.telegram}
                  </p>
                )}
                {showTelegramPreview && (
                  <div className="bg-background/80 rounded-lg p-3 mt-3 space-y-1 border border-border">
                    <p className="text-xs text-muted-foreground font-medium">
                      {language === 'ru' ? 'Ссылка на профиль:' : 'Profile link:'}
                    </p>
                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium text-sm flex items-center gap-1.5 hover:underline break-all"
                    >
                      {telegramLink}
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="contact-instagram-input" className="text-sm text-foreground mb-2 block">
                  {t('instagram')}
                </Label>
                <input
                  id="contact-instagram-input"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  className={cn('input-field', errors.instagram ? 'input-error' : '')}
                  value={instagramValue}
                  onChange={(e) => onPatch({ instagram: e.target.value })}
                  placeholder={t('instagramPlaceholderFlexible')}
                />
                <p className="text-xs text-muted-foreground mt-1.5">{t('instagramFormatHint')}</p>
                {errors.instagram && (
                  <p className="error-message mt-2" role="alert">
                    <AlertCircleIcon />
                    {errors.instagram}
                  </p>
                )}
                {instagramLink && !errors.instagram && igUser && (
                  <div className="bg-background/80 rounded-lg p-3 mt-3 space-y-1 border border-border">
                    <p className="text-xs text-muted-foreground font-medium">
                      {language === 'ru' ? 'Ссылка на профиль:' : 'Profile link:'}
                    </p>
                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium text-sm flex items-center gap-1.5 hover:underline break-all"
                    >
                      {instagramLink}
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
