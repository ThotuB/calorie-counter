import { createContext, useContext, useState } from 'react';
import { createSettings } from 'src/services/settings';
import { Settings } from 'src/types/settings';

type WeightGoalOptions = '' | 'lose' | 'maintain' | 'gain';
type GenderOptions = '' | 'female' | 'male'
type HeightOptions = {
    type: 'metric';
    cm: number;
} | {
    type: 'imperial';
    ft: number;
    in: number;
};
type WeightOptions = {
    type: 'metric';
    kg: number;
} | {
    type: 'imperial';
    lb: number;
};

interface SetupContext {
    weightGoal: WeightGoalOptions
    setWeightGoal: (weightGoal: WeightGoalOptions) => void;
    gender: GenderOptions;
    setGender: (gender: GenderOptions) => void;
    height: HeightOptions
    setHeight: (height: HeightOptions) => void;
    weight: WeightOptions
    setWeight: (weight: WeightOptions) => void;
    age: number;
    setAge: (age: number) => void;
    finaliseSetup: (uid: number) => Promise<Settings | undefined>;
}

const SetupContext = createContext({} as SetupContext);

export const useSetup = () => {
    return useContext(SetupContext);
};

export const SetupProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [weightGoal, setWeightGoal] = useState<WeightGoalOptions>('');
    const [gender, setGender] = useState<GenderOptions>('');
    const [age, setAge] = useState<number>(20);
    const [height, setHeight] = useState<HeightOptions>({
        type: 'metric',
        cm: 170
    })
    const [weight, setWeight] = useState<WeightOptions>({
        type: 'metric',
        kg: 70
    })

    console.log(weightGoal, gender, age, height, weight);

    const finaliseSetup = async (userId: number) => {
        if (gender === '' || weightGoal === '') return;

        const w = weight.type === 'metric' ? weight.kg : weight.lb * 0.453592;
        const h = height.type === 'metric' ? height.cm : (height.ft * 12 + height.in) * 2.54;

        const bmr = {
            'male': 66.5 + 13.75 * w + 5.003 * h - 6.755 * age,
            'female': 655.1 + 9.563 * w + 1.850 * h - 4.676 * age
        }[gender]

        return await createSettings({
            user_id: userId,
            weight_goal: weightGoal,
            age: age,
            height: height.type === 'metric' ? height.cm : (height.ft * 12 + height.in),
            weight: weight.type === 'metric' ? weight.kg : weight.lb,
            system: height.type,
        })
    }

    return (
        <SetupContext.Provider
            value={{
                weightGoal,
                setWeightGoal,
                gender,
                setGender,
                height,
                setHeight,
                weight,
                setWeight,
                age,
                setAge,
                finaliseSetup
            }}
        >
            {children}
        </SetupContext.Provider>
    );
};