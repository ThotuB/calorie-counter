interface DailyProgressProps {
    goal: number;
    progress: number;
}

const DailyProgress = ({ goal, progress }: DailyProgressProps) => {
    const progressPerc = (goal > progress) 
                            ? Math.max(0, (progress / goal) * 100)
                            : (goal / progress) * 100;
    const goalPerc = (goal > progress) ? 100 : 0;
    const excessPerc = (goal > progress) ? 0 : 100 - progressPerc;
    
    return (
        <div className="w-full h-8 rounded-2xl overflow-hidden flex text-dark">
            <DailyProgressBar className="bg-primary"
                label={"PROGRESS"}
                percentage={progressPerc} />
            <DailyProgressBar className="bg-blue-200"
                label={"GOAL"}
                percentage={goalPerc} />
            <DailyProgressBar className="bg-red-400"
                label="EXCESS"
                percentage={excessPerc} />
        </div>
    )
}
export default DailyProgress;

interface DailyProgressBarProps {
    label: string;
    percentage: number;
    className: string;
}

const DailyProgressBar = ({ label, percentage, className }: DailyProgressBarProps) =>  (
    <div className={`flex justify-center items-center overflow-hidden text-lg font-semibold ${className}`}
        style={{ width: `${percentage}%` }}
    >
        {label}
    </div>
)
