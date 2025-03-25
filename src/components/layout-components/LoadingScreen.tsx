import { SIDE_NAV_WIDTH } from '#/constants/ThemeConstant';
import { Col, Layout, Row, Skeleton } from 'antd';
import React from 'react';

const LoadingScreen = () => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <Layout>
      <Layout className="app-container">
        <Layout.Sider width={SIDE_NAV_WIDTH}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '15px 0 20px',
              }}
            >
              <img
                src={isDarkTheme ? '/img/light-logo.svg' : '/img/logo.png'}
                style={{ width: 130 }}
              />
            </div>
            <div style={{ borderRight: 0, flex: 1, padding: 10 }}>
              <Skeleton.Button
                style={{ height: 45, marginBottom: 10, width: 150 }}
              />
              <Skeleton.Button
                style={{ height: 45, marginBottom: 10, width: 150 }}
              />
              <Skeleton.Button
                style={{ height: 45, marginBottom: 10, width: 150 }}
              />
              <Skeleton.Button
                style={{ height: 45, marginBottom: 10, width: 150 }}
              />
              <Skeleton.Button
                style={{ height: 45, marginBottom: 10, width: 150 }}
              />
            </div>
          </div>
        </Layout.Sider>
        <Layout.Content
          className="loading-screen"
          style={{ height: '100vh', padding: 15 }}
        >
          <Row gutter={[16, 16]} style={{ height: '100%' }}>
            <Col span={8} style={{ height: '100%' }}>
              <Skeleton.Input
                active
                style={{
                  borderRadius: 10,
                  height: '100%',
                  marginBottom: 10,
                  width: '100%',
                }}
              >
                <div />
              </Skeleton.Input>
            </Col>
            <Col flex={1} style={{ height: '100%' }}>
              <Row gutter={[16, 16]} style={{ height: '100%' }}>
                <Col span={24} style={{ height: '50%' }}>
                  <Skeleton.Input
                    active
                    style={{
                      borderRadius: 10,
                      height: '100%',
                      marginBottom: 10,
                      width: '100%',
                    }}
                  >
                    <div />
                  </Skeleton.Input>
                </Col>
                <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                  <Skeleton.Input
                    active
                    style={{
                      borderRadius: 10,
                      height: '100%',
                      marginBottom: 10,
                      width: '100%',
                    }}
                  >
                    <div />
                  </Skeleton.Input>
                </Col>
                <Col span={12} style={{ height: 'calc(50% - 16px)' }}>
                  <Skeleton.Input
                    active
                    style={{
                      borderRadius: 10,
                      height: '100%',
                      marginBottom: 10,
                      width: '100%',
                    }}
                  >
                    <div />
                  </Skeleton.Input>
                </Col>
              </Row>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LoadingScreen;
