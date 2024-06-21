import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
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
import customRequest from '../../../../utils/custom-request';
import type { SchemeQuery } from 'graphql/scheme/queries/scheme.generated';
import type { ListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/list-tags.generated';
import { GoodsMode } from 'graphql/types';

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
            <FormattedMessage defaultMessage="Scheme Settings" />
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
            defaultBulletinEmails: data?.scheme?.defaultBulletinEmails,
            defaultBulletinPush: data?.scheme?.defaultBulletinPush,
            autoPopulateDescription: data?.scheme?.autoPopulateDescription,
            needJustification: data?.scheme?.needJustification,
            requireSiteNumberForUsers:
              data?.scheme?.requireSiteNumberForUsers || false,
            oneSelectedIncidentTypeOnly:
              data?.scheme?.oneSelectedIncidentTypeOnly || false,
            defaultSubscribedIncidentOnly:
              data?.scheme?.defaultSubscribedIncidentOnly,
            defaultSubscribedOffenderOnly:
              data?.scheme?.defaultSubscribedOffenderOnly,
            defaultMessagePush: data?.scheme?.defaultMessagePush,
            defaultOffenderEmail: data?.scheme?.defaultOffenderEmail,
            defaultOffenderPush: data?.scheme?.defaultOffenderPush,
            defaultPublicOffenderDOB: data?.scheme?.defaultPublicOffenderDOB,
            facialDetection: data?.scheme?.facialDetection,
            facialRecognition: data?.scheme?.facialRecognition,
            activityAssignToUser: data?.scheme?.activityAssignToUser,
            useBusinessGroupsOnIncident:
              data?.scheme?.useBusinessGroupsOnIncident,
            imagesRequiredOnOffenders: data?.scheme?.imagesRequiredOnOffenders,
            goodsMode: data?.scheme?.goodsMode,
          }}
        >
          <Card>
            <Row gutter={20} style={{ marginBottom: 30 }}>
              <Col>
                <Title level={4}>
                  <FormattedMessage defaultMessage="Scheme Branding:" />
                </Title>
                <Text type="secondary">
                  <FormattedMessage defaultMessage="Changed the scheme name and upload a logo." />
                </Text>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="name"
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Name',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Please enter a name for the scheme.',
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
                  })}
                  labelCol={{ span: 24 }}
                >
                  <Upload
                    customRequest={customRequest}
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
                  })}
                  labelCol={{ span: 24 }}
                >
                  <Upload
                    customRequest={customRequest}
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
                      })}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card>
            <FormattedMessage defaultMessage="Tag hierarchy" />
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
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Auto Approve Incident',
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
          </Card>

          <Card>
            <Row align="bottom" style={{ marginBottom: 15 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Date Retention',
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
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Row gutter={16} wrap={false}>
              <Col span={7}>
                <Form.Item
                  name="incidentRetention"
                  label={intl.formatMessage({
                    defaultMessage: 'Delete incidents after: ',
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
                    })}
                    options={options}
                    disabled={saving}
                  />
                </Form.Item>

                <Form.Item
                  name="offenderRetention"
                  label={intl.formatMessage({
                    defaultMessage: 'Delete offenders after: ',
                  })}
                  rules={[{ required: true }]}
                >
                  <Select options={options} disabled={saving} />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Space direction="vertical">
                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'The selected period of time begins on the date that an offender or incident was last updated.',
                    })}
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'Once this period has elapsed, the item will be transferred to the recycle bin.',
                    })}
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'It will remain in the recycle bin for 30 days before being permanently deleted.',
                    })}
                  </Text>
                </Space>
              </Col>
            </Row>

            <Paragraph style={{ marginBottom: 5 }}>
              {intl.formatMessage({
                defaultMessage:
                  'In accordance with your data protection obligations, data must only be retained for as long as it is relevant. It is your responsibility to determine that period of time.',
              })}
            </Paragraph>

            <Paragraph strong style={{ marginBottom: 0 }}>
              {intl.formatMessage({
                defaultMessage:
                  'If you elect to disable auto-deletion, you must manually remove data which is no longer relevant.',
              })}
            </Paragraph>
          </Card>

          <Card>
            <Row align="bottom" style={{ marginBottom: 10 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Default New User Settings',
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
                  })}
                </Paragraph>
              </Col>
            </Row>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Allow users to search for business by site number.',
              })}
              name="requireSiteNumberForUsers"
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
                defaultMessage:
                  'Only one incident type can be selected when creating a new incident.',
              })}
              name="oneSelectedIncidentTypeOnly"
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
                defaultMessage:
                  'Only notify users for their own and subscribed incidents',
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
              label={intl.formatMessage({
                defaultMessage: 'Send app notifications for bulletins',
              })}
              name="defaultBulletinPush"
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
                defaultMessage: 'Send emails for bulletins',
              })}
              name="defaultBulletinEmails"
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
                defaultMessage: 'Send app notifications for new chat messages',
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
          </Card>

          <Card>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Default User Settings:',
              })}
            </Title>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Allow users to report(no access to view any content)',
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

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Allow users to search for business by site number',
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
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Allow activities to be assigned to users',
              })}
              name="activityAssignToUser"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
            >
              <Switch
                disabled={saving}
                style={{ marginLeft: 5 }}
                className="scheme-detail-switch"
              />
            </Form.Item>
          </Card>
          <Card>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Default Offender Settings',
              })}
            </Title>
            {/* <Text type="secondary">
                The settings that will be selected by default for all new users
                created in the scheme.
              </Text> */}

            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Date of birth of offenders are visible',
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

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Faces of offenders are available for recognition',
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

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Images of offenders are required for identification',
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

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Justification is required for offenders without an incident',
              })}
              name="needJustification"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
            >
              <Switch
                disabled={saving}
                style={{ marginLeft: 5 }}
                className="scheme-detail-switch"
              />
            </Form.Item>
          </Card>
          <Card>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Default Incident Settings',
              })}
            </Title>
            {/* <Text type="secondary">
                The settings that will be selected by default for all new users
                created in the scheme.
              </Text> */}

            {/* <Row>
              <Col span={6}> */}
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Restrict users access to Incidents',
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
                defaultMessage:
                  // eslint-disable-next-line quotes
                  "Images of incident are available for offenders' faces detection",
              })}
              name="facialDetection"
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
                defaultMessage:
                  'Set selected business groups as default groups for incident',
              })}
              name="useBusinessGroupsOnIncident"
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
              })}
              name="goodsMode"
              style={{ marginBottom: 0 }}
            >
              <Radio.Group disabled={saving}>
                <Radio.Button key={GoodsMode.Generic} value={GoodsMode.Generic}>
                  {intl.formatMessage({
                    defaultMessage: 'Generic',
                  })}
                </Radio.Button>
                <Radio.Button
                  key={GoodsMode.Specific}
                  value={GoodsMode.Specific}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Specific',
                  })}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Card>

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={16} justify="end">
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
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
