import { View, Text, ScrollView, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import TitleLayout from 'src/layouts/TitleLayout';
import { Pressable } from 'react-native';
import { SectionItemLayout, ToggleSectionItem } from 'src/components/settings/Section';
import { styled } from 'nativewind';

const StyledSlider = styled(Slider)

const WaterTracker = () => {
	const [on, setOn] = useState(false);
	const [goal, setGoal] = useState(2);
	const [size, setSize] = useState<"bottle" | "cup">("bottle");

	return (
		<TitleLayout title='Water Tracker' safe back>
			<View className='h-full flex-col justify-between'>
				<ScrollView className='flex-1'>
					<View className='flex-1 flex-col divide-y divide-zinc-800'>
						<View className='px-4'>
							<ToggleSectionItem
								leftText='Water Tracker'
								value={on}
								onToggle={() => setOn(!on)}
							/>
						</View>
						<View className='flex-col w-full items-center px-6 py-4'>
							<Text className='text-2xl font-semibold text-zinc-100'>
								Daily Goal
							</Text>
							<View className='mt-5 flex-row items-center gap-x-2'>
								<View className='flex-col gap-y-3'>
									<Text className='text-2xl font-bold text-zinc-50'>
										{goal}
									</Text>
									<Text className='text-2xl font-bold text-zinc-50'>
										{goal * (size === "bottle" ? 2 : 4)}
									</Text>
								</View>
								<View className='flex-col gap-y-3'>
									<Text className='text-lg text-zinc-50'>
										liters
									</Text>
									<Text className='text-lg text-zinc-50'>
										{size === "bottle" ? "bottles" : "glasses"}
									</Text>
								</View>
							</View>
							<StyledSlider className='mt-4 w-full'
								minimumValue={0}
								maximumValue={8}
								step={1}
								value={goal}
								onValueChange={setGoal}
								minimumTrackTintColor="rgb(52, 211, 153)"
								maximumTrackTintColor="#rgb(39, 39, 42)"
							/>
						</View>
						<View className='flex-col w-full items-center px-6 py-4'>
							<Text className='text-2xl font-semibold text-zinc-100'>
								Drink Size
							</Text>
							<View className='mt-8 flex-row items-end w-full'>
								<Pressable className='flex-1 flex-col items-center'
									onPress={() => setSize('cup')}
								>
									<Image source={require('/assets/food/water-0.25.png')}
										className='w-16 h-16' />
									<Text className='mt-4 text-lg font-semibold text-zinc-50'>
										250ml
									</Text>
								</Pressable>
								<Pressable className='flex-1 flex-col items-center'
									onPress={() => setSize('bottle')}
								>
									<Image source={require('/assets/food/water-0.5.png')}
										className='w-32 h-32' />
									<Text className='mt-4 text-lg font-semibold text-zinc-50'>
										500ml
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</ScrollView>
				<View className='flex-col px-4 pt-4'>
					<Pressable className='flex-row justify-center rounded-lg bg-zinc-800 py-4'
					>
						<Text className='text-base font-semibold text-zinc-50'>
							SAVE SETTINGS
						</Text>
					</Pressable>
					<Pressable className='flex-row justify-center py-4'
					>
						<Text className='text-base font-medium text-zinc-300'>
							RESET TO DEFAULT
						</Text>
					</Pressable>
				</View>
			</View>
		</TitleLayout>
	);
};

export default WaterTracker;
