import { createContext, useContext } from 'react';
import { User } from 'src/types/user';

interface UserContext {
    user: User
}

const UserContext = createContext({} as UserContext);

export const useAuthedUser = () => {
    return useContext(UserContext);
};

export const UserProvider: React.FC<{
    children: React.ReactNode;
    user: User;
}> = ({ children, user }) => {
    return (
        <UserContext.Provider
            value={{
                user
            }}
        >
            {children}
        </UserContext.Provider>
    );
};