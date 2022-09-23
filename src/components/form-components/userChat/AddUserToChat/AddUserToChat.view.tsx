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

const { Text } = Typography;

interface FormData {
  user: string[];
}
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
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
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={22}>
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search Users..."
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
            message: 'Please at least select an user for the chat group.',
          },
        ]}
      >
        <Checkbox.Group>
          {usersData?.map(({ id, fullName, organisation }) => (
            <div className="offender-item" style={{ padding: 10 }}>
              <Row wrap={false} key={id}>
                <Col>
                  <Checkbox value={id}>
                    <Text style={{}} ellipsis>
                      {fullName}
                      <Tag color="red" style={{ padding: 3, marginLeft: 5 }}>
                        {organisation}
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
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            type="primary"
            htmlType="submit"
          >
            Add Member
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddUserToChat;
