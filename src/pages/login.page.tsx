import { Form, Input, Button, Typography, Card } from "antd";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

const { Title } = Typography;
interface IValues {
  email: string;
  password: string;
}
const Login = () => {
  const loginMutation = useLogin();
  const onFinish = async (values: IValues) => {
    loginMutation.mutate(values)
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} className="register-title">
          Đăng nhập
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/register"} className="link-text">
          Bạn chưa có tài khoản? Đăng ký ngay
        </Link>
      </Card>
    </div>
  );
};

export default Login;
