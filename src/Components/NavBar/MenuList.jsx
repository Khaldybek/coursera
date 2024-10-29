import {Menu} from 'antd';
import {HomeOutlined,SwitcherOutlined} from "@ant-design/icons";
const MenuList = () => {
    return (
        <Menu theme={"dark"}>
            <Menu.Item key="courses" icon={<SwitcherOutlined  />}>
                Курсы
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;