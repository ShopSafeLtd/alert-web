import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Typography, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useStoreState } from "state";
import { useMutation, useQuery } from "@apollo/client";
import { Verify, VerifyArgs, VerifyRes } from "graphql-src/auth/queries";
import {
  VerifyUser,
  VerifyUserArgs,
  VerifyUserRes,
} from "graphql-src/auth/mutations";
import styled from "styled-components";
import { useAuth } from "hooks";

const Verifying = styled.div`
  display: flex;
  flex-direction: column;
`;
const VerifyingText = styled(Typography.Text)`
  margin-bottom: 15px;
  font-size: 16px;
  text-align: center;
`;
const Description = styled.p`
  line-height: 18px;
`;
const Welcome = styled(Typography.Title)`
  margin-bottom: 30px;
  text-align: center;
`;
const Header = styled(Typography.Title)`
  margin-top: 10px !important;
`;

interface Props {
  match: any;
  history: any;
}

const LoginOne = (props: Props) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const token = useStoreState((state) => state.auth.token);
  const { onLoginSuccess } = useAuth();

  const [verifying, setVerifying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    token && props.history.push("/app");
    // eslint-disable-next-line
  }, []);

  const { data } = useQuery<VerifyRes, VerifyArgs>(Verify, {
    onCompleted: () => {
      setVerifying(false);
    },
    variables: {
      id: props.match.params.id,
    },
    onError: () => {
      setExpired(true);
    },
  });

  const [verify] = useMutation<VerifyUserRes, VerifyUserArgs>(VerifyUser);

  interface OnSubmitPasswordArgs {
    password: string;
  }

  const onSubmitPassword = async ({ password }: OnSubmitPasswordArgs) => {
    setLoading(true);
    const { data } = await verify({
      variables: {
        id: props.match.params.id,
        password,
      },
    });
    setLoading(false);
    if (data?.verifyUser)
      onLoginSuccess({
        accessToken: data.verifyUser.access_token,
        email: data.verifyUser.email,
        fullName: data.verifyUser.fullName,
        id: data.verifyUser.id,
        onboarded: !data.verifyUser.newUser,
        organisation: data.verifyUser.organisation,
        schemes: [],
      });
  };

  const backgroundStyle = {
    background:
      theme === "dark"
        ? "linear-gradient(to right, #283c86, #45a247)"
        : "linear-gradient(to right, #11998e, #38ef7d)",
  };

  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={`/img/${
                      theme === "light" ? "logo.svg" : "logo-white.svg"
                    }`}
                    alt=""
                    style={{ marginBottom: 20 }}
                  />
                </div>
                <Row justify="center">
                  {expired ? (
                    <Verifying>
                      <VerifyingText type="danger">
                        This invite link has expired. If you need another please
                        speak to you administrator.
                      </VerifyingText>
                    </Verifying>
                  ) : verifying ? (
                    <Verifying>
                      <VerifyingText>Verifying your account...</VerifyingText>
                      <Spin />
                    </Verifying>
                  ) : (
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <>
                        <Form
                          layout="vertical"
                          name="login-form"
                          onFinish={onSubmitPassword}
                        >
                          <Welcome level={3}>
                            Welcome {!!data ? data.verify.name : ""}!
                          </Welcome>
                          <Header level={4}>Set New Password</Header>
                          <Description>
                            Please enter your new password that you will use to
                            access the portal.
                          </Description>

                          <Form.Item
                            name="password"
                            label="New Password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password",
                              },
                              {
                                min: 8,
                                message:
                                  "Needs to be at least 8 characters long",
                              },
                              {
                                pattern: RegExp(/\d/),
                                message: "Requires at least one number",
                              },
                              {
                                pattern: RegExp(/[a-zA-Z]/),
                                message:
                                  "Requires at least one uppercase and lowercase letter",
                              },
                            ]}
                          >
                            <Input.Password
                              prefix={<LockOutlined className="text-primary" />}
                            />
                          </Form.Item>
                          <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password
                              prefix={<LockOutlined className="text-primary" />}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              block
                              loading={loading}
                            >
                              Update Password
                            </Button>
                          </Form.Item>
                        </Form>
                      </>
                    </Col>
                  )}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginOne;
