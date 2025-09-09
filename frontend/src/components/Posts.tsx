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
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getPosts } from "../services/api";

interface Post {
  userId: number;
  id: number;
  title: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getPosts();
        setPosts(res.data as Post[]);
      } catch (error) {
        console.error("Posts could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingPost) {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === editingPost.id ? { ...post, ...values } : post
            )
          );
          message.success("Post updated!");
        } else {
          const newPost: Post = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            ...values,
          };
          setPosts((prev) => [...prev, newPost]);
          message.success("New post added!");
        }
        setIsModalVisible(false);
        setEditingPost(null);
        form.resetFields();
      })
      .catch(() => {
        message.error("Please check the form!");
      });
  };

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    message.success("Post deleted!");
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalVisible(true);
    form.setFieldsValue(post);
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.userId.toString().includes(searchText) ||
      p.id.toString().includes(searchText)
  );

  const columns: ColumnsType<Post> = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 100,
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Post ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Post) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          >
            
          </Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link" icon={<DeleteOutlined />}>
              
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Posts List" style={{ marginTop: 20 }}>
      {/* Arama ve buton satırı */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "15px",
          justifyContent: "flex-end",
        }}
      >
        <Input
          placeholder="Search posts..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: "250px", minWidth: "180px", flex: "1 1 auto" }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalVisible(true);
            setEditingPost(null);
            form.resetFields();
          }}
        >
          Add Post
        </Button>
      </div>

      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table<Post>
          size="middle"
          columns={columns}
          dataSource={filteredPosts}
          rowKey="id"
          loading={loading}
          pagination={{ responsive: true }}
          scroll={{ x: "max-content" }}
        />
      </div>

      <Modal
        title={editingPost ? "Edit Post" : "Add Post"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingPost(null);
          form.resetFields();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="User ID"
            name="userId"
            rules={[{ required: true, message: "User ID is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Posts;
