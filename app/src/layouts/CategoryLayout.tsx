import { View, Text } from 'react-native';
import React from 'react';

const CategoryLayout: React.FC<{
	category?: string;
	children?: React.ReactNode;
	margins?: boolean;
}> = ({ category, children, margins }) => {
	return (
		<View className={'flex-col' + (margins ? ' mt-6' : '')}>
			{category && (
				<View className='mb-2'>
					<Text className='font-bold text-zinc-300'>{category}</Text>
				</View>
			)}
			<View className='flex-col rounded-lg bg-zinc-800 p-4'>
				{children}
			</View>
		</View>
	);
};

export default CategoryLayout;
