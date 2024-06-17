import React, { useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useUpdateReportTemplateMutation,
  useEditReportTemplateQuery,
} from 'graphql/generated';
import { useForm } from 'antd/lib/form/Form';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';

interface FormData {
  name: string;
  description: string;
  groups: string[];
}

interface Props {
  onClose: () => void;
  reportId: string;
}

const EditReport = ({ onClose, reportId }: Props) => {
  const intl = useIntl();
  const [form] = useForm<FormData>();

  const [saving, setSaving] = useState(false);

  useEditReportTemplateQuery({
    variables: {
      where: {
        id: reportId,
      },
    },
    onCompleted: (data) => {
      form.setFieldsValue({
        name: data.reportTemplate.name ?? '',
        description: data.reportTemplate.description ?? '',
        groups: data.reportTemplate.groups.map(({ id }) => id),
      });
    },
  });

  const [editReport] = useUpdateReportTemplateMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
  });

  const onSubmit = (values: FormData) => {
    setSaving(true);
    void editReport({
      variables: {
        where: {
          id: reportId,
        },
        data: {
          name: { set: values.name },
          description: { set: values.description },
          groups: { set: values.groups.map((id) => ({ id })) },
        },
      },
    });
  };

  return (
    <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
      <Form.Item
        name="name"
        label={intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Name is required',
              id: 'Gvxoji',
            }),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={intl.formatMessage({
          defaultMessage: 'Description',
          id: 'Q8Qw5B',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Description is required',
              id: '+NKkKd',
            }),
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="groups"
        label={intl.formatMessage({
          defaultMessage: 'Groups',
          id: 'hzmswI',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Please select at least one group.',
              id: 'dwqaFS',
            }),
          },
        ]}
      >
        <GroupsSelect mode="multiple" />
      </Form.Item>
      <Form.Item>
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage defaultMessage="Save Report" id="WfOm9L" />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditReport;
