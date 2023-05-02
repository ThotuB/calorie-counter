import { NutrientElem, NutrientSub } from "./Nutrient";

export interface NutrientProps {
    nutrient: {
        id: number
        name: string
        unitName: string
    }
    amount: number
}

interface Nutrient {
    id?: number;
    name: string;
    amount?: number;
    unit?: string;
    sub?: Nutrient[];
}

interface NutrientTableProps {
    nutrients: NutrientProps[];
    ratio: number;
}

export default function NutrientTable({ nutrients, ratio }: NutrientTableProps) {
    nutrients.map(nutrient => {
        findNutrient(nutrient, nutrient.nutrient.id);
    })

    return (
        <div className="flex flex-col gap-3 text-darker">
            <NutrientElem label='NAME' quantity='AMOUNT' unit='UNIT' />
            {mapNutrients(nutrientDict, ratio)}
        </div>
    )
}

const nutrientDict: Nutrient[] = [
    { name: 'Energy', id: 1008 },
    { name: 'Protein', id: 1003 },
    {
        name: 'Fat', id: 1004, sub: [
            { name: 'Saturated', id: 1258 },
            { name: 'Trans', id: 1257 },
            { name: 'Cholesterol', id: 1253 }
        ]
    },
    {
        name: 'Carbs', id: 1005, sub: [
            { name: 'Fiber', id: 1079 },
            { name: 'Sugars', id: 200 },
        ]
    },
    {
        name: 'Vitamins', sub: [
            { name: "Vitamin A", id: 1104 },
            { name: "Vitamin B-1 (Thiamine)", id: 1165 },
            { name: "Vitamin B-2 (Riboflavin)", id: 1166 },
            { name: "Vitamin B-3 (Niacin)", id: 1167 },
            { name: "Vitamin B-5 (Pantothenic Acid)", id: 1170 },
            { name: "Vitamin B-6 (Pyridoxine)", id: 1175 },
            { name: "Vitamin B-7 (Biotin)", id: 1176 },
            { name: "Vitamin B-9 (Folic Acid)", id: 1186 },
            { name: "Vitamin B-12 (Cobalamin)", id: 1178 },
            { name: "Vitamin C (Ascorbic Acid)", id: 1162 },
            { name: "Vitamin D (D2 + D3)", id: 1110 },
            { name: "Vitamin E", id: 1158 },
            { name: "Vitamin K (Phylloquinone)", id: 1185 },
            { name: "Choline", id: 1180 },
        ]
    },
    {
        name: 'Minerals', sub: [
            { name: "Calcium, Ca", id: 1087 },
            { name: "Iron, Fe", id: 1089 },
            { name: "Magnesium, Mg", id: 1090 },
            { name: "Phosphorus, P", id: 1091 },
            { name: "Potassium, K", id: 1092 },
            { name: "Sodium, Na", id: 1093 },
            { name: "Zinc, Zn", id: 1095 },
            { name: "Chromium, Cr", id: 1096 },
            { name: "Copper, Cu", id: 1098 },
            { name: "Iodine, I", id: 1100 },
            { name: "Manganese, Mn", id: 1101 },
            { name: "Molybdenum, Mo", id: 1102 },
            { name: "Selenium, Se", id: 1103 },
        ]
    },
    {
        name: 'Aminos', sub: [
            { name: "Tryptophan, TRP", id: 1210 },
            { name: "Threonine, THR", id: 1211 },
            { name: "Isoleucine, ILE", id: 1212 },
            { name: "Leucine, LEU", id: 1213 },
            { name: "Lysine, LYS", id: 1214 },
            { name: "Methionine, MET", id: 1215 },
            { name: "Cystine, CYS", id: 1216 },
            { name: "Phenylalanine, PHE", id: 1217 },
            { name: "Tyrosine, TYR", id: 1218 },
            { name: "Valine, VAL", id: 1219 },
            { name: "Arginine, ARG", id: 1220 },
            { name: "Histidine, HIS", id: 1221 },
            { name: "Alanine, ALA", id: 1222 },
            { name: "Aspartate, ASP, ", id: 1223 },
            { name: "Glutamate, GLU", id: 1224 },
            { name: "Glycine, GLY", id: 1225 },
            { name: "Proline, PRO", id: 1226 },
            { name: "Serine, SER", id: 1227 },
        ]
    }
]

const findNutrient = (nutrient: NutrientProps, id: number, nutrients = nutrientDict) => {
    nutrients.map(nutrientItem => {
        if (nutrientItem.id === id) {
            nutrientItem.amount = nutrient.amount;
            nutrientItem.unit = nutrient.nutrient.unitName;
        }
        else if (nutrientItem.sub) {
            findNutrient(nutrient, id, nutrientItem.sub);
        }
    })
}

const mapNutrients = (nutrients: Nutrient[], ratio: number, NutrientClass = NutrientElem): JSX.Element[] => {
    return nutrients.reduce<JSX.Element[]>((acc, nutrient) => {
        const { name, id, amount, unit, sub } = nutrient;

        const nutrientElem = (amount !== undefined)
            ? <NutrientClass key={id} label={name} quantity={(amount * ratio).toFixed(2)} unit={unit} />
            : <NutrientClass key={id} label={name} />;

        if (sub) {
            return [
                ...acc,
                nutrientElem,
                ...mapNutrients(sub, ratio, NutrientSub)
            ]
        }
        if (!amount || !unit) {
            return acc;
        }
        return [
            ...acc,
            nutrientElem
        ]
    }, [])
}