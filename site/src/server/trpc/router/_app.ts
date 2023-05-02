import { router } from "../trpc";
import { authRouter } from "./auth";
import { foodRouter } from "./food";

export const appRouter = router({
    food: foodRouter,
    auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
