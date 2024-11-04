import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, message, Modal, Select } from 'antd';
import AdminService from "../../services/admin.service.js";
import { UserOutlined } from "@ant-design/icons";

const Users = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [actRole, setActRole] = useState(null);

    useEffect(() => {
        AdminService.getAllUsers(23)
            .then(response => {
                setData(response.data);
                setList(response.data);
                setInitLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setInitLoading(false);
            });
    }, []);

    const handleSetRole = () => {
        if (selectedUserId && selectedRole) {
            AdminService.updateUserRole(selectedUserId, 23, selectedRole)
                .then(() => {
                    message.success(`Role updated to ${selectedRole} for user ${selectedUserId}`);
                    setList(list.map(item => item.id === selectedUserId ? { ...item, role: selectedRole } : item));
                    setOpen(false);
                    setSelectedUserId(null);
                    setSelectedRole(null);
                    setActRole(null);

                })
                .catch(error => {
                    console.error("Error setting user role:", error);
                    message.error("Failed to update role");
                });
        }
    };

    const showModal = (user) => {
        setSelectedUserId(user.id);
        setActRole(user.role);
        setSelectedRole(user.role); // Устанавливаем выбранную роль в состояние
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setSelectedUserId(null);
        setSelectedRole(null);
        setActRole(null);
    };

    const onChangeRole = (value) => {
        setSelectedRole(value);
    };

    return (
        <>
            <List
                style={{ width: '70%' }}
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}

                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="primary"  onClick={() => showModal(item)}>
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
            <Modal
                title="Change User Role"
                open={open}
                onOk={handleSetRole}
                onCancel={handleCancel}
                disabled={selectedRole === actRole}
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{ disabled: selectedRole === actRole }}
            >
                <Select
                    showSearch
                    placeholder="Select a role"
                    optionFilterProp="label"
                    onChange={onChangeRole}
                    value={selectedRole}
                    okButtonProps={{ disabled: selectedRole === actRole }}
                    options={[
                        { value: 'USER', label: 'User' },
                        { value: 'MODERATOR', label: 'Moderator' },
                    ]}
                />
            </Modal>
        </>
    );
};

export default Users;
