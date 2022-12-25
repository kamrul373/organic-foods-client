import { useContext, useEffect } from "react";
import { CartContext } from "../App";

export const useGetCurrentCartQuntity = () => {
    const { setCart } = useContext(CartContext)
    useEffect(() => {
        let shoppingCart = localStorage.getItem("organio-cart");
        if (shoppingCart) {
            const cartObj = JSON.parse(shoppingCart);
            const quantities = Object.values(cartObj)
            let totalQuantity = 0;
            for (const key in quantities) {
                const current: any = quantities[key]
                totalQuantity = totalQuantity + current
            }
            setCart(totalQuantity)

        }
    }, [setCart])
}