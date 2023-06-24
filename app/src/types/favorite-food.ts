import { Source } from "./source_enum";

export type FavoriteFoodIdsDto = Array<number>;

export interface AddRemoveFavoriteFoodDto {
    user_id: string;
    food_id: number;
    source: Source;
}