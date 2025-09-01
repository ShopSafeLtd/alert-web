import type { Theme } from '#/configs/ThemeConfig';
import type { WorkflowProps } from '#/views/workflows/ViewWorkflow/Workflow.view';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { IncidentPriority, Model } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cardBody: {
    backgroundColor: theme.cardSubsectionBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    padding: 20,
  },
}));

type WorkflowOutcomesProps = Pick<
  WorkflowProps,
  | 'form'
  | 'modelSelected'
  | 'questionGroups'
  | 'saving'
  | 'sendEmailCheck'
  | 'sendNotificationCheck'
  | 'setActivityTemplateForm'
  | 'setNewQuestion'
  | 'setSelectedActivity'
  | 'taskOutcome'
  | 'taskQuestions'
  | 'typeWatch'
  | 'updateIncidentCheck'
>;

const WorkflowOutcomes: React.FC<WorkflowOutcomesProps> = ({
  form,
  modelSelected,
  questionGroups,
  saving,
  sendEmailCheck,
  sendNotificationCheck,
  setActivityTemplateForm,
  setNewQuestion,
  setSelectedActivity,
  taskOutcome,
  taskQuestions,
  typeWatch,
  updateIncidentCheck,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card bodyStyle={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: 20 }}>
        <Typography.Title level={3} style={{ marginBottom: 2 }}>
          <FormattedMessage defaultMessage="Outcomes" />
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          <FormattedMessage defaultMessage="Configure the outcomes that will be occur when the workflow is triggered." />
        </Typography.Paragraph>
      </div>

      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <FormattedMessage defaultMessage="Create Activity" />
            </Typography.Title>
            <Typography.Paragraph
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Create an activity from a template or custom definition and assign it to specified users, groups and roles." />
            </Typography.Paragraph>
          </Col>
          <Col>
            <Form.Item name="taskOutcome" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {taskOutcome && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="Select an activity template" />
              }
              name="selectedGroup"
              tooltip={
                <FormattedMessage defaultMessage="You can use a predefined activity template or create a new one." />
              }
            >
              <Row gutter={[8, 8]} wrap={false}>
                <Col flex={1}>
                  <Select
                    onSelect={(value) => {
                      const activity = questionGroups.find(
                        ({ id }) => id === value
                      );
                      if (activity) {
                        setSelectedActivity(activity);
                        form.setFieldsValue({
                          taskDescription: activity.description,
                          taskDueDays: activity.defaultDueDays,
                          taskName: activity.name,
                          taskQuestions: activity.questions.map(({ id }) => id),
                        });
                      }
                    }}
                    options={questionGroups.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))}
                  />
                </Col>
                <Col>
                  <Button onClick={() => setActivityTemplateForm(true)}>
                    <FormattedMessage defaultMessage="New Template" />
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Row gutter={16} wrap={false}>
              <Col flex={1}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Name" />}
                  name="taskName"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please enter a name for the activity',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Default due days" />}
                  name="taskDueDays"
                >
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Business" />}
                  name="taskBusiness"
                >
                  <BusinessesSelect
                    allowClear
                    disabled={saving}
                    mode={'multiple'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a business...',
                    })}
                    showSearch
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[8, 8]} wrap={false}>
              <Col flex={1}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Questions" />}
                  name="taskQuestions"
                >
                  <Select
                    maxTagCount="responsive"
                    mode="multiple"
                    options={taskQuestions.map(({ id, question }) => ({
                      label: question,
                      value: id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Form.Item label=" " name="">
                  <Button
                    onClick={() => setNewQuestion(true)}
                    style={{ paddingBottom: 24 }}
                  >
                    <FormattedMessage defaultMessage="New Question" />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}
      </div>

      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      {typeWatch === 'trigger' && (
        <>
          <div>
            <Row style={{ padding: 20 }} wrap={false}>
              <Col flex={1}>
                <Typography.Title
                  level={4}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <FormattedMessage defaultMessage="Create Notification" />
                </Typography.Title>
                <Typography.Paragraph
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                  type="secondary"
                >
                  <FormattedMessage defaultMessage="Send a notification to the selected users, groups and roles via Alert. This will be delivered to the mobile app and the web application notification drawer." />
                </Typography.Paragraph>
              </Col>
              <Col>
                <Form.Item name="sendNotificationCheck" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            {sendNotificationCheck && (
              <div className={classes.cardBody}>
                <Form.Item
                  label={
                    <FormattedMessage defaultMessage="Notification Title" />
                  }
                  name="sendNotificationTitle"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a title for the notification',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <FormattedMessage defaultMessage="Notification Body" />
                  }
                  name="sendNotificationMessage"
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            )}
          </div>

          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          <div>
            <Row style={{ padding: 20 }} wrap={false}>
              <Col flex={1}>
                <Typography.Title
                  level={4}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <FormattedMessage defaultMessage="Create Email" />
                </Typography.Title>
                <Typography.Paragraph
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                  type="secondary"
                >
                  <FormattedMessage defaultMessage="Send an email to specified users, groups and roles." />
                </Typography.Paragraph>
              </Col>
              <Col>
                <Form.Item name="sendEmailCheck" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            {sendEmailCheck && (
              <div className={classes.cardBody}>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Email Subject" />}
                  name="sendEmailTitle"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a subject line for the email.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Email Body" />}
                  name="sendEmailMessage"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please enter a body for the email.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            )}
          </div>

          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          {modelSelected === Model.Incident && (
            <div>
              <Row style={{ padding: 20 }} wrap={false}>
                <Col flex={1}>
                  <Typography.Title
                    level={4}
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <FormattedMessage defaultMessage="Update Incident" />
                  </Typography.Title>
                  <Typography.Paragraph
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                    type="secondary"
                  >
                    <FormattedMessage defaultMessage="Update fields on the incident." />
                  </Typography.Paragraph>
                </Col>
                <Col>
                  <Form.Item name="updateIncident" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              {updateIncidentCheck && (
                <div className={classes.cardBody}>
                  <Row gutter={[16, 16]}>
                    <Col span={10}>
                      <Form.Item
                        label={
                          <FormattedMessage defaultMessage="Set incident priority to:" />
                        }
                        name="setPriority"
                      >
                        <Select
                          allowClear
                          options={Object.keys(IncidentPriority).map((key) => ({
                            label: key,
                            value: key,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label={
                          <FormattedMessage defaultMessage="Approve the incident" />
                        }
                        name="autoApprove"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default WorkflowOutcomes;
