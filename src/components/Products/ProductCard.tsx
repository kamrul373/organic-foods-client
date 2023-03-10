import React, { useContext, useEffect } from 'react';
import Reveal from 'react-reveal/Reveal';
import { CartContext } from '../../App';
import { toast } from 'react-hot-toast';
import { addProductToLocal } from '../../Utility/addProductToLocal';
import { Link } from 'react-router-dom';
import "./ProductCard.css"
type productProps = {
    product: {
        _id: string,
        "category": string,
        "cat_id": number,
        "shortDescription": string,
        "fullDescription": string,
        "name": string,
        "rate": number,
        "price": number,
        "discount": number,
        "quantity": number,
        "coverImage": string,
        "specifications": {
            "weight": string,
            "dimensions": {
                "long": string,
                "height": number
            },
            "color": string,
            "size": string
        }
    }
}
const ProductCard = ({ product }: productProps) => {
    const { cart, setCart } = useContext(CartContext)
    const handleCart = (id: string, name: string) => {
        setCart(cart + 1);
        addProductToLocal(id);
        toast.success(`${name} added`)
    }

    return (
        <Reveal effect="fadeInUp" duration={1200}>
            <div className="card lg:w-96 lg:h-[530px] w-full bg-base-100 shadow-xl single-product">
                <Link to={`/shop/${product._id}`}>
                    <figure className="px-10 pt-10">
                        <img src={product.coverImage} alt={product.name} className="h-48" />
                    </figure>
                </Link>
                <div className="card-body items-center text-center ">
                    <Link to={`/shop/${product._id}`}>
                        <h2 className="card-title">{product.name}</h2>
                    </Link>
                    <p className='lg:text-justify my-3'>{product.shortDescription}</p>
                    <p className='font-bold lg:text-3xl text-2xl'>${product.price}</p>
                    <div className="card-actions mt-4">
                        <button onClick={() => handleCart(product._id, product.name)} className="btn btn-primary text-white cursor-pointer hover:bg-secondary duration-500 border-none btn-wide">Add to cart</button>
                    </div>
                </div>
            </div>
        </Reveal>

    );
};

export default ProductCard;