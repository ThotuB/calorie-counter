export interface Food {
    id: number;
    name: string;
    brand: string;
    calories: number;
    serving_size: number;
    serving_size_unit: string;
    alternative_serving_size: string;
    verified: boolean;
    nutrients: Nutrients;
    vitamins: Vitamins;
    minerals: Minerals;
    amino_acids: Aminos;
}

export interface Nutrients {
    carbs: number;
    fiber?: number;
    sugar?: number;
    protein: number;
    fat: number;
    saturated_fat?: number;
    unsaturated_fat?: number;
};

export interface Vitamins {
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
    E?: number;
    K?: number;
};

export interface Minerals {
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
    alanine?: number;
    arginine?: number;
    aspartate?: number;
    cystine?: number;
    glutamate?: number;
    glycine?: number;
    histidine?: number;
    isoleucine?: number;
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