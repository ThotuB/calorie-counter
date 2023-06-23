export type WeightGoal = 'lose' | 'maintain' | 'gain';
export type WaterSize = 'glass' | 'bottle'
export type System = 'metric' | 'imperial'
export type Gender = 'male' | 'female'

export interface Settings {
    user_id: string;
    weight_goal: WeightGoal;
    gender: Gender;
    age: number;
    height: number;
    weight: number;
    system: System;
    water_goal: number;
    water_size: WaterSize;
}

export interface NewSettingsDto {
    user_id: string;
    weight_goal: WeightGoal;
    gender: Gender;
    age: number;
    height: number;
    weight: number;
    system: System;
}