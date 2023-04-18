import Button from "@components/buttons/Button";
import Toggle from "@components/buttons/Toggle";
import { useState, useEffect } from "react";
import NutrientTable from "./NutrientTable";
import { NutrientProps } from "./NutrientTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import { NutrientElem } from "./Nutrient";

export interface FoodProps {
    foodNutrients: NutrientProps[];
    description: string;
    brandName: string;
    brandOwner: string;
    servingSize: number;
    servingSizeUnit: string;
    ingredients: string;
}

const Food = ({
    foodNutrients,
    description,
    brandOwner,
    servingSize,
    servingSizeUnit,
    ingredients,
}: FoodProps) => {
    const [inputPortion, setInputPortion] = useState(0);
    const [selected, setSelected] = useState("100");
    const [ratio, setRatio] = useState(1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value && value > 0) {
            setInputPortion(value);
        } else {
            setInputPortion(0);
        }
    };

    const handleAdd = () => {
        undefined;
    };

    useEffect(() => {
        switch (selected) {
            case "100":
                setRatio(1);
                break;
            case "serving":
                setRatio(servingSize / 100);
                break;
            case "input":
                setRatio(inputPortion / 100);
                break;
        }
    }, [selected, inputPortion, servingSize]);

    return (
        <div className="flex w-full max-w-5xl flex-col gap-6 rounded-2xl bg-dark p-4 text-white">
            <div className="flex flex-col items-center">
                <div className="text-6xl font-bold">{description}</div>
                <div className="italic">{brandOwner}</div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-xl">Portion:</div>
                    <Toggle.Group value={selected} onChange={setSelected}>
                        <Toggle.Button value="100">100 {servingSizeUnit}</Toggle.Button>
                        <Toggle.Button value="serving">
                            {servingSize} {servingSizeUnit}
                        </Toggle.Button>
                        <Toggle.Button value="input">
                            <input
                                className="mr-2 w-16 bg-transparent text-right"
                                title="Input Portion"
                                type="number"
                                value={inputPortion}
                                onChange={handleInputChange}
                            />
                            {servingSizeUnit}
                        </Toggle.Button>
                    </Toggle.Group>
                </div>
                <Button className="flex gap-3" onClick={handleAdd}>
                    <PlusIcon className="w-6" /> Add Food
                </Button>
            </div>
            <div className="flex flex-col gap-3 text-darker">
                <NutrientElem label="NAME" quantity="AMOUNT" unit="UNIT" />
                {/* {mapNutrients(nutrientDict, ratio)} */}
            </div>
            <div className="">INGREDIENTS: {ingredients}</div>
        </div>
    );
};

export default Food;
