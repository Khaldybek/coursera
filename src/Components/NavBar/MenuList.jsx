import { Menu } from 'antd';
import { ProfileOutlined,PlusSquareOutlined, SwitcherOutlined, TeamOutlined,
    LogoutOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.js";

const MenuList = () => {
    const user=AuthService.getCurrentUser()
    const role=user.ROLE
    console.log(role)
    const handleLogout = () => {
        AuthService.logout();
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <Menu theme="dark" className="menuList">
            {
                role==="USER" && (
                    <>
                        <Menu.Item key="courses" icon={<SwitcherOutlined style={{ fontSize: "20px" }} />}>
                            Курсы
                        </Menu.Item>
                        <Menu.Item key="survey" icon={<ProfileOutlined style={{ fontSize: "20px" }} />}>
                            Опрос
                        </Menu.Item>
                    </>
                )
            }
            {
                role==="MODERATOR" && (
                    <>
                        <Menu.Item key="create courses" icon={<PlusSquareOutlined style={{ fontSize: "20px" }} />}>
                            Создать Курсы
                        </Menu.Item>
                        <Menu.Item key="survey" icon={<ProfileOutlined style={{ fontSize: "20px" }} />}>
                            Мои Курсы
                        </Menu.Item>
                    </>
                )
            }
            {role === "ADMIN" && (
                <>
                    <Menu.Item key="users" icon={<TeamOutlined style={{ fontSize: "20px" }} />}>
                        Пользователи
                    </Menu.Item>
                    <Menu.Item key="moderators" icon={<IdcardOutlined style={{ fontSize: "20px" }} />}>
                        Модераторы
                    </Menu.Item>
                </>
            )}
            <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined style={{ fontSize: "20px" }} />} className="logout" style={{ marginTop: 'auto', marginBottom: '20px' }}>
                Выйти
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;
