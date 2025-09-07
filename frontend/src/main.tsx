import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css"; 
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      //Global tokenlar (HEX kullan!)
      token: {
        colorPrimary: "#800020",      
        colorInfo: "#ff4d4f",         
        colorLink: "#ff4d4f",
        colorLinkHover: "#ff7875",
        colorBgBase: "#1d1f21",       //sayfa zemini
        colorBgContainer: "#26282b",  //kart/header zemini
        colorText: "#f2f2f2",         //temel metin
      },
      
      components: {
        Layout: {
          headerBg: "#26282b",
          bodyBg: "#1d1f21",
          footerBg: "#1d1f21",
          siderBg: "#1a1c1e",
          triggerBg: "#26282b",
          triggerColor: "#f2f2f2",
        },
        Menu: {
          //dark tema için özel tokenlar
          darkItemColor: "#d9d9d9",
          darkItemHoverColor: "#ffffff",
          darkItemSelectedColor: "#ffffff",
          darkItemBg: "#1a1c1e",
          darkSubMenuItemBg: "#16181a",
          darkItemSelectedBg: "#5e0b20", 
        
        },
        Button: {
          colorPrimary: "#800020",
          colorPrimaryHover: "#a81c3a",
          colorPrimaryActive: "#5e0b20",
          controlHeight: 40,
          borderRadius: 8,
        },
        Card: {
          colorBgContainer: "#26282b",
          headerBg: "#26282b",
          borderRadiusLG: 12,
        },
        Table: {
          colorBgContainer: "#26282b",
          headerBg: "#303236",
          headerColor: "#ffffff",
          rowHoverBg: "#2e3033",
        },
        Typography: {
          colorTextHeading: "#ffffff",
          colorText: "#f2f2f2",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
