import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, message } from 'antd';
import AdminService from "../../services/admin.service.js";
import { UserOutlined } from "@ant-design/icons";

const Moderators = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        AdminService.getAllMod(23)
            .then(response => {
                setData(response.data);
                setList(response.data); // Устанавливаем данные в список
                setInitLoading(false); // Завершаем начальную загрузку
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setInitLoading(false);
            });
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        AdminService.getAllMod(23)
            .then(response => {
                const newData = data.concat(response.data);
                setData(newData);
                setList(newData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading more users:", error);
                setLoading(false);
            });
    };

    const handleSetRole = (userId, newRole) => {
        AdminService.updateUserRole(userId, 23,newRole) // Пример adminId
            .then(() => {
                message.success(`Role updated to ${newRole} for user ${userId}`);
                setList(list.map(item => item.id === userId ? { ...item, role: newRole } : item));
            })
            .catch(error => {
                console.error("Error setting user role:", error);
                message.error("Failed to update role");
            });
    };

    return (
        <List
            style={{ width: '70%' }}
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <Button type="primary" onClick={() => handleSetRole(item.id, "MODERATOR")}>
                            Set Role
                        </Button>
                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<UserOutlined style={{ fontSize: 20 }} />}
                            title={item.username}
                        />
                        <div>{item.role}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default Moderators;
