import { Button, Form ,message} from 'antd';
import { InputOTP } from 'antd-input-otp';
import AuthService   from "../services/auth.service.js";
import {useNavigate} from "react-router-dom";

const InputOTPPage = ({email}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const errorOTP = (alert) => {
        messageApi.open({
            type: 'error',
            content: alert,
        });
    };

    const handleFinish = (values) => {
        const otp = values.otp.join('');
        AuthService.otp(email,otp).then((response) => {
                navigate("/login");
            }).catch((error) =>{
                errorOTP(error);
        })
    };

    return (
        <main className="app">
            <section className="card">
                <h2>Uncontrolled</h2>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name="otp"
                        className="center-error-message"
                        rules={[{validator: async () => Promise.resolve()}]}
                    >
                        <InputOTP autoFocus inputType="numeric" length={4}/>
                    </Form.Item>

                    <Form.Item noStyle>
                        <Button block htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </main>
    );
};
export default InputOTPPage;