import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from 'src/utils/auth/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
	User,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	TwitterAuthProvider,
} from 'firebase/auth';

interface AuthContext {
	user?: User;
	logIn: (email: string, password: string) => Promise<UserCredential>;
	logInGoogle: () => Promise<UserCredential>;
	logInTwitter: () => Promise<UserCredential>;
	logOut: () => Promise<void>;
	signUp: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext({} as AuthContext);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [user, setUser] = useState<User>();

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logInGoogle = () => {
		return signInWithPopup(auth, new GoogleAuthProvider());
	};

	const logInTwitter = () => {
		return signInWithPopup(auth, new TwitterAuthProvider());
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user ?? undefined);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				logIn,
				logInGoogle,
				logInTwitter,
				logOut,
				signUp,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const SignedIn: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return <>{children}</>;
};

export const SignedOut: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { user } = useAuth();

	if (user) {
		return null;
	}

	return <>{children}</>;
};
