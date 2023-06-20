import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import React from "react";
import ChatWindow from "./ChatWindow";
import SideBar from "./Sidebar";

interface ChatRoomProps {}

const ChatRoom: React.FC<ChatRoomProps> = () => {
  return (
    // <div
    //   style={{
    //     maxHeight: "100vh",
    //     // overflow: "hidden",ø
    //   }}
    // >
    //   <div>
    //     <Row gutter={16}>
    //       <Col span={6}>
    //         <SideBar />
    //       </Col>
    //       <Col span={18}>
    //         <ChatWindow />
    //       </Col>
    //     </Row>
    //   </div>
    // </div>

    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <SideBar />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: "100vh",
            maxHeight: "100vh",
          }}
        >
          <div
            style={{
              padding: 24,
              background: "#fff",
              height: "100%",
            }}
          >
            <ChatWindow />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatRoom;
