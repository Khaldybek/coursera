import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, List, Spin,notification, Modal, Button, Popconfirm, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import TopicService from "../../services/topic.service.js"; // Предположим, у нас есть TopicService для работы с API тем
const { TextArea } = Input;
const { Title, Text } = Typography;

export default function LessonPage() {
    const { id, moduleId, lessonId } = useParams(); // Получаем параметры из URL
    const [lesson, setLesson] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTopic, setNewTopic] = useState({
        name: '',
        description: '',
        title: '',
    });

    useEffect(() => {
        fetchLessonData();
    }, [lessonId]);

    const fetchLessonData = async () => {
        setLoading(true);
        try {
            // Загружаем данные урока и темы одновременно
            const [lessonResponse, topicsResponse] = await Promise.all([
                fetch(`http://localhost:8000/api/v1/lessons/${lessonId}`).then((res) => res.json()),
                fetch(`http://localhost:8000/api/topics/by-lesson/${lessonId}`).then((res) => res.json())
            ]);

            setLesson(lessonResponse);
            setTopics(topicsResponse);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            notification.error({
                message: "Ошибка загрузки",
                description: "Не удалось загрузить данные для урока.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTopic = async () => {
        try {
            const response = await TopicService.createTopic(lessonId, newTopic.name,newTopic.description,newTopic.title);
            setTopics(prev => [...prev, response]);
            setModalVisible(false);
            notification.success({
                message: "Тема добавлена",
                description: `Тема "${newTopic.name}" успешно добавлена.`,
            });
            setNewTopic({ name: '', description: '', title: '' }); // Сброс формы
        } catch (error) {
            notification.error({
                message: "Ошибка при добавлении темы",
                description: "Не удалось добавить тему. Попробуйте снова.",
            });
        }
    };

    const handleDeleteTopic = async (topicId) => {
        try {
            await TopicService.deleteTopic(topicId);
            setTopics(prev => prev.filter(topic => topic.id !== topicId));
            notification.success({
                message: "Тема удалена",
                description: `Тема успешно удалена.`,
            });
        } catch (error) {
            notification.error({
                message: "Ошибка удаления темы",
                description: "Не удалось удалить тему.",
            });
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!lesson) {
        return <div style={{ textAlign: 'center', padding: '24px' }}>Урок не найден.</div>;
    }

    return (
        <div style={{ padding: '40px 24px', backgroundColor: '#f9f9f9', width: '100%' }}>
            <Card bordered={false} style={{ maxWidth: 800, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '20px' }}>{lesson.name}</Title>
                <Text>{lesson.description}</Text>

                <Title level={3} style={{ marginTop: '30px', marginBottom: '15px', color: '#595959' }}>Темы урока</Title>
                <List
                    bordered
                    dataSource={topics}
                    renderItem={(topic) => (
                        <List.Item key={topic.id} style={{ padding: '12px', marginBottom: '8px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
                            <List.Item.Meta
                                title={
                                    <Link to={`/courses/${id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic.id}`} style={{ color: '#1890ff', fontWeight: 'bold' }}>
                                        {topic.name}
                                    </Link>
                                }
                                description={topic.description || "Нет описания"}
                            />
                            <Popconfirm
                                title="Удалить тему?"
                                description="Вы уверены, что хотите удалить эту тему?"
                                onConfirm={() => handleDeleteTopic(topic.id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
                            </Popconfirm>
                        </List.Item>
                    )}
                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                />

                <Modal
                    title="Добавить новую тему"
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setModalVisible(false)}>
                            Отмена
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleCreateTopic}>
                            Добавить
                        </Button>,
                    ]}
                >
                    <Input
                        value={newTopic.name}
                        onChange={(e) => setNewTopic(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Название темы"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextArea
                        value={newTopic.description}
                        onChange={(e) => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Описание темы"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextArea
                        value={newTopic.title}
                        onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Заголовок"
                    />
                </Modal>
            </Card>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',



                }}
                onClick={() => setModalVisible(true)}
            >
                Добавить тему
            </Button>
        </div>
    );
}
