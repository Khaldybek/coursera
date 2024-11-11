import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Импортируем Link для создания ссылок
import { Card, Typography, List, Spin, notification } from 'antd';

const { Title, Text } = Typography;

export default function LessonPage() {
    const { id, moduleId, lessonId } = useParams(); // Получаем параметры из URL
    const [lesson, setLesson] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        <List.Item key={topic.id}>
                            <List.Item.Meta
                                title={
                                    <Link to={`/courses/${id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic.id}`} style={{ color: '#1890ff', fontWeight: 'bold' }}>
                                        {topic.name}
                                    </Link>
                                }
                                description={topic.description || "Нет описания"}
                            />
                        </List.Item>
                    )}
                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                />
            </Card>
        </div>
    );
}
