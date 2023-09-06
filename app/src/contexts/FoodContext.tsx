import { createContext, useContext, useState } from 'react';
import { Food } from 'src/types/food';

interface FoodContext {
    food: Food | null
    setFood: (food: Food) => void
}

const FoodContext = createContext({} as FoodContext);

export const useFood = () => {
    return useContext(FoodContext);
};

export const FoodProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [food, setFood] = useState<Food | null>(null);

    return (
        <FoodContext.Provider
            value={{
                food,
                setFood
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};