import { Text } from 'react-native';
import React from 'react';

const TermsOfService = () => {
	return (
		<Text className='my-8 text-center text-white'>
			By continuing, you agree to our
			<Text className='text-purple-400'> Terms of Service</Text> and
			<Text className='text-purple-400'> Privacy Policy</Text>
		</Text>
	);
};

export default TermsOfService;
