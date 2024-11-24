import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, List, Spin, notification, Modal, Button, Popconfirm, Input, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import TopicService from "../../services/topic.service.js";

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
                renderItem={topic => (
                    <List.Item>
                        <List.Item.Meta title={topic.name} description={topic.description} />
                        <Popconfirm
                            title="Удалить тему?"
                            onConfirm={() => handleDeleteTopic(topic.id)}
                        >
                            <DeleteOutlined style={{ color: 'red' }} />
                        </Popconfirm>
                    </List.Item>
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
