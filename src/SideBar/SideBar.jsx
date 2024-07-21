import React, { useState } from 'react';
import {
    FaRegChartBar,
    FaShoppingBag,
    FaTh,
    FaFileInvoice,
    FaBars
} from "react-icons/fa"

import { IoPersonOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './SideBar.css'

const SideBar = ({children}) => {
    const navigate = useNavigate()
    const [isOpen, setisOpen] = useState(false);
    const toggle = () => setisOpen (!isOpen)

    const menuItem =[
        {
            path:'/page1',
            name: "Dashboard",
            icon: <FaTh/>
        },
        {
            path:'/Analytics',
            name: "Analytics",
            icon: <FaRegChartBar/>
        },
        {
            path:'/Products',
            name: "Products",
            icon: <FaShoppingBag/>
        },
        {
            path:'/Parties',
            name: "Parties",
            icon: <IoPersonOutline />
        },
        {
            path:'/Orders',
            name: "Orders",
            icon: <FaFileInvoice />
        }
    ]

    return(
            <div style={{width: isOpen ? '300px': '50px'}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? 'block': 'none'}} className="logo">Logo</h1>
                    <div style={{marginLeft: isOpen ? '50px': '0px'}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to= {item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? 'block': 'none'}} className="link_text"> {item.name}</div>
                        </NavLink>
                    ))
                }
                <div className="bottom_section">
                    <TbLogout2 onClick={() => navigate('/')} className='logo' />
                        <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">Logout</div>
                </div>
                <main> {children}</main>
            </div>
            
    );
}

export default SideBar