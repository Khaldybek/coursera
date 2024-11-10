import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate ,Navigate} from "react-router-dom";
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
import UsersCourse from "./Components/UsersHandle/UsersCourse";
import CourseDetail from "./Components/UsersHandle/CourseDetail.jsx";
import ModulePage from "./Components/Moderator/ModulePage.jsx";

import CoursItems from "./Components/Moderator/CoursItems.jsx";
import OneCoursePage from "./Components/Moderator/CourseOnePage.jsx";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Navbar from "./Components/NavBar/Navbar.jsx";
const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    console.log(currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.ROLE.includes("MODERATOR"));
            setShowAdminBoard(user.ROLE.includes("ADMIN"));
            setShowUserBoard(user.ROLE.includes("USER"))
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
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </>
                    ) : (
                        <>

                            {showUserBoard && (
                                <>
                                    <Route exact path="/" element={<AboutUs />} />
                                    <Route exact path="/home" element={<Home />} />
                                    <Route exact path="/profile" element={<Profile />} />
                                    <Route path="/user" element={<BoardUser />} />
                                    <Route path="/my-courses" element={<UsersCourse />} />
                                    <Route path="/my-courses/:courseId" element={<CourseDetail />} />
                                </>
                            )}
                            {showModeratorBoard && (
                                <>
                                    <Route path="/mod" element={<BoardModerator />} />
                                    <Route exact path="/courses" element={<CoursItems />} />
                                    <Route exact path="/courses/:id" element={<OneCoursePage />} />
                                    <Route exact path="/courses/:id/module/:moduleId" element={<ModulePage />} />
                                </>
                            )}
                            {showAdminBoard && (
                                <>
                                    <Route exact path="/mod" element={<Moderators />} />
                                    <Route exact path="/users" element={<Users />} />
                                    <Route path="/admin" element={<BoardAdmin />} />
                                </>
                            )}
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;
