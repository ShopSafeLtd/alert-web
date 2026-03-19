import type { ReportType } from 'graphql/types';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import ReportGroupSelect from '#/components/form-components/ReportGroupSelect/ReportGroupSelect.view';
import { useEditReportTemplateQuery } from '#/components/form-components/reports/EditReport/__generated__/edit-report-query.generated';
import AIGenerateButton, {
  getGradientFormItemClassName,
} from '#/components/ui/AIGenerateButton';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useGenerateReportTemplateDescriptionMutation } from 'graphql/reports/mutations/__generated__/generate-report-template-description.generated';
import { useUpdateReportTemplateMutation } from 'graphql/reports/mutations/__generated__/update-report-template.generated';
import React, { useRef, useState } from 'react';
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
  const [generatingDescription, setGeneratingDescription] = useState(false);
  const reportTypeRef = useRef<ReportType | undefined>(undefined);

  useEditReportTemplateQuery({
    onCompleted: (data) => {
      reportTypeRef.current = data.reportTemplate.type;
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

  const [generateDescription] = useGenerateReportTemplateDescriptionMutation();

  const handleGenerateDescription = async () => {
    const name = form.getFieldValue('name') as string;
    const currentDescription = form.getFieldValue('description') as string;

    if (!name) return;

    setGeneratingDescription(true);
    try {
      const result = await generateDescription({
        variables: {
          reportTemplateName: name,
          reportType: reportTypeRef.current ?? undefined,
          userDescription: currentDescription || undefined,
        },
      });

      if (result.data?.generateReportTemplateDescription) {
        form.setFieldsValue({
          description: result.data.generateReportTemplateDescription,
        });
      }
    } catch {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Failed to generate description. Please try again.',
        }),
        message: intl.formatMessage({ defaultMessage: 'Generation Failed' }),
        placement: 'bottomRight',
      });
    } finally {
      setGeneratingDescription(false);
    }
  };

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
      <div style={{ position: 'relative' }}>
        <Form.Item
          className={getGradientFormItemClassName(
            generatingDescription,
            'redOrange'
          )}
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
          <Input.TextArea
            className="ai-generate-textarea"
            rows={4}
            style={{ paddingRight: '60px' }}
          />
        </Form.Item>
        <AIGenerateButton
          disabled={saving}
          form={form}
          generating={generatingDescription}
          gradientVariant="redOrange"
          nameFieldName="name"
          onClick={() => {
            void handleGenerateDescription();
          }}
        />
      </div>
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
