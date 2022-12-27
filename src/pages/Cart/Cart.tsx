import React, { useContext, useEffect, useState } from 'react';
import SmallLoading from '../../components/Shared/Loading/SmallLoading';
import { useQuery } from '@tanstack/react-query';
import { getCartProducts } from '../../Utility/getCartProducts.js';
import CartItem from './CartItem';
import calculateTotal from '../../Utility/calculateTotal';
import { toast } from 'react-hot-toast';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';

const Cart = () => {
    let calculatedtotal = 0;
    const [total, setTotal]: any = useState(calculatedtotal);
    const [deliveryCharge, setDeliveryCharge] = useState(50)
    const { cart, setCart } = useContext(CartContext);
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

    const handleDeleteCartItem = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete?")
        if (confirm && shoppingCart) {
            const cartObj = JSON.parse(shoppingCart);
            const quanityDelted = cartObj[id];
            setCart(cart - quanityDelted)
            delete cartObj[id]
            localStorage.setItem("organio-cart", JSON.stringify(cartObj))
            toast.success("Cart Item deleted successfully");
        }
    }


    return (
        <div className='my-8 '>
            <h2 className='text-center text-3xl font-bold my-5'>Cart</h2>
            {
                shoppingCart !== "{}" ?
                    <div className="overflow-x-auto w-full lg:px-16 px-4">
                        <table className="lg:table w-full table-auto ">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th className='text-center'>Quantity</th>
                                    <th>Sub Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCartproducts.map((product: any) => <CartItem
                                        key={product._id}
                                        product={product}
                                        allCartproducts={allCartproducts}
                                        setTotal={setTotal}
                                        handleDeleteCartItem={handleDeleteCartItem}
                                    ></CartItem>)
                                }

                                <tr className='h-10 mt-4'>
                                    <td colSpan={3}>
                                        <p className='font-bold lg:text-xl'>Total Sub Total</p>
                                    </td>
                                    <td colSpan={2}>
                                        <p className='lg:text-xl font-bold'>{total > 0 ? total : calculatedtotal}</p>
                                    </td>

                                </tr>
                                <tr className='h-10'>

                                    <td colSpan={3}>
                                        <p className='font-bold lg:text-xl'>Delivery Charge</p>
                                    </td>
                                    <td colSpan={2}>
                                        <p className='lg:text-xl font-bold'>{
                                            deliveryCharge
                                        }</p>
                                    </td>

                                </tr>
                                <tr className='h-10'>

                                    <td colSpan={3}>
                                        <p className='font-bold lg:text-xl'>Total</p>
                                    </td>
                                    <td colSpan={2}>
                                        <p className='lg:text-xl font-bold'>{(calculatedtotal + deliveryCharge).toFixed(2)}.</p>
                                    </td>

                                </tr>
                                <tr className='h-10 lg:text-right text-center'>
                                    <td colSpan={5}>
                                        <Link to="/checkout" className='btn btn-primary text-white btn-wide mt-8 lg:mt-5'>Checkout</Link>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    : <div className='text-center'>
                        <Link to="/shop" className='btn btn-primary text-white  mt-8 lg:mt-5'>Return To Shop</Link>
                    </div>
            }


        </div>
    );
};

export default Cart;