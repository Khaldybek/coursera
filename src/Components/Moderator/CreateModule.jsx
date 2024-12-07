import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import ModulService from "../../services/modules.service.js";
export default function CreateModule({ id }) {  // Деструктуризация пропса id
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSave = async (values) => {
        setLoading(true);
        try {
            await ModulService.createModule(id, values.moduleName);

            notification.success({
                message: "Модуль успешно создан",
                description: `Модуль "${values.moduleName}" был успешно добавлен.`,

            });

            form.resetFields();
            window.location.reload()
        } catch (error) {
            notification.error({
                message: "Ошибка при создании модуля",
                description: error?.response?.data?.message || "Произошла ошибка при создании модуля. Попробуйте снова.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "40px", background: "#fff", maxWidth: 900, margin: "auto" }}>
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                    name="moduleName"
                    label="Module Name"  // Исправлено на правильный текст
                    rules={[{ required: true, message: "Please enter the Module Name" }]}
                >
                    <Input placeholder="e.g. Java Basics" />
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
