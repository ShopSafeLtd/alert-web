import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { useEditReportGroupQuery } from '#/components/form-components/reports/EditReportGroup/__generated__/edit-report-group-query.generated';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useUpdateReportGroupMutation } from 'graphql/report-groups/__generated__/update-report-group.generated';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface FormData {
  groupIds: string[];
  name: string;
  order: number;
}

interface Props {
  onClose: () => void;
  reportGroupId: string;
}

const EditReport = ({ onClose, reportGroupId }: Props) => {
  const intl = useIntl();
  const [form] = useForm<FormData>();

  const [saving, setSaving] = useState(false);

  useEditReportGroupQuery({
    onCompleted: (data) => {
      form.setFieldsValue({
        groupIds: data.reportGroup.groups.map(({ id }) => id),
        name: data.reportGroup.name ?? '',
        order: data.reportGroup.order ?? 0,
      });
    },
    variables: {
      where: {
        id: reportGroupId,
      },
    },
  });

  const [editReport] = useUpdateReportGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
  });

  const onSubmit = (values: FormData) => {
    setSaving(true);
    void editReport({
      variables: {
        data: {
          groupIds: { set: values.groupIds },
          name: { set: values.name },
          order: { set: values.order },
        },
        where: {
          id: reportGroupId,
        },
      },
    });
  };

  return (
    <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Name' })}
        name="name"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Name is required',
            }),
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Order',
        })}
        name="order"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Order is required',
            }),
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Groups' })}
        name="groupIds"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please select at least one group.',
            }),
            required: true,
          },
        ]}
      >
        <GroupsSelect allowClear maxTagCount="responsive" mode="multiple" />
      </Form.Item>
      <Form.Item>
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              <FormattedMessage defaultMessage="Save Report" />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditReport;
