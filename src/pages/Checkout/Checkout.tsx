import React from 'react';
import SmallLoading from '../../components/Shared/Loading/SmallLoading';
import { useQuery } from '@tanstack/react-query';
import { getCartProducts } from '../../Utility/getCartProducts';

// type
type checkoutProductType = {
    _id: string,
    name: "string",
    price: number,
    carQuantity: number,
}

const Checkout = () => {
    const { data: allCartproducts, isLoading } = useQuery({
        queryKey: ["cartproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_HOST}/products`)
            const data = await res.json();
            const cartProducts = getCartProducts(data);
            return cartProducts;
        }
    })

    if (isLoading) {
        return <SmallLoading></SmallLoading>
    }
    return (
        <div className='my-8'>
            <h2 className='text-center text-3xl font-bold my-5'>Checkout</h2>
            <div className='flex lg:flex-row flex-col justify-center lg:px-16 px-4'>
                <div>

                </div>
                <table className='table w-full'>
                    <thead>
                        <th>Name</th>
                        <th>Sub Total</th>
                    </thead>
                    <tbody>
                        {
                            allCartproducts.map((product: checkoutProductType) => <>
                                <tr>
                                    <td>
                                        <p>{product.name} * {product.carQuantity}</p>
                                    </td>
                                    <td>
                                        <p>{product.price * product.carQuantity}</p>
                                    </td>
                                </tr>
                            </>)
                        }
                    </tbody>

                </table>

            </div>
        </div>
    );
};

export default Checkout;