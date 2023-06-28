import { useOAuth, useSignUp } from '@clerk/clerk-expo';
import { createContext, useContext, useState } from 'react';
import { createAccount } from 'src/services/account';
import { Gender, Settings, WeightGoal } from 'src/types/settings';

type WeightGoalOptions = '' | WeightGoal;
type GenderOptions = '' | Gender
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
    finaliseSetup: (uid: string) => Promise<void>;
    createAccountWithApple: () => Promise<void>;
    createAccountWithGoogle: () => Promise<void>;
    createAccountWithEmail: (username: string, email: string, password: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
}

const SetupContext = createContext({} as SetupContext);

export const useSetup = () => {
    return useContext(SetupContext);
};

export const SetupProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { startOAuthFlow: oauthFlowGoogle } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: oauthFlowApple } = useOAuth({ strategy: 'oauth_apple' })
    const { signUp, setActive, isLoaded } = useSignUp();

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

    if (!isLoaded) return null;

    const finaliseSetup = async (userId: string) => {
        if (gender === '' || weightGoal === '') throw new Error;

        return await createAccount({
            user_id: userId,
            weight_goal: weightGoal,
            gender: gender,
            age: age,
            height: height.type === 'metric' ? height.cm : (height.ft * 12 + height.in),
            weight: weight.type === 'metric' ? weight.kg : weight.lb,
            system: height.type,
        })
    }

    const createAccountWithApple = async () => {
        const { createdSessionId, setActive } = await oauthFlowApple({});
        if (!setActive) throw new Error;

        await setActive({ session: createdSessionId });
    }

    const createAccountWithGoogle = async () => {
        const { createdSessionId, setActive } = await oauthFlowGoogle({});
        if (!setActive) throw new Error;

        await setActive({ session: createdSessionId });
    }

    const createAccountWithEmail = async (username: string, emailAddress: string, password: string) => {
        await signUp.create({
            username,
            emailAddress,
            password,
        })

        await signUp.prepareEmailAddressVerification()
    }

    const verifyEmail = async (code: string) => {
        const { createdSessionId, createdUserId } = await signUp.attemptEmailAddressVerification({
            code: code,
        })

        if (!createdSessionId || !createdUserId) throw new Error;

        await setActive({ session: createdSessionId })
        return await finaliseSetup(createdUserId)
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
                finaliseSetup,
                createAccountWithApple,
                createAccountWithGoogle,
                createAccountWithEmail,
                verifyEmail,
            }}
        >
            {children}
        </SetupContext.Provider>
    );
};