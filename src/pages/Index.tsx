import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Sparkles, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const TELEGRAM_CHANNEL_URL = 'https://t.me/beautifulyuo';
const MAX_GROUP_URL = 'https://max.ru/join/0Tw3VcMu3cABmFG1IQryGKVmidiv6PwKRbdzpoHeKoY';

const MaxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span
    aria-hidden
    className={cn(
      'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md bg-[#258cfb] px-1 text-[10px] font-bold leading-none text-white',
      className,
    )}
  >
    MAX
  </span>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const Index: React.FC = () => {
  const { t, language } = useLanguage();

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

        <section className="max-w-2xl mx-auto mt-12 animate-fade-in">
          <Link
            to={`/kalkulyator-kalorij?lang=${language}`}
            className="group flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-border bg-card p-6 md:p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] hover:border-primary/40 transition-all"
          >
            <div className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
              <Calculator className="w-8 h-8" aria-hidden />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {language === 'ru' ? 'Калькулятор суточной нормы калорий' : 'Daily calorie calculator'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {language === 'ru'
                  ? 'Рассчитайте ПБМ и калории для похудения, поддержания веса или набора массы'
                  : 'Calculate BMR and calories for weight loss, maintenance, or muscle gain'}
              </p>
            </div>
            <span className="text-sm font-medium text-primary shrink-0">
              {language === 'ru' ? 'Открыть →' : 'Open →'}
            </span>
          </Link>
        </section>

        <section className="max-w-2xl mx-auto mt-10 mb-4 animate-fade-in" aria-labelledby="channel-invite-heading">
          <div className="rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-card via-card to-primary/[0.06] p-6 md:p-8 shadow-[var(--shadow-card)] text-center space-y-5">
            <h2 id="channel-invite-heading" className="text-lg md:text-xl font-semibold text-foreground leading-snug">
              {t('channelInviteLead')}
            </h2>
            <div className="space-y-3 text-muted-foreground text-base md:text-lg leading-relaxed text-left max-w-xl mx-auto">
              <p>{t('channelInviteBody1')}</p>
              <p>{t('channelInviteBody2')}</p>
            </div>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base"
            >
              <TelegramIcon className="w-5 h-5" />
              {t('channelJoinButton')}
            </a>
          </div>
        </section>

        <section
          className="max-w-2xl mx-auto mt-6 mb-4 animate-fade-in"
          aria-labelledby="max-group-invite-heading"
        >
          <div className="rounded-2xl border-2 border-[#258cfb]/30 bg-gradient-to-br from-card via-card to-[#258cfb]/[0.06] p-6 md:p-8 shadow-[var(--shadow-card)] text-center space-y-5">
            <h2
              id="max-group-invite-heading"
              className="text-lg md:text-xl font-semibold text-foreground leading-snug"
            >
              {t('maxInviteLead')}
            </h2>
            <div className="space-y-3 text-muted-foreground text-base md:text-lg leading-relaxed text-left max-w-xl mx-auto">
              <p>{t('maxInviteBody1')}</p>
              <p>{t('maxInviteBody2')}</p>
            </div>
            <a
              href={MAX_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-medium text-white bg-[#258cfb] hover:bg-[#1f7ae0] transition-colors"
            >
              <MaxIcon />
              {t('maxJoinButton')}
            </a>
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
