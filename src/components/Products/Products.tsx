import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SmallLoading from '../Shared/Loading/SmallLoading';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

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
        <div className='mx-auto '>
            <h2 className='lg:text-5xl text-3xl font-bold text-center mt-16'>Top Rated Organic Foods</h2>

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
            <div className='text-center my-8'>
                <Link to="/shop" className='btn btn-secondary btn-wide text-white cursor-pointer hover:bg-primary duration-500 border-none'>Load More</Link>
            </div>
        </div>

    );
};

export default Products;