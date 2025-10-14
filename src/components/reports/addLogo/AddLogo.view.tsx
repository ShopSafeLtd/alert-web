import type { UploadProps } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Row, Upload } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface OnSubmitValues {
  url: string;
}

interface Props {
  documentUploadProps: UploadProps;
  logos: string[];
  onClose: () => void;
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  selectLogo: (url: string) => void;
}

const AddLogoView = ({
  documentUploadProps,
  logos,
  onClose,
  onSubmit,
  saving,
  selectLogo,
}: Props) => (
  <Card style={{ marginLeft: 20, marginRight: 20 }}>
    {logos.length > 0 &&
      logos?.map((logo) => (
        <Row gutter={[16, 16]} style={{ marginBottom: '15px' }}>
          <Col span={18}>
            <div style={{ height: 100, width: '100%' }}>
              <img
                alt=""
                src={logo}
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
                alignContent: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                height: '100%',
              }}
            >
              <Button onClick={() => selectLogo(logo)} type="primary">
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
          maxCount={1}
          style={{ display: 'flex' }}
        >
          <Button icon={<UploadOutlined />}>
            <FormattedMessage defaultMessage="Upload Logo" />
          </Button>
        </Upload>
      </Row>
      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
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
