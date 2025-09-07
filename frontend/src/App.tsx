import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Typography, theme } from "antd";
import Homepage from "./components/Homepage";
import Users from "./components/Users";
import Posts from "./components/Posts";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: "/", icon: <HomeOutlined />, label: "Homepage" },
  { key: "/users", icon: <UserOutlined />, label: "Users" },
  { key: "/posts", icon: <FileTextOutlined />, label: "Posts" },
];

const PageTitle = () => {
  const location = useLocation();
  if (location.pathname === "/users") return <Title level={3}>Users</Title>;
  if (location.pathname === "/posts") return <Title level={3}>Posts</Title>;
  return <Title level={3}>Homepage</Title>;
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);       // sayfa yönlendirme
    setCollapsed(true);  // menü tıklanınca sider kapanır
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          height: "100vh",
          zIndex: 1000,
        }}
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
          Project
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick} // burayı ekledik
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
            style={{ fontSize: "16px", width: 64, height: 64 }}
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

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
