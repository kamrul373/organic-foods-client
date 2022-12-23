import React, { createContext, useState } from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/routes';
import { Toaster } from 'react-hot-toast';
type CartContextType = {
  cart: number,
  setCart: Function,
}

export const CartContext = createContext({} as CartContextType)

function App() {
  const [cart, setCart] = useState(0)
  const cartInfo: CartContextType = {
    cart: cart,
    setCart,
  };
  return (
    <div className="max-w-[1366px]">
      <CartContext.Provider value={cartInfo}>
        <RouterProvider router={router}></RouterProvider>
      </CartContext.Provider>
      <Toaster />
    </div>
  );
}

export default App;
