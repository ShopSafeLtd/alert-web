import React from 'react';

import { CrimeType, TagType } from 'graphql/types';
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
import { useIntl } from 'react-intl';
import { TagQuery } from 'graphql/tag/queries/__generated__/tag.generated';


const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
  crimeType: CrimeType;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: TagQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const EditCrimeType = ({
  onSubmit,
  onClose,
  data,
  loading,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        name: data?.tag?.name,
        description: data?.tag?.description,
        crimeType: data?.tag?.crimeType,
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
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the crime type.',
                }),
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
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
          >
            <Input.TextArea rows={10} disabled={saving} />
          </Form.Item>
        </Col>
        {data?.tag?.type === TagType.IncidentCrimeType && (
          <Col span={24}>
            <Form.Item
              name="crimeType"
              label={intl.formatMessage({
                defaultMessage: 'Crime Type Category',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a category for the new crime type.',
                  }),
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
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
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
