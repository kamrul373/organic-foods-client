import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SmallLoading from '../Shared/Loading/SmallLoading';
import ProductCard from './ProductCard';

const Products = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_HOST}/products?limit=6`)
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <SmallLoading></SmallLoading>
    }
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-8 my-12 mx-auto'>
            {
                products.map((product: any) =>
                    <ProductCard
                        key={product._id}
                        product={product}
                    ></ProductCard>
                )
            }
        </div>
    );
};

export default Products;