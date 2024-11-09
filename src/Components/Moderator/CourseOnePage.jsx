import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Typography, List, Descriptions, Spin } from 'antd';
import CoursesService from '../../services/courses.service.js';

const { Title, Text } = Typography;

export default function OneCoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await CoursesService.getCourseById(id);
                setCourse(response);
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

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
        <div style={{ padding: '40px 24px', backgroundColor: '#f9f9f9' ,width: '100%' }}>
            <Card bordered={false} style={{ maxWidth: 800, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '20px' }}>{course.name}</Title>

                <Descriptions bordered layout="vertical" column={1} style={{ marginBottom: '20px' }}>
                    <Descriptions.Item label={<Text strong>Description</Text>}>
                        {course.description || "No description available"}Н
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
                        <List.Item key={module.id} style={{ padding: '10px 20px' }}>
                            <Typography.Text strong>{module.name}</Typography.Text> - <Text>{module.lessons} Lessons</Text>
                        </List.Item>
                    )}
                    style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}
                />

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type="primary" size="large" style={{ width: '100%', borderRadius: '8px' }}>Enroll Now</Button>
                </div>
            </Card>
        </div>
    );
}
