export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    // Header & Navigation
    siteTitle: 'Анкета по здоровью',
    selectLanguage: 'Язык',
    
    // Home page
    welcome: 'Добро пожаловать',
    welcomeDescription: 'Это бесплатная анкета по здоровью. Заполните форму, и мы свяжемся с вами для консультации.',
    selectCategory: 'Выберите категорию анкеты',
    questionnaireInstruction: 'Выберите подходящий вариант и заполните его. После изучения ответов я с вами свяжусь.',
    consultantSignature: 'Виктория',
    
    // Categories
    infantTitle: 'Для младенца',
    infantDescription: 'До 1 года',
    childTitle: 'Детская анкета',
    childDescription: 'от 1 - 12 лет',
    womanTitle: 'Женская анкета',
    womanDescription: 'Для взрослых женщин',
    manTitle: 'Мужская анкета',
    manDescription: 'Для взрослых мужчин',
    
    // Form labels
    name: 'Имя',
    lastName: 'Фамилия',
    age: 'Возраст',
    ageMonths: 'Возраст (в месяцах)',
    weight: 'Вес (кг)',
    waterPerDay: 'Сколько воды в день (литров)',
    additionalInfo: 'Дополнительно (необязательно)',
    otherDetails: 'Уточните, что именно',
    whatElseToKnow: 'Что ещё нужно знать о здоровье',
    
    // Common options
    yes: 'Да',
    no: 'Нет',
    sometimes: 'Иногда',
    good: 'Хорошо',
    bad: 'Плохо',
    sometimesProblems: 'Иногда проблемы',
    normal: 'Нормальное',
    reduced: 'Сниженная',
    veryLow: 'Очень низкая',
    moderate: 'Умеренно',
    strong: 'Сильно',
    
    // Digestion
    digestion: 'Пищеварение',
    stomachPain: 'Боли в животе',
    diarrhea: 'Диарея',
    constipation: 'Запор',
    bloating: 'Вздутие',
    heartburn: 'Изжога',
    
    // Sleep & Energy
    sleep: 'Сон',
    sleepQuality: 'Качество сна',
    sleepsWell: 'Хорошо ли спит',
    sweatsAtNight: 'Потеет во сне',
    grindTeeth: 'Скрипит зубами',
    energy: 'Энергия',
    energyLevel: 'Уровень энергии',
    
    // Allergies
    allergies: 'Аллергии',
    flowering: 'Цветение',
    animals: 'Животные',
    dust: 'Пыль',
    food: 'Еда',
    medications: 'Лекарства',
    
    // Skin & Appearance
    skinCondition: 'Состояние кожи',
    moles: 'Родинки',
    warts: 'Бородавки',
    rashes: 'Высыпания',
    eczema: 'Экзема',
    drySkin: 'Сухая кожа',
    acne: 'Прыщи',
    irritation: 'Раздражение',
    
    // Teeth
    teeth: 'Зубы',
    teethDecayFast: 'Зубы быстро портятся',
    teethCrumble: 'Зубы крошатся',
    badBreath: 'Неприятный запах изо рта',
    bleedingGums: 'Кровоточивость дёсен',
    
    // Joints
    joints: 'Суставы',
    crunch: 'Хруст',
    squeak: 'Скрип',
    inflammation: 'Воспаление',
    
    // Medical history
    injuries: 'Травмы / операции / удары по голове / переломы',
    operations: 'Операции',
    headaches: 'Головные боли / мигрени',
    illnessFrequency: 'Часто ли болеет / принимал ли антибиотики',
    cystsStones: 'Кисты / миомы / камни',
    pressure: 'Давление',
    pressureLow: 'Низкое',
    pressureHigh: 'Высокое',
    pressureNormal: 'Нормальное',
    takesMedication: 'Принимаете ли таблетки',
    
    // Women specific
    menstruation: 'Месячные или менопауза',
    discharge: 'Выделения',
    hairCondition: 'Состояние волос',
    hairFalling: 'Выпадают',
    hairSplit: 'Секутся',
    hairDry: 'Сухие',
    hairOk: 'В порядке',
    
    // Cold extremities
    coldHands: 'Холодные руки/ноги',
    coldEvenInSummer: 'Руки-ноги холодные даже летом',
    
    // Varicose & Hemorrhoids
    varicoseHemorrhoids: 'Варикоз или геморрой',
    bleeding: 'Кровоточит',
    
    // COVID
    covidStatus: 'Был ли ковид или вакцина',
    hadCovid: 'Болела',
    vaccinated: 'Вакцинирована',
    noCovid: 'Нет',
    
    // Infant specific
    birthType: 'Как прошли роды',
    natural: 'Естественно',
    cesarean: 'Кесарево',
    other: 'Другое',
    motherToxicosis: 'Был ли у мамы сильный токсикоз',
    motherAllergy: 'Была ли у мамы аллергия до или во время беременности',
    motherConstipation: 'Был ли у мамы запор',
    motherAntibiotics: 'Пила ли мама антибиотики во время беременности',
    motherAnemia: 'Была ли анемия у мамы',
    pregnancyProblems: 'Какие проблемы были в беременности',
    
    // Child specific
    hyperactive: 'Гиперактивный или часто жалуется на усталость',
    hyperactiveYes: 'Гиперактивный',
    tiredOften: 'Часто устаёт',
    sugarDependency: 'Зависимость от сладкого',
    
    // Memory
    memoryConcentration: 'Память и концентрация',
    tiredInMorning: 'С утра устал',
    hardToFallAsleep: 'Трудно заснуть',
    wakeUpOften: 'Часто просыпаюсь',
    
    // Viruses
    hpvHerpes: 'ПВЧ / Герпес',
    
    // Contact
    contactMethod: 'Способ связи',
    telegram: 'Telegram / Instagram',
    instagram: 'Instagram',
    phone: 'Телефон',
    username: 'Имя пользователя',
    usernameHint: 'Введите ник Telegram или Instagram (можно с @)',
    contactLink: 'Ваша ссылка для связи',
    atLeastOneContactRequired: 'Укажите контакт для связи (Telegram или Instagram)',
    telegramRequired: 'Укажите Telegram для связи',
    telegramFormatHint: 'Telegram: латинские буквы, цифры и _; от 5 до 32 символов',
    telegram_too_short: 'Ник в Telegram должен быть от 5 до 32 символов',
    telegram_too_long: 'Ник в Telegram не может быть длиннее 32 символов',
    telegram_invalid_chars: 'В Telegram допустимы только латинские буквы (a–z), цифры и подчёркивание (_)',
    instagramFormatHint: 'Instagram: латинские буквы, цифры, . и _; до 30 символов, без пробелов',
    instagram_too_long: 'Ник в Instagram не может быть длиннее 30 символов',
    instagram_invalid_chars: 'В Instagram допустимы только латинские буквы, цифры, точки и подчёркивание',
    instagram_dots: 'Ник не должен начинаться или заканчиваться точкой, и не должно быть двух точек подряд',

    // DSGVO
    dsgvoConsent: 'Я соглашаюсь на обработку моих данных.',
    
    // Buttons
    submit: 'Отправить анкету',
    submitting: 'Отправка...',
    clearForm: 'Очистить форму',
    previewMarkdown: 'Предпросмотр',
    close: 'Закрыть',
    backToHome: 'Вернуться на главную',
    sendAnother: 'Отправить ещё одну анкету',
    
    // Success page
    thankYou: 'Спасибо!',
    successMessage: 'Ваша анкета успешно отправлена. С вами скоро свяжутся.',
    
    // Errors
    required: 'Это поле обязательно',
    invalidNumber: 'Введите корректное число',
    selectAtLeastOne: 'Выберите хотя бы один вариант',
    submitError: 'Ошибка при отправке. Попробуйте позже.',
    
    // Markdown headers
    mdInfant: '👶 Анкета для младенца',
    mdChild: '🧒 Детская анкета',
    mdWoman: '🌸 Женская анкета',
    mdMan: '👨 Мужская анкета',
    mdContacts: '📞 Контакты',
  },
  
  en: {
    // Header & Navigation
    siteTitle: 'Health Questionnaire',
    selectLanguage: 'Language',
    
    // Home page
    welcome: 'Welcome',
    welcomeDescription: 'This is a free health questionnaire. Fill out the form and we will contact you for a consultation.',
    selectCategory: 'Select questionnaire category',
    questionnaireInstruction: 'Choose the appropriate option and fill it out. After reviewing your answers, I will contact you.',
    consultantSignature: 'Viktoria',
    
    // Categories
    infantTitle: 'For Infant',
    infantDescription: 'Under 1 year',
    childTitle: 'Child Questionnaire',
    childDescription: 'from 1 - 12 years',
    womanTitle: 'Women\'s Questionnaire',
    womanDescription: 'For adult women',
    manTitle: 'Men\'s Questionnaire',
    manDescription: 'For adult men',
    
    // Form labels
    name: 'Name',
    lastName: 'Last Name',
    age: 'Age',
    ageMonths: 'Age (in months)',
    weight: 'Weight (kg)',
    waterPerDay: 'Water per day (liters)',
    additionalInfo: 'Additional info (optional)',
    otherDetails: 'Please specify what exactly',
    whatElseToKnow: 'What else should we know about health',
    
    // Common options
    yes: 'Yes',
    no: 'No',
    sometimes: 'Sometimes',
    good: 'Good',
    bad: 'Bad',
    sometimesProblems: 'Sometimes problems',
    normal: 'Normal',
    reduced: 'Reduced',
    veryLow: 'Very low',
    moderate: 'Moderate',
    strong: 'Strong',
    
    // Digestion
    digestion: 'Digestion',
    stomachPain: 'Stomach pain',
    diarrhea: 'Diarrhea',
    constipation: 'Constipation',
    bloating: 'Bloating',
    heartburn: 'Heartburn',
    
    // Sleep & Energy
    sleep: 'Sleep',
    sleepQuality: 'Sleep quality',
    sleepsWell: 'Sleeps well',
    sweatsAtNight: 'Sweats at night',
    grindTeeth: 'Grinds teeth',
    energy: 'Energy',
    energyLevel: 'Energy level',
    
    // Allergies
    allergies: 'Allergies',
    flowering: 'Pollen',
    animals: 'Animals',
    dust: 'Dust',
    food: 'Food',
    medications: 'Medications',
    
    // Skin & Appearance
    skinCondition: 'Skin condition',
    moles: 'Moles',
    warts: 'Warts',
    rashes: 'Rashes',
    eczema: 'Eczema',
    drySkin: 'Dry skin',
    acne: 'Acne',
    irritation: 'Irritation',
    
    // Teeth
    teeth: 'Teeth',
    teethDecayFast: 'Teeth decay quickly',
    teethCrumble: 'Teeth crumble',
    badBreath: 'Bad breath',
    bleedingGums: 'Bleeding gums',
    
    // Joints
    joints: 'Joints',
    crunch: 'Crunching',
    squeak: 'Squeaking',
    inflammation: 'Inflammation',
    
    // Medical history
    injuries: 'Injuries / surgeries / head trauma / fractures',
    operations: 'Operations',
    headaches: 'Headaches / migraines',
    illnessFrequency: 'How often ill / antibiotics taken',
    cystsStones: 'Cysts / fibroids / stones',
    pressure: 'Blood pressure',
    pressureLow: 'Low',
    pressureHigh: 'High',
    pressureNormal: 'Normal',
    takesMedication: 'Do you take medication',
    
    // Women specific
    menstruation: 'Menstruation or menopause',
    discharge: 'Discharge',
    hairCondition: 'Hair condition',
    hairFalling: 'Falling out',
    hairSplit: 'Split ends',
    hairDry: 'Dry',
    hairOk: 'Normal',
    
    // Cold extremities
    coldHands: 'Cold hands/feet',
    coldEvenInSummer: 'Cold hands/feet even in summer',
    
    // Varicose & Hemorrhoids
    varicoseHemorrhoids: 'Varicose veins or hemorrhoids',
    bleeding: 'Bleeding',
    
    // COVID
    covidStatus: 'COVID or vaccination status',
    hadCovid: 'Had COVID',
    vaccinated: 'Vaccinated',
    noCovid: 'No',
    
    // Infant specific
    birthType: 'How was the birth',
    natural: 'Natural',
    cesarean: 'Cesarean',
    other: 'Other',
    motherToxicosis: 'Did mother have severe toxicosis',
    motherAllergy: 'Did mother have allergies before/during pregnancy',
    motherConstipation: 'Did mother have constipation',
    motherAntibiotics: 'Did mother take antibiotics during pregnancy',
    motherAnemia: 'Did mother have anemia',
    pregnancyProblems: 'What problems were there during pregnancy',
    
    // Child specific
    hyperactive: 'Hyperactive or often complains of tiredness',
    hyperactiveYes: 'Hyperactive',
    tiredOften: 'Often tired',
    sugarDependency: 'Sugar dependency',
    
    // Memory
    memoryConcentration: 'Memory and concentration',
    tiredInMorning: 'Tired in the morning',
    hardToFallAsleep: 'Hard to fall asleep',
    wakeUpOften: 'Wake up often',
    
    // Viruses
    hpvHerpes: 'HPV / Herpes',
    
    // Contact
    contactMethod: 'Contact method',
    telegram: 'Telegram or Instagram',
    instagram: 'Instagram',
    phone: 'Phone',
    username: 'Username',
    usernameHint: 'Enter your Telegram or Instagram username (with or without @)',
    contactLink: 'Your contact link',
    atLeastOneContactRequired: 'Enter a contact (Telegram or Instagram) so we can reach you',
    telegramRequired: 'Enter your Telegram to be contacted',
    telegramFormatHint: 'Telegram: Latin letters, digits and _; 5–32 characters',
    telegram_too_short: 'Telegram username must be 5 to 32 characters',
    telegram_too_long: 'Telegram username cannot be longer than 32 characters',
    telegram_invalid_chars: 'Telegram allows only Latin letters (a–z), numbers and underscore (_)',
    instagramFormatHint: 'Instagram: letters, digits, . and _; up to 30 characters, no spaces',
    instagram_too_long: 'Instagram username cannot be longer than 30 characters',
    instagram_invalid_chars: 'Instagram allows only letters, numbers, periods and underscore',
    instagram_dots: 'Username must not start or end with a period, or have two periods in a row',

    // DSGVO
    dsgvoConsent: 'I agree to the processing of my data.',
    
    // Buttons
    submit: 'Submit questionnaire',
    submitting: 'Submitting...',
    clearForm: 'Clear form',
    previewMarkdown: 'Preview',
    close: 'Close',
    backToHome: 'Back to home',
    sendAnother: 'Submit another questionnaire',
    
    // Success page
    thankYou: 'Thank you!',
    successMessage: 'Your questionnaire has been successfully submitted. We will contact you soon.',
    
    // Errors
    required: 'This field is required',
    invalidNumber: 'Enter a valid number',
    selectAtLeastOne: 'Select at least one option',
    submitError: 'Error submitting. Please try again later.',
    
    // Markdown headers
    mdInfant: '👶 Infant Questionnaire',
    mdChild: '🧒 Child Questionnaire',
    mdWoman: '🌸 Women\'s Questionnaire',
    mdMan: '👨 Men\'s Questionnaire',
    mdContacts: '📞 Contacts',
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations['ru']): string => {
  return translations[lang]?.[key] || translations['ru'][key] || key;
};
