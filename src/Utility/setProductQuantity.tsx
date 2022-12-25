import { toast } from "react-hot-toast";
import calculateTotal from "./calculateTotal";
export const setProductQuantity = (e: any, id: string, quantity: number, setQuantity: Function, cart: number, setCart: Function, allCartproducts: [], setTotal: Function) => {
    const changequantity = parseInt(e.target.value);
    // checking invalid value 
    if (changequantity < 1 || isNaN(changequantity)) {
        return toast.error("Minimum quanity is 1")
    }
    // checking increase or decrease
    if (changequantity > quantity) {
        const increasedQuantity = changequantity - quantity;
        setCart(cart + increasedQuantity)
    } else {
        const decreaedQuantity = quantity - changequantity;
        setCart(cart - decreaedQuantity)
    }
    // setting value of input
    setQuantity(changequantity)
    let cartallItems: any = localStorage.getItem("organio-cart")
    cartallItems = JSON.parse(cartallItems);
    cartallItems[id] = changequantity
    localStorage.setItem("organio-cart", JSON.stringify(cartallItems))
    const sum = calculateTotal(allCartproducts)
    setTotal(sum)
}