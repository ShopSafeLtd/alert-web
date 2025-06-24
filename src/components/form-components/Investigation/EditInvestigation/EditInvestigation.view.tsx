import type { InvestigationDetails } from 'types/DataType';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

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
