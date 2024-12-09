import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from './logo.png'; // Импортируем изображение
import './Logo.css';

const Logo = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/'); // Переход на главную страницу
    };

    return (
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img
                src={logoImage}
                alt="Logo"
                style={{ width: '80%' }} // Настраиваем размеры изображения
            />
        </div>
    );
};

export default Logo;

