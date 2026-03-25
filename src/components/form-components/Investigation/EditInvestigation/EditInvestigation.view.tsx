import type { InvestigationDetails } from 'types/DataType';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { InvestigationPriority, InvestigationType } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import GetInvestigationPriorityValues from 'types/enums/investigation-priority';
import GetInvestigationTypeValues from 'types/enums/investigation-type';

import type { InvestigationData } from './useEditInvestigation';

interface Props {
  investigationData?: InvestigationDetails;
  onClose: () => void;
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

const AddInvestigation = ({
  investigationData,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div>
      <Form
        initialValues={investigationData}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
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
                {investigationData
                  ? intl.formatMessage({
                      defaultMessage: 'Save Details',
                    })
                  : intl.formatMessage({
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
