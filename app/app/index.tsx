import { useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import LoadingPage from 'src/components/auth/LoadingPage';
import { page } from 'src/constants/routes/app';

const App = () => {
	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) {
		return <LoadingPage />;
	}

	if (!isSignedIn) {
		return <Redirect href={page.auth.authentication} />;
	}

	return <Redirect href={page.home.diary} />;
};

export default App;
