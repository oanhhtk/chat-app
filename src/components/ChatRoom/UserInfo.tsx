import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
  const auth = getAuth();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Row align={"middle"}>
        <Col span={6}>
          <Avatar
            src={
              user?.photoURL ||
              "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            }
          />
        </Col>
        <Col span={10}>
          <span className="line-truncate">{user?.displayName}</span>
        </Col>
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
