import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";

const { Title } = Typography;

const cardBase: React.CSSProperties = {
  width: 300,
  minHeight: 200,
  textAlign: "center",
  borderRadius: 16,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  background: "linear-gradient(135deg, #2a2a2a 0%, #1d1d1d 100%)",
  color: "#fff",
};

const iconBg: React.CSSProperties = {
  position: "absolute",
  fontSize: 160,
  color: "rgba(255,255,255,0.05)",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: 0,
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
};

const Homepage = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px",
        justifyContent: "center",
        marginTop: "50px",
        padding: "0 20px",
      }}
    >
      <Card
        hoverable
        style={cardBase}
        bodyStyle={{ padding: 24 }}
      >
        <UserOutlined style={iconBg} />
        <div style={contentStyle}>
          <Title level={4} style={{ color: "#fff" }}>Users</Title>
          <p>Browse the user list.</p>
          <Link to="/users" style={{ color: "#ff4d4f", fontWeight: 500 }}>
            Go to Users
          </Link>
        </div>
      </Card>

      <Card
        hoverable
        style={cardBase}
        bodyStyle={{ padding: 24 }}
      >
        <FileTextOutlined style={iconBg} />
        <div style={contentStyle}>
          <Title level={4} style={{ color: "#fff" }}>Posts</Title>
          <p>Browse the post list.</p>
          <Link to="/posts" style={{ color: "#ff4d4f", fontWeight: 500 }}>
            Go to Posts
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Homepage;
