import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Homepage = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        marginTop: "50px",
        flexWrap: "wrap",
      }}
    >
      <Card
        variant="borderless"
        hoverable
        title={<Title level={4}>Users</Title>}
        style={{
          width: 300,
          textAlign: "center",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <p>Kullanıcı listesine göz at</p>
        <Link to="/users">Go to Users</Link>
      </Card>

      <Card
        hoverable
        title={<Title level={4}>Posts</Title>}
        bordered={false}
        style={{
          width: 300,
          textAlign: "center",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <p>Gönderi listesine göz at</p>
        <Link to="/posts">Go to Posts</Link>
      </Card>
    </div>
  );
};

export default Homepage;
