import { Button, Form } from 'antd';
import { InputOTP } from 'antd-input-otp'; // Don't forget to import this too!

const InputOTPPage = () => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {

    };

    return (
        <Form onFinish={handleFinish} form={form}>
            <Form.Item label="OTP" name="otp">
                <InputOTP autoSubmit={form} inputType="numeric" />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};
export default InputOTPPage;