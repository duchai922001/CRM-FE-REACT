import { Form, Input, Button, Typography, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IRegister } from "../types/auth.interface";
import { AuthService } from "../services/auth.service";

const { Title } = Typography;
interface IValues {
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  name: string;
}
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values: IValues) => {
    if (values.password !== values.confirmPassword) {
      return toast.warning("Mật khẩu không khớp");
    }
    const payload: IRegister = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    };
    try {
      await AuthService.register(payload);
      toast.success("Đăng ký thành công");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} className="register-title">
          Đăng ký
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên của bạn"
            name="name"
            rules={[{ required: true, message: "Vui lòng điền họ và tên" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng điền email",
              },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="0123456789" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/login"} className="link-text">
          Bạn đã có tài khoản? Đăng nhập ngay
        </Link>
      </Card>
    </div>
  );
};

export default Register;
