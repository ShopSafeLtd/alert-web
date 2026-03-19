import type {
  ReportsCentreQuery,
  ReportsCentreQueryVariables,
} from '#/views/reports/reports-centre/__generated__/reports-centre.generated';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import ReportGroupSelect from '#/components/form-components/ReportGroupSelect/ReportGroupSelect.view';
import AIGenerateButton, {
  getGradientFormItemClassName,
} from '#/components/ui/AIGenerateButton';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { ReportsCentreDocument } from '#/views/reports/reports-centre/__generated__/reports-centre.generated';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  notification,
} from 'antd';
import { useCreateReportTemplateMutation } from 'graphql/reports/mutations/__generated__/create-report-template.generated';
import { useGenerateReportTemplateDescriptionMutation } from 'graphql/reports/mutations/__generated__/generate-report-template-description.generated';
import { ReportType } from 'graphql/types';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface FormData {
  description: string;
  groups: string[];
  name: string;
  reportGroupId: string;
  type: ReportType;
}

interface Props {
  onClose: () => void;
}

const CreateReport = ({ onClose }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [generatingDescription, setGeneratingDescription] = useState(false);
  const options = [
    {
      description: intl.formatMessage({
        defaultMessage:
          'Report that can show a summary of all data in alert together.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Summary Report',
      }),
      value: ReportType.Performance,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Report that focuses on the data for one offender.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Offender Summary',
      }),
      value: ReportType.Offender,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Report that focuses on the data for one business.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Business Summary',
      }),
      value: ReportType.Business,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Report that focuses on the data for one crime group.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Crime Group Summary',
      }),
      value: ReportType.CrimeGroup,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Query and analyses offenders added in Alert.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Offender Table',
      }),
      value: ReportType.OffenderTable,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Query and analyses incidents added in Alert.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Incident Table',
      }),
      value: ReportType.IncidentTable,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Query and analyses investigations added in Alert.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Investigation Table',
      }),
      value: ReportType.InvestigationsTable,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Query and analyses activities added in Alert.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Activity Table',
      }),
      value: ReportType.ActivityTable,
    },
    {
      description: intl.formatMessage({
        defaultMessage: 'Query and analyses checklists added in Alert.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Checklist Table',
      }),
      value: ReportType.CheckListTable,
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Query and analyses checklist questions added in Alert.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Checklist Question Table',
      }),
      value: ReportType.CheckListQuestionTable,
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Interactive map view of incidents with filters and layers.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Incident Map',
      }),
      value: ReportType.IncidentMap,
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Analyse stock loss incidents, recovery rates, goods type breakdowns, and offender associations.',
      }),
      name: intl.formatMessage({
        defaultMessage: 'LP Stock Loss Report',
      }),
      value: ReportType.LpStockLossReport,
    },
  ];

  const [createReport] = useCreateReportTemplateMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
    update: (cache, { data: d }) => {
      const existingTemplates = cache.readQuery<
        ReportsCentreQuery,
        ReportsCentreQueryVariables
      >({
        query: ReportsCentreDocument,
        variables: {
          where: {
            schemeId,
            search: '',
          },
        },
      });

      if (existingTemplates && d?.createReportTemplate) {
        cache.writeQuery<ReportsCentreQuery, ReportsCentreQueryVariables>({
          data: {
            reportsCentre: update(existingTemplates.reportsCentre, {
              [existingTemplates.reportsCentre.findIndex(
                (item) => item.id === d.createReportTemplate.reportGroup?.id
              )]: {
                reports: {
                  $push: [
                    {
                      description: d.createReportTemplate.description,
                      id: d.createReportTemplate.id,
                      name: d.createReportTemplate.name,
                      type: d.createReportTemplate.type,
                    },
                  ],
                },
              },
            }),
          },
          query: ReportsCentreDocument,
          variables: {
            where: {
              schemeId,
              search: '',
            },
          },
        });
      }
    },
  });

  const [generateDescription] = useGenerateReportTemplateDescriptionMutation();

  const handleGenerateDescription = async () => {
    const name = form.getFieldValue('name') as string;
    const currentDescription = form.getFieldValue('description') as string;
    const type = form.getFieldValue('type') as ReportType | undefined;

    if (!name) return;

    setGeneratingDescription(true);
    try {
      const result = await generateDescription({
        variables: {
          reportTemplateName: name,
          reportType: type ?? undefined,
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
    void createReport({
      variables: {
        data: {
          description: values.description,
          groups: {
            connect: values.groups.map((id) => ({
              id,
            })),
          },
          name: values.name,
          reportGroup: {
            connect: {
              id: values.reportGroupId,
            },
          },
          schemes: {
            connect: [
              {
                id: schemeId,
              },
            ],
          },
          type: values.type,
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
          defaultMessage: 'Report Type',
        })}
        name="type"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'A type is required.',
            }),
            required: true,
          },
        ]}
      >
        <Select>
          {options.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              <Typography.Paragraph style={{ marginBottom: 0 }}>
                {item.name}
              </Typography.Paragraph>
              <Typography.Paragraph
                style={{ marginBottom: 0 }}
                type="secondary"
              >
                {item.description}
              </Typography.Paragraph>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Groups',
        })}
        name="groups"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please select at least one group.',
            }),
            required: true,
          },
        ]}
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
              <FormattedMessage defaultMessage="Create Report" />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateReport;
