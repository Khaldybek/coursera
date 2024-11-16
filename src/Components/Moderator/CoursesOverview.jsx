import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spin, notification } from "antd";
import axios from "axios";

const CoursesOverview = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [subscriberStats, setSubscriberStats] = useState([]);
    const [statsLoading, setStatsLoading] = useState(false);

    // Получение списка курсов
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/api/v1/courses");
                setCourses(response.data);
            } catch (error) {
                notification.error({
                    message: "Ошибка загрузки курсов",
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Загрузка данных подписчиков
    const fetchCourseAnalysis = async (courseId) => {
        setStatsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/analysis/subscribers/${courseId}`);
            setSubscriberStats(response.data);
            setSelectedCourse(courseId);
        } catch (error) {
            notification.error({
                message: "Ошибка загрузки аналитики",
                description: error.message,
            });
        } finally {
            setStatsLoading(false);
        }
    };

    // Экспорт в Excel
    const exportToExcel = async (courseId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/analysis/export/${courseId}`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "subscribers_analysis.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            notification.success({
                message: "Экспорт успешно завершен",
                description: "Файл был загружен.",
            });
        } catch (error) {
            notification.error({
                message: "Ошибка экспорта",
                description: error.message,
            });
        }
    };

    // Колонки для таблицы курсов
    const courseColumns = [
        {
            title: "Название курса",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Описание",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Компания",
            dataIndex: "companyName",
            key: "companyName",
        },
        {
            title: "Дата создания",
            dataIndex: "createAt",
            key: "createAt",
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => fetchCourseAnalysis(record.id)}
                    >
                        Анализ
                    </Button>
                    <Button
                        type="link"
                        onClick={() => exportToExcel(record.id)}
                    >
                        Экспорт в Excel
                    </Button>
                </>
            ),
        },
    ];

    // Колонки для таблицы аналитики
    const statsColumns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Название курса",
            dataIndex: "course_name",
            key: "course_name",
        },
        {
            title: "Всего уроков",
            dataIndex: "total_lessons",
            key: "total_lessons",
        },
        {
            title: "Завершенные уроки",
            dataIndex: "completed_lessons",
            key: "completed_lessons",
        },
        {
            title: "Оставшиеся уроки",
            dataIndex: "remaining_lessons",
            key: "remaining_lessons",
        },
        {
            title: "Процент завершения",
            dataIndex: "completion_percentage",
            key: "completion_percentage",
            render: (value) => `${value}%`,
        },
        {
            title: "Средний балл",
            dataIndex: "average_test_score",
            key: "average_test_score",
        },
        {
            title: "Процент успешности тестов",
            dataIndex: "test_success_percentage",
            key: "test_success_percentage",
            render: (value) => `${value}%`,
        },
        {
            title: "Статус подписки",
            dataIndex: "subscription_status",
            key: "subscription_status",
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h2>Анализ курсов</h2>
            <Spin spinning={loading}>
                <Table
                    columns={courseColumns}
                    dataSource={courses}
                    rowKey="id"
                    bordered
                />
            </Spin>
            <Modal
                title="Анализ подписчиков"
                visible={!!selectedCourse}
                onCancel={() => setSelectedCourse(null)}
                footer={null}
                width={1400}
            >
                <Spin spinning={statsLoading}>
                    <Table
                        columns={statsColumns}
                        dataSource={subscriberStats}
                        rowKey="email"
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </Spin>
            </Modal>
        </div>
    );
};

export default CoursesOverview;
