import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, ExternalLink } from 'lucide-react';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/50 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t('welcome')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('siteTitle')}
          </h1>
          
          <div className="mb-6 p-6 bg-gradient-to-br from-accent/40 to-accent/20 rounded-xl border border-primary/20 max-w-2xl mx-auto shadow-sm text-center">
            <p className="text-base md:text-lg text-foreground mb-4 leading-relaxed">
              {t('questionnaireInstruction')}
            </p>
            <p className="text-base md:text-lg font-medium text-primary italic">
              {t('consultantSignature')}
            </p>
          </div>

          <a
            href="https://t.me/beautifulyuo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium border border-primary/20 hover:border-transparent"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            КРАСОТА И УХОД
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        {/* Categories Section */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              type="infant"
              title={t('infantTitle')}
              description={t('infantDescription')}
            />
            <CategoryCard
              type="child"
              title={t('childTitle')}
              description={t('childDescription')}
            />
            <CategoryCard
              type="woman"
              title={t('womanTitle')}
              description={t('womanDescription')}
            />
            <CategoryCard
              type="man"
              title={t('manTitle')}
              description={t('manDescription')}
            />
          </div>
        </section>

        {/* Decorative elements */}
        <div className="fixed top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
        <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
