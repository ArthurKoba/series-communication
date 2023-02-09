import React, {useState} from 'react';
import designStorage from "../../store/designStorage";

const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#" role="button" onClick={() => designStorage.swapShowNavbar()}>
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <button className="nav-link btn btn-dark"
                            onClick={() => designStorage.swapShowNavbar()}>Sidebar</button>
                    {/*<a href="index3.html" className="nav-link">Home</a>*/}
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <button className="nav-link btn btn-dark"
                            onClick={() => designStorage.swapDarkMode()}>DarkTheme</button>
                    {/*<a href="#" className="nav-link">Contact</a>*/}
                </li>
            </ul>
            {/*<ul className="navbar-nav ml-auto">*/}
            {/*    <li className="nav-item">*/}
            {/*        <span></span>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </nav>
    );
};

export default Navbar;