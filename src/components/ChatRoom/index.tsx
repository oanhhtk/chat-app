import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import SideBar from "./Sidebar";

import ChatHeader from "./ChatWindow/components/ChatHeader";
interface ChatRoomProps {}

const ChatRoom: React.FC<ChatRoomProps> = () => {
  const [collapsed] = useState(true);
  return (
    <Layout
      style={{
        zIndex: 11,
        background: "#fff",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <SideBar isCollapsed={collapsed} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: "unset",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
          }}
          className="flex items-center"
        >
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 50,
              height: 50,
            }}
          /> */}
          <div
            style={{
              width: "80px",
            }}
          ></div>
          <ChatHeader
            style={{
              background: "unset",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "0",
            overflow: "initial",
            maxHeight: "100%",
          }}
        >
          <div
            style={{
              padding: 16,
              background: "#fff",
              height: "100%",
              paddingLeft: 80,
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
