import { Text } from 'react-native';
import Diary from './diary/Diary';
import SearchFood from './search-food/SearchFood';
import SearchResults from './search-food/SearchResults';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<SearchFood />
		</QueryClientProvider>
	);
};

export default App;
