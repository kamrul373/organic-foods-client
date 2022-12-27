import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../pages/Home/Home/Home"
import Cart from "../pages/Cart/Cart"
import Checkout from "../pages/Checkout/Checkout"
import Shop from "../pages/Shop/Shop"
import SingleProductDetails from "../pages/SingleProductDetails/SingleProductDetails"
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
            },
            {
                path: "/shop",
                element: <Shop></Shop>
            },
            {
                path: "/shop/:id",
                loader: async ({ params }) => fetch(`${process.env.REACT_APP_HOST}/products/${params.id}`),
                element: <SingleProductDetails></SingleProductDetails>
            }
        ]
    }
])