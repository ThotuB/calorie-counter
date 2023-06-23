import { useSession, useUser } from '@clerk/clerk-expo';
import { Redirect, useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';

const App = () => {
	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) {
		return null;
	}

	if (!isSignedIn) {
		return <Redirect href={page.auth.authentication} />;
	}

	return <Redirect href={page.home.diary} />;
};

export default App;
