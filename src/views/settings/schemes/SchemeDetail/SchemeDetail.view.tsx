import React from 'react';
import type { ListSchemeTagsQuery, SchemeQuery } from 'graphql/generated';
import { GoodsMode } from 'graphql/generated';
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
import { FormattedMessage, useIntl } from 'react-intl';
import BuildTree from '../../../../utils/tags/tree-helper';
import type { FormData } from './useSchemeDetail';

const { Title, Text, Paragraph } = Typography;

interface Props {
  data: SchemeQuery | undefined;
  tags: ListSchemeTagsQuery | undefined;
  loading: boolean;
  saving: boolean;
  onSubmit: (value: FormData) => void;
  beforeUpload: (value: RcFile, dark?: string) => void;
  darkFileList: UploadFile[];
  darkImgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  fileList: UploadFile[];
  imgChange: UploadProps['onChange'];
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
}

// wait to check
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
  tags,
  loading,
  saving,
  onSubmit,
  beforeUpload,
  imgChange,
  onPreview,
  fileList,
  darkImgChange,
  darkFileList,
  updateTagParent,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>
            <FormattedMessage defaultMessage="Scheme Settings" id="6HCBAW" />
          </Title>
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
            restrictIncidentAccess: data?.scheme?.restrictIncidentAccess,
            reportOnly: data?.scheme?.reportOnly,
            incidentRetention: data?.scheme?.incidentRetention,
            offenderRetention: data?.scheme?.offenderRetention,
            defaultIncidentEmail: data?.scheme?.defaultIncidentEmail,
            defaultIncidentPush: data?.scheme?.defaultIncidentPush,
            autoPopulateDescription: data?.scheme?.autoPopulateDescription,
            defaultSubscribedIncidentOnly:
              data?.scheme?.defaultSubscribedIncidentOnly,
            defaultSubscribedOffenderOnly:
              data?.scheme?.defaultSubscribedOffenderOnly,
            defaultMessagePush: data?.scheme?.defaultMessagePush,
            defaultOffenderEmail: data?.scheme?.defaultOffenderEmail,
            defaultOffenderPush: data?.scheme?.defaultOffenderPush,
            defaultPublicOffenderDOB: data?.scheme?.defaultPublicOffenderDOB,
            facialRecognition: data?.scheme?.facialRecognition,
            imagesRequiredOnOffenders: data?.scheme?.imagesRequiredOnOffenders,
            goodsMode: data?.scheme?.goodsMode,
          }}
        >
          <Card>
            <Row gutter={20} style={{ marginBottom: 30 }}>
              <Col>
                <Title level={4}>
                  <FormattedMessage
                    defaultMessage="Scheme Branding:"
                    id="11odF5"
                  />
                </Title>
                <Text type="secondary">
                  <FormattedMessage
                    defaultMessage="Changed the scheme name and upload a logo."
                    id="puSFww"
                  />
                </Text>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="name"
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Name',
                    id: 'Sd01Sf',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Please enter a name for the scheme.',
                        id: '+AUpV6',
                      }),
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
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Logo:',
                    id: 'kp+ICm',
                  })}
                  labelCol={{ span: 24 }}
                >
                  <Upload
                    action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT_GO}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={(file) => beforeUpload(file)}
                    onChange={imgChange}
                    onPreview={onPreview}
                    maxCount={1}
                    accept=".png,.jpeg,.webp"
                  >
                    {fileList.length === 0 &&
                      intl.formatMessage({
                        defaultMessage: '+ Upload',
                        id: '3QJWLZ',
                      })}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  name="darkLogo"
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Logo (optional dark mode version):',
                    id: 'ZiY/d1',
                  })}
                  labelCol={{ span: 24 }}
                >
                  <Upload
                    action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT_GO}
                    listType="picture-card"
                    fileList={darkFileList}
                    beforeUpload={(file) => beforeUpload(file, 'dark')}
                    onChange={darkImgChange}
                    onPreview={onPreview}
                    maxCount={1}
                    accept=".png,.jpeg,.webp"
                  >
                    {darkFileList.length === 0 &&
                      intl.formatMessage({
                        defaultMessage: '+ Upload',
                        id: '3QJWLZ',
                      })}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card>
            <FormattedMessage defaultMessage="Tag hierarchy" id="I5HrhC" />
            <BuildTree
              InitData={
                tags?.listTags.tags.map((tag) => ({
                  id: tag.id,
                  name: tag.name,
                  parentId: tag.parentTag?.id || null,
                })) || []
              }
              updateTagParent={updateTagParent}
            />
          </Card>

          <Card>
            <Row align="bottom" style={{ marginBottom: 10 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Auto Approve Options',
                    id: 'eR+rwC',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Enabling auto approve will automatically approve any new incidents and offenders without manual approval.',
                    id: '1BGVBM',
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Row>
              <Col span={15}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Auto Approve Incident',
                    id: 'Qym1cU',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Auto Approve Offenders',
                    id: 'FID+qO',
                  })}
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

          <Card>
            <Row align="bottom" style={{ marginBottom: 15 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Date Retention',
                    id: '4y0se4',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- Select a period of time to retain data before it is automatically deleted. You can also disable this feature and manually audit your data',
                    id: 'qRk0gy',
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <Form.Item
                  name="incidentRetention"
                  label={intl.formatMessage({
                    defaultMessage: 'Delete incidents after: ',
                    id: '0oo0ZK',
                  })}
                  rules={[
                    {
                      type: 'number',
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder={intl.formatMessage({
                      defaultMessage:
                        'Select a option and change input text above',
                      id: 'hNTGVK',
                    })}
                    options={options}
                    disabled={saving}
                  />
                </Form.Item>

                <Form.Item
                  name="offenderRetention"
                  label={intl.formatMessage({
                    defaultMessage: 'Delete offenders after: ',
                    id: 'Sw4elA',
                  })}
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
                    {intl.formatMessage({
                      defaultMessage:
                        'The selected period of time begins on the date that an offender or incident was last updated.',
                      id: '8jgxbm',
                    })}
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'Once this period has elapsed, the item will be transferred to the recycle bin.',
                      id: '3oaaS2',
                    })}
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'It will remain in the recycle bin for 30 days before being permanently deleted.',
                      id: 'byWnqW',
                    })}
                  </Text>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text>
                  {intl.formatMessage({
                    defaultMessage:
                      'In accordance with your data protection obligations, data must only be retained for as long as it is relevant. It is your responsibility to determine that period of time.',
                    id: 'wBeTSd',
                  })}
                </Text>
              </Col>
              <Col span={24}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage:
                      'If you elect to disable auto-deletion, you must manually remove data which is no longer relevant.',
                    id: 'rOMPXq',
                  })}
                </Text>
              </Col>
            </Row>
          </Card>

          <Card>
            <Row align="bottom" style={{ marginBottom: 10 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Default New User Settings',
                    id: 'si32g3',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
                  italic
                >
                  {intl.formatMessage({
                    defaultMessage:
                      '- The settings that will be selected by default for all new users created in the scheme.',
                    id: 'TDAbcc',
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Row>
              <Col span={15}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Only notify users for their own and subscribed incidents',
                    id: 'ycBHr2',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Send app notifications for incidents',
                    id: 'BX6Fot',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Send emails for incidents',
                    id: 'n0Vms/',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage:
                      'Only notify users for their own and subscribed offenders',
                    id: '++aMeS',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Send app notifications for offenders',
                    id: 'G0RzJg',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Send emails for offenders',
                    id: 'nsomX/',
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage:
                      'Send app notifications for new chat messages',
                    id: '0UFWIV',
                  })}
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

          <Card>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Default User Settings:',
                id: '0f4k8n',
              })}
            </Title>
            <Row>
              <Col span={15}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Only allow user to report(no access to view any content)',
                    id: 'CJJgGX',
                  })}
                  name="reportOnly"
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
          <Card>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Default Offender Settings',
                id: 'TMSzEz',
              })}
            </Title>
            {/* <Text type="secondary">
                The settings that will be selected by default for all new users
                created in the scheme.
              </Text> */}

            <Row>
              <Col span={15}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date of birth of offenders are visible',
                    id: '0rgxT7',
                  })}
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
              <Col span={15}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Faces of offenders are available for recognition',
                    id: 'tFYz4Z',
                  })}
                  name="facialRecognition"
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
              <Col span={15}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Images of offenders are required for identification',
                    id: 'dOQCOj',
                  })}
                  name="imagesRequiredOnOffenders"
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
          <Card>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Default Incident Settings',
                id: 'ubIaay',
              })}
            </Title>
            {/* <Text type="secondary">
                The settings that will be selected by default for all new users
                created in the scheme.
              </Text> */}

            <Row>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Restrict users access to Incidents',
                    id: 'FnEGyH',
                  })}
                  name="restrictIncidentAccess"
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
                  label={intl.formatMessage({
                    defaultMessage: 'Auto populate description',
                    id: '3BrT8L',
                  })}
                  name="autoPopulateDescription"
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
                  label={intl.formatMessage({
                    defaultMessage: 'Goods Mode',
                    id: '1Hqwa+',
                  })}
                  name="goodsMode"
                  style={{ marginBottom: 0 }}
                >
                  <Select disabled={saving}>
                    <Select.Option
                      key={GoodsMode.Generic}
                      value={GoodsMode.Generic}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Generic',
                        id: 'IL4EQo',
                      })}
                    </Select.Option>
                    <Select.Option
                      key={GoodsMode.Specific}
                      value={GoodsMode.Specific}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Specific',
                        id: 'Ky5YNj',
                      })}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={16} justify="end">
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
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
      )}
    </div>
  );
};
export default SchemeDetail;
