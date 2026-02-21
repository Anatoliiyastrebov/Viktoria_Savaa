import { Language } from './translations';

export type QuestionType = 'text' | 'number' | 'radio' | 'checkbox' | 'textarea';

export interface QuestionOption {
  value: string;
  label: {
    ru: string;
    en: string;
  };
}

export interface Question {
  id: string;
  type: QuestionType;
  label: {
    ru: string;
    en: string;
  };
  icon: string;
  options?: QuestionOption[];
  required: boolean;
  hasAdditional: boolean;
  placeholder?: {
    ru: string;
    en: string;
  };
}

export interface QuestionnaireSection {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  icon: string;
  questions: Question[];
}

// Common options used across questionnaires
const yesNoOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Все в порядке', en: 'All good' } },
  { value: 'yes', label: { ru: 'Да', en: 'Yes' } },
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
];

const yesNoOptionsSimple: QuestionOption[] = [
  { value: 'yes', label: { ru: 'Да', en: 'Yes' } },
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
];

const digestionOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Все в порядке', en: 'All good' } },
  { value: 'stomach_pain', label: { ru: 'Боли в животе', en: 'Stomach pain' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const digestionOptionsExtended: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Все в порядке', en: 'All good' } },
  { value: 'stomach_pain', label: { ru: 'Боли в животе', en: 'Stomach pain' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation' } },
  { value: 'bloating', label: { ru: 'Вздутие', en: 'Bloating' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const digestionOptionsAdult: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Все в порядке', en: 'All good' } },
  { value: 'heartburn', label: { ru: 'Изжога', en: 'Heartburn' } },
  { value: 'bloating', label: { ru: 'Вздутие', en: 'Bloating' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const digestionOptionsMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'heartburn', label: { ru: 'Изжога', en: 'Heartburn' } },
  { value: 'bitter_taste', label: { ru: 'Горечь во рту', en: 'Bitter taste in mouth' } },
  { value: 'bloating', label: { ru: 'Вздутие', en: 'Bloating' } },
  { value: 'heaviness', label: { ru: 'Тяжесть в желудке', en: 'Heaviness in stomach' } },
  { value: 'gas', label: { ru: 'Газы', en: 'Gas' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation' } },
  { value: 'pancreatitis', label: { ru: 'Панкреатит', en: 'Pancreatitis' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const hairOptionsMan: QuestionOption[] = [
  { value: 'satisfied', label: { ru: 'Доволен качеством', en: 'Satisfied with quality' } },
  { value: 'aggressive_fallout', label: { ru: 'Агрессивно выпадают', en: 'Aggressively falling out' } },
  { value: 'dry', label: { ru: 'Сухие', en: 'Dry' } },
  { value: 'oily', label: { ru: 'Жирные', en: 'Oily' } },
  { value: 'brittle', label: { ru: 'Ломкие', en: 'Brittle' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const varicoseHemorrhoidsManOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'varicose_network', label: { ru: 'Варикоз (сеточка)', en: 'Varicose veins (network)' } },
  { value: 'varicose_pronounced', label: { ru: 'Варикоз (выраженные вены)', en: 'Varicose veins (pronounced)' } },
  { value: 'hemorrhoids_no_bleeding', label: { ru: 'Геморрой (не кровоточит)', en: 'Hemorrhoids (no bleeding)' } },
  { value: 'hemorrhoids_bleeding', label: { ru: 'Геморрой (кровоточит)', en: 'Hemorrhoids (bleeding)' } },
  { value: 'pigment_spots', label: { ru: 'Пигментные пятна', en: 'Pigment spots' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const jointOptionsMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'squeak', label: { ru: 'Скрипят', en: 'Squeak' } },
  { value: 'crunch', label: { ru: 'Хрустят', en: 'Crunch' } },
  { value: 'inflammation', label: { ru: 'Воспаляются', en: 'Inflammation' } },
  { value: 'arthrosis_stage1', label: { ru: 'Артроз (1 стадия)', en: 'Arthrosis (stage 1)' } },
  { value: 'arthrosis_stage2', label: { ru: 'Артроз (2 стадия)', en: 'Arthrosis (stage 2)' } },
  { value: 'arthrosis_stage3', label: { ru: 'Артроз (3 стадия)', en: 'Arthrosis (stage 3)' } },
  { value: 'back_pain', label: { ru: 'Боли в спине', en: 'Back pain' } },
  { value: 'lower_back_pain', label: { ru: 'Боли в пояснице', en: 'Lower back pain' } },
  { value: 'knee_pain', label: { ru: 'Боли в коленях', en: 'Knee pain' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const lifestyleOptions: QuestionOption[] = [
  { value: 'sedentary', label: { ru: 'Сидячий', en: 'Sedentary' } },
  { value: 'regular_sport', label: { ru: 'Регулярно занимаетесь спортом', en: 'Regular sports' } },
  { value: 'home_exercise', label: { ru: 'Делаете дома гимнастику', en: 'Home exercise' } },
  { value: 'cold_water', label: { ru: 'Обливаетесь холодной водой', en: 'Cold water dousing' } },
  { value: 'stressful_work', label: { ru: 'Работаете в стрессовых условиях', en: 'Stressful work conditions' } },
  { value: 'physical_work', label: { ru: 'Работа связана с физическими нагрузками', en: 'Physical work' } },
  { value: 'toxic_substances', label: { ru: 'Вдыхаете токсичные вещества на работе', en: 'Inhale toxic substances at work' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const headachesOptionsMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'headaches', label: { ru: 'Головные боли', en: 'Headaches' } },
  { value: 'migraines', label: { ru: 'Мигрени', en: 'Migraines' } },
  { value: 'weather_dependent', label: { ru: 'Метеозависимость', en: 'Weather dependent' } },
  { value: 'concussion', label: { ru: 'Сотрясение мозга', en: 'Concussion' } },
  { value: 'head_trauma', label: { ru: 'Удары по голове', en: 'Head trauma' } },
  { value: 'tinnitus', label: { ru: 'Шум в ушах', en: 'Tinnitus' } },
  { value: 'floaters', label: { ru: 'Мушки перед глазами', en: 'Floaters' } },
  { value: 'dizziness', label: { ru: 'Головокружения', en: 'Dizziness' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const covidComplicationsOptions: QuestionOption[] = [
  { value: 'no_complications', label: { ru: 'Нет осложнений', en: 'No complications' } },
  { value: 'hair_loss', label: { ru: 'Выпадение волос', en: 'Hair loss' } },
  { value: 'heart_problems', label: { ru: 'Проблемы сердца', en: 'Heart problems' } },
  { value: 'joint_problems', label: { ru: 'Суставы', en: 'Joint problems' } },
  { value: 'memory_loss', label: { ru: 'Потеря памяти', en: 'Memory loss' } },
  { value: 'panic_attacks', label: { ru: 'Панические атаки', en: 'Panic attacks' } },
  { value: 'poor_sleep', label: { ru: 'Ухудшение сна', en: 'Poor sleep' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const skinIssuesManOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'acne', label: { ru: 'Прыщи', en: 'Acne' } },
  { value: 'furuncles', label: { ru: 'Фурункулы', en: 'Furuncles' } },
  { value: 'irritation', label: { ru: 'Раздражение', en: 'Irritation' } },
  { value: 'rosacea', label: { ru: 'Розацеа', en: 'Rosacea' } },
  { value: 'psoriasis', label: { ru: 'Псориаз', en: 'Psoriasis' } },
  { value: 'dermatitis', label: { ru: 'Дерматит', en: 'Dermatitis' } },
  { value: 'eczema', label: { ru: 'Экзема', en: 'Eczema' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const skinVirusesManOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'herpes', label: { ru: 'Герпес', en: 'Herpes' } },
  { value: 'papillomas', label: { ru: 'Папилломы', en: 'Papillomas' } },
  { value: 'moles', label: { ru: 'Родинки', en: 'Moles' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts' } },
  { value: 'red_spots', label: { ru: 'Красные точечки на коже', en: 'Red spots on skin' } },
  { value: 'discharge', label: { ru: 'Выделения', en: 'Discharge' } },
  { value: 'cystitis', label: { ru: 'Цистит', en: 'Cystitis' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const allergyOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'pollen', label: { ru: 'Цветение', en: 'Pollen' } },
  { value: 'animals', label: { ru: 'Животные', en: 'Animals' } },
  { value: 'dust', label: { ru: 'Пыль', en: 'Dust' } },
  { value: 'food', label: { ru: 'Еда', en: 'Food' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const allergyOptionsExtended: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'pollen', label: { ru: 'Цветение', en: 'Pollen' } },
  { value: 'animals', label: { ru: 'Животные', en: 'Animals' } },
  { value: 'dust', label: { ru: 'Пыль', en: 'Dust' } },
  { value: 'food', label: { ru: 'Еда', en: 'Food' } },
  { value: 'medications', label: { ru: 'Лекарства', en: 'Medications' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const skinOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'moles', label: { ru: 'Много родинок', en: 'Many moles' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts' } },
  { value: 'rashes', label: { ru: 'Высыпания', en: 'Rashes' } },
  { value: 'eczema', label: { ru: 'Экзема', en: 'Eczema' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const sleepOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'good', label: { ru: 'Хорошо', en: 'Good' } },
  { value: 'bad', label: { ru: 'Плохо', en: 'Bad' } },
  { value: 'sometimes', label: { ru: 'Иногда проблемы', en: 'Sometimes problems' } },
];

const sleepOptionsSimple: QuestionOption[] = [
  { value: 'good', label: { ru: 'Хорошо', en: 'Good' } },
  { value: 'bad', label: { ru: 'Плохо', en: 'Bad' } },
  { value: 'sometimes', label: { ru: 'Иногда проблемы', en: 'Sometimes problems' } },
];

const energyOptions: QuestionOption[] = [
  { value: 'normal', label: { ru: 'Нормальная', en: 'Normal' } },
  { value: 'reduced', label: { ru: 'Сниженная', en: 'Reduced' } },
  { value: 'very_low', label: { ru: 'Очень низкая', en: 'Very low' } },
];

const birthOptions: QuestionOption[] = [
  { value: 'natural', label: { ru: 'Естественно', en: 'Natural' } },
  { value: 'cesarean', label: { ru: 'Кесарево', en: 'Cesarean' } },
];

const injuriesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Все в порядке', en: 'All is well' } },
  { value: 'injuries', label: { ru: 'Травмы', en: 'Injuries' } },
  { value: 'surgeries', label: { ru: 'Операции', en: 'Surgeries' } },
  { value: 'head_trauma', label: { ru: 'Удары по голове', en: 'Head trauma' } },
  { value: 'fractures', label: { ru: 'Переломы', en: 'Fractures' } },
  { value: 'severe_falls', label: { ru: 'Сильные падения', en: 'Severe falls' } },
];

const covidOptionsWoman: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'had_covid', label: { ru: 'Болела', en: 'Had COVID' } },
  { value: 'vaccinated', label: { ru: 'Вакцинирована', en: 'Vaccinated' } },
  { value: 'both', label: { ru: 'И болела, и вакцинирована', en: 'Both had COVID and vaccinated' } },
];

const covidOptionsMan: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'had_covid', label: { ru: 'Болел', en: 'Had COVID' } },
  { value: 'vaccinated', label: { ru: 'Вакцинирован', en: 'Vaccinated' } },
  { value: 'both', label: { ru: 'И болел, и вакцинирован', en: 'Both had COVID and vaccinated' } },
];

const teethOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'crumble', label: { ru: 'Крошатся', en: 'Crumble' } },
  { value: 'decay_fast', label: { ru: 'Часто портятся', en: 'Decay often' } },
  { value: 'bad_breath', label: { ru: 'Запах изо рта', en: 'Bad breath' } },
  { value: 'bleeding_gums', label: { ru: 'Кровоточивость', en: 'Bleeding gums' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const jointOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'crunch', label: { ru: 'Хруст', en: 'Crunching' } },
  { value: 'squeak', label: { ru: 'Скрип', en: 'Squeaking' } },
  { value: 'inflammation', label: { ru: 'Воспаление', en: 'Inflammation' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const hairOptions: QuestionOption[] = [
  { value: 'falling', label: { ru: 'Выпадают', en: 'Falling out' } },
  { value: 'split', label: { ru: 'Секутся', en: 'Split ends' } },
  { value: 'dry', label: { ru: 'Сухие', en: 'Dry' } },
  { value: 'ok', label: { ru: 'В порядке', en: 'Normal' } },
];

const skinConditionOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'dry', label: { ru: 'Сухая', en: 'Dry' } },
  { value: 'rashes', label: { ru: 'Высыпания', en: 'Rashes' } },
  { value: 'irritation', label: { ru: 'Раздражение', en: 'Irritation' } },
  { value: 'acne', label: { ru: 'Прыщи', en: 'Acne' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const molesWartsHerpesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'moles', label: { ru: 'Родинки', en: 'Moles' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts' } },
  { value: 'herpes', label: { ru: 'Герпес', en: 'Herpes' } },
];

const dischargeMolesWartsHerpesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'thrush', label: { ru: 'Молочница', en: 'Thrush' } },
  { value: 'moles', label: { ru: 'Много родинок', en: 'Many moles' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts' } },
  { value: 'hpv_skin', label: { ru: 'Папилломавирус на коже', en: 'HPV on skin' } },
  { value: 'herpes', label: { ru: 'Герпес', en: 'Herpes' } },
];

const memoryOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'poor_memory', label: { ru: 'Плохая память', en: 'Poor memory' } },
  { value: 'poor_concentration', label: { ru: 'Плохая концентрация', en: 'Poor concentration' } },
  { value: 'both', label: { ru: 'И память, и концентрация', en: 'Both memory and concentration' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const illnessAntibioticsOptions: QuestionOption[] = [
  { value: 'rarely_ill', label: { ru: 'Редко болеет', en: 'Rarely ill' } },
  { value: 'often_ill', label: { ru: 'Часто болеет', en: 'Often ill' } },
  { value: 'took_antibiotics', label: { ru: 'Принимал антибиотики', en: 'Took antibiotics' } },
  { value: 'took_other_medications', label: { ru: 'Принимал другие лекарства', en: 'Took other medications' } },
];

const illnessAntibioticsInfantOptions: QuestionOption[] = [
  { value: 'rarely_ill', label: { ru: 'Редко болеет', en: 'Rarely ill' } },
  { value: 'often_ill', label: { ru: 'Часто болеет', en: 'Often ill' } },
  { value: 'took_antibiotics', label: { ru: 'Принимал антибиотики', en: 'Took antibiotics' } },
  { value: 'took_other_medications', label: { ru: 'Принимал другие лекарства', en: 'Took other medications' } },
];

const illnessAntibioticsChildOptions: QuestionOption[] = [
  { value: 'rarely_ill', label: { ru: 'Редко болеет', en: 'Rarely ill' } },
  { value: 'often_ill', label: { ru: 'Часто болеет', en: 'Often ill' } },
  { value: 'took_antibiotics', label: { ru: 'Принимал антибиотики', en: 'Took antibiotics' } },
  { value: 'took_other_medications', label: { ru: 'Принимал другие лекарства', en: 'Took other medications' } },
];

const cystsStonesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'cysts', label: { ru: 'Кисты', en: 'Cysts' } },
  { value: 'fibroids', label: { ru: 'Миомы', en: 'Fibroids' } },
  { value: 'stones_kidneys', label: { ru: 'Камни в почках', en: 'Stones in kidneys' } },
  { value: 'sand_kidneys', label: { ru: 'Песок в почках', en: 'Sand in kidneys' } },
  { value: 'stones_gallbladder', label: { ru: 'Камни в желчном', en: 'Stones in gallbladder' } },
];

const cystsStonesKidneysOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'cysts', label: { ru: 'Кисты', en: 'Cysts' } },
  { value: 'sand', label: { ru: 'Песок', en: 'Sand' } },
  { value: 'stones_kidneys', label: { ru: 'Камни в почках', en: 'Stones in kidneys' } },
  { value: 'stones_gallbladder', label: { ru: 'Камни в желчном', en: 'Stones in gallbladder' } },
];

const menstruationOptions: QuestionOption[] = [
  { value: 'regular', label: { ru: 'Регулярные', en: 'Regular' } },
  { value: 'heavy', label: { ru: 'Обильные', en: 'Heavy' } },
  { value: 'clots', label: { ru: 'Сгустками', en: 'With clots' } },
  { value: 'painful', label: { ru: 'Болезненные', en: 'Painful' } },
  { value: 'hot_flashes', label: { ru: 'Приливы', en: 'Hot flashes' } },
  { value: 'sweating', label: { ru: 'Потливость', en: 'Sweating' } },
  { value: 'poor_sleep', label: { ru: 'Плохой сон', en: 'Poor sleep' } },
  { value: 'mood_swings', label: { ru: 'Скачки настроения', en: 'Mood swings' } },
];

const menstruationWomanOptions: QuestionOption[] = [
  { value: 'regular', label: { ru: 'Регулярные', en: 'Regular' } },
  { value: 'irregular', label: { ru: 'Нерегулярные', en: 'Irregular' } },
  { value: 'painful', label: { ru: 'Болезненные', en: 'Painful' } },
  { value: 'prolonged', label: { ru: 'Затяжные', en: 'Prolonged' } },
  { value: 'heavy_bleeding', label: { ru: 'Обильные кровотечения', en: 'Heavy bleeding' } },
  { value: 'menopause', label: { ru: 'Менопауза', en: 'Menopause' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const headachesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'headaches', label: { ru: 'Головные боли', en: 'Headaches' } },
  { value: 'migraines', label: { ru: 'Мигрени', en: 'Migraines' } },
  { value: 'injuries', label: { ru: 'Травмы', en: 'Injuries' } },
  { value: 'concussion', label: { ru: 'Сотрясение', en: 'Concussion' } },
];

const headachesSleepOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'headaches', label: { ru: 'Головные боли', en: 'Headaches' } },
  { value: 'poor_sleep', label: { ru: 'Плохой сон', en: 'Poor sleep' } },
  { value: 'both', label: { ru: 'И головные боли, и плохой сон', en: 'Both headaches and poor sleep' } },
];

const hyperactiveOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'hyperactive', label: { ru: 'Гиперактивный', en: 'Hyperactive' } },
  { value: 'tired_often', label: { ru: 'Часто устаёт', en: 'Often tired' } },
  { value: 'normal', label: { ru: 'Нормально', en: 'Normal' } },
];

const sugarOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'moderate', label: { ru: 'Умеренно', en: 'Moderate' } },
  { value: 'strong', label: { ru: 'Сильно', en: 'Strong' } },
];

const pressureOptions: QuestionOption[] = [
  { value: 'low', label: { ru: 'Низкое', en: 'Low' } },
  { value: 'high', label: { ru: 'Высокое', en: 'High' } },
  { value: 'normal', label: { ru: 'Нормальное', en: 'Normal' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const stonesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'sand_kidneys', label: { ru: 'Песок в почках', en: 'Sand in kidneys' } },
  { value: 'sand_gallbladder', label: { ru: 'Песок в желчном', en: 'Sand in gallbladder' } },
  { value: 'stones_kidneys', label: { ru: 'Камни в почках', en: 'Stones in kidneys' } },
  { value: 'stones_gallbladder', label: { ru: 'Камни в желчном', en: 'Stones in gallbladder' } },
  { value: 'both', label: { ru: 'И в почках, и в желчном', en: 'Both in kidneys and gallbladder' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const operationsInjuriesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет операций и травм', en: 'No operations or injuries' } },
  { value: 'operations', label: { ru: 'Были операции', en: 'Had operations' } },
  { value: 'organ_removed', label: { ru: 'Удален орган', en: 'Organ removed' } },
  { value: 'injuries', label: { ru: 'Были травмы', en: 'Had injuries' } },
  { value: 'all_organs_ok', label: { ru: 'Все органы на месте', en: 'All organs in place' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const chronicDiseasesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет хронических заболеваний', en: 'No chronic diseases' } },
  { value: 'diabetes', label: { ru: 'Диабет', en: 'Diabetes' } },
  { value: 'autoimmune_thyroiditis', label: { ru: 'Аутоиммунный тиреоидит', en: 'Autoimmune thyroiditis' } },
  { value: 'arthritis', label: { ru: 'Артрит', en: 'Arthritis' } },
  { value: 'psoriasis', label: { ru: 'Псориаз', en: 'Psoriasis' } },
  { value: 'rheumatoid_arthritis', label: { ru: 'Ревматоидный артрит', en: 'Rheumatoid arthritis' } },
  { value: 'lupus', label: { ru: 'Системная красная волчанка', en: 'Systemic lupus erythematosus' } },
  { value: 'crohns', label: { ru: 'Болезнь Крона', en: 'Crohn\'s disease' } },
  { value: 'hashimoto', label: { ru: 'Тиреоидит Хашимото', en: 'Hashimoto\'s thyroiditis' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const weightSatisfactionOptions: QuestionOption[] = [
  { value: 'satisfied', label: { ru: 'Доволен своим весом', en: 'Satisfied with my weight' } },
  { value: 'want_to_lose', label: { ru: 'Хочу похудеть', en: 'Want to lose weight' } },
  { value: 'want_to_gain', label: { ru: 'Хочу набрать вес', en: 'Want to gain weight' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const covidComplicationsOptionsAdult: QuestionOption[] = [
  { value: 'no_complications', label: { ru: 'Нет осложнений', en: 'No complications' } },
  { value: 'hair_loss', label: { ru: 'Выпадение волос', en: 'Hair loss' } },
  { value: 'heart_problems', label: { ru: 'Проблемы сердца', en: 'Heart problems' } },
  { value: 'joint_problems', label: { ru: 'Суставы', en: 'Joint problems' } },
  { value: 'memory_loss', label: { ru: 'Потеря памяти', en: 'Memory loss' } },
  { value: 'panic_attacks', label: { ru: 'Панические атаки', en: 'Panic attacks' } },
  { value: 'poor_sleep', label: { ru: 'Ухудшение сна', en: 'Poor sleep' } },
  { value: 'fatigue', label: { ru: 'Хроническая усталость', en: 'Chronic fatigue' } },
  { value: 'breathing_problems', label: { ru: 'Проблемы с дыханием', en: 'Breathing problems' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const cystsPolypsOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'cysts', label: { ru: 'Кисты', en: 'Cysts' } },
  { value: 'polyps', label: { ru: 'Полипы', en: 'Polyps' } },
  { value: 'fibroids', label: { ru: 'Миомы', en: 'Fibroids' } },
  { value: 'tumors', label: { ru: 'Опухоли', en: 'Tumors' } },
  { value: 'hernias', label: { ru: 'Грыжи', en: 'Hernias' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const coldsFrequencyOptions: QuestionOption[] = [
  { value: 'rarely', label: { ru: 'Редко (1-2 раза в год)', en: 'Rarely (1-2 times per year)' } },
  { value: 'sometimes', label: { ru: 'Иногда (3-4 раза в год)', en: 'Sometimes (3-4 times per year)' } },
  { value: 'often', label: { ru: 'Часто (5-6 раз в год)', en: 'Often (5-6 times per year)' } },
  { value: 'very_often', label: { ru: 'Очень часто (более 6 раз в год)', en: 'Very often (more than 6 times per year)' } },
  { value: 'almost_never', label: { ru: 'Почти никогда', en: 'Almost never' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const energyOptionsAdultWoman: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'hard_to_wake_up', label: { ru: 'Очень тяжело просыпаться', en: 'Very hard to wake up' } },
  { value: 'feel_unrested', label: { ru: 'Утром чувствуете себя неотдохнувшей', en: 'Feel unrested in the morning' } },
  { value: 'need_coffee', label: { ru: 'Нужно стимулировать себя кофе', en: 'Need to stimulate yourself with coffee' } },
  { value: 'hard_to_pull_together', label: { ru: 'С утра нужно собрать себя по кусочкам', en: 'Need to pull yourself together in the morning' } },
  { value: 'all_symptoms', label: { ru: 'Все перечисленные симптомы', en: 'All of the above' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const energyOptionsAdultMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'hard_to_wake_up', label: { ru: 'Очень тяжело просыпаться', en: 'Very hard to wake up' } },
  { value: 'feel_unrested', label: { ru: 'Утром чувствуете себя неотдохнувшим', en: 'Feel unrested in the morning' } },
  { value: 'need_coffee', label: { ru: 'Нужно стимулировать себя кофе', en: 'Need to stimulate yourself with coffee' } },
  { value: 'hard_to_pull_together', label: { ru: 'С утра нужно собрать себя по кусочкам', en: 'Need to pull yourself together in the morning' } },
  { value: 'all_symptoms', label: { ru: 'Все перечисленные симптомы', en: 'All of the above' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const medicationsOptions: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет, не принимаю', en: 'No, I don\'t take' } },
  { value: 'yes', label: { ru: 'Да, принимаю', en: 'Yes, I take' } },
];

const testsOptions: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'yes_send', label: { ru: 'Да, отправлю в личку', en: 'Yes, I will send in private message' } },
];

// Обязательный вопрос в конце каждой анкеты: анализы/УЗИ + загрузка файлов при "да"
const bloodTestsYesNoOptions: QuestionOption[] = [
  { value: 'yes', label: { ru: 'Да', en: 'Yes' } },
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
];

const whatElseOptions: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'yes', label: { ru: 'Да', en: 'Yes' } },
];

const mainConcernOptions: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'yes', label: { ru: 'Да', en: 'Yes' } },
];

const pregnancyProblemsOptions: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No' } },
  { value: 'yes', label: { ru: 'Да', en: 'Yes' } },
];

const sugarDependencyOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
  { value: 'moderate', label: { ru: 'Умеренная зависимость', en: 'Moderate dependency' } },
  { value: 'strong', label: { ru: 'Сильная зависимость', en: 'Strong dependency' } },
  { value: 'constantly_asks', label: { ru: 'Постоянно просит сладкое', en: 'Constantly asks for sweets' } },
  { value: 'refuses_home_food', label: { ru: 'Отказывается от домашней еды', en: 'Refuses home-cooked food' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other' } },
];

const waterOptions: QuestionOption[] = [
  { value: '1', label: { ru: '1 литр', en: '1 liter' } },
  { value: '1.5', label: { ru: '1.5 литра', en: '1.5 liters' } },
  { value: '2', label: { ru: '2 литра', en: '2 liters' } },
  { value: '2.5', label: { ru: '2.5 литра', en: '2.5 liters' } },
  { value: '3', label: { ru: '3 литра', en: '3 liters' } },
  { value: '3.5', label: { ru: '3.5 литра', en: '3.5 liters' } },
];

const sleepAdultOptions: QuestionOption[] = [
  { value: 'good', label: { ru: 'Хороший', en: 'Good' } },
  { value: 'hard_to_fall_asleep', label: { ru: 'Трудно заснуть', en: 'Hard to fall asleep' } },
  { value: 'wake_often', label: { ru: 'Часто просыпаюсь', en: 'Wake up often' } },
];

// Infant questionnaire (type = infant)
export const infantQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health' },
    icon: 'heart',
    questions: [
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение', en: 'Digestion' },
        icon: 'heart',
        options: digestionOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'sweats_at_night',
        type: 'radio',
        label: { ru: 'Потеет во сне', en: 'Sweats at night' },
        icon: 'droplets',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'bad_breath',
        type: 'radio',
        label: { ru: 'Запах изо рта', en: 'Bad breath' },
        icon: 'wind',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'skin_condition',
        type: 'checkbox',
        label: { ru: 'Состояние кожи', en: 'Skin condition' },
        icon: 'sparkles',
        options: skinOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергии', en: 'Allergies' },
        icon: 'flower',
        options: allergyOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Вода в день (мл)', en: 'Water per day (ml)' },
        icon: 'droplet',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'injuries',
        type: 'checkbox',
        label: { ru: 'Травмы и операции', en: 'Injuries and surgeries' },
        icon: 'activity',
        options: injuriesOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'sleep_quality',
        type: 'radio',
        label: { ru: 'Хорошо ли спит', en: 'Does the child sleep well' },
        icon: 'moon',
        options: sleepOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'illness_antibiotics',
        type: 'checkbox',
        label: { ru: 'Частота болезней, антибиотики и лекарства', en: 'Illness frequency, antibiotics and medications' },
        icon: 'pill',
        options: illnessAntibioticsInfantOptions,
        required: true,
        hasAdditional: false,
      },
    ],
  },
  {
    id: 'birth_pregnancy',
    title: { ru: 'Роды и беременность', en: 'Birth and Pregnancy' },
    icon: 'baby',
    questions: [
      {
        id: 'birth_type',
        type: 'radio',
        label: { ru: 'Роды', en: 'Type of birth' },
        icon: 'baby',
        options: birthOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'mother_toxicosis',
        type: 'radio',
        label: { ru: 'Токсикоз у мамы при беременности', en: 'Mother\'s toxicosis during pregnancy' },
        icon: 'alert-circle',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'mother_allergy',
        type: 'radio',
        label: { ru: 'Аллергия у мамы до/во время беременности', en: 'Mother\'s allergies before/during pregnancy' },
        icon: 'flower',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'mother_constipation',
        type: 'radio',
        label: { ru: 'Был ли у мамы запор', en: 'Did mother have constipation' },
        icon: 'alert-triangle',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'mother_antibiotics',
        type: 'radio',
        label: { ru: 'Антибиотики у мамы во время беременности', en: 'Mother took antibiotics during pregnancy' },
        icon: 'pill',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'mother_anemia',
        type: 'radio',
        label: { ru: 'Была ли анемия у мамы', en: 'Did mother have anemia' },
        icon: 'heart',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'pregnancy_problems',
        type: 'radio',
        label: { ru: 'Проблемы во время беременности', en: 'Problems during pregnancy' },
        icon: 'file-text',
        options: pregnancyProblemsOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'what_else',
        type: 'radio',
        label: { ru: 'Дополнительно о здоровье ребёнка?', en: 'Anything else about the child\'s health?' },
        icon: 'info',
        options: whatElseOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'tests',
        type: 'radio',
        label: { ru: 'Анализы крови и УЗИ за последние 2–3 месяца?', en: 'Blood tests and ultrasound in the last 2–3 months?' },
        icon: 'file-text',
        options: bloodTestsYesNoOptions,
        required: true,
        hasAdditional: false,
      },
    ],
  },
];

// Child questionnaire (type = child)
export const childQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health' },
    icon: 'heart',
    questions: [
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение', en: 'Digestion' },
        icon: 'heart',
        options: digestionOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'teeth_decay',
        type: 'radio',
        label: { ru: 'Зубы быстро портятся', en: 'Teeth decay quickly' },
        icon: 'smile',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'sweats_grinds',
        type: 'checkbox',
        label: { ru: 'Потеет во сне, скрипит зубами', en: 'Sweats at night, grinds teeth' },
        icon: 'moon',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
          { value: 'sweats', label: { ru: 'Потеет во сне', en: 'Sweats at night' } },
          { value: 'grinds', label: { ru: 'Скрипит зубами', en: 'Grinds teeth' } },
          { value: 'other', label: { ru: 'Другое', en: 'Other' } },
        ],
        required: true,
        hasAdditional: false,
      },
      {
        id: 'bad_breath',
        type: 'radio',
        label: { ru: 'Запах изо рта', en: 'Bad breath' },
        icon: 'wind',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'sugar_dependency',
        type: 'checkbox',
        label: { ru: 'Сладкое и аппетит', en: 'Sugar and appetite' },
        icon: 'candy',
        options: sugarDependencyOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'skin_condition',
        type: 'checkbox',
        label: { ru: 'Состояние кожи', en: 'Skin condition' },
        icon: 'sparkles',
        options: skinOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергии', en: 'Allergies' },
        icon: 'flower',
        options: allergyOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'hyperactive',
        type: 'radio',
        label: { ru: 'Активность и усталость', en: 'Activity and tiredness' },
        icon: 'zap',
        options: hyperactiveOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Вода в день (мл)', en: 'Water per day (ml)' },
        icon: 'droplet',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'injuries',
        type: 'checkbox',
        label: { ru: 'Травмы и операции', en: 'Injuries and surgeries' },
        icon: 'activity',
        options: injuriesOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'headaches_sleep',
        type: 'checkbox',
        label: { ru: 'Головная боль и сон', en: 'Headaches and sleep' },
        icon: 'brain',
        options: headachesSleepOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'illness_antibiotics',
        type: 'checkbox',
        label: { ru: 'Частота болезней, антибиотики и лекарства', en: 'Illness frequency, antibiotics and medications' },
        icon: 'pill',
        options: illnessAntibioticsChildOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'what_else',
        type: 'textarea',
        label: { ru: 'Дополнительно о здоровье ребёнка?', en: 'Anything else about the child\'s health?' },
        icon: 'info',
        required: true,
        hasAdditional: false,
        placeholder: { ru: 'Дополнительная информация', en: 'Additional information' },
      },
      {
        id: 'tests',
        type: 'radio',
        label: { ru: 'Анализы крови и УЗИ за последние 2–3 месяца?', en: 'Blood tests and ultrasound in the last 2–3 months?' },
        icon: 'file-text',
        options: bloodTestsYesNoOptions,
        required: true,
        hasAdditional: false,
      },
    ],
  },
];

// Woman questionnaire (type = woman)
export const womanQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'height',
        type: 'number',
        label: { ru: 'Рост (см)', en: 'Height (cm)' },
        icon: 'ruler',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight_satisfaction',
        type: 'checkbox',
        label: { ru: 'Цели по весу', en: 'Weight goals' },
        icon: 'scale',
        options: weightSatisfactionOptions,
        required: true,
        hasAdditional: true,
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health' },
    icon: 'heart',
    questions: [
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Вода в день (мл), только вода', en: 'Water per day (ml), water only' },
        icon: 'droplet',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'covid_status',
        type: 'checkbox',
        label: { ru: 'COVID: болезнь или вакцинация', en: 'COVID: illness or vaccination' },
        icon: 'shield',
        options: covidOptionsWoman,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'covid_times',
        type: 'number',
        label: { ru: 'COVID: сколько раз болели?', en: 'COVID: how many times?' },
        icon: 'hash',
        required: false,
        hasAdditional: false,
      },
      {
        id: 'covid_complications',
        type: 'checkbox',
        label: { ru: 'Осложнения после COVID', en: 'Complications after COVID' },
        icon: 'shield',
        options: covidComplicationsOptionsAdult,
        required: false,
        hasAdditional: false,
      },
      {
        id: 'hair_condition',
        type: 'checkbox',
        label: { ru: 'Состояние волос', en: 'Hair condition' },
        icon: 'sparkles',
        options: hairOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'teeth',
        type: 'checkbox',
        label: { ru: 'Зубы и дёсны', en: 'Teeth and gums' },
        icon: 'smile',
        options: teethOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение', en: 'Digestion' },
        icon: 'heart',
        options: digestionOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'stones',
        type: 'checkbox',
        label: { ru: 'Песок/камни в желчном или почках', en: 'Sand/stones in gallbladder or kidneys' },
        icon: 'circle',
        options: stonesOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'operations_injuries',
        type: 'checkbox',
        label: { ru: 'Операции и травмы', en: 'Operations and injuries' },
        icon: 'scissors',
        options: operationsInjuriesOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'pressure',
        type: 'checkbox',
        label: { ru: 'Артериальное давление', en: 'Blood pressure' },
        icon: 'activity',
        options: pressureOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'chronic_diseases',
        type: 'checkbox',
        label: { ru: 'Хронические и аутоиммунные заболевания', en: 'Chronic and autoimmune diseases' },
        icon: 'alert-circle',
        options: chronicDiseasesOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'headaches',
        type: 'checkbox',
        label: { ru: 'Головные боли и неврология', en: 'Headaches and neurology' },
        icon: 'brain',
        options: headachesOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'numbness_cold',
        type: 'checkbox',
        label: { ru: 'Онемение и зябкость конечностей', en: 'Numbness and cold extremities' },
        icon: 'thermometer',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
          { value: 'numbness', label: { ru: 'Онемение пальцев', en: 'Numbness of fingers' } },
          { value: 'cold_extremities', label: { ru: 'Холодные руки-ноги даже летом', en: 'Cold hands and feet even in summer' } },
          { value: 'other', label: { ru: 'Другое', en: 'Other' } },
        ],
        required: true,
        hasAdditional: false,
      },
      {
        id: 'varicose_hemorrhoids',
        type: 'checkbox',
        label: { ru: 'Варикоз, геморрой, пигментные пятна', en: 'Varicose veins, hemorrhoids, pigment spots' },
        icon: 'heart',
        options: varicoseHemorrhoidsManOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'joints',
        type: 'checkbox',
        label: { ru: 'Суставы и боли в спине/коленях', en: 'Joints and back/knee pain' },
        icon: 'bone',
        options: jointOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'cysts_polyps',
        type: 'checkbox',
        label: { ru: 'Кисты, полипы, миомы, опухоли, грыжи', en: 'Cysts, polyps, fibroids, tumors, hernias' },
        icon: 'circle',
        options: cystsPolypsOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'skin_viruses',
        type: 'checkbox',
        label: { ru: 'Кожные и урогенитальные инфекции', en: 'Skin and urogenital infections' },
        icon: 'alert-circle',
        options: skinVirusesManOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'menstruation',
        type: 'checkbox',
        label: { ru: 'Менструация или менопауза', en: 'Menstruation or menopause' },
        icon: 'calendar',
        options: menstruationWomanOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'skin_issues',
        type: 'checkbox',
        label: { ru: 'Проблемы кожи', en: 'Skin issues' },
        icon: 'sparkles',
        options: skinIssuesManOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергии', en: 'Allergies' },
        icon: 'flower',
        options: allergyOptionsExtended,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'colds',
        type: 'checkbox',
        label: { ru: 'Частота простуд, антибиотики и жаропонижающие', en: 'Colds frequency, antibiotics and antipyretics' },
        icon: 'pill',
        options: coldsFrequencyOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'sleep',
        type: 'checkbox',
        label: { ru: 'Сон', en: 'Sleep' },
        icon: 'moon',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
          { value: 'hard_to_fall_asleep', label: { ru: 'Трудно заснуть', en: 'Hard to fall asleep' } },
          { value: 'wake_often', label: { ru: 'Часто просыпаетесь ночью', en: 'Wake up often at night' } },
          { value: 'both', label: { ru: 'Оба', en: 'Both' } },
          { value: 'other', label: { ru: 'Другое', en: 'Other' } },
        ],
        required: true,
        hasAdditional: false,
      },
      {
        id: 'energy',
        type: 'checkbox',
        label: { ru: 'Энергия и бодрость по утрам', en: 'Energy and morning alertness' },
        icon: 'zap',
        options: energyOptionsAdultWoman,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'memory',
        type: 'checkbox',
        label: { ru: 'Память и концентрация', en: 'Memory and concentration' },
        icon: 'brain',
        options: memoryOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'lifestyle',
        type: 'checkbox',
        label: { ru: 'Образ жизни', en: 'Lifestyle' },
        icon: 'activity',
        options: lifestyleOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'medications',
        type: 'radio',
        label: { ru: 'Постоянный приём лекарств', en: 'Regular medications' },
        icon: 'pill',
        options: medicationsOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'tests',
        type: 'radio',
        label: { ru: 'Анализы крови и УЗИ за последние 2–3 месяца?', en: 'Blood tests and ultrasound in the last 2–3 months?' },
        icon: 'file-text',
        options: bloodTestsYesNoOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'what_else',
        type: 'radio',
        label: { ru: 'Дополнительно о здоровье?', en: 'Anything else about your health?' },
        icon: 'info',
        options: whatElseOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'main_concern',
        type: 'textarea',
        label: { ru: 'Главный вопрос, который вы хотите решить?', en: 'Main question you want to address?' },
        icon: 'help-circle',
        required: true,
        hasAdditional: false,
        placeholder: {
          ru: 'Опишите, какой вопрос по здоровью для вас сейчас самый главный',
          en: 'Describe the main health question or concern you want to address',
        },
      },
    ],
  },
];

// Man questionnaire (type = man) — опции в мужском роде
export const manQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'height',
        type: 'number',
        label: { ru: 'Рост (см)', en: 'Height (cm)' },
        icon: 'ruler',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight_satisfaction',
        type: 'checkbox',
        label: { ru: 'Цели по весу', en: 'Weight goals' },
        icon: 'scale',
        options: weightSatisfactionOptions,
        required: true,
        hasAdditional: true,
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health' },
    icon: 'heart',
    questions: [
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Вода в день (мл), только вода', en: 'Water per day (ml), water only' },
        icon: 'droplet',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'covid_status',
        type: 'checkbox',
        label: { ru: 'COVID: болезнь или вакцинация', en: 'COVID: illness or vaccination' },
        icon: 'shield',
        options: covidOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'covid_times',
        type: 'number',
        label: { ru: 'COVID: сколько раз болели?', en: 'COVID: how many times?' },
        icon: 'hash',
        required: false,
        hasAdditional: false,
      },
      {
        id: 'covid_complications',
        type: 'checkbox',
        label: { ru: 'Осложнения после COVID', en: 'Complications after COVID' },
        icon: 'shield',
        options: covidComplicationsOptionsAdult,
        required: false,
        hasAdditional: false,
      },
      {
        id: 'hair_condition',
        type: 'checkbox',
        label: { ru: 'Состояние волос', en: 'Hair condition' },
        icon: 'sparkles',
        options: hairOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'teeth',
        type: 'checkbox',
        label: { ru: 'Зубы и дёсны', en: 'Teeth and gums' },
        icon: 'smile',
        options: teethOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение', en: 'Digestion' },
        icon: 'heart',
        options: digestionOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'stones',
        type: 'checkbox',
        label: { ru: 'Песок/камни в желчном или почках', en: 'Sand/stones in gallbladder or kidneys' },
        icon: 'circle',
        options: stonesOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'operations_injuries',
        type: 'checkbox',
        label: { ru: 'Операции и травмы', en: 'Operations and injuries' },
        icon: 'scissors',
        options: operationsInjuriesOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'pressure',
        type: 'checkbox',
        label: { ru: 'Артериальное давление', en: 'Blood pressure' },
        icon: 'activity',
        options: pressureOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'chronic_diseases',
        type: 'checkbox',
        label: { ru: 'Хронические и аутоиммунные заболевания', en: 'Chronic and autoimmune diseases' },
        icon: 'alert-circle',
        options: chronicDiseasesOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'headaches',
        type: 'checkbox',
        label: { ru: 'Головные боли и неврология', en: 'Headaches and neurology' },
        icon: 'brain',
        options: headachesOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'numbness_cold',
        type: 'checkbox',
        label: { ru: 'Онемение и зябкость конечностей', en: 'Numbness and cold extremities' },
        icon: 'thermometer',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
          { value: 'numbness', label: { ru: 'Онемение пальцев', en: 'Numbness of fingers' } },
          { value: 'cold_extremities', label: { ru: 'Холодные руки-ноги даже летом', en: 'Cold hands and feet even in summer' } },
          { value: 'other', label: { ru: 'Другое', en: 'Other' } },
        ],
        required: true,
        hasAdditional: false,
      },
      {
        id: 'varicose_hemorrhoids',
        type: 'checkbox',
        label: { ru: 'Варикоз, геморрой, пигментные пятна', en: 'Varicose veins, hemorrhoids, pigment spots' },
        icon: 'heart',
        options: varicoseHemorrhoidsManOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'joints',
        type: 'checkbox',
        label: { ru: 'Суставы и боли в спине/коленях', en: 'Joints and back/knee pain' },
        icon: 'bone',
        options: jointOptionsMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'cysts_polyps',
        type: 'checkbox',
        label: { ru: 'Кисты, полипы, миомы, опухоли, грыжи', en: 'Cysts, polyps, fibroids, tumors, hernias' },
        icon: 'circle',
        options: cystsPolypsOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'skin_viruses',
        type: 'checkbox',
        label: { ru: 'Кожные и урогенитальные инфекции', en: 'Skin and urogenital infections' },
        icon: 'alert-circle',
        options: skinVirusesManOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'prostatitis',
        type: 'radio',
        label: { ru: 'Простатит', en: 'Prostatitis' },
        icon: 'heart',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'skin_issues',
        type: 'checkbox',
        label: { ru: 'Проблемы кожи', en: 'Skin issues' },
        icon: 'sparkles',
        options: skinIssuesManOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергии', en: 'Allergies' },
        icon: 'flower',
        options: allergyOptionsExtended,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'colds',
        type: 'checkbox',
        label: { ru: 'Частота простуд, антибиотики и жаропонижающие', en: 'Colds frequency, antibiotics and antipyretics' },
        icon: 'pill',
        options: coldsFrequencyOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'sleep',
        type: 'checkbox',
        label: { ru: 'Сон', en: 'Sleep' },
        icon: 'moon',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues' } },
          { value: 'hard_to_fall_asleep', label: { ru: 'Трудно заснуть', en: 'Hard to fall asleep' } },
          { value: 'wake_often', label: { ru: 'Часто просыпаетесь ночью', en: 'Wake up often at night' } },
          { value: 'both', label: { ru: 'Оба', en: 'Both' } },
          { value: 'other', label: { ru: 'Другое', en: 'Other' } },
        ],
        required: true,
        hasAdditional: false,
      },
      {
        id: 'energy',
        type: 'checkbox',
        label: { ru: 'Энергия и бодрость по утрам', en: 'Energy and morning alertness' },
        icon: 'zap',
        options: energyOptionsAdultMan,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'memory',
        type: 'checkbox',
        label: { ru: 'Память и концентрация', en: 'Memory and concentration' },
        icon: 'brain',
        options: memoryOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'lifestyle',
        type: 'checkbox',
        label: { ru: 'Образ жизни', en: 'Lifestyle' },
        icon: 'activity',
        options: lifestyleOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'medications',
        type: 'radio',
        label: { ru: 'Постоянный приём лекарств', en: 'Regular medications' },
        icon: 'pill',
        options: medicationsOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'tests',
        type: 'radio',
        label: { ru: 'Анализы крови и УЗИ за последние 2–3 месяца?', en: 'Blood tests and ultrasound in the last 2–3 months?' },
        icon: 'file-text',
        options: bloodTestsYesNoOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'what_else',
        type: 'radio',
        label: { ru: 'Дополнительно о здоровье?', en: 'Anything else about your health?' },
        icon: 'info',
        options: whatElseOptions,
        required: true,
        hasAdditional: false,
      },
      {
        id: 'main_concern',
        type: 'textarea',
        label: { ru: 'Главный вопрос, который вы хотите решить?', en: 'Main question you want to address?' },
        icon: 'help-circle',
        required: true,
        hasAdditional: false,
        placeholder: {
          ru: 'Опишите, какой вопрос по здоровью для вас сейчас самый главный',
          en: 'Describe the main health question or concern you want to address',
        },
      },
    ],
  },
];

export type QuestionnaireType = 'infant' | 'child' | 'woman' | 'man';

export const getQuestionnaire = (type: QuestionnaireType): QuestionnaireSection[] => {
  switch (type) {
    case 'infant':
      return infantQuestionnaire;
    case 'child':
      return childQuestionnaire;
    case 'woman':
      return womanQuestionnaire;
    case 'man':
      return manQuestionnaire;
    default:
      return infantQuestionnaire;
  }
};

export const getQuestionnaireTitle = (type: QuestionnaireType, lang: Language): string => {
  const titles = {
    infant: { ru: 'Анкета для младенца', en: 'Infant Questionnaire' },
    child: { ru: 'Детская анкета', en: 'Child Questionnaire' },
    woman: { ru: 'Женская анкета', en: 'Women\'s Questionnaire' },
    man: { ru: 'Мужская анкета', en: 'Men\'s Questionnaire' },
  };
  return titles[type]?.[lang] || titles[type]?.ru || '';
};
