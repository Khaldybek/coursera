import {Menu} from 'antd';
import {ProfileOutlined,SwitcherOutlined,TeamOutlined,LogoutOutlined} from "@ant-design/icons";
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
            <Menu.Item key="logout" icon={<LogoutOutlined style={{fontSize:"20px"}}/>} className="logout" style={{ marginTop: 'auto' , marginBottom: '20px' }}>
                Выйти
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;