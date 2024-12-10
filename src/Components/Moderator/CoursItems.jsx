import React, { useEffect, useState } from "react";
import { Spin, FloatButton, Modal, notification, Empty, Button } from "antd";
import { PlusSquareOutlined, FileAddOutlined } from "@ant-design/icons";
import CoursItem from "./CoursItem";
import CoursesService from "../../services/courses.service.js";
import "./Style/Courses.css";
import CreateCourses from "./CreateCourses";

const CoursItems = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    // Функция для загрузки курсов
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const courses = await CoursesService.getAll();
            setAllCourses(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(); // Получаем курсы при монтировании компонента
    }, []);

    // Функция для добавления нового курса и уведомления
    const handleCourseCreated = (newCourse) => {
        setAllCourses((prevCourses) => [...prevCourses, newCourse]); // Добавляем курс в список
        notification.success({
            message: "Course Created",
            description: `The course "${newCourse.name}" has been successfully created!`,
            placement: "topRight",
        });
    };

    return (
        <div className="courses-container" style={{ paddingTop: 30 }}>
            {loading ? (
                <Spin size="large" tip="Loading courses..." />
            ) : allCourses.length === 0 ? (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Empty
                        description={
                            <span>
                <strong>No Courses Found</strong>
                <br />
                Start creating your first course now!
              </span>
                        }
                        imageStyle={{ height: 120 }}
                    />
                    <Button
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => setModal(true)}
                        style={{ marginTop: 16 }}
                    >
                        Create Course
                    </Button>
                </div>
            ) : (
                allCourses.map((course, index) => (
                    <div className="course-item" key={index}>
                        <CoursItem data={course} />
                    </div>
                ))
            )}

            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CreateCourses
                    onCourseCreated={handleCourseCreated}
                    closeModal={() => setModal(false)}
                />
            </Modal>

            <FloatButton
                icon={<PlusSquareOutlined />}
                theme="dark"
                type="primary"
                onClick={() => setModal(true)} // Обработчик клика
                style={{
                    right: 24,
                    bottom: 24,
                }}
            />
        </div>
    );
};

export default CoursItems;
