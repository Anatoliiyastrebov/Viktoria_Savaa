import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#1d4ed8"/>
      </linearGradient>
      <linearGradient id="logoShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="22" fill="url(#logoBg)"/>
    <rect x="4" y="4" width="92" height="46" rx="22" fill="url(#logoShine)"/>
    <path d="M30 28 L50 72 L70 28" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 56 L32 56 L37 46 L43 64 L49 48 L53 56 L80 56" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
  </svg>
);

export const Header: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to={`/?lang=${language}`} 
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <Logo className="w-10 h-10" />
          <span className="font-semibold text-lg hidden sm:block">
            {t('siteTitle')}
          </span>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
