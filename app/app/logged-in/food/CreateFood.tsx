import { View, Text, SafeAreaView, Pressable, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuthedUser } from 'src/contexts/UserContext';
import { Stack, useRouter } from 'expo-router';
import { DotsHorizontalIcon, ExclamationCircleIcon, XIcon } from 'src/icons/outline';
import { ClipboardCheckIcon } from 'src/icons/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFood } from 'src/services/food';
import { CreateFoodDto } from 'src/types/food';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateFood = () => {
    const { user } = useAuthedUser();
    const router = useRouter()
    const queryClient = useQueryClient();
    const image = useMemo(() => require('assets/gradients/gradient-5.jpg'), []);

    // form state
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [barcode, setBarcode] = useState('')

    const [servingSize, setServingSize] = useState('100')
    const [servingUnit, setServingUnit] = useState<'g' | 'ml'>('g')

    const [calories, setCalories] = useState('')
    const [fat, setFat] = useState('')
    const [carbs, setCarbs] = useState('')
    const [protein, setProtein] = useState('')

    // form errors
    const [nameError, setNameError] = useState(false)
    const [servingSizeError, setServingSizeError] = useState(false)
    const [caloriesError, setCaloriesError] = useState(false)
    const [fatError, setFatError] = useState(false)
    const [carbsError, setCarbsError] = useState(false)
    const [proteinError, setProteinError] = useState(false)

    const { data, mutate: createFood } = useMutation((food: CreateFoodDto) => addFood(food), {
        onSuccess: () => {
            console.log('success')
            // queryClient.invalidateQueries({ queryKey: ['custom-foods', user.id] });
            // router.back()
        },
        onError: (error) => {
            console.log('error')
            console.log(error)
        },
        onSettled: () => {
            console.log('settled')
        },
        onMutate: (food) => {
            console.log('mutate')
            console.log(food)
        }
    })

    useEffect(() => {
        const fatNum = parseFloatWithComma(fat) || 0
        const carbsNum = parseFloatWithComma(carbs) || 0
        const proteinNum = parseFloatWithComma(protein) || 0

        if (isNaN(fatNum) || isNaN(carbsNum) || isNaN(proteinNum)) return

        setCalories((fatNum * 9 + carbsNum * 4 + proteinNum * 4).toString())
    }, [fat, carbs, protein])

    const validateForm = () => {
        const barcodeNum = parseInt(barcode)
        const servingSizeNum = parseInt(servingSize)
        const caloriesNum = parseFloatWithComma(calories)
        const fatNum = parseFloatWithComma(fat)
        const carbsNum = parseFloatWithComma(carbs)
        const proteinNum = parseFloatWithComma(protein)

        let isError = false

        if (name === '') {
            setNameError(true)
            isError = true
        }
        if (isNaN(servingSizeNum)) {
            setServingSizeError(true)
            isError = true
        }
        if (isNaN(caloriesNum)) {
            setCaloriesError(true)
            isError = true
        }
        if (isNaN(fatNum)) {
            setFatError(true)
            isError = true
        }
        if (isNaN(carbsNum)) {
            setCarbsError(true)
            isError = true
        }
        if (isNaN(proteinNum)) {
            setProteinError(true)
            isError = true
        }
        if (!isNaN(fatNum) && !isNaN(carbsNum) && !isNaN(proteinNum)) {
            if (fatNum + carbsNum + proteinNum > 100) {
                setFatError(true)
                setCarbsError(true)
                setProteinError(true)
                isError = true
            }
        }

        return isError
    }

    const handleCreateFood = () => {
        if (validateForm()) return

        const barcodeNum = parseInt(barcode)
        const servingSizeNum = parseInt(servingSize)
        const caloriesNum = parseFloatWithComma(calories)
        const fatNum = parseFloatWithComma(fat)
        const carbsNum = parseFloatWithComma(carbs)
        const proteinNum = parseFloatWithComma(protein)

        createFood({
            user_id: user.id,
            name: name,
            brand: brand || null,
            barcode: isNaN(barcodeNum) ? null : barcodeNum,
            calories: caloriesNum,
            carbs: carbsNum,
            protein: proteinNum,
            fat: fatNum,
            serving_size: servingSizeNum,
            serving_size_unit: servingUnit,
            ingredients: null,
        })
    }

    return (
        <>
            <Stack.Screen
                options={{
                    animation: 'slide_from_bottom',
                }}
            />

            <View className='h-full w-full flex-col bg-zinc-900'>
                <SafeAreaView className='sticky w-full bg-zinc-800 z-10'>
                    <View className='w-full flex-row items-center justify-between px-4 my-4'>
                        <Pressable onPress={() => router.back()}>
                            <XIcon svgClassName='w-6 h-6 text-white' />
                        </Pressable>
                        <Text className='font-bold text-white'>
                            Create Food
                        </Text>
                        <Pressable onPress={handleCreateFood}>
                            <ClipboardCheckIcon svgClassName='w-6 h-6 text-white' />
                        </Pressable>
                    </View>
                </SafeAreaView>

                <ImageBackground
                    source={image}
                    className='h-full'
                >
                    <KeyboardAwareScrollView
                        className='px-4 py-2'
                        enableAutomaticScroll
                        extraHeight={0}
                        extraScrollHeight={150}
                        keyboardOpeningTime={100}
                    >

                        <CategoryLayout category='Basic Information'>
                            <View>
                                <Input
                                    label='Food name'
                                    placeholder='required'
                                    maxLength={100}
                                    error={nameError}
                                    value={name}
                                    onChange={setName}
                                />
                            </View>
                            <View>
                                <Input
                                    label='Brand'
                                    placeholder='optional'
                                    maxLength={100}
                                    value={brand}
                                    onChange={setBrand}
                                />
                            </View>
                            <View>
                                <Input
                                    label='Barcode ID'
                                    placeholder='optional'
                                    keyboardType='numeric'
                                    value={barcode}
                                    onChange={setBarcode}
                                />
                            </View>
                        </CategoryLayout>
                        <CategoryLayout category='Serving' margins>
                            <View className='flex-col py-2'>
                                <Text className='text-base font-bold text-zinc-100'>
                                    Measurement Unit
                                </Text>
                                <View className='flex-row justify-between py-2'>
                                    <Select
                                        label='grams (g)'
                                        value='g'
                                        selected={servingUnit === 'g'}
                                        onPress={() => setServingUnit('g')}
                                    />
                                    <Text className='text-base font-bold text-zinc-100 py-2'>
                                        or
                                    </Text>
                                    <Select
                                        label='milliliters (ml)'
                                        value='ml'
                                        selected={servingUnit === 'ml'}
                                        onPress={() => setServingUnit('ml')}
                                    />
                                </View>
                            </View>
                            <View className='flex-row w-full justify-between items-center py-4'>
                                <Text className='text-base font-bold text-zinc-100'>
                                    Serving Size
                                </Text>
                                <View className='flex-row items-center'>

                                    <TextInput
                                        value={servingSize}
                                        onChangeText={setServingSize}
                                        selectTextOnFocus
                                        keyboardType='numeric'
                                        className='border-4 border-emerald-300 text-white font-bold rounded-xl w-16 h-12 px-2 text-right'
                                    />
                                    <Text className='ml-4 w-6 text-base font-bold text-zinc-100'>
                                        {servingUnit}
                                    </Text>
                                </View>
                            </View>
                        </CategoryLayout>
                        <CategoryLayout category='Nutritional Information' margins>
                            <View>
                                <Input
                                    label={`Kcal / 100 ${servingUnit}`}
                                    keyboardType='numeric'
                                    error={caloriesError}
                                    editable={false}
                                    value={calories}
                                    onChange={setCalories}
                                />
                            </View>
                            <View>
                                <Input
                                    label={`Fat / 100 ${servingUnit}`}
                                    placeholder='required'
                                    keyboardType='numeric'
                                    error={fatError}
                                    value={fat}
                                    onChange={setFat}
                                />
                            </View>
                            <View>
                                <Input
                                    label={`Carbs / 100 ${servingUnit}`}
                                    placeholder='required'
                                    keyboardType='numeric'
                                    error={carbsError}
                                    value={carbs}
                                    onChange={setCarbs}
                                />
                            </View>
                            <View>
                                <Input
                                    label={`Protein / 100 ${servingUnit}`}
                                    placeholder='required'
                                    keyboardType='numeric'
                                    error={proteinError}
                                    value={protein}
                                    onChange={setProtein}
                                />
                            </View>
                        </CategoryLayout>
                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View>
        </>
    )
}

const CategoryLayout: React.FC<{
    category: string;
    children: React.ReactNode;
    margins?: boolean;
}> = ({ category, children, margins }) => {
    return (
        <View className={'flex-col' + (margins ? ' mt-4' : '')}>
            <View className='mb-2'>
                <Text className='font-bold text-base text-white'>{category}</Text>
            </View>
            <View className='flex-col rounded-lg bg-zinc-800 px-4 divide-y divide-zinc-700'>
                {children}
            </View>
        </View>
    );
};

const Input: React.FC<{
    label: string;
    placeholder?: string;
    maxLength?: number;
    editable?: boolean;
    error?: boolean;
    keyboardType?: 'default' | 'numeric';
    value: string;
    onChange: (value: string) => void;
}> = ({ label, placeholder, keyboardType, error, editable, maxLength, value, onChange }) => {
    return (
        <View className='flex-row justify-between items-center py-4'>
            <View className='flex-row items-center'>
                <Text className='text-base font-bold text-zinc-100'>
                    {label}
                </Text>
                {error && (
                    <ExclamationCircleIcon svgClassName='ml-2 w-6 h-6 text-rose-500' strokeWidth={2} />
                )}
            </View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                selectTextOnFocus
                maxLength={maxLength}
                editable={editable}
                keyboardType={keyboardType}
                className='text-right text-base rounded-lg text-white w-44'
            />
        </View>
    )
}

const Select: React.FC<{
    label: string;
    value: string;
    selected: boolean;
    onPress: (value: string) => void;
}> = ({ label, value, selected, onPress }) => {
    return (
        <Pressable className={`w-32 flex-col justify-center items-center ${selected ? 'bg-emerald-300' : 'bg-zinc-700'} rounded-lg py-2`}
            onPress={() => onPress(value)}
        >
            <Text className={`font-bold ${selected ? 'text-zinc-900' : 'text-zinc-100'}`}>
                {label}
            </Text>
        </Pressable>
    )
}

const parseFloatWithComma = (value: string) => {
    return parseFloat(value.replace(',', '.'));
}

export default CreateFood