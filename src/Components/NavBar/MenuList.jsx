import { Modal, Menu } from 'antd';
import {
    ProfileOutlined,
    PlusSquareOutlined,
    SwitcherOutlined,
    TeamOutlined,
    LogoutOutlined,
    IdcardOutlined,
    BarChartOutlined,
    PieChartOutlined
} from "@ant-design/icons";
import AuthService from "../../services/auth.service.js";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const MenuList = () => {
    const user = AuthService.getCurrentUser();
    const role = user.ROLE;
    const navigate = useNavigate();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        AuthService.logout();
        localStorage.removeItem("user");
        window.location.reload();
    };

    const showLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };

    const handleCancelLogout = () => {
        setIsLogoutModalVisible(false);
    };

    // Определяем элементы меню в зависимости от роли
    const items = [
        ...(role === "USER" ? [
            {
                label: "Курсы",
                key: "courses",
                icon: <SwitcherOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate('/all-courses')
            },
            {
                label: "Мой курсы",
                key: "my-courses",
                icon: <ProfileOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate('/my-courses')
            },
            {
                label: "Анализ курсов",
                key: "courses-analysis",
                icon: <BarChartOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate('/analysis')
            }
        ] : []),
        ...(role === "MODERATOR" ? [

            {
                label: "Мои Курсы",
                key: "survey",
                icon: <ProfileOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate("/courses"),
            },
            {
                label: "УПР Курсами",
                key: "subscription-management", // Ensure this key is unique
                icon: <ProfileOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate("/subscribe"),
            },
            {
                label: "Анализ курсов",
                key: "analysis",
                icon: <PieChartOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate('/analysisCourses')
            }
        ] : []),
        ...(role === "ADMIN" ? [
            {
                label: "Пользователи",
                key: "users",
                icon: <TeamOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate("/users"),
            },
            {
                label: "Модераторы",
                key: "moderators",
                icon: <IdcardOutlined style={{ fontSize: "20px" }} />,
                onClick: () => navigate("/mod"),
            }
        ] : []),
        {
            label: "Выйти",
            key: "logout",
            icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
            onClick: showLogoutModal,
            style: { marginTop: 'auto', marginBottom: '20px' }
        }
    ];

    return (
        <>
            <Menu theme="dark" className="menuList" items={items} />

            <Modal
                title="Подтвердите выход"
                visible={isLogoutModalVisible}
                onOk={handleLogout}
                onCancel={handleCancelLogout}
                okText="Да, выйти"
                cancelText="Отмена"
            >
                <p>Вы уверены, что хотите выйти?</p>
            </Modal>
        </>
    );
};

export default MenuList;
