import React, { useEffect, useState } from 'react';
import { Table, Progress, Tag, Card, Typography, Spin, message } from 'antd';
import axios from 'axios';
import AuthService from "../../services/auth.service.js";
const { Title } = Typography;

const CourseAnalysis = () => {
    const user=AuthService.getCurrentUser()
    const userId = user.id;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, [userId]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/analysis/subscribed`, {
                params: { userId },
            });
            setCourses(response.data);
        } catch (error) {
            message.error('Не удалось загрузить данные. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Курс',
            dataIndex: 'course_name',
            key: 'courseName',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Уроки',
            key: 'lessons',
            render: (record) => (
                <span>
          Завершено: {record.completed_lessons}/{record.total_lessons},
          Осталось: {record.remaining_lessons}
        </span>
            ),
        },
        {
            title: 'Прогресс',
            dataIndex: 'completion_percentage',
            key: 'completionPercentage',
            render: (percentage) => (
                <Progress percent={percentage} status={percentage === 100 ? 'success' : 'active'} />
            ),
        },
        {
            title: 'Средний балл',
            dataIndex: 'average_test_score',
            key: 'averageTestScore',
            render: (score) => (
                <Tag color={score >= 75 ? 'green' : score > 50 ? 'orange' : 'volcano'}>
                    {score.toFixed(1)}%
                </Tag>
            ),
        },
        {
            title: 'Успешность тестов',
            dataIndex: 'test_success_percentage',
            key: 'testSuccessPercentage',
            render: (success) => <Progress type="circle" percent={success} width={50} />,
        },
        {
            title: 'Этап обучения',
            dataIndex: 'subscription_status',
            key: 'subscriptionStatus',
            render: (status) => {
                const colors = {
                    SUBSCRIBED: 'blue',
                    IN_PROGRESS: 'gold',
                    COMPLETED: 'green',
                    CANCELED: 'red',
                };
                const labels = {
                    SUBSCRIBED: 'Активна',
                    IN_PROGRESS: 'В процессе',
                    COMPLETED: 'Завершена',
                    CANCELED: 'Отменена',
                };
                return <Tag color={colors[status]}>{labels[status]}</Tag>;
            },
        },
    ];

    return (
        <Card style={{ margin: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                Анализ курсов
            </Title>
            {loading ? (
                <Spin tip="Загрузка..." style={{ display: 'block', textAlign: 'center', marginTop: '20px' }} />
            ) : (
                <Table
                    dataSource={courses}
                    columns={columns}
                    rowKey={(record) => record.course_name}
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            )}
        </Card>
    );
};

export default CourseAnalysis;