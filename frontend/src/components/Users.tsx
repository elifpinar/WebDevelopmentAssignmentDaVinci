import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getUsers } from "../services/api";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers();
        setUsers(res.data as User[]);
      } catch (error) {
        console.error("Users could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === editingUser.id ? { ...user, ...values } : user
            )
          );
          message.success("User updated!");
        } else {
          const newUser: User = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            ...values,
          };
          setUsers((prev) => [...prev, newUser]);
          message.success("New user added!");
        }
        setIsModalVisible(false);
        setEditingUser(null);
        form.resetFields();
      })
      .catch(() => {
        message.error("Please check the form!");
      });
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted!");
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchText.toLowerCase()) ||
      u.username.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      sorter: (a: User, b: User) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: User, b: User) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Users List"
      style={{ marginTop: 20 }}
      extra={
        <Space>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalVisible(true);
              setEditingUser(null);
              form.resetFields();
            }}
          >
            Add User
          </Button>
        </Space>
      }
    >
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table<User>
          size="middle"
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5, responsive: true }}
          scroll={{ x: "max-content" }}
        />
      </div>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Users;
