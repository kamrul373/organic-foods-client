import { useState } from "react";

const calculateTotal = (allCartproducts: []) => {
    const shoppingCart = localStorage.getItem("organio-cart");
    type productType = {
        _id: string,
        price: number,
    }
    if (shoppingCart) {
        const shoppingObj = JSON.parse(shoppingCart);
        const keys = Object.keys(shoppingObj);
        let total = 0;
        keys.filter((key: string) => {
            const price = allCartproducts.find((product: productType) => {
                if (product._id === key) {
                    const quantity = shoppingObj[key];
                    const singleProductSubTotal = product.price * quantity;
                    total = total + singleProductSubTotal
                }
            })

        })
        return parseFloat(total.toFixed(2))
    }
    return 0
}
export default calculateTotal