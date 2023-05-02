export interface NutrientProps {
    label: string;
    quantity?: number | string;
    unit?: string;
}

const Nutrient = ({ label, quantity, unit }: NutrientProps) => (
    <div className="flex w-full justify-between py-3 px-7 text-2xl font-bold">
        <div>
            {label}
        </div>
        <div className="flex flex-row-reverse w-52 gap-5">
            <div className="w-16">
                {unit}
            </div>
            <div className="text-right">
                {quantity}
            </div>
        </div>
    </div>
)

export default Nutrient;

export const NutrientElem = ({ label, quantity, unit }: NutrientProps) => (
    <div className="bg-primary rounded-xl">
        <Nutrient label={label} quantity={quantity} unit={unit} />
    </div>
)

export const NutrientSub = ({ label, quantity, unit }: NutrientProps) => (
    <div className="flex">
        <div className="w-1/12 flex justify-center">
            <div className="bg-darker w-2 h-8 rounded-t-full rounded-bl-full" />
            <div className="bg-darker w-7/12 h-2 self-center rounded-r-full" />
        </div>
        <div className="bg-purple-200 w-full rounded-xl">
            <Nutrient label={label} quantity={quantity} unit={unit} />
        </div>
    </div>
)
