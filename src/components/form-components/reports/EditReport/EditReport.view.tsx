import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import ReportGroupSelect from '#/components/form-components/ReportGroupSelect/ReportGroupSelect.view';
import { useEditReportTemplateQuery } from '#/components/form-components/reports/EditReport/__generated__/edit-report-query.generated';
import { Button, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useUpdateReportTemplateMutation } from 'graphql/reports/mutations/__generated__/update-report-template.generated';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface FormData {
  description: string;
  groups: string[];
  name: string;
  reportGroupId: string;
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
    onCompleted: (data) => {
      form.setFieldsValue({
        description: data.reportTemplate.description ?? '',
        groups: data.reportTemplate.groups.map(({ id }) => id),
        name: data.reportTemplate.name ?? '',
        reportGroupId: data.reportTemplate.reportGroup?.id,
      });
    },
    variables: {
      where: {
        id: reportId,
      },
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
        data: {
          description: { set: values.description },
          groups: { set: values.groups.map((id) => ({ id })) },
          name: { set: values.name },
          reportGroup: values.reportGroupId,
        },
        where: {
          id: reportId,
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
          defaultMessage: 'Description',
        })}
        name="description"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Description is required',
            }),
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Groups',
        })}
        name="groups"
      >
        <GroupsSelect mode="multiple" />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Report Group',
        })}
        name="reportGroupId"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please select a report group.',
            }),
            required: true,
          },
        ]}
      >
        <ReportGroupSelect />
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
