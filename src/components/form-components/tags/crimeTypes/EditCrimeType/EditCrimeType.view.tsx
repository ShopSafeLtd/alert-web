import type { TagQuery } from 'graphql/tag/queries/__generated__/tag.generated';

import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import { CrimeType, TagType } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text } = Typography;

interface FormData {
  crimeType: CrimeType;
  description: string;
  name: string;
}

interface Props {
  data: TagQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const EditCrimeType = ({
  data,
  loading,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        crimeType: data?.tag?.crimeType,
        description: data?.tag?.description,
        name: data?.tag?.name,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Crime types are used to categorize incidents that are submitted by members.',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the crime type.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
          >
            <Input.TextArea disabled={saving} rows={10} />
          </Form.Item>
        </Col>
        {data?.tag?.type === TagType.IncidentCrimeType && (
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Crime Type Category',
              })}
              name="crimeType"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a category for the new crime type.',
                  }),
                  required: true,
                },
              ]}
            >
              <Select disabled={saving}>
                <Select.Option value={CrimeType.Burglary}>
                  {intl.formatMessage({
                    defaultMessage: 'Burglary',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.CriminalDamage}>
                  {intl.formatMessage({
                    defaultMessage: 'Criminal Damage',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.Drugs}>
                  {intl.formatMessage({
                    defaultMessage: 'Drugs',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.FraudForgery}>
                  {intl.formatMessage({
                    defaultMessage: 'Fraud & Forgery',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.Robbery}>
                  {intl.formatMessage({
                    defaultMessage: 'Robbery',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.SexualOffences}>
                  {intl.formatMessage({
                    defaultMessage: 'Sexual Offences',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.TheftHandling}>
                  {intl.formatMessage({
                    defaultMessage: 'Theft & Handling',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.Violence}>
                  {intl.formatMessage({
                    defaultMessage: 'Violence Against The Person',
                  })}
                </Select.Option>
                <Select.Option value={CrimeType.Other}>
                  {intl.formatMessage({
                    defaultMessage: 'Other',
                  })}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>

      <Form.Item>
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditCrimeType;
