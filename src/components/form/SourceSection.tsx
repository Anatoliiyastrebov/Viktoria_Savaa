import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Megaphone } from 'lucide-react';

interface SourceSectionProps {
  source: string;
  recommender: string;
  error?: string;
  recommenderError?: string;
  onSourceChange: (value: string) => void;
  onRecommenderChange: (value: string) => void;
}

const SOURCE_OPTIONS = [
  { value: 'telegram', ru: 'Telegram', en: 'Telegram' },
  { value: 'instagram', ru: 'Instagram', en: 'Instagram' },
  { value: 'recommendation', ru: 'По рекомендации', en: 'By recommendation' },
] as const;

export const SourceSection: React.FC<SourceSectionProps> = ({
  source,
  recommender,
  error,
  recommenderError,
  onSourceChange,
  onRecommenderChange,
}) => {
  const { language } = useLanguage();
  const showRecommender = source === 'recommendation';

  return (
    <div className="card-wellness space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Megaphone className="w-5 h-5 text-primary" />
        {language === 'ru' ? 'Откуда вы узнали обо мне?' : 'Where did you hear about me?'}
      </h3>

      <div className="flex flex-wrap gap-3">
        {SOURCE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
              source === opt.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            <input
              type="radio"
              name="source"
              value={opt.value}
              checked={source === opt.value}
              onChange={(e) => onSourceChange(e.target.value)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{opt[language]}</span>
          </label>
        ))}
      </div>

      {showRecommender && (
        <div className="mt-4">
          <label className="text-sm text-muted-foreground mb-1 block">
            {language === 'ru' ? 'Кто порекомендовал? (имя или контакт)' : 'Who recommended? (name or contact)'}
            <span className="text-destructive ml-1">*</span>
          </label>
          <input
            type="text"
            className={`input-field ${recommenderError ? 'input-error' : ''}`}
            value={recommender}
            onChange={(e) => onRecommenderChange(e.target.value)}
            placeholder={language === 'ru' ? 'Имя или @username' : 'Name or @username'}
          />
          {recommenderError && (
            <p className="error-message mt-1">
              <AlertCircleIcon />
              {recommenderError}
            </p>
          )}
        </div>
      )}

      {error && (
        <p className="error-message">
          <AlertCircleIcon />
          {error}
        </p>
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
    className="inline-block mr-1 align-middle"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
