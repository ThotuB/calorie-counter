import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, useRouter } from 'expo-router'
import { page } from 'src/constants/routes/app'
import { XIcon } from 'src/icons/outline'

const ScanFood: React.FC<{

}> = () => {
    const router = useRouter()
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Redirect href={page.food.search_food} />;
    }

    return (
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : (plm) => {
                setScanned(true);
                console.log(`Bar code with type ${plm.type} and data ${plm.data} has been scanned!`);
            }}
            className='w-full h-full'
        >
            <SafeAreaView className='flex-1'>
                <View className='w-full h-full px-4 py-6 flex-col justify-between'>
                    <Pressable
                        onPress={() => router.back()}
                    >
                        <XIcon svgClassName='w-8 h-8 text-white' strokeWidth={2.5} />
                    </Pressable>
                    <View className={`w-72 h-72 border-8 ${scanned ? 'border-emerald-400' : 'border-white'} rounded-3xl mx-auto flex-col items-center justify-end`}
                        style={scanned && {
                            shadowColor: 'rgb(52 211 153)',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 1,
                            shadowRadius: 10,
                        }}
                    >
                        <Text className='text-white text-base font-semibold pb-8'>Scan barcode here</Text>
                    </View>
                    <View className='w-full flex-row items-center justify-between'></View>
                </View>
            </SafeAreaView>
        </BarCodeScanner>
    )
}

export default ScanFood