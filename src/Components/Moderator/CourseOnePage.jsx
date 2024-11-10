import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Typography, List, Descriptions, Spin, FloatButton, Modal, Popconfirm, notification } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import CoursesService from '../../services/courses.service.js';
import CreateModule from './CreateModule.jsx';

const { Title, Text } = Typography;

export default function OneCoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [deletingModuleId, setDeletingModuleId] = useState(null); // ID удаляемого модуля

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        setLoading(true);
        try {
            const response = await CoursesService.getCourseById(id);
            setCourse(response);
        } catch (error) {
            console.error("Error fetching course:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteModule = async (moduleId) => {
        setDeletingModuleId(moduleId);  // Установка ID удаляемого модуля
        try {
            await CoursesService.deleteModule(id, moduleId);
            notification.success({
                message: "Модуль удален",
                description: `Модуль был успешно удален.`,
            });
            // Обновляем список после удаления
            setCourse((prevCourse) => ({
                ...prevCourse,
                modules: prevCourse.modules.filter((module) => module.id !== moduleId),
            }));
        } catch (error) {
            console.error("Ошибка при удалении модуля:", error);
            notification.error({
                message: "Ошибка при удалении модуля",
                description: error?.response?.data?.message || "Не удалось удалить модуль. Попробуйте снова.",
            });
        } finally {
            setDeletingModuleId(null);  // Сброс ID после завершения
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!course) {
        return <div style={{ textAlign: 'center', padding: '24px' }}>No course data found.</div>;
    }

    return (
        <div style={{ padding: '40px 24px', backgroundColor: '#f9f9f9', width: '100%' }}>
            <Card bordered={false} style={{ maxWidth: 800, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '20px' }}>{course.name}</Title>

                <Descriptions bordered layout="vertical" column={1} style={{ marginBottom: '20px' }}>
                    <Descriptions.Item label={<Text strong>Description</Text>}>
                        {course.description || "No description available"}
                    </Descriptions.Item>
                    <Descriptions.Item label={<Text strong>Company</Text>}>
                        {course.companyName || "No company specified"}
                    </Descriptions.Item>
                    <Descriptions.Item label={<Text strong>Created At</Text>}>
                        {course.createAt || "No creation date"}
                    </Descriptions.Item>
                </Descriptions>

                <Title level={3} style={{ marginBottom: '15px', color: '#595959' }}>Modules</Title>
                <List
                    bordered
                    dataSource={course.modules || []}
                    renderItem={(module) => (
                        <List.Item
                            key={module.id}
                            style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Link
                                    to={`/courses/${id}/module/${module.id}`}
                                    style={{ color: '#1890ff', fontWeight: 'bold', marginRight: '10px' }}
                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                >
                                    {module.name}
                                </Link>
                                <Text>{module.lessons} Lessons</Text>
                            </div>
                            <Popconfirm
                                title="Are you sure you want to delete this module?"
                                onConfirm={() => handleDeleteModule(module.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    loading={deletingModuleId === module.id}  // Кнопка в состоянии загрузки только для конкретного модуля
                                    onMouseEnter={(e) => e.target.style.color = '#f5222d'}
                                    onMouseLeave={(e) => e.target.style.color = 'inherit'}
                                />
                            </Popconfirm>
                        </List.Item>
                    )}
                    style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}
                />

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type="primary" size="large" style={{ width: '100%', borderRadius: '8px' }}>Enroll Now</Button>
                </div>
            </Card>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CreateModule id={id} />
            </Modal>

            <FloatButton
                icon={<PlusSquareOutlined />}
                theme="dark"
                type="primary"
                tooltip={<div>Добавить модуль</div>}
                onClick={() => setModal(true)}
                style={{
                    right: 24,
                    bottom: 24,
                }}
            />
        </div>
    );
}
