import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import LessonPage from "./Components/Moderator/LessonPage.jsx";
import ModuleDetailLesson from "./Components/UsersHandle/ModuleDetailLesson.jsx";
import CoursItems from "./Components/Moderator/CoursItems.jsx";
import OneCoursePage from "./Components/Moderator/CourseOnePage.jsx";
import TopicPage from "./Components/Moderator/TopicPage.jsx";
import LessonDetail from "./Components/UsersHandle/LessonDetail.jsx";
import EventBus from "./common/EventBus";
import Navbar from "./Components/NavBar/Navbar.jsx";
import OneTopicPage from "./Components/UsersHandle/OneTopicPage.jsx";
const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.ROLE.includes("MODERATOR"));
            setShowAdminBoard(user.ROLE.includes("ADMIN"));
            setShowUserBoard(user.ROLE.includes("USER"));
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
        setShowUserBoard(false);
        setCurrentUser(undefined);
        navigate("/login"); // Перенаправление на логин после выхода
    };

    return (
        <div className="mainDisplay">
            {currentUser && <Navbar />}
            <div  style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center",width:'100%' }}>
                <Routes>
                    {!currentUser ? (
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Login />} />
                        </>
                    ) : (
                        <>
                            {showUserBoard && (
                                <>

                                    {/*<Route path="/users" element={<Users />} />*/}
                                    {/*<Route path="/" element={<AboutUs />} />*/}
                                    {/*<Route path="/home" element={<Home />} />*/}
                                    {/*<Route path="/profile" element={<Profile />} />*/}
                                    {/*<Route path="/user" element={<BoardUser />} />*/}
                                    <Route path="/my-courses" element={<UsersCourse />} />
                                    <Route path="/my-courses/:courseId" element={<CourseDetail />} />
                                    <Route path="/course/:courseId/module/:moduleId" element={<ModuleDetailLesson />} />
                                    <Route path="/lesson/:lessonId" element={<LessonDetail />} />
                                    <Route path="/topic/:topicId" element={<OneTopicPage />} />

                                </>
                            )}
                            {showModeratorBoard && (
                                <>
                                    <Route path="/mod" element={<BoardModerator />} />
                                    <Route path="/courses" element={<CoursItems />} />
                                    <Route path="/courses/:id" element={<OneCoursePage />} />
                                    <Route path="/courses/:id/module/:moduleId" element={<ModulePage />} />
                                    <Route path="/courses/:id/modules/:moduleId/lessons/:lessonId" element={<LessonPage />} />
                                    <Route path="/courses/:id/modules/:moduleId/lessons/:lessonId/topics/:topicId" element={<TopicPage />} />
                                    <Route path="*" element={<Navigate to="/courses" replace />} />
                                </>
                            )}
                            {showAdminBoard && (
                                <>
                                    <Route path="/mod" element={<Moderators />} />
                                    <Route path="/users" element={<Users />} />
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
