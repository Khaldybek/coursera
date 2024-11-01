import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Grid, Modal } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import AuthService from "../services/auth.service";
import InputOTPPage from "./InputOTPPage.jsx";
import MyModal from "./Modal/MyModal.jsx";
const { Text, Title, Link } = Typography;
const { useBreakpoint } = Grid;

const Register = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const [modal, setModal] = useState(false);
    const handleOk = () => {
        setModal(false);
    };

    const handleCancel = () => {
        setModal(false);
    };
    const onFinish = (values) => {
        setLoading(true);
        setMessage("");
        setEmail(values.email)
        AuthService.register(values.username, values.email, values.password)

            .then((response) => {
                setModal(true) // Redirect to login page after successful registration

            })
            .catch((error) => {
                console.log(error);
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
    };

    const onFieldsChange = (_, allFields) => {
        setIsFormValid(allFields.every(field => field.errors.length === 0 && field.touched));
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? "32px" : "24px",
            width: "380px",
        },
        footer: {
            marginTop: "16px",
            textAlign: "center",
            width: "100%",
        },
        header: {
            marginBottom: "24px",
        },
        section: {
            alignItems: "center",
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? "48px 0" : "0",
            width: "100%",
        },
        text: {
            color: "#8c8c8c",
        },
        title: {
            fontSize: screens.md ? "24px" : "20px",
        },
    };

    return (
        <>
            <Modal title="Basic Modal" open={modal} onOk={handleOk} onCancel={handleCancel}>
                <InputOTPPage email={email}/>
            </Modal>
            <section style={styles.section}>
                <div style={styles.container}>

                    <div style={styles.header}>
                        <Title style={styles.title}>Sign Up</Title>
                        <Text style={styles.text}>
                            Create your account by filling in the details below.
                        </Text>
                    </div>
                    <Form
                        form={form}
                        name="register_form"
                        onFinish={onFinish}
                        onFieldsChange={onFieldsChange} // Track form field changes
                        layout="vertical"
                        requiredMark="optional"
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: "Please input your Username!"}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{type: "email", required: true, message: "Please input your Email!"}]}
                        >
                            <Input prefix={<MailOutlined/>} placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: "Please input your Password!"}]}
                        >
                            <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                disabled={!isFormValid || loading} // Disable until form is valid
                            >
                                Sign Up
                            </Button>
                            {message && (
                                <div className="alert alert-danger" role="alert" style={{marginTop: "16px"}}>
                                    {message}
                                </div>
                            )}
                        </Form.Item>
                        <div style={styles.footer}>
                            <Text style={styles.text}>Already have an account?</Text>{" "}
                            <Link href="/login">Log in now</Link>
                        </div>
                    </Form>
                </div>
            </section>
        </>

    );
};

export default Register;
