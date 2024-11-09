import { Menu } from 'antd';
import {
    ProfileOutlined,
    PlusSquareOutlined,
    SwitcherOutlined,
    TeamOutlined,
    LogoutOutlined,
    IdcardOutlined
} from "@ant-design/icons";
import AuthService from "../../services/auth.service.js";

const MenuList = () => {
    const user = AuthService.getCurrentUser();
    const role = user.ROLE;

    const handleLogout = () => {
        AuthService.logout();
        localStorage.removeItem("user");
        window.location.reload();
    };

    // Определяем элементы меню в зависимости от роли
    const items = [
        ...(role === "USER" ? [
            {
                label: "Курсы",
                key: "courses",
                icon: <SwitcherOutlined style={{ fontSize: "20px" }} />
            },
            {
                label: "Опрос",
                key: "survey",
                icon: <ProfileOutlined style={{ fontSize: "20px" }} />
            }
        ] : []),
        ...(role === "MODERATOR" ? [
            {
                label: "Создать Курсы",
                key: "create courses",
                icon: <PlusSquareOutlined style={{ fontSize: "20px" }} />
            },
            {
                label: "Мои Курсы",
                key: "survey",
                icon: <ProfileOutlined style={{ fontSize: "20px" }} />
            }
        ] : []),
        ...(role === "ADMIN" ? [
            {
                label: "Пользователи",
                key: "users",
                icon: <TeamOutlined style={{ fontSize: "20px" }} />
            },
            {
                label: "Модераторы",
                key: "moderators",
                icon: <IdcardOutlined style={{ fontSize: "20px" }} />
            }
        ] : []),
        {
            label: "Выйти",
            key: "logout",
            icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
            onClick: handleLogout,
            style: { marginTop: 'auto', marginBottom: '20px' }
        }
    ];

    return (
        <Menu theme="dark" className="menuList" items={items} />
    );
};

export default MenuList;
