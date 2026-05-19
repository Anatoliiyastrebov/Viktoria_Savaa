import React, { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  type ActivityLevel,
  type CalorieFormula,
  type CalorieResults,
  type CalorieSex,
  calculateCalorieResults,
  formatKcal,
  validateCalorieInput,
} from '@/lib/calorie-calculator';
import { cn } from '@/lib/utils';
import {
  Activity,
  ChevronDown,
  Flame,
  Home,
  Info,
  Scale,
  TrendingDown,
  TrendingUp,
  Minus,
} from 'lucide-react';

const FORMULA_OPTIONS: { value: CalorieFormula; label: string }[] = [
  { value: 'mifflin', label: 'Миффлина-Сен Жеора' },
  { value: 'harris', label: 'Харриса-Бенедикта' },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Сидячий и малоподвижный' },
  {
    value: 'light',
    label: 'Легкая активность (физические нагрузки 1–3 раза в неделю)',
  },
  {
    value: 'moderate',
    label: 'Средняя активность (физические нагрузки 3–5 раз в неделю)',
  },
  {
    value: 'high',
    label: 'Высокая активность (физические нагрузки 6–7 раз в неделю)',
  },
  {
    value: 'very_high',
    label: 'Очень высокая активность (постоянно высокая физическая нагрузка)',
  },
];

const FORMULA_DIFF_TEXT = `Формулы Харриса-Бенедикта и Миффлина-Сен Жеора предлагают разные значения базового метаболического обмена (ПБМ) из-за различий в подходах к расчету и учете физиологических особенностей человека.

Харрис-Бенедикт, разработанный в 1919 году, использует упрощенные модели для расчета ПБМ. Для мужчин формула включает вес, рост и возраст, а для женщин — дополнительно учитывает пол. Однако она не учитывает такие параметры, как состав тела и уровень мышечной массы, что может приводить к менее точным результатам.

Формула Харриса-Бенедикта:

Для мужчин:
ПБМ = 88,36 + (13,4 × вес в кг) + (4,8 × рост в см) − (5,7 × возраст в годах)

Для женщин:
ПБМ = 447,6 + (9,2 × вес в кг) + (3,1 × рост в см) − (4,3 × возраст в годах)

Миффлин-Сен Жеор — более современная формула, предложенная в 1990 году. Она считается более точной для современных людей, поскольку лучше отражает текущие особенности обмена веществ.

Формула Миффлина-Сен Жеора:

Для мужчин:
ПБМ = (10 × вес в кг) + (6,25 × рост в см) − (5 × возраст в годах) + 5

Для женщин:
ПБМ = (10 × вес в кг) + (6,25 × рост в см) − (5 × возраст в годах) − 161

Обе формулы могут иметь погрешности, поскольку не учитывают индивидуальные особенности организма, уровень гормонов, скорость обмена веществ и другие физиологические факторы.

Рекомендуется пересчитывать показатели при изменении веса, уровня активности или образа жизни.`;

function SegmentedOption<T extends string>({
  name,
  value,
  options,
  onChange,
  className,
}: {
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className={cn('flex flex-wrap gap-2', className)}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
            value === opt.value
              ? 'border-primary bg-primary text-primary-foreground shadow-sm'
              : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent/50',
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function ResultsBlock({ results }: { results: CalorieResults }) {
  const cards = [
    {
      key: 'loss',
      title: 'Для сброса веса',
      subtitle: 'дефицит 15–20% от суточной нормы',
      value: `${formatKcal(results.weightLoss.min)} – ${formatKcal(results.weightLoss.max)}`,
      unit: 'ккал/день',
      icon: TrendingDown,
      accent: 'border-l-primary bg-primary/5',
      valueClass: 'text-primary',
    },
    {
      key: 'maintain',
      title: 'Для поддержания веса',
      subtitle: 'текущая суточная норма',
      value: formatKcal(results.maintenance),
      unit: 'ккал/день',
      icon: Minus,
      accent: 'border-l-[hsl(var(--success))] bg-[hsl(var(--success)/0.08)]',
      valueClass: 'text-[hsl(var(--success))]',
    },
    {
      key: 'gain',
      title: 'Для набора мышечной массы',
      subtitle: 'профицит 10–15% от суточной нормы',
      value: `${formatKcal(results.muscleGain.min)} – ${formatKcal(results.muscleGain.max)}`,
      unit: 'ккал/день',
      icon: TrendingUp,
      accent: 'border-l-accent-foreground/30 bg-accent/40',
      valueClass: 'text-accent-foreground',
    },
  ] as const;

  return (
    <section
      className="animate-slide-up space-y-6"
      aria-live="polite"
      aria-label="Результаты расчёта калорий"
    >
      <div className="rounded-2xl border border-border bg-muted/30 p-5 md:p-6 grid sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 shrink-0">
            <Flame className="w-5 h-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Базовый обмен веществ (ПБМ)</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {formatKcal(results.bmr)}{' '}
              <span className="text-base font-medium text-muted-foreground">ккал/день</span>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 shrink-0">
            <Activity className="w-5 h-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Суточная норма с учётом активности</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {formatKcal(results.tdee)}{' '}
              <span className="text-base font-medium text-muted-foreground">ккал/день</span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
        Ваша суточная норма калорий
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={card.key}
            className={cn(
              'rounded-2xl border border-border border-l-4 p-5 md:p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)]',
              card.accent,
              'animate-slide-up',
            )}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <card.icon className="w-5 h-5 text-muted-foreground mb-3" aria-hidden />
            <h3 className="text-base font-semibold text-foreground mb-1">{card.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{card.subtitle}</p>
            <p className={cn('text-3xl md:text-4xl font-bold tabular-nums leading-tight', card.valueClass)}>
              {card.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{card.unit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const CalorieCalculator: React.FC = () => {
  const { language } = useLanguage();
  const formId = useId();

  const [formula, setFormula] = useState<CalorieFormula>('mifflin');
  const [sex, setSex] = useState<CalorieSex>('female');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);
  const [results, setResults] = useState<CalorieResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Калькулятор суточной нормы калорий — Виктория Савая';
    const meta = document.querySelector('meta[name="description"]');
    const description =
      'Рассчитайте ПБМ и суточную норму калорий по формулам Миффлина-Сен Жеора и Харриса-Бенедикта. Планирование питания для похудения, поддержания веса и набора массы.';
    if (meta) meta.setAttribute('content', description);
    return () => {
      document.title = 'Анкета по здоровью — Виктория Савая';
    };
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      formula,
      sex,
      age: Number(age),
      weightKg: Number(weight),
      heightCm: Number(height),
      activity,
    };
    const validationError = validateCalorieInput(input);
    if (validationError) {
      setError(validationError);
      setResults(null);
      return;
    }
    setError(null);
    setResults(calculateCalorieResults(input));
    requestAnimationFrame(() => {
      document.getElementById('calorie-results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const backLabel = language === 'ru' ? 'На главную' : 'Back to home';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link
          to={`/?lang=${language}`}
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-6"
        >
          <Home className="w-4 h-4" aria-hidden />
          {backLabel}
        </Link>

        <header className="text-center mb-10 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-4">
            <Scale className="w-4 h-4" aria-hidden />
            Wellness-инструмент
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Калькулятор суточной нормы калорий
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Калькулятор калорий — это удобный инструмент для планирования питания и достижения ваших
            целей в области здорового образа жизни. Используйте его для определения оптимального
            количества калорий и контроля питания, чтобы ваше тело получало все необходимое для
            здоровья и хорошего самочувствия.
          </p>
        </header>

        <div
          className="rounded-[1.25rem] bg-card p-6 md:p-8 shadow-[var(--shadow-card)] border border-border/60 mb-10 md:mb-14"
          aria-labelledby={`${formId}-title`}
        >
          <h2 id={`${formId}-title`} className="sr-only">
            Форма калькулятора калорий
          </h2>

          <form onSubmit={handleCalculate} className="space-y-8" noValidate>
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-foreground mb-1">Расчет по формуле</legend>
              <SegmentedOption
                name="formula"
                value={formula}
                options={FORMULA_OPTIONS}
                onChange={setFormula}
              />
              <Collapsible open={showFormulaInfo} onOpenChange={setShowFormulaInfo}>
                <CollapsibleTrigger
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  aria-expanded={showFormulaInfo}
                >
                  <Info className="w-4 h-4" aria-hidden />
                  В чем разница?
                  <ChevronDown
                    className={cn('w-4 h-4 transition-transform', showFormulaInfo && 'rotate-180')}
                    aria-hidden
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="mt-4 rounded-xl bg-muted/40 border border-border p-4 md:p-5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {FORMULA_DIFF_TEXT}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-foreground">Ваш пол</legend>
              <SegmentedOption
                name="sex"
                value={sex}
                options={[
                  { value: 'male', label: 'Мужской' },
                  { value: 'female', label: 'Женский' },
                ]}
                onChange={setSex}
              />
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="cal-age" className="text-sm font-semibold text-foreground mb-2 block">
                  Возраст
                </label>
                <input
                  id="cal-age"
                  type="number"
                  inputMode="numeric"
                  min={14}
                  max={100}
                  required
                  placeholder="--- лет"
                  className={cn('input-field', error && !age && 'input-error')}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  aria-describedby={error ? 'cal-error' : undefined}
                />
              </div>
              <div>
                <label htmlFor="cal-weight" className="text-sm font-semibold text-foreground mb-2 block">
                  Вес
                </label>
                <input
                  id="cal-weight"
                  type="number"
                  inputMode="decimal"
                  min={30}
                  max={300}
                  step={0.1}
                  required
                  placeholder="--- кг"
                  className={cn('input-field', error && !weight && 'input-error')}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cal-height" className="text-sm font-semibold text-foreground mb-2 block">
                  Рост
                </label>
                <input
                  id="cal-height"
                  type="number"
                  inputMode="numeric"
                  min={120}
                  max={250}
                  required
                  placeholder="--- см"
                  className={cn('input-field', error && !height && 'input-error')}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-foreground">Образ жизни</legend>
              <div className="space-y-2" role="radiogroup" aria-label="Уровень активности">
                {ACTIVITY_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex items-start gap-3 cursor-pointer rounded-xl border px-4 py-3.5 transition-all',
                      activity === opt.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border bg-background hover:border-primary/30 hover:bg-accent/30',
                    )}
                  >
                    <input
                      type="radio"
                      name="activity"
                      value={opt.value}
                      checked={activity === opt.value}
                      onChange={() => setActivity(opt.value)}
                      className="radio-custom mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-foreground leading-snug">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && (
              <p id="cal-error" className="error-message" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full text-base py-4 rounded-2xl">
              Рассчитать
            </button>
          </form>
        </div>

        {results && (
          <div id="calorie-results" className="mb-14 md:mb-16">
            <ResultsBlock results={results} />
          </div>
        )}

        <article className="space-y-8 mb-14 md:mb-16 animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground">Как рассчитывается суточная норма калорий</h2>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Что такое ПБМ</h3>
            <p className="text-muted-foreground leading-relaxed">
              ПБМ (базовый метаболизм, или базовый обмен веществ) — это количество энергии, которое
              организм тратит в состоянии покоя для поддержания жизненно важных функций: дыхания,
              кровообращения, работы мозга, терморегуляции и обновления клеток. Это минимум калорий,
              необходимый вашему телу без учёта физической активности.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Две формулы расчёта</h3>
            <p className="text-muted-foreground leading-relaxed">
              Калькулятор поддерживает формулы Харриса-Бенедикта и Миффлина-Сен Жеора. Первая
              исторически значима и широко применяется в клинической практике; вторая чаще
              рекомендуется для современного населения, так как учитывает актуальные данные об
              обмене веществ. Результаты могут отличаться на 5–15% — это нормально.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Уровень активности</h3>
            <p className="text-muted-foreground leading-relaxed">
              После расчёта ПБМ суточная норма умножается на коэффициент активности (от 1,2 для
              малоподвижного образа жизни до 1,9 при очень высокой нагрузке). Честная оценка
              активности критична: завышение приводит к избытку калорий и отсутствию прогресса при
              похудении, занижение — к недостатку энергии и срывам.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Погрешности и пересчёт</h3>
            <p className="text-muted-foreground leading-relaxed">
              Любой расчёт — ориентир, а не диагноз. Формулы не учитывают состав тела, гормональный
              фон, лекарства, сон и стресс. Рекомендуется пересчитывать норму при изменении веса на
              3–5 кг, смене режима тренировок или образа жизни, а также каждые 4–6 недель при
              активной работе над весом.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-muted/25 p-5 md:p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Сравнение формул</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {FORMULA_DIFF_TEXT}
            </p>
          </section>
        </article>

        <section className="card-wellness hover:transform-none hover:shadow-[var(--shadow-card)]">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Вопросы и ответы</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pbm">
              <AccordionTrigger>Что такое ПБМ?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                ПБМ (базальный метаболизм) — энергия, которую организм расходует в покое на
                поддержание жизни. Это «базовый тариф» калорий без учёта ходьбы, тренировок и быта.
                На его основе рассчитывается полная суточная норма с учётом активности.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="formula">
              <AccordionTrigger>Какую формулу лучше выбрать?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Для большинства людей сегодня предпочтительна формула Миффлина-Сен Жеора — она
                опирается на более свежие данные. Формула Харриса-Бенедикта уместна для сравнения и
                в классических протоколах. Выберите одну формулу и ориентируйтесь на динамику веса и
                самочувствие 2–3 недели.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="diff">
              <AccordionTrigger>Почему результаты отличаются?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Формулы используют разные коэффициенты и были созданы в разные эпохи на разных
                выборках. Разница в ПБМ и суточной норме обычно составляет несколько процентов. Это
                не ошибка калькулятора, а отражение биологической вариабельности.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="loss">
              <AccordionTrigger>Как рассчитать калории для похудения?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                После получения суточной нормы (поддержание) создайте дефицит 15–20% — калькулятор
                показывает этот диапазон в карточке «Для сброса веса». Резкие ограничения ниже 1200
                ккал для женщин и 1500 ккал для мужчин без наблюдения специалиста не рекомендуются.
                Следите за белком, сном и регулярностью питания.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CalorieCalculator;
