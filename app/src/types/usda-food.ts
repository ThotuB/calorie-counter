export interface SearchResultDto {
    foods: SearchResultFoodDto[];
    totalHits: number;
    totalPages: number;
    currentPage: number;
}

export interface SearchResultFoodDto {
    fdcId: number;
    description: string;
    dataType: string;
    gtinUpc: string;
    publishedDate: string;
    brandName?: string;
    brandOwner: string;
    foodNutrients: AbridgedFoodNutrientDto[];
    ingredients: string;
    marketCountry: string;
    foodCategory: string;
    modifiedDate: string;
    dataSource: string;
    packageWeight?: string;
    servingSize: number;
    servingSizeUnit: string;
    householdServingFullText?: string;
    shortDescription?: string;
    tradeChannels: string[];
    allHighlightFields: string;
    score: number;
    microbes: string[];
    finalFoodInputFoods: string[],
    foodMeasures: string[],
    foodAttributes: string[],
    foodAttributeTypes: string[],
    foodVersionIds: string[]
}

export interface AbridgedFoodNutrientDto {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
    derivationCode: string;
    derivationDescription: string;
    derivationId: number;
    foodNutrientSourceId: number;
    foodNutrientSourceCode: string;
    foodNutrientSourceDescription: string;
    rank: number;
    indentLevel: number;
    foodNutrientId: number;
    percentDailyValue?: number;
}

export interface FoodDto {
    fdcId: number;
    availableDate: string;
    brandOwner: string;
    brandName: string;
    description: string;
    dataType: string;
    gtinUpc: string;
    publishedDate: string;
    foodNutrients: FoodNutrientDto[];
    ingredients: string;
    foodClass: string
    modifiedDate: string;
    dataSource: string;
    servingSize: number;
    servingSizeUnit: string;
    householdServingFullText?: string;
}

export interface FoodNutrientDto {
    id: number;
    amount: number;
    type: string;
    nutrient: NutrientDto;
    foodNutrientDerivation: FoodNutrientDerivationDto;
}

export interface NutrientDto {
    id: number;
    name: string;
    number: string;
    rank: number;
    unitName: string;
}

export interface FoodNutrientDerivationDto {
    id: number;
    code: string;
    description: string;
}

/* NUTRIENT IDS
* Calories: 1008
* Protein: 1003
* Fat: 1004
    * Saturated: 1258
    * Trans: 1257
    * Cholesterol: 1253
* Carbs: 1005
    * Fiber: 1079
    * Sugars: 2000
* Vitamins
    * Vitamin A: 1104
    * Vitamin B-1 (Thiamine): 1165
    * Vitamin B-2 (Riboflavin): 1166
    * Vitamin B-3 (Niacin): 1167
    * Vitamin B-5 (Pantothenic Acid): 1170
    * Vitamin B-6 (Pyridoxine): 1175
    * Vitamin B-7 (Biotin): 1176
    * Vitamin B-9 (Folic Acid): 1186
    * Vitamin B-12 (Cobalamin): 1178
    * Vitamin C (Ascorbic Acid): 1162
    * Vitamin D (D2 + D3): 1110
    * Vitamin E: 1158
    * Vitamin K (Phylloquinone): 1185
    * Choline: 1180
* Minerals  
    * Calcium, Ca: 1087
    * Iron, Fe: 1089
    * Magnesium, Mg: 1090
    * Phosphorus, P: 1091
    * Potassium, K: 1092
    * Sodium, Na: 1093
    * Zinc, Zn: 1095
    * Chromium, Cr: 1096
    * Copper, Cu: 1098
    * Iodine, I: 1100
    * Manganese, Mn: 1101
    * Molybdenum, Mo: 1102
    * Selenium, Se: 1103
* Aminos
    * Alanine, ALA: 1222
    * Arginine, ARG: 1220
    * Aspartate, ASP, : 1223
    * Cystine, CYS: 1216
    * Glutamate, GLU: 1224
    * Glycine, GLY: 1225
    * Histidine, HIS: 1221
    * Isoleucine, ILE: 1212
    * Leucine, LEU: 1213
    * Lysine, LYS: 1214
    * Methionine, MET: 1215
    * Phenylalanine, PHE: 1217
    * Proline, PRO: 1226
    * Serine, SER: 1227
    * Threonine, THR: 1211
    * Tryptophan, TRP: 1210
    * Tyrosine, TYR: 1218
    * Valine, VAL: 1219
 */