import Food, { type FoodProps } from '@components/food/[foodId]/Food'
import Layout from 'components/layouts/navigation/Layout'
import axios from 'axios';
import { useState, useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import NutrientsPlaceholder from '@components/food/[foodId]/NutrientsPlaceholder';

interface Props {
    id: string;
    apiKey: string;
}

export default function FoodPage({ id, apiKey }: Props) {
    const [loading, setLoading] = useState(true);
    const [food, setFood] = useState<FoodProps>({} as FoodProps);

    useEffect(() => {
        axios.get(`https://api.nal.usda.gov/fdc/v1/food/${id}`, { params: { api_key: apiKey } })
            .then(res => {
                setFood(res.data);
                setLoading(false);
            })
    }, [apiKey, id])

    return (
        <Layout>
            {loading ?
                <NutrientsPlaceholder /> :
                <Food {...food} />
            }
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id;
    const apiKey = process.env.USDA_API_KEY;

    return {
        props: {
            id: id,
            apiKey: apiKey
        }
    }
}