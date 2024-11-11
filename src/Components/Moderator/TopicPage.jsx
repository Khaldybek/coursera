import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, List, Spin, notification, Divider, Button, Row, Col } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function TopicPage() {
    const { topicId } = useParams(); // Получаем topicId из URL
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopicData();
    }, [topicId]);

    const fetchTopicData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/topics/${topicId}`);
            const data = await response.json();
            setTopic(data);
        } catch (error) {
            console.error("Ошибка при загрузке данных темы:", error);
            notification.error({
                message: "Ошибка загрузки",
                description: "Не удалось загрузить данные для темы.",
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

    if (!topic) {
        return <div style={{ textAlign: 'center', padding: '24px' }}>Тема не найдена.</div>;
    }

    return (
        <div style={{ padding: '40px 24px', backgroundColor: '#f9f9f9', width: '100%' }}>
            <Card
                bordered={false}
                style={{ maxWidth: 800, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
            >
                <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '20px' }}>
                    {topic.name}
                </Title>
                <Text style={{ fontSize: '16px', color: '#595959', display: 'block', marginBottom: '20px' }}>
                    {topic.description || "Описание отсутствует"}
                </Text>

                <Divider />

                <Title level={3} style={{ color: '#595959', marginBottom: '15px' }}>Тесты</Title>

                {topic.tests.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {topic.tests.map((test) => (
                            <Col span={24} key={test.id}>
                                <Card
                                    bordered={true}
                                    style={{
                                        borderRadius: '8px',
                                        padding: '16px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Text strong style={{ fontSize: '16px' }}>
                                        {test.question}
                                    </Text>
                                    <div style={{ marginTop: '10px' }}>
                                        {test.options.map((option, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: '8px',
                                                    marginBottom: '8px',
                                                    backgroundColor: '#fafafa',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text>{index + 1}. {option}</Text>
                                                {test.correctOption === String(index + 1) && (
                                                    <CheckCircleOutlined style={{ color: 'green', marginLeft: '10px' }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Text>Для этой темы нет тестов.</Text>
                )}

                <Divider />

                <Button
                    type="primary"
                    size="large"
                    style={{ display: 'block', margin: 'auto' }}
                    onClick={() => notification.info({ message: 'Вам нужно завершить тему или перейти к следующей.' })}
                >
                    Перейти к следующей теме
                </Button>
            </Card>
        </div>
    );
}
