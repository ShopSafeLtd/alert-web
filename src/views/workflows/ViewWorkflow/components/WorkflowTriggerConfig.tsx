import type { FormInstance } from 'antd';
import { Card, Col, Form, Input, Radio, Row, Select, Typography } from 'antd';

import DatePicker from '#/components/util-components/DatePicker';
import { CronSchedule, Model, WorkflowTrigger } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from '../useWorkflowForm';

interface WorkflowTriggerConfigProps {
  editId?: string;
  form: FormInstance<FormData>;
  modelSelected: Model | null | undefined;
  typeWatch: string;
}

const WorkflowTriggerConfig: React.FC<WorkflowTriggerConfigProps> = ({
  editId,
  form,
  modelSelected,
  typeWatch,
}) => {
  const intl = useIntl();

  return (
    <Card>
      <Typography.Title level={3} style={{ marginBottom: 30 }}>
        <FormattedMessage defaultMessage="Workflow Trigger" />
      </Typography.Title>
      <Form.Item
        label={<FormattedMessage defaultMessage="Name for the workflow" />}
        name="name"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a name',
            }),
            required: true,
          },
        ]}
        tooltip={intl.formatMessage({
          defaultMessage:
            'Friendly name for the workflow which you can use to identify it later.',
        })}
      >
        <Input />
      </Form.Item>

      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Workflow Mode',
            })}
            name="workflowMode"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select workflow mode',
                }),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Triggered workflows run when an even occurs such as an incident being created. Scheduled workflows run at a specified time.',
            })}
          >
            <Radio.Group
              disabled={editId !== undefined}
              onChange={(e) => {
                if (e.target.value === 'scheduled') {
                  form.setFieldsValue({ workflowType: Model.Cron });
                } else {
                  form.setFieldsValue({ workflowType: undefined });
                }
              }}
              optionType="button"
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Trigger',
                  }),
                  value: 'trigger',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Scheduled',
                  }),
                  value: 'scheduled',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          {typeWatch === 'trigger' && (
            <Form.Item
              label={<FormattedMessage defaultMessage="Trigger Data" />}
              name="workflowType"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The data that triggers the workflow.',
              })}
            >
              <Radio.Group
                disabled={editId !== undefined}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Incident',
                    }),
                    value: Model.Incident,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Offender',
                    }),
                    value: Model.Offender,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Activity',
                    }),
                    value: Model.Todo,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Checklist',
                    }),
                    value: Model.Checklist,
                  },
                ]}
              />
            </Form.Item>
          )}
        </Col>
        <Col span={24}>
          {modelSelected && modelSelected === Model.Incident && (
            <Form.Item
              label={<FormattedMessage defaultMessage="Trigger Action" />}
              name="workflowTrigger"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'The action that triggers the workflow.',
              })}
            >
              <Radio.Group
                disabled={editId !== undefined}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Created',
                    }),
                    value: WorkflowTrigger.Created,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Approved',
                    }),
                    value: WorkflowTrigger.Approved,
                  },
                ]}
              />
            </Form.Item>
          )}
        </Col>
      </Row>

      {typeWatch === 'scheduled' && (
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Workflow Frequency',
              })}
              name="frequency"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select a frequency',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'How regularly the workflow should run',
              })}
            >
              <Select
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Every Day',
                    }),
                    value: CronSchedule.EveryDay,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Every Week',
                    }),
                    value: CronSchedule.EveryWeek,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Every Month',
                    }),
                    value: CronSchedule.EveryMonth,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Every Year',
                    }),
                    value: CronSchedule.EveryYear,
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Start Date',
              })}
              name="cronDate"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select a start date',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select the date when the workflow should start',
              })}
            >
              <DatePicker
                defaultValue={
                  new Date(new Date().setDate(new Date().getDate() + 1))
                }
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default WorkflowTriggerConfig;
