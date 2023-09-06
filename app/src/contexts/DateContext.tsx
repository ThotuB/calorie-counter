import { createContext, useContext, useState } from 'react';

type DateContext = {
    date: Date;
    day: string
    dateYMD: string;
    setDate: (date: Date) => void;
    setTomorrow: () => void;
    setYesterday: () => void;
    isToday: boolean;
}

const DateContext = createContext({} as DateContext);

export const useDate = () => {
    return useContext(DateContext);
};

export const DateProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [date, setDate] = useState(new Date());
    const isToday = dateToYMD(date) === dateToYMD(new Date());
    const isYesterday = dateToYMD(date) === dateToYMD(new Date(Date.now() - 86400000));

    const day = isToday ?
        'Today, ' + date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        }) :
        isYesterday ?
            'Yesterday, ' + date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }) :
            date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
            });

    const dateYMD = dateToYMD(date);

    const setTomorrow = () => {
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow);
    };

    const setYesterday = () => {
        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        setDate(yesterday);
    };

    return (
        <DateContext.Provider
            value={{
                date,
                day,
                dateYMD,
                setDate,
                setTomorrow,
                setYesterday,
                isToday,
            }}
        >
            {children}
        </DateContext.Provider>
    );
};

export const dateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-indexed
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day
        }`;
}