import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AboutUs from "./Components/AboutUs.jsx";
import AuthService from "./services/auth.service";
import Moderators from "./Components/Admin/Moderators.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Home from "./Components/Home.jsx";
import Profile from "./Components/Profile.jsx";
import BoardUser from "./Components/BoardUser.jsx";
import BoardModerator from "./Components/BoardModerator.jsx";
import BoardAdmin from "./Components/BoardAdmin.jsx";
import Users from "./Components/Admin/Users.jsx";
import CreateCourses from "./Components/Moderator/CreateCourses.jsx";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Navbar from "./Components/NavBar/Navbar.jsx";
const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    console.log(currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.ROLE.includes("MODERATOR"));
            setShowAdminBoard(user.ROLE.includes("ADMIN"));
        }
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [navigate]);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
        navigate("/login"); // Перенаправление на логин после выхода
    };
    return (
        <div className="mainDisplay">
            {currentUser &&<Navbar /> }
            <div className="container mt-3" style={{ margin: 0, padding: 0 ,display:"flex" ,justifyContent:"center" }}>
                <Routes>
                    {!currentUser ? (
                        <>
                            <Route exact path="/" element={<Login />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/register" element={<Register />} />
                        </>
                    ) : (
                        <>
                            <Route exact path="/create" element={<CreateCourses />} />
                            <Route exact path="/mod" element={<Moderators />} />
                            <Route exact path="/users" element={<Users />} />
                            <Route exact path="/" element={<AboutUs />} />
                            <Route exact path="/home" element={<Home />} />
                            <Route exact path="/profile" element={<Profile />} />
                            <Route path="/user" element={<BoardUser />} />
                            {showModeratorBoard && (
                                <Route path="/mod" element={<BoardModerator />} />
                            )}
                            {showAdminBoard && (
                                <Route path="/admin" element={<BoardAdmin />} />
                            )}
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;
