import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "@utils/trpc";
import Layout from "@layouts/navigation/Layout";
import Daily from "@components/daily/Daily";

const HomePage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Calorie Counter</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="max-w-3xl w-full text-white">
                    <Daily 
                        goal={100} 
                        food={130} 
                        excercise={0} 
                        macros={{protein: 32, carbs: 54, fat: 21}} 
                    />
                </div>
            </Layout>
        </>
    );
};

export default HomePage;

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();

    const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    );

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                {secretMessage && <span> - {secretMessage}</span>}
            </p>
            <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={sessionData ? () => signOut() : () => signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
};