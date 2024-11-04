import {Menu} from 'antd';
import {ProfileOutlined,SwitcherOutlined,TeamOutlined,LogoutOutlined,IdcardOutlined} from "@ant-design/icons";
import AuthService from "../../services/auth.service.js";
const MenuList = () => {
    return (

        <Menu theme={"dark"} className="menuList">
            <Menu.Item key="courses" icon={<SwitcherOutlined style={{fontSize:"20px"}} />}>
                Курсы
            </Menu.Item>
            <Menu.Item key="survey" icon={<ProfileOutlined style={{fontSize:"20px"}}/>}>
                Опрос
            </Menu.Item>
            <Menu.Item key="users" icon={<TeamOutlined style={{fontSize:"20px"}}/>}>
               Пользватели
            </Menu.Item>
            <Menu.Item key="moderators" icon={<IdcardOutlined style={{fontSize:"20px"}}/>}>
                Модераторы
            </Menu.Item>
            <Menu.Item key="logout" type="button" onClick={() => {
                console.log("Logout clicked");
            }} icon={<LogoutOutlined style={{fontSize:"20px"}}/>} className="logout" style={{ marginTop: 'auto' , marginBottom: '20px' }}>
                Выйти
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;