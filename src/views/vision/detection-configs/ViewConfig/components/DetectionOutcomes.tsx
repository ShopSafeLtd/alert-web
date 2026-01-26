import type { Theme } from '#/configs/ThemeConfig';
import type { DetectionConfigProps } from '#/views/vision/detection-configs/ViewConfig/DetectionConfigView';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
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

type OutcomeType = 'activity' | 'email' | 'notification' | 'sms' | null;

type DetectionOutcomesProps = Pick<
  DetectionConfigProps,
  | 'form'
  | 'questionGroups'
  | 'saving'
  | 'setActivityTemplateForm'
  | 'setNewQuestion'
  | 'setSelectedActivity'
  | 'taskQuestions'
>;

const DetectionOutcomes: React.FC<DetectionOutcomesProps> = ({
  form,
  questionGroups,
  saving,
  setActivityTemplateForm,
  setNewQuestion,
  setSelectedActivity,
  taskQuestions,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const outcomeType = Form.useWatch('outcomeType', form) as OutcomeType;

  return (
    <Card bodyStyle={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: 20 }}>
        <Typography.Title level={3} style={{ marginBottom: 2 }}>
          <FormattedMessage defaultMessage="Outcome" />
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          <FormattedMessage defaultMessage="Configure the outcome that will occur when the detection occurs." />
        </Typography.Paragraph>

        <Form.Item
          label={<FormattedMessage defaultMessage="Select Outcome Type" />}
          name="outcomeType"
        >
          <Radio.Group>
            <Radio value="activity">
              <FormattedMessage defaultMessage="Create Activity" />
            </Radio>
            <Radio value="notification">
              <FormattedMessage defaultMessage="Send Notification" />
            </Radio>
            <Radio value="email">
              <FormattedMessage defaultMessage="Send Email" />
            </Radio>
            <Radio value="sms">
              <FormattedMessage defaultMessage="Send SMS" />
            </Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      {outcomeType === 'activity' && (
        <>
          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          <div className={classes.cardBody}>
            <Typography.Title level={4} style={{ marginBottom: 16 }}>
              <FormattedMessage defaultMessage="Activity Configuration" />
            </Typography.Title>
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
        </>
      )}

      {outcomeType === 'notification' && (
        <>
          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          <div className={classes.cardBody}>
            <Typography.Title level={4} style={{ marginBottom: 16 }}>
              <FormattedMessage defaultMessage="Notification Configuration" />
            </Typography.Title>
            <Form.Item
              label={<FormattedMessage defaultMessage="Notification Title" />}
              name="sendNotificationTitle"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a title for the notification',
                  }),
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Notification Body" />}
              name="sendNotificationMessage"
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </>
      )}

      {outcomeType === 'email' && (
        <>
          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          <div className={classes.cardBody}>
            <Typography.Title level={4} style={{ marginBottom: 16 }}>
              <FormattedMessage defaultMessage="Email Configuration" />
            </Typography.Title>
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
        </>
      )}

      {outcomeType === 'sms' && (
        <>
          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          <div className={classes.cardBody}>
            <Typography.Title level={4} style={{ marginBottom: 16 }}>
              <FormattedMessage defaultMessage="SMS Configuration" />
            </Typography.Title>
            <Form.Item
              label={<FormattedMessage defaultMessage="SMS Message" />}
              name="sendSMSMessage"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a message for the SMS.',
                  }),
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </>
      )}
    </Card>
  );
};

export default DetectionOutcomes;
