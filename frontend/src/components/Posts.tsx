import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table"; // ✅ ekleme
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
        setPosts(res.data);
      } catch (error) {
        console.error("Postlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const columns: ColumnsType<Post> = [ 
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      responsive: ["sm"], 
    },
    {
      title: "Post ID",
      dataIndex: "id",
      key: "id",
      responsive: ["sm"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
  ];

  return (
    <Table<Post>
      columns={columns}
      dataSource={posts}
      rowKey="id"
      loading={loading}
      scroll={{ x: true }}
    />
  );
};

export default Posts;
