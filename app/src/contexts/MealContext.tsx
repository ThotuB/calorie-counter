import { createContext, useContext, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { dateToYYYYMMDD } from 'src/utils/date';
import { getMealsForDay } from 'src/services/meal';
import { Meal } from 'src/types/meal';

type MealContext = Omit<UseQueryResult<Meal[], unknown>, 'data'> & {
    meals: Meal[];
    date: Date;
    changeDate: (date: Date) => void;
}

const MealContext = createContext({} as MealContext);

export const useMeals = () => {
    return useContext(MealContext);
};

export const MealProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [date, setDate] = useState(new Date());

    const stringDate = dateToYYYYMMDD(date);

    const { data, ...query } = useQuery(["meal", 12, stringDate], () => getMealsForDay(12, stringDate))

    const changeDate = (date: Date) => {
        setDate(date);
    }

    return (
        <MealContext.Provider
            value={{
                meals: data || [],
                ...query,
                date,
                changeDate
            }}
        >
            {children}
        </MealContext.Provider>
    );
};