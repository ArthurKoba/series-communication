import React from 'react';
import {observer} from "mobx-react-lite";
import designStorage from "../../store/designStorage";

const Sidebar = observer(() => {
    console.log(designStorage.sidebarEnabled)
    let classes = "main-sidebar sidebar-dark-primary elevation-4 "
    classes += designStorage.sidebarEnabled? "" : "d-none"

    return (
        <aside className={classes}>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-copy"></i>
                                <p onClick={() => designStorage.swapShowNavbar()}>
                                    Close
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                        </li>
                        <li className="nav-header">EXAMPLES</li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-calendar-alt"></i>
                                <p>
                                    Calendar
                                    <span className="badge badge-info right">2</span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
});

export default Sidebar;