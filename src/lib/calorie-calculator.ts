export type CalorieFormula = 'mifflin' | 'harris';
export type CalorieSex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high' | 'very_high';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  very_high: 1.9,
};

export interface CalorieInput {
  formula: CalorieFormula;
  sex: CalorieSex;
  age: number;
  weightKg: number;
  heightCm: number;
  activity: ActivityLevel;
}

export interface CalorieResults {
  bmr: number;
  tdee: number;
  weightLoss: { min: number; max: number };
  maintenance: number;
  muscleGain: { min: number; max: number };
}

export function calculateBmr(input: Pick<CalorieInput, 'formula' | 'sex' | 'age' | 'weightKg' | 'heightCm'>): number {
  const { formula, sex, age, weightKg, heightCm } = input;

  if (formula === 'harris') {
    if (sex === 'male') {
      return 88.36 + 13.4 * weightKg + 4.8 * heightCm - 5.7 * age;
    }
    return 447.6 + 9.2 * weightKg + 3.1 * heightCm - 4.3 * age;
  }

  if (sex === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export function calculateCalorieResults(input: CalorieInput): CalorieResults {
  const bmrRaw = calculateBmr(input);
  const bmr = Math.round(bmrRaw);
  const tdee = Math.round(bmrRaw * ACTIVITY_MULTIPLIERS[input.activity]);

  return {
    bmr,
    tdee,
    weightLoss: {
      min: Math.round(tdee * 0.8),
      max: Math.round(tdee * 0.85),
    },
    maintenance: tdee,
    muscleGain: {
      min: Math.round(tdee * 1.1),
      max: Math.round(tdee * 1.15),
    },
  };
}

export function validateCalorieInput(input: Partial<CalorieInput>): string | null {
  const age = input.age;
  const weight = input.weightKg;
  const height = input.heightCm;

  if (age == null || age < 14 || age > 100) {
    return 'Укажите возраст от 14 до 100 лет';
  }
  if (weight == null || weight < 30 || weight > 300) {
    return 'Укажите вес от 30 до 300 кг';
  }
  if (height == null || height < 120 || height > 250) {
    return 'Укажите рост от 120 до 250 см';
  }
  return null;
}

export function formatKcal(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}
