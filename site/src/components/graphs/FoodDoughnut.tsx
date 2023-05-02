import MacroDoughnut from "./MacroDoughnut";

interface FoodGraphProps {
    macros: {
        carbs: number;
        fat: number;
        protein: number;
    };
    calories: number;
}

function FoodDoughnut({ macros: { carbs, fat, protein }, calories }: FoodGraphProps) {
    return (
        <div className="w-1/5 bg-primary relative flex justify-center items-center p-1">
            <div className="z-10 w-full">
                <MacroDoughnut carbs={carbs} protein={protein} fat={fat} />
            </div>
            <div className="absolute text-gray-800 font-bold font-mono text-4xl z-0">
                {calories}
            </div>
        </div>
    );
}

export default FoodDoughnut;
