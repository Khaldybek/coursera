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
    Carousel,
} from "antd";
import {
    CheckCircleOutlined,
    RocketOutlined,
    TeamOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import banner from './Images/banner.jpg';
import first from './Images/first.jpg';
import b1 from './Images/brand01.png';
import b2 from './Images/brand01.png';
import b3 from './Images/brand01.png';
import b4 from './Images/brand01.png';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const AboutUs = () => {
    return (
        <Layout>
            {/* Шапка */}
            <Header style={{ backgroundColor: "#001529", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold" ,width: "100%"}}>Coursera</div>

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
                        Откройте новые возможности с Coursera
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
                        <Card hoverable className="card-hoverable" style={{ textAlign: "center" }}>
                            <RocketOutlined style={{ fontSize: "48px", color: "#007BFF", marginBottom: "10px" }} />
                            <Title level={4}>Доступ к лучшим курсам</Title>
                            <Paragraph>Учитесь в удобное для вас время, с ведущими преподавателями.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable className="card-hoverable" style={{ textAlign: "center" }}>
                            <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a", marginBottom: "10px" }} />
                            <Title level={4}>Сертификаты мирового уровня</Title>
                            <Paragraph>
                                Получите признанные сертификаты для ускорения своей карьеры.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable className="card-hoverable" style={{ textAlign: "center" }}>
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
                            alt="Изображение глобального влияния Coursera Plus"
                            style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={2}>Влияние на весь мир</Title>
                        <Paragraph style={{ fontSize: "16px", color: "#555" }}>
                            Мы помогли миллионам студентов достичь своих целей. Программы Coursera доступны для
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
                <Collapse accordion style={{ marginTop: "30px", fontSize: "18px" }} bordered={false}>
                    <Panel header="Что такое образовательный центр для разработчиков?" key="1">
                        <Paragraph style={{ fontSize: "17px" }}>
                            Наш образовательный центр предоставляет высококачественные курсы для начинающих и опытных разработчиков. Мы предлагаем обучение в самых востребованных технологиях и языках программирования, таких как JavaScript, Python, React, и многое другое.
                        </Paragraph>
                    </Panel>
                    <Panel header="Какие курсы предлагает ваш центр?" key="2">
                        <Paragraph style={{ fontSize: "17px" }}>
                            Мы предлагаем курсы, которые помогут вам стать полноценным разработчиком. Наши программы включают как базовые знания, так и углубленные темы, включая фронтенд и бэкенд разработку, алгоритмы, базовые принципы DevOps и многое другое.
                        </Paragraph>
                    </Panel>
                    <Panel header="Какие преимущества вашего обучения для будущих разработчиков?" key="3">
                        <Paragraph style={{ fontSize: "17px" }}>
                            Мы обучаем на основе реальных проектов, даем студентам возможность развивать практические навыки, которые будут полезны в реальной рабочей среде. Также мы предлагаем поддержку менторов и доступ к сетям профессионалов в IT.
                        </Paragraph>
                    </Panel>
                    <Panel header="Сколько времени занимает обучение?" key="4">
                        <Paragraph style={{ fontSize: "17px" }}>
                            Время обучения зависит от выбранного курса. Мы предлагаем как интенсивные курсы (1-2 месяца), так и более длительные программы (6 месяцев), чтобы обеспечить глубокое освоение материала.
                        </Paragraph>
                    </Panel>
                    <Panel header="Какие возможности трудоустройства я получу после завершения курса?" key="5">
                        <Paragraph style={{ fontSize: "17px" }}>
                            Мы сотрудничаем с крупными технологическими компаниями и помогаем нашим выпускникам найти работу. Вы получите доступ к нашей сети вакансий и рекомендациям, а также сможете пройти стажировку в компаниях-партнерах.
                        </Paragraph>
                    </Panel>
                    <Panel header="Какие сертификаты я получу после завершения курса?" key="6">
                        <Paragraph style={{ fontSize: "17px" }}>
                            После завершения каждого курса вы получите сертификат, который подтвердит ваши знания и навыки в выбранной области. Эти сертификаты признаны ведущими компаниями и помогут вам в карьерном росте.
                        </Paragraph>
                    </Panel>
                </Collapse>
            </Content>


            {/* Футер */}
            <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#fff" }}>
                <Space direction="vertical">
                    <div>© Coursera Plus 2024 | Все права защищены</div>
                    <div>
                        <GlobalOutlined style={{ marginRight: "8px" }} />
                        Доступно на нескольких языках
                    </div>
                    <div>
                        <a href="/all-courses" style={{ color: "#1890ff" }}>Узнать больше</a>
                    </div>
                </Space>
            </Footer>
        </Layout>
    );
};

export default AboutUs;
