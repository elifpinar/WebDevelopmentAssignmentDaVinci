import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
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

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers();
       setUsers(res.data as User[]);
      } catch (error) {
        console.error("Kullanıcılar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 70 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  return (
    <Card title="Users List" style={{ marginTop: 20 }}>
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table<User>
          size="small"
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, responsive: true }}
          scroll={{ x: "max-content" }}  // 🔥 tablo ekran taşırmaz
        />
      </div>
    </Card>

  );
};

export default Users;
