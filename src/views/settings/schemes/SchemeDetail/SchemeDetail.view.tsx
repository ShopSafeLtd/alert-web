import React from 'react';
import { SchemeQuery } from 'graphql/generated';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Card,
  Skeleton,
  Switch,
  Typography,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Space,
} from 'antd';
import ImgCrop from 'antd-img-crop';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title, Text } = Typography;

interface Props {
  data: SchemeQuery | undefined;
  loading: boolean;
  saving: boolean;
  onSubmit: (value: FormData) => void;
  beforeUpload: (value: RcFile) => void;
  onPreview: (value: UploadFile) => void;
  fileList: UploadFile[];
  imgChange: UploadProps['onChange'];
}
interface FormData {
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  incidentRetention: number | null;
  offenderRetention: number | null;
  logo: { id: string; url: string; optimised: string };
}
const options = [
  { value: -1, label: 'Disabled' },
  { value: 91, label: '3 months' },
  { value: 183, label: '6 months' },
  { value: 365, label: '12 months' },
  { value: 547, label: '18 months' },
  { value: 730, label: '2 years' },
  { value: 1096, label: '3 years' },
  { value: 1826, label: '5 years' },
];
const GroupDetail = ({
  data,
  loading,
  saving,
  onSubmit,
  beforeUpload,
  imgChange,
  onPreview,
  fileList,
}: Props): JSX.Element => (
  <div className="list-view">
    <Row style={{ margin: 15 }}>
      <Col>
        <Title level={3}>Scheme Settings</Title>
      </Col>
    </Row>

    {loading ? (
      <Skeleton />
    ) : (
      <Card>
        <Form
          onFinish={onSubmit}
          initialValues={{
            name: data?.scheme?.name,
            autoApproveOffenders: data?.scheme?.autoApproveOffenders,
            autoApproveIncidents: data?.scheme?.autoApproveIncidents,
            incidentRetention: data?.scheme?.incidentRetention,
            offenderRetention: data?.scheme?.offenderRetention,
          }}
        >
          <Row gutter={20} style={{ marginBottom: 30 }}>
            <Col>
              <Title level={4}>Scheme Details:</Title>
              <Text type="secondary">
                Changed the scheme name and upload a logo.
              </Text>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="Scheme Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a name for the scheme.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={20}>
              <Form.Item name="logo" label="Scheme Logo">
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onChange={imgChange}
                    onPreview={onPreview}
                    maxCount={1}
                    accept=".png,.jpeg,.webp"
                  >
                    {fileList.length < 2 && '+ Upload'}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} style={{ marginTop: 40, marginBottom: 30 }}>
            <Col>
              <Title level={4}>Auto Approve Options:</Title>
              <Text type="secondary">
                Enabling auto approve will automatically approve any new
                incidents and offenders without manual approval.
              </Text>
            </Col>
          </Row>

          <Row>
            <Col span={15}>
              <Form.Item
                label="Auto Approve Incident"
                name="autoApproveIncidents"
                valuePropName="checked"
              >
                <Switch disabled={saving} style={{ marginLeft: 5 }} />
              </Form.Item>
              <Form.Item
                name="autoApproveOffenders"
                label="Auto Approve Offenders"
                valuePropName="checked"
              >
                <Switch disabled={saving} style={{ marginLeft: 5 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} style={{ marginTop: 40, marginBottom: 30 }}>
            <Col>
              <Title level={4} style={{ marginBottom: 15 }}>
                Date Retention:
              </Title>
              <Text type="secondary">
                Select a period of time to retain data before it is
                automatically deleted. You can also disable this feature and
                manually audit your data.
              </Text>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item
                name="incidentRetention"
                label="Delete incidents after: "
                rules={[
                  {
                    type: 'number',
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  options={options}
                  disabled={saving}
                />
              </Form.Item>

              <Form.Item
                name="offenderRetention"
                label="Delete offenders after: "
                rules={[{ required: true }]}
              >
                <Select options={options} disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={16} style={{ marginLeft: 10 }}>
              <Space direction="vertical">
                <Text>
                  <ExclamationCircleOutlined
                    style={{ margin: 8, color: '#f5222d' }}
                  />
                  The selected period of time begins on the date that an
                  offender or incident was last updated.
                </Text>

                <Text>
                  <ExclamationCircleOutlined
                    style={{ margin: 8, color: '#f5222d' }}
                  />
                  Once this period has elapsed, the item will be transfered to
                  the recycle bin.
                </Text>

                <Text>
                  <ExclamationCircleOutlined
                    style={{ margin: 8, color: '#f5222d' }}
                  />
                  It will remain in the recycle bin for 30 days before being
                  permanently deleted.
                </Text>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Text>
                In accordance with your data protection obligations, data must
                only be retained for as long as it is relevant. It is your
                responsibility to determine that period of time.
              </Text>
            </Col>
            <Col span={24}>
              <Text strong>
                If you elect to disable auto-deletion, you must manually remove
                data which is no longer relevant.
              </Text>
            </Col>
          </Row>

          <Row>
            <Col />
          </Row>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={16} justify="end">
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    )}
  </div>
);
export default GroupDetail;
