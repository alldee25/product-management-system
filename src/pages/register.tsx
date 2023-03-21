import React from "react";
import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FormContextProps } from "antd/es/form/context";
interface Props {
  isRegister: boolean;
  loading: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance;
}
function Register({ setIsRegister, loading, setLoading, form }: Props) {
  const validateConfirmPassword = (_: any, value: any) => {
    const password = form.getFieldValue("password");
    if (value && value !== password) {
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    }
    return Promise.resolve();
  };
  return (
    <Row justify={"center"}>
      <Col md={24}>
        <Row>
          <Button onClick={() => setIsRegister(false)}>
            <ArrowLeftOutlined />
            Back
          </Button>
        </Row>
      </Col>
      <Col md={12}>
        <Row>
          <Col md={24}>
            <Row justify={"center"}>
              <h1>sign up</h1>
            </Row>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Conform password"
              name="conformPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Button
              loading={loading}
              form="register"
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Register;
