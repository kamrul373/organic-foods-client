import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/routes';

function App() {

  return (
    <div className="max-w-[1366px]">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
