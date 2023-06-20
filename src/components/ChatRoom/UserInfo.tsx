import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import { getAuth } from "firebase/auth";

interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
  const auth = getAuth();
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
