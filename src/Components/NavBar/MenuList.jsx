import {Menu} from 'antd';
import {ProfileOutlined,SwitcherOutlined,TeamOutlined} from "@ant-design/icons";
const MenuList = () => {
    return (
        <Menu theme={"dark"} className="menuList">
            <Menu.Item key="courses" icon={<SwitcherOutlined  />}>
                Курсы
            </Menu.Item>
            <Menu.Item key="survey" icon={<ProfileOutlined />}>
                Опрос
            </Menu.Item>
            <Menu.Item key="users" icon={<TeamOutlined />}>
               Пользватели
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;