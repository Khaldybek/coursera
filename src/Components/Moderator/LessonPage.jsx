import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, List, Spin, notification, Modal, Button, Popconfirm, Input, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import TopicService from "../../services/topic.service.js";
import { motion } from "framer-motion";
const { TextArea } = Input;
const { Title, Text } = Typography;

export default function LessonPage() {
    const { id, moduleId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTopic, setNewTopic] = useState({
        name: '',
        description: '',
        title: '',
        files: []
    });

    useEffect(() => {
        fetchLessonData();
    }, [lessonId]);

    const fetchLessonData = async () => {
        setLoading(true);
        try {
            const [lessonResponse, topicsResponse] = await Promise.all([
                fetch(`http://localhost:8000/api/v1/lessons/${lessonId}`).then((res) => res.json()),
                fetch(`http://localhost:8000/api/topics/by-lesson/${lessonId}`).then((res) => res.json())
            ]);

            setLesson(lessonResponse);
            setTopics(topicsResponse);
        } catch (error) {
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
            const formData = new FormData();
            formData.append("name", newTopic.name);
            formData.append("description", newTopic.description);
            formData.append("title", newTopic.title);
            formData.append("lessonId", lessonId);
            newTopic.files.forEach((file) => formData.append("files", file.originFileObj));

            const response = await TopicService.createTopic(formData);
            setTopics(prev => [...prev, response]);
            setModalVisible(false);
            notification.success({
                message: "Тема добавлена",
                description: `Тема "${newTopic.name}" успешно добавлена.`,
            });
            setNewTopic({ name: '', description: '', title: '', files: [] });
        } catch (error) {
            notification.error({
                message: "Ошибка при добавлении темы",
                description: "Не удалось добавить тему. Попробуйте снова.",
            });
        }
    };

    const handleFileChange = ({ fileList }) => {
        setNewTopic(prev => ({ ...prev, files: fileList }));
    };

    return (
        <div>
            {/* Урок */}
            <Card>
                <Title>{lesson?.name}</Title>
                <Text>{lesson?.description}</Text>
            </Card>

            {/* Темы */}
            <List
                dataSource={topics}
                renderItem={(topic) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            to={`/courses/${id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic.id}`}
                            style={{
                                color: "#1890ff",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            <List.Item
                                style={{
                                    padding: "12px 16px",
                                    border: "1px solid #f0f0f0",
                                    borderRadius: "8px",
                                    marginBottom: "12px",
                                    transition: "box-shadow 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                        "0 4px 12px rgba(0, 0, 0, 0.15)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.boxShadow = "none")
                                }
                            >
                                <List.Item.Meta
                                    title={
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                color: "#333",
                                            }}
                                        >
                                        {topic.name}
                                    </span>
                                    }
                                    description={
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                color: "#666",
                                                lineHeight: "1.4",
                                            }}
                                        >
                                        {topic.description}
                                    </span>
                                    }
                                />
                                <Popconfirm
                                    title="Удалить тему?"
                                    onConfirm={() => handleDeleteTopic(topic.id)}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined style={{ color: "red" }} />}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            padding: 0,
                                        }}
                                    />
                                </Popconfirm>
                            </List.Item>
                        </Link>
                    </motion.div>
                )}
            />

            {/* Модальное окно */}
            <Modal
                title="Добавить новую тему"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>Отмена</Button>,
                    <Button key="submit" type="primary" onClick={handleCreateTopic}>Добавить</Button>
                ]}
            >
                <Input
                    placeholder="Название темы"
                    value={newTopic.name}
                    onChange={(e) => setNewTopic(prev => ({ ...prev, name: e.target.value }))}
                />
                <TextArea
                    placeholder="Описание темы"
                    value={newTopic.description}
                    onChange={(e) => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
                />
                <TextArea
                    placeholder="Заголовок"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                />
                <Upload
                    multiple
                    listType="picture"
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
                </Upload>
            </Modal>

            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                Добавить тему
            </Button>
        </div>
    );
}
