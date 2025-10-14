import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text } = Typography;

interface FormData {
  user: string[];
}
interface MemberData {
  businesses: { id: string; name: string }[];
  firstLetter?: null | string;
  fullName: string;
  id: string;
}

interface Props {
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  usersData: MemberData[] | undefined;
}

const AddUserToChat = ({
  loading,
  onClose,
  onSubmit,
  saving,
  search,
  setSearch,
  usersData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={22}>
          <Input
            allowClear
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search users...',
            })}
            value={search}
          />
        </Col>
      </Row>
      {loading ? (
        <Skeleton />
      ) : (
        <Form.Item
          label=""
          name="user"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage:
                  'Please at least select an user for the chat group.',
              }),
              required: true,
            },
          ]}
        >
          <Checkbox.Group>
            {usersData?.map(({ businesses, fullName, id }) => (
              <div className="offender-item" style={{ padding: 10 }}>
                <Row key={id} wrap={false}>
                  <Col>
                    <Checkbox value={id}>
                      <Text ellipsis style={{}}>
                        {fullName}
                        <Tag color="red" style={{ marginLeft: 5, padding: 3 }}>
                          {businesses[0]?.name}
                        </Tag>
                      </Text>
                    </Checkbox>
                  </Col>
                </Row>
              </div>
            ))}
          </Checkbox.Group>
        </Form.Item>
      )}

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
                defaultMessage: 'Add Member',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddUserToChat;
