import axios from "axios";
import { SearchResultDto } from "src/types/usda-food";

export const getFood = (searchTerm: string, pageNumber: number) =>
    axios
        .get<SearchResultDto>('https://api.nal.usda.gov/fdc/v1/search', {
            params: {
                api_key: 'DEMO_KEY',
                generalSearchInput: searchTerm,
                dataType: 'Branded',
                pageNumber: pageNumber,
                pageSize: 10,
            },
        })
        .then((res) => res.data);
