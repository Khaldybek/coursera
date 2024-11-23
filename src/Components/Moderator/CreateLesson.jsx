import React, { useState } from "react";
import { Form, Input, Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import LessonService from "../../services/lesson.service.js";

export default function CreateLesson({ moduleId, addLessonToModule, onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null); // Храним загруженный файл

    const handleSave = async (values) => {
        console.log("Файл для отправки:", file); // Лог текущего состояния файла
        setLoading(true);
        try {
            if (!file) {
                notification.error({
                    message: "Файл не выбран",
                    description: "Пожалуйста, загрузите файл перед сохранением урока.",
                });
                setLoading(false);
                return;
            }

            const newLesson = await LessonService.createLesson(
                moduleId,
                values.lessonName,
                values.lessonDescription,
                values.level,
                file
            );

            addLessonToModule(newLesson);

            notification.success({
                message: "Урок успешно создан",
                description: `Урок "${values.lessonName}" был успешно добавлен.`,
            });

            form.resetFields();
            setFile(null);
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

    const handleFileChange = ({ fileList }) => {
        if (fileList.length > 0) {
            setFile(fileList[0].originFileObj); // Устанавливаем первый файл для отправки
        } else {
            setFile(null); // Если файлов нет, сбрасываем состояние
        }
    };

    return (
        <div style={{ padding: "40px", background: "#fff", maxWidth: 900, margin: "auto" }}>
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                    name="lessonName"
                    label="Название урока"
                    rules={[{ required: true, message: "Введите название урока" }]}
                >
                    <Input placeholder="Например, Основы Java" />
                </Form.Item>

                <Form.Item
                    name="lessonDescription"
                    label="Описание урока"
                    rules={[{ required: true, message: "Введите описание урока" }]}
                >
                    <Input placeholder="Например, Введение в Java" />
                </Form.Item>

                <Form.Item
                    name="level"
                    label="Уровень"
                    rules={[{ required: true, message: "Введите уровень урока" }]}
                >
                    <Input placeholder="Например, Начинающий" />
                </Form.Item>

                <Form.Item label="Загрузить файл">
                    <Upload
                        beforeUpload={() => false} // Предотвращаем автоматическую загрузку
                        onChange={handleFileChange} // Обрабатываем изменение файла
                        maxCount={1} // Ограничение на один файл
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.png,.mp4"
                    >
                        <Button icon={<UploadOutlined />}>Загрузить файл</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
                        {loading ? "Сохраняем..." : "Сохранить"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
