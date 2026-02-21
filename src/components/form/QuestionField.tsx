import React from 'react';
import { Question } from '@/lib/questionnaire-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionIcon } from '@/components/icons/SectionIcons';

interface QuestionFieldProps {
  question: Question;
  value: string | string[];
  additionalValue: string;
  error?: string;
  additionalError?: string;
  onChange: (value: string | string[]) => void;
  onAdditionalChange: (value: string) => void;
}

export const QuestionField: React.FC<QuestionFieldProps> = ({
  question,
  value,
  additionalValue,
  error,
  additionalError,
  onChange,
  onAdditionalChange,
}) => {
  const { language, t } = useLanguage();

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    
    // Общая обработка "no_issues": взаимоисключающий вариант "всё в порядке"
    if (optionValue === 'no_issues') {
      if (checked) {
        onChange(['no_issues']);
      } else {
        onChange([]);
      }
      return;
    }

    // COVID: вариант "нет" не может сочетаться с остальными
    if (question.id === 'covid_status') {
      if (optionValue === 'no') {
        if (checked) {
          onChange(['no']);
        } else {
          onChange([]);
        }
        return;
      } else if (checked) {
        const filteredValues = currentValues.filter((v) => v !== 'no');
        onChange([...filteredValues, optionValue]);
        return;
      }
    }

    if (question.id === 'illness_antibiotics') {
      // Special handling for illness_antibiotics: rarely_ill and often_ill are mutually exclusive
      if (optionValue === 'rarely_ill' && checked) {
        const filteredValues = currentValues.filter((v) => v !== 'often_ill');
        onChange([...filteredValues, optionValue]);
      } else if (optionValue === 'often_ill' && checked) {
        const filteredValues = currentValues.filter((v) => v !== 'rarely_ill');
        onChange([...filteredValues, optionValue]);
      } else {
        if (checked) {
          onChange([...currentValues, optionValue]);
        } else {
          onChange(currentValues.filter((v) => v !== optionValue));
        }
      }
    } else {
      // For other options: убираем "no_issues", если он был выбран
      if (checked) {
        const filteredValues = currentValues.filter((v) => v !== 'no_issues');
        onChange([...filteredValues, optionValue]);
      } else {
        onChange(currentValues.filter((v) => v !== optionValue));
      }
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            className={`input-field ${error ? 'input-error' : ''}`}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder?.[language] || ''}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            className={`input-field ${error ? 'input-error' : ''}`}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            min="0"
            step="0.1"
          />
        );

      case 'textarea':
        return (
          <textarea
            className={`input-field min-h-[100px] resize-y ${error ? 'input-error' : ''}`}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder?.[language] || ''}
          />
        );

      case 'radio':
        return (
          <div className="flex flex-wrap gap-3">
            {question.options?.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                  value === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option.label[language]}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const currentValues = Array.isArray(value) ? value : [];
        return (
          <div className="flex flex-wrap gap-3">
            {question.options?.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                  currentValues.includes(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={currentValues.includes(option.value)}
                  onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option.label[language]}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Check if additional field should be shown
  const hasOtherSelected = () => {
    if (question.type === 'checkbox') {
      const currentValues = Array.isArray(value) ? value : [];
      if (question.id === 'injuries') {
        return currentValues.some((val: string) => val !== 'no_issues');
      }
      if (question.id === 'illness_antibiotics') {
        return currentValues.includes('took_antibiotics') || currentValues.includes('took_other_medications');
      }
      if (question.id === 'weight_satisfaction') {
        return currentValues.includes('want_to_lose') || currentValues.includes('want_to_gain') || currentValues.includes('other');
      }
      if (question.id === 'stones') {
        return currentValues.includes('stones_kidneys') || currentValues.includes('stones_gallbladder') || currentValues.includes('both') || currentValues.includes('other');
      }
      if (question.id === 'operations_injuries') {
        return currentValues.includes('operations') || currentValues.includes('organ_removed') || currentValues.includes('injuries') || currentValues.includes('other');
      }
      if (question.id === 'pressure') {
        return currentValues.includes('high') || currentValues.includes('other');
      }
      if (question.id === 'cysts_polyps') {
        return currentValues.some((v: string) => ['cysts', 'polyps', 'fibroids', 'tumors', 'hernias'].includes(v)) || currentValues.includes('other');
      }
      return currentValues.includes('other');
    } else if (question.type === 'radio') {
      // Special case: medications, what_else, main_concern, and pregnancy_problems questions show field when "yes" is selected
      if (question.id === 'medications' || question.id === 'what_else' || question.id === 'main_concern' || question.id === 'pregnancy_problems') {
        return value === 'yes';
      }
      return value === 'other';
    }
    return false;
  };

  const showOtherField = hasOtherSelected();
  const currentValuesForLabel = question.type === 'checkbox' ? (Array.isArray(value) ? value : []) : [];
  const useGenericOtherLabel = (qId: string) => {
    if (qId === 'weight_satisfaction') return !currentValuesForLabel.includes('want_to_lose') && !currentValuesForLabel.includes('want_to_gain');
    if (qId === 'stones') return !currentValuesForLabel.includes('stones_kidneys') && !currentValuesForLabel.includes('stones_gallbladder') && !currentValuesForLabel.includes('both');
    if (qId === 'operations_injuries') return !currentValuesForLabel.includes('operations') && !currentValuesForLabel.includes('organ_removed') && !currentValuesForLabel.includes('injuries');
    if (qId === 'pressure') return !currentValuesForLabel.includes('high');
    if (qId === 'cysts_polyps') return !currentValuesForLabel.some((v: string) => ['cysts', 'polyps', 'fibroids', 'tumors', 'hernias'].includes(v));
    return false;
  };

  return (
    <div className="space-y-3 animate-fade-in">
      <label className="flex items-center gap-2 text-foreground font-medium">
        <SectionIcon name={question.icon} />
        <span>{question.label[language]}</span>
        {question.required && <span className="text-destructive">*</span>}
      </label>

      {renderInput()}

      {error && (
        <p className="error-message">
          <AlertCircleIcon />
          {error}
        </p>
      )}

      {showOtherField && (
        <div className="mt-2">
          <label className="text-sm text-muted-foreground mb-1 block">
            {question.id === 'medications'
              ? (language === 'ru' ? 'Укажите, какие лекарства' : 'Specify which medications')
              : question.id === 'what_else'
              ? (language === 'ru' ? 'Что именно вы хотели бы добавить' : 'What would you like to add')
              : question.id === 'pregnancy_problems'
              ? (language === 'ru' ? 'Опишите проблемы' : 'Describe problems')
              : question.id === 'injuries'
              ? (language === 'ru' ? 'Опишите подробнее' : 'Describe in detail')
              : question.id === 'illness_antibiotics'
              ? (language === 'ru' ? 'Укажите названия лекарств' : 'Specify the names of medications')
              : question.id === 'weight_satisfaction' && !useGenericOtherLabel('weight_satisfaction')
              ? (language === 'ru' ? 'Сколько хотите сбросить или набрать (кг)?' : 'How much to lose or gain (kg)?')
              : question.id === 'stones' && !useGenericOtherLabel('stones')
              ? (language === 'ru' ? 'Размер камней (если известен)' : 'Stone size (if known)')
              : question.id === 'operations_injuries' && !useGenericOtherLabel('operations_injuries')
              ? (language === 'ru' ? 'Опишите операции, удалённые органы и травмы' : 'Describe operations, removed organs and injuries')
              : question.id === 'pressure' && !useGenericOtherLabel('pressure')
              ? (language === 'ru' ? 'Какие лекарства принимаете и как долго?' : 'Which medications and for how long?')
              : question.id === 'cysts_polyps' && !useGenericOtherLabel('cysts_polyps')
              ? (language === 'ru' ? 'Подробности (размер, локализация)' : 'Details (size, location)')
              : (t('otherDetails') || 'Уточните, что именно')}
            {additionalError && <span className="text-destructive ml-1">*</span>}
          </label>
          <textarea
            className={`input-field text-sm min-h-[60px] resize-y ${additionalError ? 'input-error' : ''}`}
            value={additionalValue}
            onChange={(e) => onAdditionalChange(e.target.value)}
            placeholder={question.id === 'weight_satisfaction' && !useGenericOtherLabel('weight_satisfaction')
              ? (language === 'ru' ? 'Например: 5 кг' : 'E.g. 5 kg')
              : question.id === 'stones' && !useGenericOtherLabel('stones')
              ? (language === 'ru' ? 'Например: 3 мм' : 'E.g. 3 mm')
              : question.id === 'operations_injuries' && !useGenericOtherLabel('operations_injuries')
              ? (language === 'ru' ? 'Операции, удалённые органы, травмы' : 'Operations, removed organs, injuries')
              : question.id === 'pressure' && !useGenericOtherLabel('pressure')
              ? (language === 'ru' ? 'Название препарата, срок приёма' : 'Medication name, duration')
              : question.id === 'cysts_polyps' && !useGenericOtherLabel('cysts_polyps')
              ? (language === 'ru' ? 'Размер, где расположено' : 'Size, location')
              : question.id === 'medications'
              ? (language === 'ru' ? 'Название лекарств' : 'Medication names')
              : question.id === 'what_else'
              ? (language === 'ru' ? 'Дополнительная информация' : 'Additional information')
              : question.id === 'pregnancy_problems'
              ? (language === 'ru' ? 'Опишите проблемы' : 'Describe problems')
              : question.id === 'injuries'
              ? (language === 'ru' ? 'Травмы, операции и т.д.' : 'Injuries, surgeries, etc.')
              : question.id === 'illness_antibiotics'
              ? (language === 'ru' ? 'Антибиотики или другие лекарства' : 'Antibiotics or other medications')
              : (t('otherDetails') || 'Опишите подробно')}
          />
          {additionalError && (
            <p className="error-message mt-1">
              <AlertCircleIcon />
              {additionalError}
            </p>
          )}
        </div>
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
