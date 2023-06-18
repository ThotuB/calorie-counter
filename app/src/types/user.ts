import { useUser } from "@clerk/clerk-expo";

export type User = NonNullable<ReturnType<typeof useUser>['user']>;