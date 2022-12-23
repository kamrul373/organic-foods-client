import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Nav from '../components/Shared/Navbar/Nav';
import { BsBagDash } from 'react-icons/bs';
import { CartContext } from '../App';


const Main = () => {
    const { cart } = useContext(CartContext)
    return (
        <div>
            <div className="drawer">
                <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* <!-- Navbar --> */}
                    <div className="w-full navbar shadow-lg  bg-white sticky top-0 z-30 lg:px-16 py-8">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="menu-drawer" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2 font-bold text-4xl"><Link to="/"><span className='text-secondary'>O</span><span className='text-primary'>rganio</span></Link></div>
                        <Link to="/cart" className="btn btn-ghost btn-circle mt-5 block lg:hidden">
                            <div className="indicator">
                                <BsBagDash className='text-2xl'></BsBagDash>
                                <span className="badge badge-sm badge-primary indicator-item text-white font-bold">{cart}</span>
                            </div>
                        </Link>
                        <div className="flex-none hidden lg:block">
                            <Nav></Nav>
                        </div>
                    </div>
                    {/* <!-- Page content here -->Content */}
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>
                <div className="drawer-side">
                    <label htmlFor="menu-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100">
                        {/* <!-- Sidebar content here --> */}
                        {/* <li><Link to="/">Sidebar Item 1</Link></li>
                        <li><Link to="/">Sidebar Item 2</Link></li>
                        <li><BsBagDash className='text-black'></BsBagDash></li> */}
                        <Nav></Nav>
                    </ul>

                </div>
            </div>
            {/* cart */}


        </div>
    );
};

export default Main;