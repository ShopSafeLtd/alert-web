import { Button, Card, Col, Form, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface ConfigHeaderProps {
  editId?: string;
  saving: boolean;
}

const ConfigHeader: React.FC<ConfigHeaderProps> = ({ editId, saving }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <Card bodyStyle={{ padding: '12px 20px' }}>
      <Row align="middle">
        <Col flex={1}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {editId
              ? intl.formatMessage({
                  defaultMessage: 'Edit Camera',
                })
              : intl.formatMessage({
                  defaultMessage: 'Create Camera',
                })}
          </Typography.Title>
        </Col>
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Row gutter={16}>
              <Col>
                <Button
                  disabled={saving}
                  onClick={() => navigate('/app/vision/cameras')}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Back',
                  })}
                </Button>
              </Col>
              <Col>
                <Button disabled={saving} htmlType="submit" type="primary">
                  {editId
                    ? intl.formatMessage({
                        defaultMessage: 'Save Camera',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Create Camera',
                      })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ConfigHeader;
