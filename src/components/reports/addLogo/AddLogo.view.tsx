import React from 'react';
import type { UploadProps } from 'antd';
import { Button, Card, Col, Form, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

interface OnSubmitValues {
  url: string;
}

interface Props {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  onClose: () => void;
  selectLogo: (url: string) => void;
  documentUploadProps: UploadProps;
  logos: string[];
}

const AddLogoView = ({
  onSubmit,
  saving,
  onClose,
  documentUploadProps,
  logos,
  selectLogo,
}: Props) => (
  <Card style={{ marginLeft: 20, marginRight: 20 }}>
    {logos.length > 0 &&
      logos?.map((logo) => (
        <Row gutter={[16, 16]} style={{ marginBottom: '15px' }}>
          <Col span={18}>
            <div style={{ width: '100%', height: 100 }}>
              <img
                src={logo}
                alt=""
                style={{
                  height: '100%',
                  marginRight: 10,
                }}
              />
            </div>
          </Col>
          <Col span={6}>
            <div
              style={{
                height: '100%',
                alignContent: 'center',
                flexWrap: 'wrap',
                display: 'flex',
              }}
            >
              <Button type="primary" onClick={() => selectLogo(logo)}>
                <FormattedMessage defaultMessage="Select" />
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    <Form<OnSubmitValues>
      initialValues={{
        url: '',
      }}
      onFinish={onSubmit}
    >
      <Row style={{ marginLeft: 20, marginTop: 50 }}>
        <Upload
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...documentUploadProps}
          listType="picture"
          style={{ display: 'flex' }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>
            <FormattedMessage defaultMessage="Upload Logo" />
          </Button>
        </Upload>
      </Row>
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              disabled={saving}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  </Card>
);

export default AddLogoView;
