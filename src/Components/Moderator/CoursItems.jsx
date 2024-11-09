import React, { useEffect, useState } from 'react';
import {Spin, FloatButton, Modal} from 'antd';
import CoursItem from './CoursItem';
import CoursesService from "../../services/courses.service.js";
import "./Style/Courses.css"
import {PlusSquareOutlined} from "@ant-design/icons";

import InputOTPPage from "../InputOTPPage.jsx";
const CoursItems = () => {

    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ modal, setModal] = useState(false);
    useEffect(() => {
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

        fetchCourses();
    }, []);

    return (
        <div className="courses-container">
            {loading ? (
                <Spin size="large" tip="Loading courses..." />
            ) : (
                allCourses.map((course, index) => (
                    <CoursItem key={index} data={course} />
                ))
            )}

            <Modal  open={modal} onCancel={() => {
                setModal(false);
            }}  footer={null}>
                gfbfbf
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
            />        </div>
    );
};

export default CoursItems;
