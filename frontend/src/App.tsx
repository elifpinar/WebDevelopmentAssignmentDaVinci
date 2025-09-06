import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography, theme } from "antd";

import Homepage from "./components/Homepage";
import Users from "./components/Users";
import Posts from "./components/Posts";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: "/", icon: <HomeOutlined />, label: <Link to="/">Homepage</Link> },
  { key: "/users", icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
  { key: "/posts", icon: <FileTextOutlined />, label: <Link to="/posts">Posts</Link> },
];

const PageTitle: React.FC = () => {
  const location = useLocation();
  if (location.pathname === "/users") return <Title level={3}>Users</Title>;
  if (location.pathname === "/posts") return <Title level={3}>Posts</Title>;
  return <Title level={3}>Homepage</Title>;
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"         
        collapsedWidth="0"      
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          My App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginLeft: 16 }}>
            <PageTitle />
          </div>
        </Header>

        
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
