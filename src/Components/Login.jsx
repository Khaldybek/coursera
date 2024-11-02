import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button,  Typography, Grid } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import AuthService from "../services/auth.service";

const { Text, Title, Link } = Typography;
const { useBreakpoint } = Grid;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const onFinish = (values) => {
        setLoading(true);
        setMessage("");

        AuthService.login(values.email, values.password).then(
            () => {
                navigate("/");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage("неправильный адрес электронной почты или пароль");
            }
        );
    };

    const onFieldsChange = (_, allFields) => {

        setIsFormValid(allFields.every(field => field.errors.length === 0 && field.touched));
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? "32px" : "24px",
            width: "380px"
        },
        footer: {
            marginTop: "16px",
            textAlign: "center",
            width: "100%"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: "24px"
        },
        section: {
            alignItems: "center",
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? "48px 0" : "0",
            width: "100%"
        },
        text: {
            color: "#8c8c8c"
        },
        title: {
            fontSize: screens.md ? "24px" : "20px"
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Title style={styles.title}>Sign in</Title>
                    <Text style={styles.text}>
                        Welcome back! Please enter your details below to sign in.
                    </Text>
                </div>
                <Form
                    form={form}
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFieldsChange={onFieldsChange} // Track form field changes
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[{ type: "email", required: true, message: "Please input your Email!" }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your Password!" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            disabled={!isFormValid || loading} // Disable until form is valid
                        >
                            Log in
                        </Button>
                        {message && (
                            <div className="alert alert-danger" role="alert" style={{ marginTop: "16px" }}>
                                {message}
                            </div>
                        )}
                    </Form.Item>
                    <div style={styles.footer}>
                        <Text style={styles.text}> Dont have an account?</Text>{" "}
                        <Link href="/register">Sign up now</Link>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Login;
