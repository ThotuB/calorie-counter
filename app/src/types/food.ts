export interface Food {
    name: string;
    brand: string;
    calories: number;
    servingSize: string;
    alternateServingSize: string;
    verified: boolean;
    nutrients: Nutrients;
    vitamins: Vitamins;
    minerals: Minerals;
    aminos: Aminos;
}

export interface Nutrients {
    carbs?: number;
    fiber?: number;
    sugar?: number;
    protein?: number;
    fat?: number;
    saturatedFat?: number;
    unsaturatedFat?: number;
};

export interface Vitamins {
    show: boolean;
    A?: number;
    B1?: number;
    B2?: number;
    B3?: number;
    B5?: number;
    B6?: number;
    B7?: number;
    B9?: number;
    B12?: number;
    C?: number;
    D?: number;
};

export interface Minerals {
    show: boolean;
    calcium?: number;
    iron?: number;
    magnesium?: number;
    phosphorus?: number;
    potassium?: number;
    sodium?: number;
    zinc?: number;
    chromium?: number;
    copper?: number;
    iodine?: number;
    manganese?: number;
    molybdenum?: number;
    selenium?: number;
};

export interface Aminos {
    show: boolean;
    alanine?: number;
    arginine?: number;
    aspartate?: number;
    cystine?: number;
    glutamate?: number;
    glycine?: number;
    histidine?: number;
    leucine?: number;
    lysine?: number;
    methionine?: number;
    phenylalanine?: number;
    proline?: number;
    serine?: number;
    threonine?: number;
    tryptophan?: number;
    tyrosine?: number;
    valine?: number;
};