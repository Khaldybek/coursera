import React from "react";
import { Layout, Button, Typography, Row, Col, Card, Divider, Space } from "antd";
import { CheckCircleOutlined, RocketOutlined, TeamOutlined, GlobalOutlined } from "@ant-design/icons";
import banner from './Images/banner.jpg';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const AboutUs = () => {
    return (
        <Layout>
            {/* Шапка */}
            <Header style={{ backgroundColor: "#001529", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>Coursera Plus</div>
                    <Button type="primary" shape="round" size="large"
                            style={{ backgroundColor: "#007BFF", borderColor: "#0056b3" }}>
                        Присоединиться
                    </Button>
                </div>
            </Header>

            {/* Геробаннер с новой фотографией */}
            <div
                style={{
                    height: "70vh",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${banner})`,
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

            {/* Блок с преимуществами */}
            <Content style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
                <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Почему выбирают нас
                </Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            hoverable
                            style={{ textAlign: "center", transition: "transform 0.3s" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <RocketOutlined style={{ fontSize: "48px", color: "#007BFF", marginBottom: "10px" }} />
                            <Title level={4}>Доступ к лучшим курсам</Title>
                            <Paragraph>Учитесь в удобное для вас время, с ведущими преподавателями.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            hoverable
                            style={{ textAlign: "center", transition: "transform 0.3s" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a", marginBottom: "10px" }} />
                            <Title level={4}>Сертификаты мирового уровня</Title>
                            <Paragraph>
                                Получите признанные сертификаты для ускорения своей карьеры.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            hoverable
                            style={{ textAlign: "center", transition: "transform 0.3s" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <TeamOutlined style={{ fontSize: "48px", color: "#faad14", marginBottom: "10px" }} />
                            <Title level={4}>Сообщество экспертов</Title>
                            <Paragraph>Присоединяйтесь к тысячам студентов по всему миру.</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Content>

            {/* Секция о глобальном влиянии */}
            <Content style={{ padding: "50px", backgroundColor: "#fff" }}>
                <Row align="middle" gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <img
                            src={banner}
                            alt="Global impact"
                            style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={2}>Влияние на весь мир</Title>
                        <Paragraph style={{ fontSize: "16px", color: "#555" }}>
                            Мы помогли миллионам студентов достичь своих целей. Программы Coursera Plus доступны для
                            людей по всему миру.
                        </Paragraph>
                        <Button type="primary" size="large" style={{ marginTop: "20px" }}>
                            Узнать больше
                        </Button>
                    </Col>
                </Row>
            </Content>

            {/* Часто задаваемые вопросы */}
            <Content style={{ padding: "50px", backgroundColor: "#f0f2f5" }}>
                <Divider />
                <Title level={2} style={{ textAlign: "center" }}>
                    Часто задаваемые вопросы
                </Title>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} lg={8}>
                        <Card bordered={false}>
                            <Title level={5}>Как работает Coursera Plus?</Title>
                            <Paragraph>
                                Это подписка, которая дает вам неограниченный доступ к более чем 7,000 курсам.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card bordered={false}>
                            <Title level={5}>Можно ли получить сертификаты?</Title>
                            <Paragraph>Да, вы можете получать сертификаты после завершения курсов.</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Content>

            {/* Футер */}
            <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#fff" }}>
                <Space direction="vertical">
                    <div>© Coursera Plus 2024 | Все права защищены</div>
                    <div>
                        <GlobalOutlined style={{ marginRight: "8px" }} />
                        Доступно на нескольких языках
                    </div>
                </Space>
            </Footer>
        </Layout>
    );
};

export default AboutUs;
