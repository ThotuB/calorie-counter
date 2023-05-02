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

export default function Food({ id, description, calories, macros, company, servingSize, servingUnit }: FoodProps) {
    const handleSize = () => {
        undefined
    }

    const handleAdd = () => {
        undefined
    }

    const handleDetails = () => {
        Router.push(`/food/${id}`)
    }

    return (
        <div className="flex max-w-3xl w-full mx-auto overflow-hidden bg-dark rounded-xl border-4 border-dark">
            <div className="w-4/5 p-4 gap-2 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between gap-2">
                        <div className="text-2xl font-bold text-primary">
                            {description}
                        </div>
                    </div>

                    <div className="italic text-lg mt-1 font-semibold text-white px-2">
                        {company}
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex">
                        <div className="font-bold text-white text-2xl">
                            {calories} kcal
                        </div>
                        <div className="pl-2 self-center italic text-white font-light">
                            / {servingSize} {servingUnit}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSize} className="px-3">
                            <ChevronLeftIcon className="w-5" />
                            <ChevronUpIcon className="hidden " />
                        </Button>
                        <Button onClick={handleAdd} className="px-2">
                            <PlusIcon className='w-5' />
                        </Button>
                        <Button onClick={handleDetails}>
                            DETAILS
                        </Button>
                    </div>
                </div>
            </div>

            <FoodDoughnut macros={macros} calories={macros.calories} />
        </div>
    )
}