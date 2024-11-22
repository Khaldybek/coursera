import React from "react";
import {
    Layout,
    Button,
    Typography,
    Row,
    Col,
    Card,
    Collapse,
    Divider,
    Space,
    Input,
    Form,
    Avatar,
} from "antd";
import {
    CheckCircleOutlined,
    RocketOutlined,
    TeamOutlined,
    GlobalOutlined,
    UserOutlined,
} from "@ant-design/icons";
import banner from './Images/banner.jpg';
import first from './Images/first.jpg';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutUs = () => {
    return (
        <Layout>
            {/* Шапка */}
            <Header style={{ backgroundColor: "#001529", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>Coursera Plus</div>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{ backgroundColor: "#007BFF", borderColor: "#0056b3" }}
                    >
                        Присоединиться
                    </Button>
                </div>
            </Header>

            {/* Геробаннер */}
            <div
                style={{
                    minHeight: "70vh",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${first})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "#fff",
                    textAlign: "center",
                    padding: "20px",
                }}
            >
                <div style={{ background: "rgba(0, 0, 0, 0.5)", padding: "30px", borderRadius: "10px" }}>
                    <Title style={{ color: "#fff", fontSize: "42px", marginBottom: "20px" }}>
                        Откройте новые возможности с Coursera Plus
                    </Title>
                    <Paragraph style={{ color: "#f0f0f0", fontSize: "18px" }}>
                        Мы предоставляем неограниченный доступ к курсам, которые изменят вашу карьеру и жизнь.
                    </Paragraph>
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                backgroundColor: "#007BFF",
                                borderColor: "#0056b3",
                                fontWeight: "bold",
                            }}
                        >
                            Начать учиться
                        </Button>
                        <Button type="default" size="large" style={{ fontWeight: "bold" }}>
                            Подробнее
                        </Button>
                    </Space>
                </div>
            </div>

            {/* Секция с преимуществами */}
            <Content style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable style={{ textAlign: "center" }}>
                            <RocketOutlined style={{ fontSize: "48px", color: "#007BFF", marginBottom: "10px" }} />
                            <Title level={4}>Доступ к лучшим курсам</Title>
                            <Paragraph>Учитесь в удобное время с ведущими преподавателями.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable style={{ textAlign: "center" }}>
                            <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a", marginBottom: "10px" }} />
                            <Title level={4}>Сертификаты мирового уровня</Title>
                            <Paragraph>Получите признанные сертификаты.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable style={{ textAlign: "center" }}>
                            <TeamOutlined style={{ fontSize: "48px", color: "#faad14", marginBottom: "10px" }} />
                            <Title level={4}>Сообщество экспертов</Title>
                            <Paragraph>Присоединяйтесь к тысячам студентов.</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Content>

            {/* Секция "Работодатели" */}
            <Content style={{ padding: "50px", backgroundColor: "#fff", textAlign: "center" }}>
                <Title level={2}>Где вы сможете работать</Title>
                <Paragraph>
                    Наши выпускники работают в крупнейших компаниях: Google, Microsoft, Amazon, и других.
                </Paragraph>
                <Row gutter={[16, 16]} justify="center">
                    {/* Логотипы компаний */}
                    <Col xs={8} sm={6} lg={4}>
                        <img src="/path/to/google-logo.png" alt="Google" style={{ width: "100%" }} />
                    </Col>
                    <Col xs={8} sm={6} lg={4}>
                        <img src="/path/to/amazon-logo.png" alt="Amazon" style={{ width: "100%" }} />
                    </Col>
                    <Col xs={8} sm={6} lg={4}>
                        <img src="/path/to/microsoft-logo.png" alt="Microsoft" style={{ width: "100%" }} />
                    </Col>
                </Row>
            </Content>

            {/* Отзывы студентов */}
            <Content style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
                <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>Отзывы студентов</Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={8}>
                        <Card>
                            <Card.Meta
                                avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                title="Иван Иванов"
                                description="Курс изменил мою жизнь! Преподаватели помогли мне найти работу мечты."
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>

            {/* Форма записи на курс */}
            <Content style={{ padding: "50px", backgroundColor: "#fff" }}>
                <Row justify="center">
                    <Col xs={24} sm={12}>
                        <Form layout="vertical">
                            <Form.Item label="Имя">
                                <Input placeholder="Введите ваше имя" />
                            </Form.Item>
                            <Form.Item label="Электронная почта">
                                <Input placeholder="Введите вашу почту" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block>Записаться на курс</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>

            {/* Футер */}
            <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#fff" }}>
                <div>© Coursera Plus 2024 | Все права защищены</div>
            </Footer>
        </Layout>
    );
};

export default AboutUs;
