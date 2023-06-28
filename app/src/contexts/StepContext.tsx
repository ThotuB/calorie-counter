import { createContext, useContext, useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { useDate } from './DateContext';

type StepContext = {
    steps: number;
    caloriesBurned: number;
    isActivated: boolean;
    askForPermission: () => Promise<void>;
}

const StepContext = createContext({} as StepContext);

export const useSteps = () => {
    return useContext(StepContext);
};

export const StepProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { date, isToday } = useDate();
    const [permission, setPermission] = useState<Pedometer.PermissionStatus>();
    const [stepCountToday, setStepCountToday] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    console.log('StepProvider', stepCountToday, currentStepCount);

    const subscribe = async () => {
        if (permission === Pedometer.PermissionStatus.GRANTED) {
            const from = new Date(date);
            from.setHours(0, 0, 0, 1);
            let to = new Date();

            if (!isToday) {
                to = new Date(date);
                to.setHours(23, 59, 59, 999);
            }

            console.log('from - to', from, to);

            const pastStepCountResult = await Pedometer.getStepCountAsync(from, to);
            if (pastStepCountResult) {
                setStepCountToday(pastStepCountResult.steps);
            }

            return Pedometer.watchStepCount(result => {
                setCurrentStepCount(result.steps);
            });
        }
    };

    const askForPermission = async () => {
        const { status } = await Pedometer.requestPermissionsAsync();
        setPermission(status);
    }

    useEffect(() => {
        Pedometer.getPermissionsAsync().then(({ status }) => {
            setPermission(status);
        })
    }, []);

    useEffect(() => {
        subscribe();
    }, [permission]);

    const totalSteps = isToday ? stepCountToday + currentStepCount : stepCountToday;
    const caloriesBurned = totalSteps * 0.05;
    const isActivated = permission === Pedometer.PermissionStatus.GRANTED;

    return (
        <StepContext.Provider
            value={{
                steps: totalSteps,
                caloriesBurned,
                isActivated,
                askForPermission
            }}
        >
            {children}
        </StepContext.Provider>
    );
};