import React from 'react';
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
import { useIntl } from 'react-intl';

const { Text } = Typography;

interface FormData {
  user: string[];
}
interface MemberData {
  id: string;
  fullName: string;
  businesses: { id: string; name: string }[];
  firstLetter?: string | null;
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  usersData: MemberData[] | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  saving: boolean;
}

const AddUserToChat = ({
  onSubmit,
  onClose,
  usersData,
  loading,
  search,
  setSearch,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={22}>
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search users...',
              id: 'p/iF5T',
            })}
            allowClear
          />
        </Col>
      </Row>
      {loading ? (
        <Skeleton />
      ) : (
        <Form.Item
          name="user"
          label=""
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                defaultMessage:
                  'Please at least select an user for the chat group.',
                id: 'EdVD2H',
              }),
            },
          ]}
        >
          <Checkbox.Group>
            {usersData?.map(({ id, fullName, businesses }) => (
              <div className="offender-item" style={{ padding: 10 }}>
                <Row wrap={false} key={id}>
                  <Col>
                    <Checkbox value={id}>
                      <Text style={{}} ellipsis>
                        {fullName}
                        <Tag color="red" style={{ padding: 3, marginLeft: 5 }}>
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
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Member',
                id: 'gcagTt',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddUserToChat;
