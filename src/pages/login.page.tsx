import { Form, Input, Button, Typography, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { localStorageUtil } from "../helpers/localstorage.helper";

const { Title } = Typography;
interface IValues {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values: IValues) => {
    try {
      const response = await AuthService.login(values);
      localStorageUtil.set("user", response.user);
      localStorageUtil.set("accessToken", response.access_token);
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast.error(error?.message ?? "Lỗi hệ thống");
    }
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
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
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
