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
    foodNutrients: FoodNutrientDto[];
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

export interface FoodNutrientDto {
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