import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

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
