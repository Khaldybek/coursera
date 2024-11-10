import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Card, Typography, List, Descriptions, Spin, notification, Modal, FloatButton} from 'antd';
import ModulesService from '../../services/modules.service.js';
import {PlusSquareOutlined} from "@ant-design/icons";
import CreateLesson from "./CreateLesson.jsx";
const { Title, Text } = Typography;

export default function ModulePage() {
    const { id, moduleId } = useParams();  // Получаем id курса и moduleId из параметров URL
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState();
    useEffect(() => {
        fetchModule();
    }, [moduleId]);  // Загрузить данные при изменении moduleId

    const fetchModule = async () => {
        setLoading(true);
        try {
            const response = await ModulesService.getModuleById(moduleId); // Используем moduleId для получения данных
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
                        <List.Item key={lesson.id} style={{ padding: '10px 20px' }}>
                            <List.Item.Meta
                                title={<Text strong>{lesson.name}</Text>}
                                description={lesson.description}
                            />
                        </List.Item>
                    )}
                    style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}
                />
            </Card>
            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                    <CreateLesson moduleId={moduleId} />
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
