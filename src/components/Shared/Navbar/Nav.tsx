import React from 'react';
import { Link } from "react-router-dom"
import { BsBagDash } from "react-icons/bs";
const Nav = () => {
    return (
        <ul className="menu menu-horizontal">
            {/* <!-- Navbar menu content here --> */}
            <li><Link to="/">Navbar Item 1</Link></li>
            <li><Link to="/">Navbar Item 2</Link></li>
            <li><BsBagDash></BsBagDash></li>
        </ul>

    )
};

export default Nav;