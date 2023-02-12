import React from 'react';
import {observer} from "mobx-react-lite";
import designStorage from "../../store/designStorage";
import {Link} from "react-router-dom";

const Sidebar = observer(() => {
    let classes = "main-sidebar sidebar-dark-primary elevation-4 "
    classes += designStorage.sidebarEnabled? "" : "d-none"
    return (
        <aside className={classes}>
            <nav className="sidebar mt-2">
                <ul className="nav nav-sidebar flex-column">
                    <li className="nav-item" onClick={() => designStorage.swapShowNavbar()}>
                        <button className="nav-link btn">
                            <i className="nav-icon fas fa-copy"></i>
                            <p>Close Menu</p>
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            <i className="nav-icon fas fa-copy"></i>
                            <p>Main menu</p>
                        </Link>
                    </li>
                    <li className="nav-header">DATA STREAMS</li>
                    <li className="nav-item">
                        <Link to={"/dataStreams"} className="nav-link">
                            <i className="nav-icon fas fa-copy"></i>
                            <p>Data Streams</p>
                        </Link>
                    </li>
                    <li className="nav-header">DATA SOURCES</li>
                    <li className="nav-item">
                        <Link to={"/generators"} className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt"></i>
                            <p>Generators</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/serial"} className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt"></i>
                            <p>Serial Ports</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt"></i>
                            <p>Web Sockets</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
});

export default Sidebar;