import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, List, Descriptions, Spin, notification, Modal, FloatButton, Popconfirm, Tag } from 'antd';
import ModulesService from '../../services/modules.service.js';
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateLesson from "./CreateLesson.jsx";
import "./Style/CourseOnePage.css";
import LessonService from "../../services/lesson.service.js";
const { Title, Text } = Typography;

export default function ModulePage() {
    const { id, moduleId } = useParams();
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchModule();
    }, [moduleId]);

    const fetchModule = async () => {
        setLoading(true);
        try {
            const response = await ModulesService.getModuleById(moduleId);
            if (response) {
                setModule(response);
            } else {
                notification.warning({
                    message: "Модуль не найден",
                    description: `Модуль с ID ${moduleId} не существует.`,
                });
            }
        } catch (error) {
            console.error("Ошибка при загрузке модуля:", error);
            notification.error({
                message: "Ошибка загрузки",
                description: "Не удалось загрузить информацию о модуле.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await LessonService.deleteLesson(lessonId);
            setModule((prev) => ({
                ...prev,
                lessons: prev.lessons.filter((lesson) => lesson.id !== lessonId),
            }));
            notification.success({
                message: "Урок удалён",
                description: `Урок успешно удалён.`,
            });
        } catch (error) {
            console.error("Ошибка при удалении урока:", error);
            notification.error({
                message: "Ошибка удаления",
                description: "Не удалось удалить урок.",
            });
        }
    };

    const addLessonToModule = (newLesson) => {
        setModule((prev) => ({
            ...prev,
            lessons: [...prev.lessons, newLesson],
        }));
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!module) {
        return <div style={{ textAlign: 'center', padding: '24px' }}>Модуль не найден.</div>;
    }

    return (
        <div style={{ padding: '40px 24px', backgroundColor: '#f9f9f9', width: '100%' }}>
            <Card bordered={false} style={{ maxWidth: 800, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '20px' }}>{module.name}</Title>

                <Descriptions bordered layout="vertical" column={1} style={{ marginBottom: '20px' }}>
                    <Descriptions.Item label={<Text strong>Module ID</Text>}>
                        {module.id}
                    </Descriptions.Item>
                    <Descriptions.Item label={<Text strong>Module Name</Text>}>
                        {module.name}
                    </Descriptions.Item>
                </Descriptions>

                <Title level={3} style={{ marginBottom: '15px', color: '#595959' }}>Lessons</Title>
                <List
                    bordered
                    dataSource={module.lessons || []}
                    renderItem={(lesson) => (
                        <List.Item key={lesson.id} className="module-item" actions={[
                            <Popconfirm
                                title="Удалить урок"
                                description="Вы уверены, что хотите удалить этот урок?"
                                onConfirm={() => handleDeleteLesson(lesson.id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <DeleteOutlined style={{ color: 'red' }} />
                            </Popconfirm>
                        ]}>
                            <List.Item.Meta
                                title={
                                    <Link to={`/courses/${id}/modules/${moduleId}/lessons/${lesson.id}`}>
                                        <Text strong>{lesson.name}</Text>
                                    </Link>
                                }
                                description={
                                    <>
                                        <p>{lesson.description}</p>
                                        <Tag color={getLevelColor(lesson.level)}>{lesson.level}</Tag>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                    style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}
                />
            </Card>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CreateLesson moduleId={moduleId} addLessonToModule={addLessonToModule} onClose={() => setModal(false)} />
            </Modal>

            <FloatButton
                icon={<PlusSquareOutlined />}
                theme="dark"
                type="primary"
                tooltip={<div>Добавить урок</div>}
                onClick={() => setModal(true)}
                style={{
                    right: 24,
                    bottom: 24,
                }}
            />
        </div>
    );
}

// Функция для определения цвета тега по числовому уровню
const getLevelColor = (level) => {
    if (level >= 1 && level <= 3) {
        return 'green'; // Легкий уровень
    } else if (level >= 4 && level <= 7) {
        return 'orange'; // Средний уровень
    } else if (level >= 8 && level <= 10) {
        return 'red'; // Сложный уровень
    }
    return 'blue'; // Для неопределенного уровня
};
