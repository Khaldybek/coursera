import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import AboutUs from "./Components/AboutUs";
import AuthService from "./services/auth.service";
import Moderators from "./Components/Admin/Moderators";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BoardUser from "./Components/BoardUser";
import BoardModerator from "./Components/BoardModerator";
import BoardAdmin from "./Components/BoardAdmin";
import Users from "./Components/Admin/Users";
import UsersCourse from "./Components/UsersHandle/UsersCourse";
import CourseDetail from "./Components/UsersHandle/CourseDetail";
import ModulePage from "./Components/Moderator/ModulePage";
import LessonPage from "./Components/Moderator/LessonPage";
import ModuleDetailLesson from "./Components/UsersHandle/ModuleDetailLesson";
import CoursItems from "./Components/Moderator/CoursItems";
import OneCoursePage from "./Components/Moderator/CourseOnePage";
import TopicPage from "./Components/Moderator/TopicPage";
import LessonDetail from "./Components/UsersHandle/LessonDetail";
import AllCourse from "./Components/subscribe/AllCourse";
import AllCourseDetail from "./Components/subscribe/AllCourseDetail";
import ModeratorCourses from "./Components/Moderator/subscribe/ModeratorCourses";
import GetAllCoursesModerator from "./Components/Moderator/subscribe/GetAllCoursesModerator";
import CourseAnalysis from "./Components/UsersHandle/CourseAnalysis.jsx";
// Utilities
import EventBus from "./common/EventBus";
import Navbar from "./Components/NavBar/Navbar.jsx";
import CoursesOverview from "./Components/Moderator/CoursesOverview.jsx";
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
        navigate("/login");
    };

    return (
        <div className="mainDisplay">
            {currentUser && <Navbar />}
            <div className="container" style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}>
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
                                    <Route path="/" element={<AboutUs />} />
                                    {/*<Route path="/home" element={<Home />} />*/}
                                    {/*<Route path="/profile" element={<Profile />} />*/}
                                    {/*<Route path="/user" element={<BoardUser />} />*/}

                                    <Route path="/all-courses/:courseId" element={<AllCourseDetail />} />
                                    <Route path="/all-courses" element={<AllCourse />} />
                                    <Route path="/analysis" element={<CourseAnalysis />} />
                                    <Route path="/my-courses" element={<UsersCourse />} />
                                    <Route path="/my-courses/:courseId" element={<CourseDetail />} />
                                    <Route path="/course/:courseId/module/:moduleId" element={<ModuleDetailLesson />} />
                                    <Route path="/lesson/:lessonId" element={<LessonDetail />} />


                                </>
                            )}
                            {showModeratorBoard && (
                                <>
                                    <Route path="/analysisCourses" element={<CoursesOverview />} />
                                    <Route path="/mod" element={<BoardModerator />} />
                                    <Route path="/courses" element={<CoursItems />} />
                                    <Route path="/courses/:id" element={<OneCoursePage />} />
                                    <Route path="/courses/:id/module/:moduleId" element={<ModulePage />} />
                                    <Route path="/courses/:id/modules/:moduleId/lessons/:lessonId" element={<LessonPage />} />
                                    <Route path="/courses/:id/modules/:moduleId/lessons/:lessonId/topics/:topicId" element={<TopicPage />} />
                                    <Route path="/subscribe" element={<ModeratorCourses />} />
                                    <Route path="/subscribe/:courseId" element={<GetAllCoursesModerator />} />
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
