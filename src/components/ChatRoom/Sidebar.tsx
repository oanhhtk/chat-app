import {
  PlusSquareOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps, Popconfirm, Tooltip, message } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { COLLECTION } from "../../firebase/collections";
import { addDocument } from "../../firebase/service";
import AddNewRoomModal from "../Modal/AddNewRoomModal";
import UserInfo from "./UserInfo";
import { auth } from "../../firebase/config";
interface SideBarProps {
  isCollapsed: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isCollapsed }) => {
  const [open, setOpen] = useState(false);
  const { rooms, setSelectedRoomId } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const items2: MenuProps["items"] = [UserOutlined].map((icon, index) => {
    return {
      key: `list`,
      icon: React.createElement(icon),
      label: `Danh sách phòng`,
      children: rooms?.map((item) => {
        return {
          key: item?.id,
          label: item?.name,
        };
      }),
    };
  });

  const addNewRoom = async (vals: any) => {
    try {
      await addDocument(COLLECTION.ROOMS, { ...vals, members: [user?.uid] });
      message.success("Thêm phòng thành công");
      setOpen(false);
    } catch (error) {
      message.error("Có lỗi xảy ra vui lòng thử lại!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["list"]}
        defaultSelectedKeys={["list"]}
        onClick={(room) => {
          setSelectedRoomId?.(room.key);
        }}
        items={[
          {
            key: "ac",
            label: <UserInfo isCollapse={isCollapsed} />,
          },
          ...items2,
        ]}
      />

      <div className="flex flex-col justify-center">
        <Button
          shape={"default"}
          type="text"
          className="text-center"
          style={{
            margin: 10,
          }}
          onClick={() => setOpen(true)}
        >
          <PlusSquareOutlined /> {isCollapsed ? "" : " Thêm phòng"}
        </Button>
        <Tooltip title="Logout">
          <Popconfirm
            title="Bạn có muốn đăng xuất?"
            description=""
            okText="Đồng ý"
            cancelText="Huỷ"
            placement="right"
            onConfirm={() => auth?.signOut()}
          >
            <Button
              shape={"default"}
              type="text"
              style={{
                margin: 10,
              }}
            >
              <LogoutOutlined /> {isCollapsed ? "" : "Đăng xuất"}
            </Button>
          </Popconfirm>
        </Tooltip>
      </div>

      <AddNewRoomModal
        title="Thêm phòng"
        open={open}
        onCancel={() => setOpen(false)}
        onOK={addNewRoom}
        okText={"Tạo phòng"}
        cancelText={"Đóng"}
      />
    </div>
  );
};

export default SideBar;
