import React from "react";
import { Card, Typography, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";

const { Title } = Typography;

type DashboardCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
};

const cards: DashboardCard[] = [
  {
    title: "Users",
    description: "Browse the user list.",
    icon: <UserOutlined style={{ fontSize: 160, color: "rgba(255,255,255,0.05)" }} />,
    link: "/users",
    linkText: "Go to Users",
  },
  {
    title: "Posts",
    description: "Browse the post list.",
    icon: <FileTextOutlined style={{ fontSize: 160, color: "rgba(255,255,255,0.05)" }} />,
    link: "/posts",
    linkText: "Go to Posts",
  },
];

const cardBase: React.CSSProperties = {
  width: "100%",
  maxWidth: 300,
  minHeight: 220,
  textAlign: "center",
  borderRadius: 16,
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, #3a2f33ff 0%, #0f0909ff 100%)",
  color: "#fff",
  margin: "0 auto",
  transition: "all 0.3s ease",
  cursor: "pointer", 
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
};

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Card
        title={<Title level={3} style={{ margin: 0 }}>Cards</Title>}
        style={{ borderRadius: 16, overflowX: "auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {cards.map((card, idx) => (
            <Card
              key={idx}
              hoverable
              style={cardBase}
              bodyStyle={{ padding: 24 }}
              onClick={() => navigate(card.link)} 
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              {card.icon}
              <div style={contentStyle}>
                <Title level={4} style={{ color: "#fff" }}>
                  {card.title}
                </Title>
                <p>{card.description}</p>
                <Link to={card.link}>
                  <Button
                    type="primary"
                    ghost
                    style={{
                      borderRadius: 8,
                      fontWeight: 500,
                      transition: "all 0.3s",
                    }}
                  >
                    {card.linkText}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Homepage;
