import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { BsBagDash } from "react-icons/bs";
import { CartContext } from '../../../App';

const Nav = () => {
    const { cart } = useContext(CartContext)
    return (
        <ul className="menu lg:menu-horizontal">
            {/* <!-- Navbar menu content here --> */}
            <li><Link to="/">Navbar Item 1</Link></li>
            <li><Link to="/">Navbar Item 2</Link></li>
            <Link to="/cart" className=" hidden lg:block ">
                <div className='flex items-center justify-center btn btn-ghost btn-circle'>
                    <div className="indicator ">
                        <BsBagDash className='text-2xl '></BsBagDash>
                        <span className="badge badge-sm badge-primary indicator-item text-white font-bold ">{cart}</span>
                    </div>
                </div>
            </Link>
        </ul>

    )
};

export default Nav;