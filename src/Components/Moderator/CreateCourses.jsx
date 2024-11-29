import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CoursesService from "../../services/courses.service.js";
import authService from "../../services/auth.service.js";

export default function CreateCourses({ onCourseCreated }) {
    const [form] = Form.useForm();

    const handleSave = async (values) => {
        try {
            const moderator=authService.getCurrentUser()
            const moderatorId= moderator.id;
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("companyName", values.companyName);
            formData.append("moderatorId", moderatorId);
            formData.append("image", values.image[0].originFileObj);

            // Send data to the server through CoursesService
            const newCourse = await CoursesService.create(formData);

            // Pass the new course to the parent component
            onCourseCreated(newCourse);

            // Reset form fields
            form.resetFields();
        } catch (error) {
            alert('Произошла ошибка при создании курса.');
        }
    };

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                    name="name"
                    label="Course Name"
                    style={{ maxWidth: "893px" }}
                    rules={[{ required: true, message: "Please enter Course Name" }]}
                >
                    <Input placeholder="e.g John" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    style={{ maxWidth: "893px" }}
                    rules={[{ required: true, message: "Please enter course description" }]}
                >
                    <Input placeholder="e.g Detailed description" />
                </Form.Item>

                <Form.Item
                    name="companyName"
                    label="Company Name"
                    style={{ maxWidth: "893px" }}
                    rules={[{ required: true, message: "Please enter Company name" }]}
                >
                    <Input placeholder="e.g Company name" />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Course Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                    rules={[{ required: true, message: "Please upload an image" }]}
                >
                    <Upload
                        name="image"
                        beforeUpload={() => false}
                        maxCount={1}
                        showUploadList={{ showRemoveIcon: true }}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
