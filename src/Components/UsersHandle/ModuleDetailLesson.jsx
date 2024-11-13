import React, { useEffect, useState, useMemo } from 'react';
import { Avatar, Button, Card, Typography, Spin, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from "../../services/courses.service.js";
import SampleImage from "../../Style/imeg/640px-Toydaria2.jpg"; // Placeholder image

const { Meta } = Card;

const ModuleDetailLesson = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            try {
                const response = await CourseService.getUserModuleById(moduleId);
                setLessons(Array.isArray(response) ? response : []);
            } catch (err) {
                console.error("Error fetching module details:", err);
                setError("Unable to load module details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [moduleId]);

    if (loading) return <Spin style={{ display: 'flex', justifyContent: 'center', padding: 20 }} />;
    if (error) return <Typography style={{ color: 'red', padding: 20 }}>{error}</Typography>;
    if (lessons.length === 0) return <Typography style={{ padding: 20 }}>No lessons found</Typography>;

    return (
        <div style={{ padding: 20, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
                Назад
            </Button>
            <Row gutter={16} style={{ maxWidth: 1200, margin: '0 auto' }}>
                {lessons.map((lesson) => (
                    <Col key={lesson.id}>
                        <LessonCard lesson={lesson} navigate={navigate} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

const LessonCard = ({ lesson, navigate }) => {
    const lessonPath = useMemo(() => `/lesson/${lesson.id}`, [lesson.id]);

    return (
        <Card
            hoverable
            style={{
                width: '300px',
                height: '100%',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Meta
                avatar={<Avatar src={SampleImage} size={50} />}
                title={<Typography.Title level={5}>{lesson.name}</Typography.Title>}
                description={`${lesson.moduleName} • ${lesson.level || "N/A"} уровень`}
                style={{
                    marginBottom: 12,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}
            />
            <Typography.Paragraph
                ellipsis={{ rows: 3 }}
                style={{ fontSize: '0.9rem', color: '#595959' }}
            >
                {lesson.description}
            </Typography.Paragraph>
            <Button
                type="primary"
                block
                style={{
                    marginTop: 12,
                    borderRadius: 4,
                    fontWeight: 'bold',
                }}
                onClick={() => navigate(lessonPath)}
            >
                Открыть
            </Button>
        </Card>
    );
};

export default ModuleDetailLesson;
