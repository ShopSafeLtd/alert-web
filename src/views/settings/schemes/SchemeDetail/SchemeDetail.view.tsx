import type { ListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';
import type { SchemeDetailsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/scheme.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';

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
import { GoodsMode } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from './useSchemeDetail';

import customRequest from '../../../../utils/custom-request';
import BuildTree from '../../../../utils/tags/tree-helper';

const { Paragraph, Text, Title } = Typography;

interface Props {
  beforeUpload: (value: RcFile, dark?: string) => void;
  darkFileList: UploadFile[];
  darkImgChange: UploadProps['onChange'];
  data: SchemeDetailsQuery | undefined;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  imgChange: UploadProps['onChange'];
  loading: boolean;
  onPreview: (value: UploadFile) => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  tags: ListSchemeTagsQuery | undefined;
  updateTagParent: (tagId: string, parentTagId: null | string) => void;
}

// wait to check
const options = [
  { label: 'Disabled', value: -1 },
  { label: '3 months', value: 91 },
  { label: '6 months', value: 183 },
  { label: '12 months', value: 365 },
  { label: '18 months', value: 547 },
  { label: '2 years', value: 730 },
  { label: '3 years', value: 1096 },
  { label: '5 years', value: 1826 },
  { label: '6 years', value: 2190 },
];
const SchemeDetail = ({
  beforeUpload,
  darkFileList,
  darkImgChange,
  data,
  fileList,
  form,
  imgChange,
  loading,
  onPreview,
  onSubmit,
  saving,
  tags,
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
          form={form}
          initialValues={{
            activityAssignToUser: data?.scheme?.activityAssignToUser,
            autoApproveIncidents: data?.scheme?.autoApproveIncidents,
            autoApproveOffenders: data?.scheme?.autoApproveOffenders,
            autoPopulateDescription: data?.scheme?.autoPopulateDescription,
            defaultBulletinEmails: data?.scheme?.defaultBulletinEmails,
            defaultBulletinPush: data?.scheme?.defaultBulletinPush,
            defaultIncidentEmail: data?.scheme?.defaultIncidentEmail,
            defaultIncidentPush: data?.scheme?.defaultIncidentPush,
            defaultMessagePush: data?.scheme?.defaultMessagePush,
            defaultOffenderEmail: data?.scheme?.defaultOffenderEmail,
            defaultOffenderPush: data?.scheme?.defaultOffenderPush,
            defaultPublicOffenderDOB: data?.scheme?.defaultPublicOffenderDOB,
            defaultSubscribedIncidentOnly:
              data?.scheme?.defaultSubscribedIncidentOnly,
            defaultSubscribedOffenderOnly:
              data?.scheme?.defaultSubscribedOffenderOnly,
            facialDetection: data?.scheme?.facialDetection,
            facialRecognition: data?.scheme?.facialRecognition,
            facialRedaction: data?.scheme?.facialRedaction,
            goodsMode: data?.scheme?.goodsMode,
            imagesRequiredOnOffenders: data?.scheme?.imagesRequiredOnOffenders,
            incidentCustomQuestionRadio:
              data?.scheme?.incidentCustomQuestionRadio,
            incidentRetention: data?.scheme?.incidentRetention,
            incidentTypeTooltip: data?.scheme?.incidentTypeTooltip,
            name: data?.scheme?.name,
            needJustification: data?.scheme?.needJustification,
            offenderRetention: data?.scheme?.offenderRetention,
            oneSelectedIncidentTypeOnly:
              data?.scheme?.oneSelectedIncidentTypeOnly || false,
            reportOnly: data?.scheme?.reportOnly,
            requireActivityAuthorised: data?.scheme?.requireActivityAuthorised,
            requireSiteNumberForUsers:
              data?.scheme?.requireSiteNumberForUsers || false,
            restrictIncidentAccess: data?.scheme?.restrictIncidentAccess,
            showBlankActivity: data?.scheme?.showBlankActivity,
            useBusinessGroupsOnIncident:
              data?.scheme?.useBusinessGroupsOnIncident,
          }}
          onFinish={onSubmit}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Name',
                  })}
                  name="name"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please enter a name for the scheme.',
                      }),
                      required: true,
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
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Logo:',
                  })}
                  labelCol={{ span: 24 }}
                  name="logo"
                >
                  <Upload
                    accept=".png,.jpeg,.webp"
                    beforeUpload={(file) => beforeUpload(file)}
                    customRequest={customRequest}
                    fileList={fileList}
                    listType="picture-card"
                    maxCount={1}
                    onChange={imgChange}
                    onPreview={onPreview}
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
                  label={intl.formatMessage({
                    defaultMessage: 'Scheme Logo (optional dark mode version):',
                  })}
                  labelCol={{ span: 24 }}
                  name="darkLogo"
                >
                  <Upload
                    accept=".png,.jpeg,.webp"
                    beforeUpload={(file) => beforeUpload(file, 'dark')}
                    customRequest={customRequest}
                    fileList={darkFileList}
                    listType="picture-card"
                    maxCount={1}
                    onChange={darkImgChange}
                    onPreview={onPreview}
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
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Auto Approve Options',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
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
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Auto Approve Offenders',
              })}
              name="autoApproveOffenders"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
          </Card>

          <Card>
            <Row align="bottom" style={{ marginBottom: 15 }}>
              <Col>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Date Retention',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
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
                  label={intl.formatMessage({
                    defaultMessage: 'Delete incidents after: ',
                  })}
                  name="incidentRetention"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                    },
                  ]}
                >
                  <Select
                    disabled={saving}
                    options={options}
                    placeholder={intl.formatMessage({
                      defaultMessage:
                        'Select a option and change input text above',
                    })}
                  />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Delete offenders after: ',
                  })}
                  name="offenderRetention"
                  rules={[{ required: true }]}
                >
                  <Select disabled={saving} options={options} />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Space direction="vertical">
                  <Text>
                    <ExclamationCircleOutlined
                      style={{ color: '#f5222d', margin: 8 }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'The selected period of time begins on the date that an offender or incident was last updated.',
                    })}
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ color: '#f5222d', margin: 8 }}
                    />
                    {intl.formatMessage({
                      defaultMessage:
                        'Once this period has elapsed, the item will be transferred to the recycle bin.',
                    })}
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ color: '#f5222d', margin: 8 }}
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
                <Title level={4} style={{ marginBottom: 0 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Default New User Settings',
                  })}
                </Title>
              </Col>
              <Col>
                <Paragraph
                  italic
                  style={{ marginBottom: 1, marginLeft: 5 }}
                  type="secondary"
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
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Only one incident type can be selected when creating a new incident.',
              })}
              name="oneSelectedIncidentTypeOnly"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Only notify users for their own and subscribed incidents',
              })}
              name="defaultSubscribedIncidentOnly"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send app notifications for incidents',
              })}
              name="defaultIncidentPush"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send emails for incidents',
              })}
              name="defaultIncidentEmail"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Only notify users for their own and subscribed offenders',
              })}
              name="defaultSubscribedOffenderOnly"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send app notifications for offenders',
              })}
              name="defaultOffenderPush"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send emails for offenders',
              })}
              name="defaultOffenderEmail"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send app notifications for bulletins',
              })}
              name="defaultBulletinPush"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send emails for bulletins',
              })}
              name="defaultBulletinEmails"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Send app notifications for new chat messages',
              })}
              name="defaultMessagePush"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
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
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Allow users to search for business by site number',
              })}
              name="reportOnly"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Allow activities to be assigned to users',
              })}
              name="activityAssignToUser"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Completing activities requires authorization',
              })}
              name="requireActivityAuthorised"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Show blank activity',
              })}
              name="showBlankActivity"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
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
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Faces of offenders are available for recognition',
              })}
              name="facialRecognition"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'All non-offender faces will be automatically blurred',
              })}
              name="facialRedaction"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Images of offenders are required for identification',
              })}
              name="imagesRequiredOnOffenders"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Justification is required for offenders without an incident',
              })}
              name="needJustification"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
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
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Auto populate description',
              })}
              name="autoPopulateDescription"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  // eslint-disable-next-line quotes
                  "Images of incident are available for offenders' faces detection",
              })}
              name="facialDetection"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Set selected business groups as default groups for incident',
              })}
              name="useBusinessGroupsOnIncident"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Only one custom question can be selected in incident form',
              })}
              name="incidentCustomQuestionRadio"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch
                className="scheme-detail-switch"
                disabled={saving}
                style={{ marginLeft: 5 }}
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
            {/* <Form.Item*/}
            {/*  label={intl.formatMessage({*/}
            {/*    defaultMessage: 'Tooltip Text for Incident Type',*/}
            {/*  })}*/}
            {/*  name="incidentTypeTooltip"*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      message: intl.formatMessage({*/}
            {/*        defaultMessage:*/}
            {/*          'Please enter tooltip text for incident type in the scheme.',*/}
            {/*      }),*/}
            {/*      required: true,*/}
            {/*    },*/}
            {/*  ]}*/}
            {/* >*/}
            {/*  <Input*/}
            {/*    disabled={saving}*/}
            {/*    style={{ height: '80%', marginTop: 5, width: '50%' }}*/}
            {/*  />*/}
            {/* </Form.Item>*/}
          </Card>

          <Form.Item>
            <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
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
                  htmlType="submit"
                  loading={saving}
                  type="primary"
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
