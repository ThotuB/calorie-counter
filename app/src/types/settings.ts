export type WeightGoal = 'lose' | 'maintain' | 'gain';
export type WaterSize = 'glass' | 'bottle'
export type System = 'metric' | 'imperial'

export interface Settings {
    user_id: string;
    weight_goal: WeightGoal;
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
    age: number;
    height: number;
    weight: number;
    system: System;
}