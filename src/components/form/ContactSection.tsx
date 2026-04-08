import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ContactData, PreferredContactMethod } from '@/lib/form-utils';
import { extractInstagramUsername, validateTelegramAtFormat } from '@/lib/form-utils';
import { MessageCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  /** Open “extra contacts” when restoring saved data with secondary fields */
  defaultExtrasOpen?: boolean;
}

const METHODS: PreferredContactMethod[] = ['telegram', 'instagram', 'phone'];

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactData,
  onPatch,
  errors,
  defaultExtrasOpen = false,
}) => {
  const { t, language } = useLanguage();
  const [extrasOpen, setExtrasOpen] = useState(defaultExtrasOpen);

  useEffect(() => {
    if (defaultExtrasOpen) setExtrasOpen(true);
  }, [defaultExtrasOpen]);

  const method = contactData.preferredContactMethod;

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

  const telegramOk =
    method === 'telegram' &&
    contactData.telegram.trim() &&
    validateTelegramAtFormat(contactData.telegram).valid;

  const showTelegramPreview = telegramOk && telegramLink;

  const anyError = !!(
    errors.contact_method ||
    errors.contact_primary ||
    errors.telegram ||
    errors.instagram ||
    errors.phone
  );

  const secondaryMethods = METHODS.filter((m) => m !== method) as PreferredContactMethod[];

  const fieldShell = (isPrimary: boolean) =>
    cn(
      'rounded-xl transition-colors',
      isPrimary
        ? 'border-2 border-primary bg-primary/5 p-4 md:p-5 shadow-sm'
        : 'border border-border bg-muted/25 p-4',
    );

  return (
    <div
      className="card-wellness space-y-4"
      data-error={anyError}
      data-contact-section
    >
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary shrink-0" />
        {t('preferredContactTitle')} <span className="text-destructive">*</span>
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">{t('preferredContactHelp')}</p>

      {errors.contact_method && (
        <p className="error-message" role="alert">
          <AlertCircleIcon />
          {errors.contact_method}
        </p>
      )}
      {errors.contact_primary && !errors.contact_method && (
        <p className="error-message" role="alert">
          <AlertCircleIcon />
          {errors.contact_primary}
        </p>
      )}

      <RadioGroup
        value={method || undefined}
        onValueChange={(v) => {
          onPatch({ preferredContactMethod: v as PreferredContactMethod });
        }}
        className="grid gap-3 sm:grid-cols-3"
      >
        {METHODS.map((m) => (
          <Label
            key={m}
            htmlFor={`contact-${m}`}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors min-h-[48px]',
              method === m ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/40',
            )}
          >
            <RadioGroupItem value={m} id={`contact-${m}`} className="shrink-0" />
            <span className="font-medium text-foreground">
              {m === 'telegram' ? t('telegram') : m === 'instagram' ? t('instagram') : t('phone')}
            </span>
          </Label>
        ))}
      </RadioGroup>

      {method === 'telegram' && (
        <div className={fieldShell(true)}>
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
      )}

      {method === 'instagram' && (
        <div className={fieldShell(true)}>
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
      )}

      {method === 'phone' && (
        <div className={fieldShell(true)}>
          <Label htmlFor="contact-phone-input" className="text-sm text-foreground mb-2 block">
            {t('phone')}
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
      )}

      {method && (
        <Collapsible open={extrasOpen} onOpenChange={setExtrasOpen}>
          <CollapsibleTrigger
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline w-full justify-center py-2"
          >
            {extrasOpen ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {t('contactHideExtras')}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {t('addAnotherContact')}
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-4">
            <p className="text-xs text-muted-foreground text-center">
              {t('contactExtrasOptionalHint')}
            </p>
            {secondaryMethods.map((m) => (
              <div key={m} className={fieldShell(false)}>
                {m === 'telegram' && (
                  <>
                    <Label htmlFor="extra-telegram" className="text-sm mb-2 block">
                      {t('telegram')}
                    </Label>
                    <input
                      id="extra-telegram"
                      type="text"
                      className={cn('input-field', errors.telegram ? 'input-error' : '')}
                      value={contactData.telegram}
                      onChange={(e) => onPatch({ telegram: e.target.value })}
                      placeholder={t('telegramPlaceholderAt')}
                    />
                    {errors.telegram && method !== 'telegram' && (
                      <p className="error-message mt-2" role="alert">
                        <AlertCircleIcon />
                        {errors.telegram}
                      </p>
                    )}
                  </>
                )}
                {m === 'instagram' && (
                  <>
                    <Label htmlFor="extra-instagram" className="text-sm mb-2 block">
                      {t('instagram')}
                    </Label>
                    <input
                      id="extra-instagram"
                      type="text"
                      className={cn('input-field', errors.instagram ? 'input-error' : '')}
                      value={contactData.instagram}
                      onChange={(e) => onPatch({ instagram: e.target.value })}
                      placeholder={t('instagramPlaceholderFlexible')}
                    />
                    {errors.instagram && method !== 'instagram' && (
                      <p className="error-message mt-2" role="alert">
                        <AlertCircleIcon />
                        {errors.instagram}
                      </p>
                    )}
                  </>
                )}
                {m === 'phone' && (
                  <>
                    <Label htmlFor="extra-phone" className="text-sm mb-2 block">
                      {t('phone')}
                    </Label>
                    <input
                      id="extra-phone"
                      type="tel"
                      inputMode="tel"
                      className={cn('input-field', errors.phone ? 'input-error' : '')}
                      value={contactData.phone}
                      onChange={(e) => onPatch({ phone: e.target.value })}
                      placeholder={t('phonePlaceholderFlexible')}
                    />
                    {errors.phone && method !== 'phone' && (
                      <p className="error-message mt-2" role="alert">
                        <AlertCircleIcon />
                        {errors.phone}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
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
