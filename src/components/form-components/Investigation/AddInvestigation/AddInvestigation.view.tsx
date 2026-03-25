import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { InvestigationPriority, InvestigationType } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import GetInvestigationPriorityValues from 'types/enums/investigation-priority';
import GetInvestigationTypeValues from 'types/enums/investigation-type';

import type { InvestigationData } from './useAddInvestigation';

interface Props {
  onClose: () => void;
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

const AddInvestigation = ({
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'A name is required for an investigation',
                  }),
                  required: true,
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
              name="description"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              initialValue={InvestigationType.General}
              label={intl.formatMessage({ defaultMessage: 'Type' })}
              name="type"
            >
              <Select
                disabled={saving}
                options={Object.values(InvestigationType).map((v) => ({
                  label: GetInvestigationTypeValues[v],
                  value: v,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={InvestigationPriority.Normal}
              label={intl.formatMessage({ defaultMessage: 'Priority' })}
              name="priority"
            >
              <Select
                disabled={saving}
                options={Object.values(InvestigationPriority).map((v) => ({
                  label: GetInvestigationPriorityValues[v],
                  value: v,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              name="groupIds"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for the investigation.',
                  }),
                  required: true,
                },
              ]}
            >
              <GroupsSelect disabled={saving} mode="multiple" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
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
                  defaultMessage: 'Create Investigation',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddInvestigation;
