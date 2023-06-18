import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';

const itemHeight = 64;
interface Props<T> {
	data: T[];
	renderItem: (item: T, index: number) => React.ReactElement;
	onIndexChange?: (index: number) => void;
	index?: number;
}

const Carousel = <T extends unknown>({
	data,
	renderItem,
	onIndexChange,
	index = 0,
}: Props<T>) => {
	const defaultY = itemHeight * index - itemHeight * 3;
	const [y, setY] = useState(defaultY);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const y = event.nativeEvent.contentOffset.y + itemHeight * 3;
		const index = Math.round(y / itemHeight);
		onIndexChange && onIndexChange(index);
		setY(y);
	}

	return (
		<ScrollView
			className='relative'
			style={{
				height: itemHeight * 7,
			}}
			contentOffset={{
				x: 0,
				y: defaultY,
			}}
			showsVerticalScrollIndicator={false}
			snapToInterval={itemHeight}
			decelerationRate='fast'
			contentInset={{
				top: itemHeight * 2.25,
				bottom: itemHeight * 2.5,
			}}
			onScroll={handleScroll}
			scrollEventThrottle={100}
		>
			{data.map((item, idx) => (
				<React.Fragment key={idx}>
					<CarouselItem
						index={idx}
						item={renderItem(item, idx)}
						scrollY={y}
					/>
				</React.Fragment>
			))}
		</ScrollView>
	);
};

const CarouselItem: React.FC<{
	index: number;
	item: React.ReactElement;
	scrollY: number;
}> = ({ index, item, scrollY }) => {

	return (
		<View
			style={{

			}}
		>
			{item}
		</View>
	);
}

export default Carousel;
