import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#logoBg)"/>
    <path d="M50 18 C30 18 18 35 18 50 C18 70 35 82 50 82 C55 72 58 60 58 50 C58 35 55 25 50 18Z" fill="white" opacity="0.9"/>
    <path d="M50 18 C70 18 82 35 82 50 C82 70 65 82 50 82" fill="none" stroke="white" strokeWidth="3" opacity="0.4"/>
    <path d="M25 52 L40 52 L44 40 L50 62 L56 42 L60 52 L75 52" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
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
