
import SummaryProgress from './DailyProgress';
import SummaryBox from './DailyLabel';
import { MinusIcon, Bars2Icon } from '@heroicons/react/24/solid'
import MacroDoughnut from '@components/graphs/MacroDoughnut';

interface SummaryProps {
    goal: number;
    food: number;
    excercise: number;
    macros: {
        protein: number;
        carbs: number;
        fat: number;
    }
}

const Daily = ({ goal, food, excercise, macros: { protein, carbs, fat} }: SummaryProps) => {
    const progress = food - excercise;
    const remaining = Math.abs(goal - progress);

    return (
        <div className="flex flex-col w-full bg-dark overflow-hidden rounded-xl shadow-xl">
            <div className="p-3 font-semibold text-xl bg-darker">
                Daily Summary
            </div>
            <div className="p-3 flex flex-col gap-3">
                <div className="flex gap-3">
                    <div className="w-36 rounded-xl bg-primary">
                        <MacroDoughnut protein={protein} fat={fat} carbs={carbs}/>
                    </div>

                    <div className="flex flex-col w-full p-2">
                        <div className="flex flex-col h-3/5">
                                <div className="font-bold">
                                    { goal > progress ? 
                                        <div className="text-purple-400">
                                            CALORIES REMINING
                                        </div> :
                                        <div className="text-red-400">
                                            EXCESS CALORIES
                                        </div>
                                    }
                                </div>
                                <div className="flex items-center">
                                    <div className="w-1/2 h-full text-5xl font-semibold font-mono">
                                        {remaining}
                                    </div>
                                    <div className="flex gap-2 w-1/2 justify-end">
                                        {/* <Button>ADD FOOD</Button>
                                        <Button>ADD EXCERCISE</Button> */}
                                    </div>
                                </div>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full"/>
                        <div className="flex w-full h-2/5 justify-between items-center">
                            <SummaryBox value={goal} label="GOAL"/>
                            <div className="bg-gray-200 w-1 h-full rounded-b-full"/>
                            <SummaryBox value={food} label="FOOD"/>
                            <MinusIcon className="w-8"/>
                            <SummaryBox value={excercise} label="EXCERCISE"/>
                            <Bars2Icon className="w-8"/>
                            <SummaryBox value={progress} label="NET"/>
                        </div>
                    </div>
                  
                </div>
                <div className="">
                    <SummaryProgress progress={progress} goal={goal} />
                </div>
            </div>
        </div>
    );
}

export default Daily;