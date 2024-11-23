import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CodepenCircleOutlined } from '@ant-design/icons';
const Logo = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/'); // Переход на главную страницу
    };

    return (
        <div className="logo" >
            <div className="logo-icon">
                <CodepenCircleOutlined onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
};

export default Logo;
