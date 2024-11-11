import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import LessonService from "../../services/lesson.service.js";

export default function CreateLesson({ moduleId, addLessonToModule, onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSave = async (values) => {
        setLoading(true);
        try {
            // Добавляем урок через API
            const newLesson = await LessonService.createLesson(moduleId, values.lessonName, values.lessonDescription, values.level);
            // Добавляем урок в родительский компонент
            addLessonToModule(newLesson);
            notification.success({
                message: "Урок успешно создан",
                description: `Урок "${values.lessonName}" был успешно добавлен.`,
            });
            form.resetFields();
            // Закрываем модальное окно после добавления
            onClose();
        } catch (error) {
            notification.error({
                message: "Ошибка при создании урока",
                description: error?.response?.data?.message || "Произошла ошибка при создании урока. Попробуйте снова.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "40px", background: "#fff", maxWidth: 900, margin: "auto" }}>
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                    name="lessonName"
                    label="Lesson Name"
                    rules={[{ required: true, message: "Please enter the Lesson Name" }]}
                >
                    <Input placeholder="e.g. Java Basics" />
                </Form.Item>
                <Form.Item
                    name="lessonDescription"
                    label="Lesson Description"
                    rules={[{ required: true, message: "Please enter the Lesson Description" }]}
                >
                    <Input placeholder="e.g. Introduction to Java" />
                </Form.Item>

                <Form.Item
                    name="level"
                    label="Level"
                    rules={[{ required: true, message: "Please enter the Lesson Level" }]}
                >
                    <Input placeholder="e.g. Beginner" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
