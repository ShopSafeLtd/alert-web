import React from 'react';
import type { SchemeQuery } from 'graphql/generated';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Space,
  Switch,
  Typography,
  Upload,
} from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title, Text } = Typography;

interface Props {
  data: SchemeQuery | undefined;
  loading: boolean;
  saving: boolean;
  onSubmit: (value: FormData) => void;
  beforeUpload: (value: RcFile, dark?: string) => void;
  darkFileList: UploadFile[];
  darkImgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  fileList: UploadFile[];
  imgChange: UploadProps['onChange'];
}

interface FormData {
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  defaultIncidentEmail: boolean;
  defaultIncidentPush: boolean;
  defaultSubscribedIncidentOnly: boolean;
  defaultSubscribedOffenderOnly: boolean;
  defaultMessagePush: boolean;
  defaultOffenderEmail: boolean;
  defaultOffenderPush: boolean;
  defaultPublicOffenderDOB: boolean;
  incidentRetention: number | null;
  offenderRetention: number | null;
  logo?: { id: string; url: string; optimised: string };
  darkLogo?: { id: string; url: string; optimised: string };
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
const SchemeDetail = ({
  data,
  loading,
  saving,
  onSubmit,
  beforeUpload,
  imgChange,
  onPreview,
  fileList,
  darkImgChange,
  darkFileList,
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
      <Form
        onFinish={onSubmit}
        initialValues={{
          name: data?.scheme?.name,
          autoApproveOffenders: data?.scheme?.autoApproveOffenders,
          autoApproveIncidents: data?.scheme?.autoApproveIncidents,
          incidentRetention: data?.scheme?.incidentRetention,
          offenderRetention: data?.scheme?.offenderRetention,
          defaultIncidentEmail: data?.scheme?.defaultIncidentEmail,
          defaultIncidentPush: data?.scheme?.defaultIncidentPush,
          defaultSubscribedIncidentOnly:
            data?.scheme?.defaultSubscribedIncidentOnly,
          defaultSubscribedOffenderOnly:
            data?.scheme?.defaultSubscribedOffenderOnly,
          defaultMessagePush: data?.scheme?.defaultMessagePush,
          defaultOffenderEmail: data?.scheme?.defaultOffenderEmail,
          defaultOffenderPush: data?.scheme?.defaultOffenderPush,
        }}
      >
        <Card>
          <Row gutter={20} style={{ marginBottom: 30 }}>
            <Col>
              <Title level={4}>Scheme Branding:</Title>
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
              <Form.Item
                name="logo"
                label="Scheme Logo:"
                labelCol={{ span: 24 }}
              >
                <Upload
                  action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={(file) => beforeUpload(file)}
                  onChange={imgChange}
                  onPreview={onPreview}
                  maxCount={1}
                  accept=".png,.jpeg,.webp"
                >
                  {fileList.length === 0 && '+ Upload'}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={20}>
              <Form.Item
                name="darkLogo"
                label="Scheme Logo (optional dark mode version):"
                labelCol={{ span: 24 }}
              >
                <Upload
                  action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                  listType="picture-card"
                  fileList={darkFileList}
                  beforeUpload={(file) => beforeUpload(file, 'dark')}
                  onChange={darkImgChange}
                  onPreview={onPreview}
                  maxCount={1}
                  accept=".png,.jpeg,.webp"
                >
                  {darkFileList.length === 0 && '+ Upload'}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card>
          <Title level={4}>Auto Approve Options:</Title>
          <Text type="secondary">
            Enabling auto approve will automatically approve any new incidents
            and offenders without manual approval.
          </Text>

          <Row>
            <Col span={15}>
              <Form.Item
                label="Auto Approve Incident"
                name="autoApproveIncidents"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                name="autoApproveOffenders"
                label="Auto Approve Offenders"
                valuePropName="checked"
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card>
          <Title level={4} style={{ marginBottom: 15 }}>
            Date Retention:
          </Title>
          <Text type="secondary">
            Select a period of time to retain data before it is automatically
            deleted. You can also disable this feature and manually audit your
            data.
          </Text>

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
                  Once this period has elapsed, the item will be transferred to
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
        </Card>

        <Card>
          <Title level={4}>Default New User Settings:</Title>
          <Text type="secondary">
            The settings that will be selected by default for all new users
            created in the scheme.
          </Text>

          <Row>
            <Col span={15}>
              <Form.Item
                label="Only notify users for their own and subscribed incidents"
                name="defaultSubscribedIncidentOnly"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                label="Send app notifications for incidents"
                name="defaultIncidentPush"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                label="Send emails for incidents"
                name="defaultIncidentEmail"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                name="defaultSubscribedOffenderOnly"
                label="Only notify users for their own and subscribed offenders"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                name="defaultOffenderPush"
                label="Send app notifications for offenders"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                name="defaultOffenderEmail"
                label="Send emails for offenders"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
              <Form.Item
                name="defaultMessagePush"
                label="Send app notifications for new chat messages"
                valuePropName="checked"
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card>
          <Title level={4}>Default Offender Settings:</Title>
          {/* <Text type="secondary">
            The settings that will be selected by default for all new users
            created in the scheme.
          </Text> */}

          <Row>
            <Col span={15}>
              <Form.Item
                label="Date of birth of offenders are visible"
                name="defaultPublicOffenderDOB"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Switch
                  disabled={saving}
                  style={{ marginLeft: 5 }}
                  className="scheme-detail-switch"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
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
    )}
  </div>
);
export default SchemeDetail;
