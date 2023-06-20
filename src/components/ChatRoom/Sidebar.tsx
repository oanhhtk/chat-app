import { PlusSquareOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import React from "react";
import UserInfo from "./UserInfo";
interface SideBarProps {}

const items2: MenuProps["items"] = [UserOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `Danh sách phòng`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `Room-${subKey}`,
      };
    }),
  };
});

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={[
          {
            key: "ac",
            label: <UserInfo />,
          },
          ...items2,
        ]}
      />

      <div className="flex justify-center">
        <Button className="text-center">
          <PlusSquareOutlined /> Thêm phòng
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
