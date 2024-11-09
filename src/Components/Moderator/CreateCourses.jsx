import React from "react";
import { Form, Input, Button } from "antd";
import CoursesService from "../../services/courses.service.js";

export default function UserCreate() {
    const [form] = Form.useForm();

    const handleSave = async (values) => {
        try {
            // Отправка данных на сервер через CoursesService
            await CoursesService.create(values.name, values.description, values.companyName);
            // Вы можете добавить уведомление об успешной операции, например:
            alert('Курс успешно создан!');
            form.resetFields(); // Очистка полей формы после успешного сохранения
        } catch (error) {
            // Обработка ошибок, например, выводим сообщение об ошибке
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
                    rules={[{ required: true, message: "Please enter courses description" }]}
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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
