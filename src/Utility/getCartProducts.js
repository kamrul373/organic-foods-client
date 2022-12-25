import { useQuery } from "@tanstack/react-query";
import SmallLoading from "../components/Shared/Loading/SmallLoading";

export const getCartProducts = (products) => {
    const shoppingCart = localStorage.getItem("organio-cart");

    if (shoppingCart) {
        const cartItems = JSON.parse(shoppingCart);
        const ids = Object.keys(cartItems);
        const cart = products.filter(product => {
            if (product._id in cartItems) {
                product.carQuantity = cartItems[product._id]
                return product
            }

        })
        return cart
    }


}