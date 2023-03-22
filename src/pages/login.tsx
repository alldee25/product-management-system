import { MehFilled } from "@ant-design/icons";
import { Row, Col, Button, Form, Input, Divider, message } from "antd";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import imgB from "../assets/images/background/19406407.jpg";
import { useAuthContextDispatch } from "../context/Auth/store";
import { auth } from "../firebase";
import Register from "./register";

const LoginPage = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isRegister, setIsRegister] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { _signIn } = useAuthContextDispatch();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      res.user
        .getIdToken(true)
        .then(function (idToken) {
          _signIn({
            token: {
              accesstoken: idToken,
              rtoken: res.user.refreshToken,
            },
            userInfo: {
              uuid: res.user.uid,
              email: res.user.email,
              role: "superuser",
            },
          });
          setLoading(false);
          history.replace("admin/product");
          Swal.fire({
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            position: "top-right",
          });
        })
        .catch(function (error) {
          setLoading(false);
          message.info({
            type: "error",
            content: error,
          });
        });
    } catch (error) {
      console.log(error);
      message.info({
        type: "error",
        content: "email or password incorect",
      });
    }
  };
  async function onFinishRegster(values: any) {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
        Swal.fire({
          icon: "success",
          title: "ลงทะเบียนสำเร็จ",
          position: "top-right",
        }).then(() => {
          setIsRegister(false);
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
        message.info({
          type: "error",
          content: "somthin wrong",
        });
      });
  }

  return (
    <Main justify={"center"} align="middle" isRegister={isRegister}>
      <Col md={24}>
        <Row justify={"center"}>
          <Col>
            <Row className="content-box" justify={"end"}>
              <Col md={12} className="signin-content">
                <Row justify={"center"} style={{ paddingTop: "30px" }}>
                  <h1>Sign In</h1>
                  <Col md={24}>
                    <Row justify={"center"} style={{ padding: "30px" }}>
                      <Form
                        layout="vertical"
                        name="signin"
                        style={{ width: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Form>
                      <Button
                        loading={loading}
                        form="signin"
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        Submit
                      </Button>
                      <Divider plain>Or</Divider>
                      <Button
                        type="default"
                        style={{ width: "100%" }}
                        onClick={() => setIsRegister(true)}
                      >
                        Sign Up
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={isRegister ? 24 : 12} className="form-box">
                <Row justify={"center"} className="form-content" align={"top"}>
                  <Col md={24}>
                    {isRegister ? (
                      <Form
                        form={form}
                        name="register"
                        layout="vertical"
                        onFinish={onFinishRegster}
                      >
                        <Register
                          form={form}
                          loading={loading}
                          setLoading={setLoading}
                          isRegister={isRegister}
                          setIsRegister={setIsRegister}
                        />
                      </Form>
                    ) : (
                      <Row justify={"center"}>
                        <h1>ระบบจัดการสินค้า</h1>
                        <div
                          style={{
                            borderRadius: "30px",
                            overflow: "hidden",
                            height: "40vh",
                          }}
                        >
                          <img
                            src={`${require("../assets/images/6378220.jpg")}`}
                            alt=""
                            style={{
                              width: "100%",
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                        </div>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Main>
  );
};

export default LoginPage;
const Main = styled(Row)`
  height: 100vh;
  overflow: hidden;
  background-image: url(${imgB});
  background-repeat: no-repeat;
  background-size: cover;
  .content-box {
    background-color: #ffffff49;
    backdrop-filter: blur(10px);
    height: 580px;
    width: 880px;
    padding: 10px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    .signin-content {
      position: absolute;
      transition: ease-in 0.2s;
      top: 0;
      left: ${({ isRegister }: { isRegister: boolean }) =>
        isRegister ? "-100%" : "0"};
    }
    .form-box {
      height: 100%;
      transition: ease-in 0.2s;
      .form-content {
        height: 100%;
        padding: 30px;
        border-radius: 20px;
        background-color: white;
      }
    }
  }
`;
