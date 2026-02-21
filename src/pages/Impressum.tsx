import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

const Impressum: React.FC = () => {
  const { language } = useLanguage();

  const content: Record<Language, {
    title: string;
    backToHome: string;
    consultant: string;
    dataTitle: string;
    dataText: string;
  }> = {
    ru: {
      title: 'Политика конфиденциальности',
      backToHome: 'Вернуться на главную',
      consultant: 'Виктория Савая — владелец сайта',
      dataTitle: 'Обработка данных',
      dataText: 'Данные, указанные в анкете, не хранятся на сервере и не сохраняются в базе данных. Вся информация отправляется напрямую в Telegram-чат консультанта и нигде больше не обрабатывается и не накапливается.',
    },
    en: {
      title: 'Privacy Policy',
      backToHome: 'Back to home',
      consultant: 'Viktoria Savaa — site owner',
      dataTitle: 'Data Processing',
      dataText: 'The data provided in the questionnaire is not stored on a server or saved in any database. All information is sent directly to the consultant\'s Telegram chat and is not processed or accumulated anywhere else.',
    },
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Home className="w-4 h-4" />
            {c.backToHome}
          </Link>
        </div>

        <div className="card-wellness space-y-6">
          <h1 className="text-3xl font-bold text-foreground">{c.title}</h1>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h3 className="font-semibold mb-2">{c.consultant}</h3>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{c.dataTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {c.dataText}
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;

