import React, { useEffect } from 'react';
import Reveal from 'react-reveal/Reveal';
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

    return (
        <Reveal effect="fadeInUp" duration={1500}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={product.coverImage} alt={product.name} className="h-48" />
                </figure>
                <div className="card-body items-center text-center ">
                    <h2 className="card-title">{product.name}</h2>
                    <p className='lg:text-justify my-3'>{product.shortDescription}</p>
                    <p className='font-bold lg:text-3xl text-2xl'>${product.price}</p>
                    <div className="card-actions mt-4">
                        <button className="btn btn-primary btn-wide text-white cursor-pointer hover:bg-secondary duration-500 border-none">Buy Now</button>
                    </div>
                </div>
            </div>
        </Reveal>

    );
};

export default ProductCard;