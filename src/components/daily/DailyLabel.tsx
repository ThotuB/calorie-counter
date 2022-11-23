interface DailyLabelProps {
    value: number;
    label: string;
}

function DailyLabel({ value, label }: DailyLabelProps) {
    return (
        <div className="flex flex-col w-16">
            <div className="text-xl font-mono font-bold">
                {value}
            </div>
            <div className="text-xs font-semibold">
                {label}
            </div>
        </div>
    )
}

export default DailyLabel;