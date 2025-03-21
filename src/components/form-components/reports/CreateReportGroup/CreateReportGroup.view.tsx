import type {
  ReportsCentreQuery,
  ReportsCentreQueryVariables,
} from '#/views/reports/reports-centre/__generated__/reports-centre.generated';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { ReportsCentreDocument } from '#/views/reports/reports-centre/__generated__/reports-centre.generated';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { useCreateReportGroupMutation } from 'graphql/report-groups/__generated__/create-report-group.generated';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface FormData {
  groupIds: string[];
  name: string;
  order: number;
}

interface Props {
  onClose: () => void;
}

const CreateReportGroup = ({ onClose }: Props) => {
  const intl = useIntl();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);

  const [createReport] = useCreateReportGroupMutation({
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

      if (existingTemplates && d?.createReportGroup) {
        cache.writeQuery<ReportsCentreQuery, ReportsCentreQueryVariables>({
          data: {
            reportsCentre: [
              ...existingTemplates.reportsCentre,
              d.createReportGroup,
            ],
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

  const onSubmit = (values: FormData) => {
    setSaving(true);
    void createReport({
      variables: {
        data: {
          groupIds: values.groupIds,
          name: values.name,
          order: values.order,
          schemeId,
        },
      },
    });
  };

  return (
    <Form<FormData> layout="vertical" onFinish={onSubmit}>
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
        label={intl.formatMessage({ defaultMessage: 'Order' })}
        name="order"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Name is required',
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
              <FormattedMessage defaultMessage="Create Report" />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateReportGroup;
