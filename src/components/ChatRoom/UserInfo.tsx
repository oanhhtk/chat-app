import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { auth } from "../../firebase/config";

interface UserInfoProps {
  isCollapse: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ isCollapse }) => {
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
        <Col span={isCollapse ? 0 : 10}>
          <span className="line-truncate">{user?.displayName}</span>
        </Col>
        {/* <Col span={isCollapse ? 10 : 8}>
          <Tooltip title="Logout">
            <Button type="text" onClick={() => auth?.signOut()}>
              <LogoutOutlined />
            </Button>
          </Tooltip>
        </Col> */}
      </Row>
    </div>
  );
};

export default UserInfo;
