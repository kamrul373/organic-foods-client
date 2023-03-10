import React, { useState } from 'react';
import SmallLoading from '../../components/Shared/Loading/SmallLoading';
import { useQuery } from '@tanstack/react-query';
import { getCartProducts } from '../../Utility/getCartProducts';
import calculateTotal from '../../Utility/calculateTotal';
import { Link } from 'react-router-dom';
import Payment from '../../components/Payment/Payment';

// type
type checkoutProductType = {
    _id: string,
    name: "string",
    price: number,
    carQuantity: number,
}

const Checkout = () => {
    let calculatedtotal = 0;
    const [total, setTotal]: any = useState(calculatedtotal);
    const [deliveryCharge, setDeliveryCharge] = useState(50)
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
    const shoppingCart = localStorage.getItem("organio-cart")

    if (shoppingCart) {
        calculatedtotal = calculateTotal(allCartproducts);
    }
    const cartInfo = {
        subTotal: total > 0 ? total : calculatedtotal,
        total: parseFloat((calculatedtotal + deliveryCharge).toFixed(2)),
        deliveryCharge: deliveryCharge,

    }
    const productInfo: any[] = []
    //console.log(cartInfo);
    return (
        <div className='my-8 lg:px-16 px-4'>
            <h2 className='text-3xl font-bold my-5'>Checkout</h2>
            {
                shoppingCart !== "{}" ?
                    <div className='flex lg:flex-row flex-col justify-between gap-8'>
                        <table className='table w-full'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCartproducts.map((product: checkoutProductType) =>
                                        <tr key={product._id}>
                                            <td>
                                                <p className='font-bold'>{product.name} * {product.carQuantity}</p>
                                            </td>
                                            <td>
                                                <p>{product.price * product.carQuantity}</p>
                                            </td>
                                            <td className='hidden'>
                                                {
                                                    productInfo.push({ _id: product._id, quantity: product.carQuantity, price: product.price })
                                                }
                                            </td>
                                        </tr>

                                    )
                                }

                                <tr className='h-10'>
                                    <td>
                                        <p className='font-bold lg:text-xl'>Total Sub Total</p>
                                    </td>
                                    <td >
                                        <p className='lg:text-xl font-bold'>{total > 0 ? total : calculatedtotal}</p>
                                    </td>

                                </tr>
                                <tr className='h-10'>

                                    <td >
                                        <p className='font-bold lg:text-xl'>Delivery Charge</p>
                                    </td>
                                    <td >
                                        <p className='lg:text-xl font-bold'>{
                                            deliveryCharge
                                        }</p>
                                    </td>

                                </tr>
                                <tr className='h-10'>

                                    <td >
                                        <p className='font-bold lg:text-xl'>Total</p>
                                    </td>
                                    <td >
                                        <p className='lg:text-xl font-bold'>{(calculatedtotal + deliveryCharge).toFixed(2)}.</p>
                                    </td>

                                </tr>

                            </tbody>

                        </table>
                        <div className='lg:w-[40%]'>
                            <Payment productInfo={productInfo} cartInfo={cartInfo}></Payment>
                        </div>
                    </div>
                    : <div className='text-left'>
                        <Link to="/shop" className='btn btn-primary text-white  mt-8 lg:mt-5'>Return To Shop</Link>
                    </div>
            }

        </div>
    );
};

export default Checkout;