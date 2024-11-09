import React from "react";
import { Form, Input, Button, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function UserCreate() {
    const [form] = Form.useForm();

    const handleSave = (values) => {
        console.log("Form Values:", values);

    };

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    style={{ maxWidth: "893px" }}
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input placeholder="e.g John" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    style={{ maxWidth: "893px" }}
                    rules={[{ required: true, message: "Please enter your email" }]}
                >
                    <Input placeholder="e.g john@email.com" />
                </Form.Item>
                <Form.List name="skills">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Space key={field.key} direction="horizontal" style={{ display: 'flex', marginBottom: 8 }}>
                                    <Form.Item
                                        {...field}
                                        name={[field.name]}
                                        label={`Skill - ${index + 1}`}
                                        style={{ width: "400px" }}
                                        rules={[{ required: true, message: "Please enter a skill" }]}
                                    >
                                        <Input placeholder="e.g. JavaScript" />
                                    </Form.Item>
                                    <Button
                                        danger
                                        onClick={() => remove(field.name)}
                                        icon={<DeleteOutlined />}
                                    />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    block
                                    style={{ maxWidth: "893px" }}
                                >
                                    Add a skill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
