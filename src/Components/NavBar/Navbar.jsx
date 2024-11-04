import  { useState } from 'react';
import {Layout } from 'antd';
import "./Navbar.css"
import Logo from "./Logo.jsx";
import MenuList from "./MenuList.jsx";
const {Header ,Sider}=Layout;
const Navbar=() => {
    return(
        <div style={{ flex: '0 0 200px', width: '200px', maxWidth: '230px', minWidth: '200px' }}>
            <Sider className="sidebar">
                <Logo/>
                <MenuList/>
            </Sider>

        </div>
    )
}
export default Navbar;