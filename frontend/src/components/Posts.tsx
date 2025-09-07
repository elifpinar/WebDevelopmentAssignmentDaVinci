import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getPosts } from "../services/api";

interface Post {
  userId: number;
  id: number;
  title: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getPosts();
        setPosts(res.data as Post[]);
      } catch (error) {
        console.error("Postlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const columns: ColumnsType<Post> = [
    { title: "User ID", dataIndex: "userId", key: "userId", width: 100 },
    { title: "Post ID", dataIndex: "id", key: "id", width: 100 },
    { title: "Title", dataIndex: "title", key: "title" },
  ];

  return (
    <Card title="Posts List" style={{ marginTop: 20 }}>
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table<Post>
          size="small"
          columns={columns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          pagination={{  responsive: true }}
          scroll={{ x: "max-content" }} // mobilde yatay kaydırma
        />
      </div>
    </Card>
  );
};

export default Posts;
