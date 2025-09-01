import { Button, Card, Col, Form, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface WorkflowHeaderProps {
  editId?: string;
  saving: boolean;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ editId, saving }) => {
  const intl = useIntl();

  return (
    <Card bodyStyle={{ padding: '12px 20px' }}>
      <Row align="middle">
        <Col flex={1}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {editId
              ? intl.formatMessage({
                  defaultMessage: 'Edit Workflow',
                })
              : intl.formatMessage({
                  defaultMessage: 'Create Workflow',
                })}
          </Typography.Title>
        </Col>
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Row gutter={16}>
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Back',
                  })}
                </Button>
              </Col>
              <Col>
                <Button disabled={saving} htmlType="submit" type="primary">
                  {editId
                    ? intl.formatMessage({
                        defaultMessage: 'Save Workflow',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Create Workflow',
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

export default WorkflowHeader;
