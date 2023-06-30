import React from 'react';
import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import { useIntl } from 'react-intl';
import type { CrimeGroupQuery } from 'graphql/generated';

interface FormData {
  alias: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  data: CrimeGroupQuery | undefined;
  loading: boolean;
}

const AddAlias = ({
  onSubmit,
  onClose,
  saving,
  data,
  loading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        alias: data?.crimeGroup?.alias,
      }}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="alias"
            label={intl.formatMessage({
              defaultMessage: 'Alias',
              id: 'Ri9jA7',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter an alias for the crime group.',
                  id: 'PVUzYi',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({
                defaultMessage: 'Add Alias',
                id: 'KDH1mp',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddAlias;
