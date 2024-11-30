import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, List, Spin, notification, Divider, Button, Row, Col, Modal, Input } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function TopicPage() {
    const { topicId } = useParams(); // Получаем topicId из URL
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTest, setNewTest] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '',
    });

    useEffect(() => {
        fetchTopicData();
    }, [topicId]);

    const fetchTopicData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/topics/${topicId}`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных темы');
            }
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

    const handleCreateTest = async () => {
        // Проверка на заполненность всех полей
        if (!newTest.question || !newTest.option1 || !newTest.option2 || !newTest.option3 || !newTest.option4 || !newTest.correctOption) {
            notification.error({
                message: 'Ошибка',
                description: 'Пожалуйста, заполните все поля перед добавлением теста.',
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/tests/create?topicId=${topic.id}&question=${newTest.question}&option1=${newTest.option1}&option2=${newTest.option2}&option3=${newTest.option3}&option4=${newTest.option4}&correctOption=${newTest.correctOption}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании теста');
            }

            const data = await response.json();
            notification.success({
                message: 'Тест добавлен',
                description: `Тест "${newTest.question}" успешно добавлен.`,
            });

            setTopic(prevTopic => ({
                ...prevTopic,
                tests: [...prevTopic.tests, data],
            }));

            setNewTest({
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correctOption: '',
            });
            setModalVisible(false);
        } catch (error) {
            notification.error({
                message: 'Ошибка при добавлении теста',
                description: error.message || 'Не удалось добавить тест. Попробуйте снова.',
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

    if (!topic) {
        return <div style={{ textAlign: 'center', padding: '24px' }}>Тема не найдена.</div>;
    }

    return (
        <div style={{ padding: '40px 24px', backgroundColor: '#f9f9f9', width: '100%' , height: '100vh' }}>
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

                {topic.tests && topic.tests.length > 0 ? (
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
                    icon={<PlusOutlined />}
                    onClick={() => setModalVisible(true)}
                    style={{ marginTop: '20px' }}
                >
                    Добавить тест
                </Button>

                <Modal
                    title="Добавить новый тест"
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setModalVisible(false)}>
                            Отмена
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleCreateTest}>
                            Добавить тест
                        </Button>,
                    ]}
                >
                    <Input
                        value={newTest.question}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, question: e.target.value }))}
                        placeholder="Вопрос"
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        value={newTest.option1}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, option1: e.target.value }))}
                        placeholder="Первый вариант ответа"
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        value={newTest.option2}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, option2: e.target.value }))}
                        placeholder="Второй вариант ответа"
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        value={newTest.option3}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, option3: e.target.value }))}
                        placeholder="Третий вариант ответа"
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        value={newTest.option4}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, option4: e.target.value }))}
                        placeholder="Четвертый вариант ответа"
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        value={newTest.correctOption}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, correctOption: e.target.value }))}
                        placeholder="Правильный вариант ответа"
                        style={{ marginBottom: '10px' }}
                    />
                </Modal>
            </Card>
        </div>
    );
}
