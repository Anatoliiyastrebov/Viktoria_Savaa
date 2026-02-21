import React, { useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  telegram: string;
  instagram: string;
  error?: string;
  telegramError?: string;
  instagramError?: string;
  onTelegramChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = (props) => {
  const {
    telegram: rawTelegram,
    instagram: rawInstagram,
    error,
    telegramError,
    instagramError,
    onTelegramChange,
    onInstagramChange,
  } = props;
  const { t, language } = useLanguage();

  const telegram = rawTelegram ?? '';
  const instagram = rawInstagram ?? '';

  const cleanTelegram = useMemo(() => telegram.replace(/^@/, '').trim(), [telegram]);
  const cleanInstagram = useMemo(() => instagram.replace(/^@/, '').trim(), [instagram]);
  const telegramLink = useMemo(() => (cleanTelegram ? `https://t.me/${cleanTelegram}` : ''), [cleanTelegram]);
  const instagramLink = useMemo(() => (cleanInstagram ? `https://instagram.com/${cleanInstagram}` : ''), [cleanInstagram]);

  const unifiedValue = telegram || instagram;

  const handleUnifiedChange = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) {
        onTelegramChange('');
        onInstagramChange('');
        return;
      }
      const clean = value.replace(/^@/, '').trim();
      const TELEGRAM_USERNAME_REGEX = /^[a-zA-Z0-9_]{5,32}$/;
      const INSTAGRAM_USERNAME_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

      if (TELEGRAM_USERNAME_REGEX.test(clean)) {
        onTelegramChange(value);
        onInstagramChange('');
      } else if (INSTAGRAM_USERNAME_REGEX.test(clean)) {
        onInstagramChange(value);
        onTelegramChange('');
      } else {
        // По умолчанию считаем как Telegram, валидация покажет ошибку
        onTelegramChange(value);
        onInstagramChange('');
      }
    },
    [onTelegramChange, onInstagramChange],
  );

  const linkToShow = telegramLink || instagramLink;

  return (
    <div className="card-wellness space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        {t('contactMethod')} <span className="text-destructive">*</span>
      </h3>

      <p className="text-sm text-muted-foreground">
        {t('atLeastOneContactRequired')}
      </p>

      {error && (
        <p className="error-message">
          <AlertCircleIcon />
          {error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{t('telegram')}</span>
          </label>
          <input
            type="text"
            className={`input-field ${telegramError || instagramError ? 'input-error' : ''}`}
            value={unifiedValue}
            onChange={(e) => handleUnifiedChange(e.target.value)}
            placeholder={t('usernameHint')}
            autoComplete="username"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {t('telegramFormatHint')} / {t('instagramFormatHint')}
          </p>
          {(telegramError || instagramError) && (
            <p className="error-message mt-1" role="alert">
              <AlertCircleIcon />
              {telegramError || instagramError}
            </p>
          )}
          {linkToShow && !(telegramError || instagramError) && (
            <div className="bg-accent/50 rounded-xl p-3 mt-3 space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                {language === 'ru' ? 'Ссылка на профиль:' : 'Profile link:'}
              </p>
              <a
                href={linkToShow}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium text-sm flex items-center gap-1.5 hover:underline break-all"
              >
                {linkToShow}
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              </a>
              <p className="text-xs text-muted-foreground">
                {language === 'ru'
                  ? 'Перейдите по ссылке, чтобы убедиться, что профиль указан верно'
                  : 'Click the link to verify the profile is correct'}
              </p>
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
