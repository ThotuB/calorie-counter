export interface ProgressDto {
    average: ProgressTrackedDto,
    max: ProgressTrackedDto,
    percent_breakfast: number,
    percent_lunch: number,
    percent_dinner: number,
    percent_snack: number,
    days: ProgressDayDto[],
}

export interface ProgressTrackedDto {
    calories: number,
    carbs: number,
    protein: number,
    fat: number,
    water: number,
}

export interface ProgressDayDto {
    date: Date,
    calories: number,
    carbs: number,
    protein: number,
    fat: number,
    water: number,
}