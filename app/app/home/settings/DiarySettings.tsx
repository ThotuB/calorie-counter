import React from 'react';
import TitleLayout from 'src/layouts/TitleLayout';
import { OnOffSectionItem, Section } from 'src/components/settings/Section';
import { useRouter } from 'expo-router';
import { page } from 'src/constants/routes/app';

const DiarySettings = () => {
    const router = useRouter();

    const onPressWaterTracker = () => {
        router.push(page.home.settings.water_tracker);
    };

    const onPressWeekyWeightUpdate = () => {
        router.push(page.home.settings.weekly_weight_update);
    };

    const onPressFruitTracker = () => {
        router.push(page.home.settings.fruit_tracker);
    };

    const onPressVegetableTracker = () => {
        router.push(page.home.settings.veges_tracker);
    };

    return (
        <TitleLayout title='Diary Settings' scrollable back padded>
            <Section title='TASK'>
                <OnOffSectionItem
                    leftText='Weekly Weight Update'
                    onPress={onPressWeekyWeightUpdate}
                    on
                />
            </Section>
            <Section title='TRACKING'>
                <OnOffSectionItem
                    leftText='Water Tracker'
                    onPress={onPressWaterTracker}
                    on
                />
                <OnOffSectionItem leftText='Step Counter' on />
                <OnOffSectionItem leftText='Fruit Tracker' onPress={onPressFruitTracker} on />
                <OnOffSectionItem leftText='Vegetable Tracker' onPress={onPressVegetableTracker} on />
            </Section>
        </TitleLayout>
    );
};

export default DiarySettings;
