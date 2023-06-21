import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
  const auth = getAuth();

  useEffect(() => {
    // onSnapshot listen firestore change => trigger call fn
    const unsub = onSnapshot(collection(db, "users"), (docsSnap) => {
      //docsSnap la du lieu thuan từ firebase
      console.log("docsSnap?.data() :>> ", docsSnap, docsSnap.docs);
      const data = docsSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("object :>> ", data);
    });
    return unsub;
  }, []);

  return (
    <div>
      <Row align={"middle"}>
        <Col span={6}>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        </Col>
        <Col span={10}>Name</Col>
        <Col span={8}>
          <Tooltip title="Logout">
            <Button type="text" onClick={() => auth?.signOut()}>
              <LogoutOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
