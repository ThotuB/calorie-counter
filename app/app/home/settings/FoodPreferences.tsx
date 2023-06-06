import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import TitleLayout from 'src/layouts/TitleLayout'
import CategoryLayout from 'src/layouts/CategoryLayout'
import * as Haptics from 'expo-haptics'
import { ToggleSectionItem } from 'src/components/settings/Section'

const FoodPreferences = () => {
    const [glutenIntolerant, setGlutenIntolerant] = useState(false)
    const [wheatIntolerant, setWheatIntolerant] = useState(false)
    const [lactoseIntolerant, setLactoseIntolerant] = useState(false)
    const [milkAllergy, setMilkAllergy] = useState(false)
    const [eggAllergy, setEggAllergy] = useState(false)
    const [fishAllergy, setFishAllergy] = useState(false)
    const [shellfishAllergy, setShellfishAllergy] = useState(false)
    const [nutAllergy, setNutAllergy] = useState(false)

    const [preferance, setPreferance] = useState<'none' | 'vegan' | 'vegetarian' | 'pescatarian'>('none')

    return (
        <TitleLayout title='Food Preferences' back scrollable safe>
            <View className='flex-col p-4'>
                <CategoryLayout category='PREFERENCES'>
                    <Selectable text='No food preferences'
                        selected={preferance === 'none'}
                        option='none'
                        onSelect={setPreferance}
                    />
                    <Selectable text='Vegan'
                        selected={preferance === 'vegan'}
                        option='vegan'
                        onSelect={setPreferance}
                    />
                    <Selectable text='Vegetarian'
                        selected={preferance === 'vegetarian'}
                        option='vegetarian'
                        onSelect={setPreferance}
                    />
                    <Selectable text='Pescatarian'
                        selected={preferance === 'pescatarian'}
                        option='pescatarian'
                        onSelect={setPreferance}
                    />
                </CategoryLayout>
                <CategoryLayout category='ALLERGIES' margins>
                    <ToggleSectionItem leftText='Gluten Intolerant'
                        value={glutenIntolerant}
                        onToggle={() => setGlutenIntolerant(!glutenIntolerant)}
                    />
                    <ToggleSectionItem leftText='Wheat Intolerant'
                        value={wheatIntolerant}
                        onToggle={() => setWheatIntolerant(!wheatIntolerant)}
                    />
                    <ToggleSectionItem leftText='Lactose Intolerant'
                        value={lactoseIntolerant}
                        onToggle={() => setLactoseIntolerant(!lactoseIntolerant)}
                    />
                    <ToggleSectionItem leftText='Allergic to Milk'
                        value={milkAllergy}
                        onToggle={() => setMilkAllergy(!milkAllergy)}
                    />
                    <ToggleSectionItem leftText='Allergic to Eggs'
                        value={eggAllergy}
                        onToggle={() => setEggAllergy(!eggAllergy)}
                    />
                    <ToggleSectionItem leftText='Allergic to Fish'
                        value={fishAllergy}
                        onToggle={() => setFishAllergy(!fishAllergy)}
                    />
                    <ToggleSectionItem leftText='Allergic to Shellfish'
                        value={shellfishAllergy}
                        onToggle={() => setShellfishAllergy(!shellfishAllergy)}
                    />
                    <ToggleSectionItem leftText='Allergic to Nuts'
                        value={nutAllergy}
                        onToggle={() => setNutAllergy(!nutAllergy)}
                    />
                </CategoryLayout>
            </View>
        </TitleLayout>
    )
}

const Selectable: React.FC<{
    text: string;
    selected: boolean;
    option: 'none' | 'vegan' | 'vegetarian' | 'pescatarian'
    onSelect: (option: 'none' | 'vegan' | 'vegetarian' | 'pescatarian') => void;
}> = ({ text, selected, option, onSelect }) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onSelect(option);
    };

    return (
        <Pressable
            className='flex-row justify-between py-4'
            onPress={handlePress}
        >
            <Text
                className='text-base font-medium text-zinc-50'
            >
                {text}
            </Text>
            <View className={`w-6 h-6 rounded-full border-2 ${selected ? 'bg-emerald-400 border-emerald-400' : 'bg-transparent border-zinc-50'}`} />
        </Pressable>
    );
};

export default FoodPreferences