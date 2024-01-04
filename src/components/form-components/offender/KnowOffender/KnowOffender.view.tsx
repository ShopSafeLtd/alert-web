import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useIntl } from 'react-intl';
import type { FormData } from './useKnowOffender';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const KnowOffender = ({ onSubmit, saving, onClose }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Form onFinish={onSubmit} layout="vertical">
        <Row gutter={30}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: `Enter the name of the offender`,
                id: 'EbPy/z',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'SvRg2+',
                    defaultMessage: `Please enter the name of the offender.`,
                  }),
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="infoSource"
              label={intl.formatMessage({
                defaultMessage: 'Information Source',
                id: 'LUqHSz',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: `Enter the information source of the offender's name`,
                id: 'WYJoK2',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'GF+F7n',
                    defaultMessage: `Please enter the information source of the offender's name.`,
                  }),
                },
              ]}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                  id: '47FYwb',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage({
                  defaultMessage: 'Save',
                  id: 'jvo0vs',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
export default KnowOffender;
