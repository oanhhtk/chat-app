import {
  FacebookOutlined,
  GoogleOutlined,
  LockOutlined,
  QqOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Tabs,
  Typography,
  message,
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { addDocument, generateKeywords } from "../../firebase/service";
import { COLLECTION } from "../../firebase/collections";
import firebase, { auth } from "../../firebase/config";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  // const auth = getAuth();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const data = await auth.signInWithPopup(googleProvider);
      // const additonalInfo = getAdditionalUserInfo(data);
      const user = data.user;
      console.log("data :>> ", data);
      if (data.additionalUserInfo?.isNewUser) {
        await addDocument(COLLECTION.USERS, {
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
          providerId: data.additionalUserInfo?.providerId,
          keywords: generateKeywords(user?.displayName || ""),
        });
      }

      if (user?.uid) navigate("/");
      message.success("Login successfully!");
    } catch (error: any) {
      navigate("/login");
    }
  };

  if (localStorage.getItem("accessToken")) {
    console.log("has accessToken", localStorage.getItem("accessToken"));
    return <Navigate to="/" />;
  }

  const items = [
    {
      key: "social-login",
      label: `Login with Social media`,
      children: (
        <div className="flex justify-center items-center">
          <Space direction="vertical">
            <Button
              style={{
                width: 300,
              }}
              icon={<GoogleOutlined />}
              onClick={async () => {
                await loginWithGoogle();
              }}
            >
              Sign In with Google
            </Button>
            <Button
              style={{
                width: 300,
              }}
              disabled
              icon={<FacebookOutlined />}
            >
              Sign In with Facebook
            </Button>
            <Button
              style={{
                width: 300,
              }}
              disabled
              icon={<TwitterOutlined />}
            >
              Sign In with Twitter
            </Button>
          </Space>
        </div>
      ),
    },
    {
      key: "login-form",
      label: `Login with Phone number`,
      children: (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={() => {}}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value="oanh"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  value="12345"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="#">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <div
        className="flex justify-center items-center"
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            minWidth: 700,
          }}
        >
          <Typography.Title
            style={{
              textAlign: "center",
              padding: "10px 0",
            }}
            className="text-center"
          >
            <QqOutlined
              style={{
                background: "pink",
                padding: 4,
                borderRadius: 50,
              }}
            />{" "}
            Funny chat <br />
            <Typography.Text
              style={{
                textAlign: "center",
                fontWeight: "normal",
              }}
              className="text-center"
            >
              Welcome to{" "}
              <span
                style={{
                  color: "pink",
                }}
              >
                oanhhtk chat app
              </span>{" "}
            </Typography.Text>
          </Typography.Title>

          <Tabs
            className="login-tabs"
            defaultActiveKey="social-login"
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
