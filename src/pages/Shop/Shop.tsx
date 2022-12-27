import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallLoading from '../../components/Shared/Loading/SmallLoading';
import ProductCard from '../../components/Products/ProductCard';

const Shop = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_HOST}/products?`)
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <SmallLoading></SmallLoading>
    }

    return (
        <div className='my-8 lg:px-16 px-4'>
            <h2 className='text-3xl text-center font-bold my-5'>Shop</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-8 my-12 px-6 '>

                {
                    products.map((product: any) =>
                        <ProductCard
                            key={product._id}
                            product={product}
                        ></ProductCard>
                    )
                }
            </div>
        </div>
    );
};

export default Shop;