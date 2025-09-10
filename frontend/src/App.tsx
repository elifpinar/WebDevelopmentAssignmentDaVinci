import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Typography, theme } from "antd";
import Homepage from "./components/Homepage";
import Users from "./components/Users";
import Posts from "./components/Posts";
import { Grid } from "antd"; // ekle

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
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint(); 

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);       
    setCollapsed(true);  
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        width={screens.xs ? "100vw" : 200}  
        style={{
          height: "100vh",
          zIndex: 1000,
          maxWidth: screens.xs ? "100%" : 200, 
          position: screens.xs ? "fixed" : "relative", 
          left: screens.xs && !collapsed ? 0 : undefined, 
          top: 0,
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
          onClick={handleMenuClick}
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
            style={{ fontSize: "16px", width: 64, height: 64,     zIndex: 1100, position: "relative"  }}
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
const { useBreakpoint } = Grid;


export default WrappedApp;
