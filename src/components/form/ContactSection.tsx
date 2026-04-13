import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ContactData } from '@/lib/form-utils';
import { extractInstagramUsername, validateTelegramAtFormat } from '@/lib/form-utils';
import { MessageCircle, ExternalLink } from 'lucide-react';
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

  const cleanTelegram = useMemo(
    () => contactData.telegram.replace(/^@/, '').trim(),
    [contactData.telegram],
  );
  const telegramLink = useMemo(
    () => (cleanTelegram ? `https://t.me/${cleanTelegram}` : ''),
    [cleanTelegram],
  );
  const igUser = useMemo(
    () => extractInstagramUsername(contactData.instagram),
    [contactData.instagram],
  );
  const instagramLink = useMemo(
    () => (igUser ? `https://instagram.com/${igUser}` : ''),
    [igUser],
  );

  const showTelegramPreview =
    contactData.telegram.trim() &&
    validateTelegramAtFormat(contactData.telegram).valid &&
    !!telegramLink;

  const anyError = !!(errors.telegram || errors.instagram || errors.phone);

  const primaryShell = 'rounded-xl border-2 border-primary bg-primary/5 p-4 md:p-5 shadow-sm';
  const secondaryShell = 'rounded-xl border border-border bg-muted/25 p-4 md:p-5 space-y-4';

  return (
    <div className="card-wellness space-y-5" data-error={anyError} data-contact-section>
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary shrink-0" />
        {t('contactSectionTitle')} <span className="text-destructive">*</span>
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">{t('contactSectionHelp')}</p>

      <div className={primaryShell}>
        <Label htmlFor="contact-phone-input" className="text-sm font-medium text-foreground mb-2 block">
          {t('phone')} <span className="text-destructive">*</span>
        </Label>
        <input
          id="contact-phone-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={cn('input-field', errors.phone ? 'input-error' : '')}
          value={contactData.phone}
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

      <div className={secondaryShell}>
        <p className="text-sm font-medium text-foreground">{t('contactOptionalSocialTitle')}</p>
        <p className="text-xs text-muted-foreground -mt-2 mb-1">{t('contactOptionalSocialHint')}</p>

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
            value={contactData.telegram}
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
            value={contactData.instagram}
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
