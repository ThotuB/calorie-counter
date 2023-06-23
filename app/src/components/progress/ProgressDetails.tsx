import { View, Text } from 'react-native'
import React from 'react'
import { StatsDto } from 'src/types/stats-types'

const ProgressDetails: React.FC<{
    stats: StatsDto
}> = ({ stats: { nutrients, vitamins, minerals, amino_acids } }) => (
    <>
        <View className='flex-row w-full px-10 my-6'>
            <Text className='text-3xl text-white font-semibold'>Details</Text>
        </View>
        <View className='mb-12'>
            <TableRow name='Protein' value={nutrients.protein} unit='g' bg='light' />
            <View className='h-6' />
            <TableRow name='Carbs' value={nutrients.carbs} unit='g' bg='light' />
            <TableRow name='Fiber' value={nutrients.fiber} unit='g' bg='dark' />
            <TableRow name='Sugar' value={nutrients.sugar} unit='g' bg='dark' />
            <View className='h-6' />
            <TableRow name='Fat' value={nutrients.fat} unit='g' bg='light' />
            <TableRow name='Saturated' value={nutrients.saturated_fat} unit='g' bg='dark' />
            <TableRow name='Unsaturated' value={nutrients.unsaturated_fat} unit='g' bg='dark' />
            <View className='h-6' />
            <View className='flex-row py-1 px-10 bg-zinc-700'>
                <Text className='text-white font-semibold'>Vitamins</Text>
            </View>
            <TableRow name='Vitamin A' value={vitamins.A} rd={900} unit='IU' bg='dark' maybe />
            <TableRow name='Vitamin B1' value={vitamins.B1} rd={1.2} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin B2' value={vitamins.B2} rd={1.3} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin B3' value={vitamins.B3} rd={16} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin B5' value={vitamins.B5} rd={5} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin B6' value={vitamins.B6} rd={1.7} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin B7' value={vitamins.B7} rd={30} unit='μg' bg='dark' maybe />
            <TableRow name='Vitamin B9' value={vitamins.B9} rd={400} unit='μg' bg='dark' maybe />
            <TableRow name='Vitamin B12' value={vitamins.B12} rd={2.4} unit='μg' bg='dark' maybe />
            <TableRow name='Vitamin C' value={vitamins.C} rd={90} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin D' value={vitamins.D} rd={400} unit='IU' bg='dark' maybe />
            <TableRow name='Vitamin E' value={vitamins.E} rd={15} unit='mg' bg='dark' maybe />
            <TableRow name='Vitamin K' value={vitamins.K} rd={120} unit='μg' bg='dark' maybe />
            <View className='h-6' />
            <View className='flex-row py-1 px-10 bg-zinc-700'>
                <Text className='text-white font-semibold'>Minerals</Text>
            </View>
            <TableRow name='Calcium' value={minerals.calcium} rd={1300} unit='mg' bg='dark' maybe />
            <TableRow name='Iron' value={minerals.iron} rd={18} unit='mg' bg='dark' maybe />
            <TableRow name='Magnesium' value={minerals.magnesium} rd={420} unit='mg' bg='dark' maybe />
            <TableRow name='Phosphorus' value={minerals.phosphorus} rd={1250} unit='mg' bg='dark' maybe />
            <TableRow name='Potassium' value={minerals.potassium} rd={4.7} unit='mg' bg='dark' maybe />
            <TableRow name='Sodium' value={minerals.sodium} rd={2.3} unit='mg' bg='dark' maybe />
            <TableRow name='Zinc' value={minerals.zinc} rd={11} unit='mg' bg='dark' maybe />
            <TableRow name='Chromium' value={minerals.chromium} rd={35} unit='μg' bg='dark' maybe />
            <TableRow name='Copper' value={minerals.copper} rd={900} unit='mg' bg='dark' maybe />
            <TableRow name='Iodine' value={minerals.iodine} rd={150} unit='μg' bg='dark' maybe />
            <TableRow name='Manganese' value={minerals.manganese} rd={2.3} unit='mg' bg='dark' maybe />
            <TableRow name='Molybdenum' value={minerals.molybdenum} rd={45} unit='μg' bg='dark' maybe />
            <TableRow name='Selenium' value={minerals.selenium} rd={55} unit='μg' bg='dark' maybe />
            <View className='h-6' />
            <View className='flex-row py-1 px-10 bg-zinc-700'>
                <Text className='text-white font-semibold'>Amino Acids</Text>
            </View>
            <TableRow name='Alanine' value={amino_acids.alanine} unit='g' bg='dark' maybe />
            <TableRow name='Arginine' value={amino_acids.arginine} unit='g' bg='dark' maybe />
            <TableRow name='Aspartate' value={amino_acids.aspartate} unit='g' bg='dark' maybe />
            <TableRow name='Cystine' value={amino_acids.cystine} unit='g' bg='dark' maybe />
            <TableRow name='Glutamate' value={amino_acids.glutamate} unit='g' bg='dark' maybe />
            <TableRow name='Glycine' value={amino_acids.glycine} unit='g' bg='dark' maybe />
            <TableRow name='Histidine' value={amino_acids.histidine} unit='g' bg='dark' maybe />
            <TableRow name='Isoleucine' value={amino_acids.isoleucine} unit='g' bg='dark' maybe />
            <TableRow name='Leucine' value={amino_acids.leucine} unit='g' bg='dark' maybe />
            <TableRow name='Lysine' value={amino_acids.lysine} unit='g' bg='dark' maybe />
            <TableRow name='Methionine' value={amino_acids.methionine} unit='g' bg='dark' maybe />
            <TableRow name='Phenylalanine' value={amino_acids.phenylalanine} unit='g' bg='dark' maybe />
            <TableRow name='Proline' value={amino_acids.proline} unit='g' bg='dark' maybe />
            <TableRow name='Serine' value={amino_acids.serine} unit='g' bg='dark' maybe />
            <TableRow name='Threonine' value={amino_acids.threonine} unit='g' bg='dark' maybe />
            <TableRow name='Tryptophan' value={amino_acids.tryptophan} unit='g' bg='dark' maybe />
            <TableRow name='Tyrosine' value={amino_acids.tyrosine} unit='g' bg='dark' maybe />
            <TableRow name='Valine' value={amino_acids.valine} unit='g' bg='dark' maybe />
            <View className='h-6' />
        </View>
    </>
)



const TableRow: React.FC<{
    name: string;
    value?: number;
    unit?: string;
    rd?: number;
    bg: 'light' | 'dark';
    maybe?: boolean;
}> = ({ name, value = 0, rd, unit, bg, maybe }) => {
    if (maybe && value === 0) {
        return null
    }

    return (
        <View className={'flex-row justify-between items-center py-1 px-10 ' + (bg === 'light' ? 'bg-zinc-700' : 'bg-zinc-600')}>
            <Text className='text-white font-semibold'>{name}</Text>
            <View className='flex-row'>
                <Text className='text-white font-semibold'>{value?.toFixed(0)} {unit}</Text>
                {rd ?
                    <Text className='text-white font-semibold w-12 text-right'>
                        {(value / rd * 100).toFixed(0)}%
                    </Text> :
                    <View className='w-12' />
                }
            </View>
        </View>
    )
}

export default ProgressDetails