import type { WorkflowProps } from '#/views/workflows/ViewWorkflow/Workflow.view';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import {
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Radio,
  Row,
  Switch,
  Typography,
} from 'antd';
import { BanType, WorkflowTrigger } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

type PickedBase = Pick<
  WorkflowProps,
  | 'banTypeSelected'
  | 'daysUntilExpirySelected'
  | 'form'
  | 'groups'
  | 'groupsSelected'
>;

type BanConditionsProps = {
  classes: { cardBody: string };
} & PickedBase;

// Helper to format ban type labels
const getBanTypeLabel = (type: BanType): string => {
  const labels: Record<BanType, string> = {
    [BanType.Arrest]: 'Arrest',
    [BanType.Cbo]: 'Criminal Behaviour Order (CBO)',
    [BanType.CivilRecovery]: 'Civil Recovery',
    [BanType.CommunityBan]: 'Community Ban',
    [BanType.CompanyBanningNotice]: 'Company Banning Notice',
    [BanType.Compensation]: 'Compensation',
    [BanType.CourtData]: 'Court Data',
    [BanType.Cpn]: 'Community Protection Notice (CPN)',
    [BanType.Cpw]: 'Community Protection Warning (CPW)',
    [BanType.Fine]: 'Fine',
    [BanType.Other]: 'Other',
    [BanType.PrisonSentence]: 'Prison Sentence',
    [BanType.PromisaryNote]: 'Promissory Note',
    [BanType.Pspo]: 'Public Spaces Protection Order (PSPO)',
    [BanType.RehabilitationOrder]: 'Rehabilitation Order',
    [BanType.Restitution]: 'Restitution',
    [BanType.SuspendedSentence]: 'Suspended Sentence',
    [BanType.Wip]: 'WIP',
  };
  return labels[type] || type;
};

const BanConditions: React.FC<BanConditionsProps> = ({
  banTypeSelected,
  classes,
  daysUntilExpirySelected,
  form,
  groups: _groups,
  groupsSelected,
}) => {
  const intl = useIntl();
  const workflowTrigger = Form.useWatch('workflowTrigger', form);

  return (
    <>
      {/* Ban Type Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Ban Type" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Trigger workflow for specific ban types." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="banTypeCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {banTypeSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all selected types" />
              }
              name="banTypeCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Any' }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'All' }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Ban Types" />}
              name="banType"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select at least one ban type',
                  }),
                  required: true,
                  type: 'array',
                  validator: (_: unknown, value: string[]) => {
                    if (!value || value.length === 0) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Checkbox.Group
                options={Object.values(BanType).map((type) => ({
                  label: getBanTypeLabel(type),
                  value: type,
                }))}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Days Until Expiry Condition - Only shown for CRON trigger */}
      {workflowTrigger === WorkflowTrigger.Cron && (
        <>
          <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          <div>
            <Row style={{ padding: 20 }} wrap={false}>
              <Col flex={1}>
                <Typography.Title level={4}>
                  <FormattedMessage defaultMessage="Days Until Expiry" />
                </Typography.Title>
                <Typography.Text type="secondary">
                  <FormattedMessage defaultMessage="Trigger workflow for bans expiring within specified days. Checked daily at midnight via CRON." />
                </Typography.Text>
              </Col>
              <Col span={2}>
                <Form.Item name="daysUntilExpiryCheck" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            {daysUntilExpirySelected && (
              <div className={classes.cardBody}>
                <Form.Item
                  initialValue={30}
                  label={
                    <FormattedMessage defaultMessage="Days before expiry" />
                  }
                  name="daysUntilExpiry"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a positive number of days',
                      }),
                      required: true,
                      type: 'number',
                    },
                  ]}
                  tooltip={
                    <FormattedMessage defaultMessage="Trigger workflow when ban expires within this many days" />
                  }
                >
                  <InputNumber min={1} style={{ width: 200 }} />
                </Form.Item>
              </div>
            )}
          </div>
        </>
      )}

      {/* Groups Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Ban has a group" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the ban has a specific content group." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="groups" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {groupsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the content groups are present" />
              }
              name="groupMethod"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Any' }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'All' }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Content Groups" />}
              name="groupIds"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select at least one group',
                  }),
                  required: true,
                  type: 'array',
                  validator: (_: unknown, value: string[]) => {
                    if (!value || value.length === 0) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <GroupsSelect
                allowClear
                mode={'multiple'}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        )}
      </div>
    </>
  );
};

export default BanConditions;
