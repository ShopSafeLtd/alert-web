import type { CrimeGroupQuery } from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';

import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  alias: string;
}

interface Props {
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddAlias = ({
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
        alias: data?.crimeGroup?.alias,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Alias',
            })}
            name="alias"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter an alias for the crime group.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
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
              {intl.formatMessage({
                defaultMessage: 'Add Alias',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddAlias;
