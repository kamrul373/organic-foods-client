import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Nav from '../components/Shared/Navbar/Nav';

const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;