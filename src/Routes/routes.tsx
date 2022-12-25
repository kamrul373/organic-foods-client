import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../pages/Home/Home/Home"
import Cart from "../pages/Cart/Cart"
import Checkout from "../pages/Checkout/Checkout"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/cart",
                element: <Cart></Cart>
            },
            {
                path: "/checkout",
                element: <Checkout></Checkout>
            }
        ]
    }
])