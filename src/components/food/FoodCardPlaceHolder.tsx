// import FoodGraph from './FoodGraph'
import Button from '@components/buttons/Button';
import FoodDoughnut from '@components/graphs/FoodDoughnut';
import { ChevronUpIcon, ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
// import Button from 'components/common/Button'
import Router from 'next/router'

interface FoodProps {
    id: number;
    name: string;
    description: string;
    calories: number;
    macros: {
        carbs: number;
        fat: number;
        protein: number;
        calories: number;
    };
    company: string;
    rating: number;
    servingSize: number;
    servingUnit: string;
}

const FoodCardPlaceholder = () => {

    return (
        <div className="flex max-w-3xl w-full mx-auto overflow-hidden bg-dark rounded-xl border-4 border-dark">
            <div className="w-4/5 p-4 gap-2 flex flex-col justify-between">
                <div className='flex flex-col gap-2'>
                    <div className="flex justify-between gap-2">
                        <div className='w-1/5 bg-primary h-6 transition-opacity animate-pulse' />
                    </div>

                    <div className='px-2 flex gap-2'>
                        <div className='w-1/3 bg-white h-4 transition-opacity animate-pulse' />
                        <div className='w-1/5 bg-white h-4 transition-opacity animate-pulse' />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2 text-white items-baseline">
                        <div className="flex gap-2">
                            <div className='w-12 bg-white h-6 transition-opacity animate-pulse' />
                            <div className='w-16 bg-white h-6 transition-opacity animate-pulse' />
                        </div>
                        /
                        <div className='w-10 bg-white h-4 transition-opacity animate-pulse' />
                        <div className='w-4 bg-white h-4 transition-opacity animate-pulse' />
                    </div>
                    <div className="flex gap-2">
                        <Button className="px-3 transition-opacity animate-pulse">
                            <div className="w-5" />
                        </Button>
                        <Button className="px-2 transition-opacity animate-pulse">
                            <div className="w-5" />
                        </Button>
                        <Button className='transition opacity animate-pulse'>
                            {/* DETAILS */}
                            <div className="w-16 h-6 py-1">
                                <div className='bg-white w-full h-full' />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>

            <FoodDoughnut macros={{
                carbs: 30,
                fat: 30,
                protein: 30,
            }} calories={100} />
        </div>
    )
}

export default FoodCardPlaceholder