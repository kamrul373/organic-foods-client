import React, { useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import "./Cart.css";
import { CartContext } from '../../App';
import { toast } from 'react-hot-toast';
import { setProductQuantity } from '../../Utility/setProductQuantity';
type cartItemPropsType = {
    product: {
        _id: string,
        name: "string",
        price: number,
        carQuantity: number,
        coverImage: string
    },
    allCartproducts: [],
    setTotal: Function,
    handleDeleteCartItem: Function,

}
const CartItem = ({ product, allCartproducts, setTotal, handleDeleteCartItem }: cartItemPropsType) => {
    const [quantity, setQuantity] = useState(product.carQuantity)
    const { cart, setCart } = useContext(CartContext)
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={product.coverImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{product.name}</div>
                    </div>
                </div>
            </td>
            <td>
                ${product.price}
            </td>
            <td className='text-center '>
                <form>
                    <input type="number" id="quantity" className='quantity text-center' value={quantity} onChange={(e) => setProductQuantity(e, product._id, quantity, setQuantity, cart, setCart, allCartproducts, setTotal)} min="1" max="100" />
                </form>
            </td>
            <td id="subtotal">${(product.price * quantity).toFixed(2)}

            </td>
            <th>
                <FaRegTrashAlt onClick={() => handleDeleteCartItem(product._id)} className='text-lg text-error cursor-pointer'></FaRegTrashAlt>
            </th>
        </tr>
    );
};

export default CartItem;