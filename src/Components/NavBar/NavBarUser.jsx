import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../Style/imeg/2bf1422598e3129ec9052c560640d366.jpg';

const NavBar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static" color="primary" sx={{ paddingX: 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 48 }}>
                {/* Left Side - Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1, fontSize: '1rem' }}>
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box
                        component="img"
                        src={Logo}
                        alt="Logo"
                        sx={{ height: 30, marginRight: 1, cursor: 'pointer' }}
                        onClick={() => handleNavigate('/')}
                    />
                    <Typography variant="subtitle1" sx={{ cursor: 'pointer', fontSize: '1rem' }} onClick={() => handleNavigate('/')}>
                        JavaRush
                    </Typography>
                </Box>

                {/* Center - Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button color="inherit" onClick={() => handleNavigate('/quests')} sx={{ fontSize: '0.875rem', padding: '4px 8px' }}>Карта квестов</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/lectures')} sx={{ fontSize: '0.875rem', padding: '4px 8px' }}>Лекции</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/open-quests')} sx={{ fontSize: '0.875rem', padding: '4px 8px' }}>Открытые квесты</Button>
                </Box>

                {/* Right Side - User Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>UserName</Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleNavigate('/logout')} sx={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                        Выйти
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
