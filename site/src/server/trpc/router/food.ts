import axios from "axios";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const foodRouter = router({
    search: publicProcedure
        .input(z.object({
            api_key: z.string(),
            query: z.string().optional(),
            dataType: z.string().optional(),
            pageNumber: z.number().optional(),
            pageSize: z.number().optional(),
        }))
        .query(({ input }) => {
            return axios.get("https://api.nal.usda.gov/fdc/v1/foods/search", {
                params: {
                    api_key: input.api_key,
                    query: input.query,
                    dataType: input.dataType,
                    pageNumber: input.pageNumber,
                    pageSize: input.pageSize,
                },
            });
        }),
});
