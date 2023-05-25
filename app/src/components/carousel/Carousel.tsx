import { Animated } from 'react-native';

interface Props<T> {
	data: T[];
	renderItem: (item: T, index: number) => React.ReactNode;
}

const Carousel = <T extends unknown>({ data, renderItem }: Props<T>) => {
	const _getData = () => {
		return data;
	};

	const _renderItem = (item: T, index: number) => {
		return (
			<Animated.View key={index}>{renderItem(item, index)}</Animated.View>
		);
	};

	return (
		<Animated.ScrollView>{_getData().map(_renderItem)}</Animated.ScrollView>
	);
};

export default Carousel;
