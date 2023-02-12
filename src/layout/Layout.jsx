import React from 'react';
import Navbar from "./components/Navbar";

const Layout = ({children}) => {
    return (
        <div className="wrapper">
            <Navbar/>
            <section className="content">
                {children}
            </section>
        </div>
    );
};

export default Layout;