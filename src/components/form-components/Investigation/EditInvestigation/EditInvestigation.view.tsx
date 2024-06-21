import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useIntl } from 'react-intl';
import type { InvestigationDetails } from 'types/DataType';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import type { InvestigationData } from './useEditInvestigation';

interface Props {
  onClose: () => void;
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
  investigationData?: InvestigationDetails;
}

const AddInvestigation = ({
  onClose,
  onSubmit,
  saving,
  investigationData,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={investigationData}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="description"
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="groupIds"
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            >
              <GroupsSelect disabled={saving} mode="multiple" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
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
