import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStoreState } from '#/state';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { ReportType } from 'graphql/types';
import { useCreateReportTemplateMutation } from 'graphql/reports/mutations/create-report-template.generated';
import type {
  ReportsCentreQuery,
  ReportsCentreQueryVariables,
} from '#/views/reports/reports-centre/reports-centre.generated';
import { ReportsCentreDocument } from '#/views/reports/reports-centre/reports-centre.generated';

interface FormData {
  name: string;
  description: string;
  type: ReportType;
  groups: string[];
}

interface Props {
  onClose: () => void;
}

const CreateReport = ({ onClose }: Props) => {
  const intl = useIntl();

  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const options = [
    {
      value: ReportType.Performance,
      name: intl.formatMessage({
        defaultMessage: 'Summary Report',
      }),
      description: intl.formatMessage({
        defaultMessage:
          'Report that can show a summary of all data in alert together.',
      }),
    },
    {
      value: ReportType.Offender,
      name: intl.formatMessage({
        defaultMessage: 'Offender Report',
      }),
      description: intl.formatMessage({
        defaultMessage: 'Report that focuses on the data for one offender.',
      }),
    },
    {
      value: ReportType.Business,
      name: intl.formatMessage({
        defaultMessage: 'Business Report',
      }),
      description: intl.formatMessage({
        defaultMessage: 'Report that focuses on the data for one business.',
      }),
    },
    {
      value: ReportType.CrimeGroup,
      name: intl.formatMessage({
        defaultMessage: 'Crime Group Report',
      }),
      description: intl.formatMessage({
        defaultMessage: 'Report that focuses on the data for one crime group.',
      }),
    },
  ];

  const [createReport] = useCreateReportTemplateMutation({
    update: (cache, { data: d }) => {
      const existingTemplates = cache.readQuery<
        ReportsCentreQuery,
        ReportsCentreQueryVariables
      >({
        query: ReportsCentreDocument,
        variables: {
          where: {
            scheme: {
              id: schemeId,
            },
            search: '',
          },
        },
      });

      if (existingTemplates && d?.createReportTemplate) {
        const perfReports =
          d.createReportTemplate.type === ReportType.Performance
            ? [
                {
                  name: d.createReportTemplate.name,
                  description: d.createReportTemplate.description,
                  id: d.createReportTemplate.id,
                  type: ReportType.Performance,
                },
              ]
            : [];
        const offenderReports =
          d.createReportTemplate.type === ReportType.Offender
            ? [
                {
                  name: d.createReportTemplate.name,
                  description: d.createReportTemplate.description,
                  id: d.createReportTemplate.id,
                  type: ReportType.Offender,
                },
              ]
            : [];
        const businessReports =
          d.createReportTemplate.type === ReportType.Business
            ? [
                {
                  name: d.createReportTemplate.name,
                  description: d.createReportTemplate.description,
                  id: d.createReportTemplate.id,
                  type: ReportType.Business,
                },
              ]
            : [];
        const crimeGroupReports =
          d.createReportTemplate.type === ReportType.CrimeGroup
            ? [
                {
                  name: d.createReportTemplate.name,
                  description: d.createReportTemplate.description,
                  id: d.createReportTemplate.id,
                  type: ReportType.CrimeGroup,
                },
              ]
            : [];
        cache.writeQuery<ReportsCentreQuery, ReportsCentreQueryVariables>({
          query: ReportsCentreDocument,
          data: {
            reportsCentre: {
              businessReports: [
                ...existingTemplates.reportsCentre.businessReports,
                ...businessReports,
              ],
              summaryReports: [
                ...existingTemplates.reportsCentre.summaryReports,
                ...perfReports,
              ],
              offenderReports: [
                ...existingTemplates.reportsCentre.offenderReports,
                ...offenderReports,
              ],
              crimeGroupReports: [
                ...existingTemplates.reportsCentre.crimeGroupReports,
                ...crimeGroupReports,
              ],
            },
          },
          variables: {
            where: {
              scheme: {
                id: schemeId,
              },
              search: '',
            },
          },
        });
      }
    },
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
  });

  const onSubmit = (values: FormData) => {
    setSaving(true);
    void createReport({
      variables: {
        data: {
          type: values.type,
          name: values.name,
          description: values.description,
          groups: {
            connect: values.groups.map((id) => ({
              id,
            })),
          },
          schemes: {
            connect: [
              {
                id: schemeId,
              },
            ],
          },
        },
      },
    });
  };

  return (
    <Form<FormData> layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="name"
        label={intl.formatMessage({ defaultMessage: 'Name' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Name is required',
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
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Description is required',
            }),
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="type"
        label={intl.formatMessage({
          defaultMessage: 'Report Type',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'A type is required.',
            }),
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
                type={'secondary'}
              >
                {item.description}
              </Typography.Paragraph>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="groups"
        label={intl.formatMessage({
          defaultMessage: 'Groups',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage: 'Please select at least one group.',
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
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
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
