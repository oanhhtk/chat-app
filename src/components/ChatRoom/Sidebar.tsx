import { PlusSquareOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps, message } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { COLLECTION } from "../../firebase/collections";
import { addDocument } from "../../firebase/service";
import AddNewRoomModal from "../Modal/AddNewRoomModal";
import UserInfo from "./UserInfo";
interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
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
    console.log("vals :>> ", vals);
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
            label: <UserInfo />,
          },
          ...items2,
        ]}
      />

      <div className="flex justify-center">
        <Button className="text-center" onClick={() => setOpen(true)}>
          <PlusSquareOutlined /> Thêm phòng
        </Button>
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
