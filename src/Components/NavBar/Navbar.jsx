import  { useState } from 'react';
import {Layout } from 'antd';
import "./Navbar.css"
import Logo from "./Logo.jsx";
import MenuList from "./MenuList.jsx";
const {Header ,Sider}=Layout;
const Navbar=() => {
    return(
        <Layout>
            <Sider className="sidebar">
                <Logo/>
                <MenuList/>
            </Sider>
        </Layout>
    )
}
export default Navbar;