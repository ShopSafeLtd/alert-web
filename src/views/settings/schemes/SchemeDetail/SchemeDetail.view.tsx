import React from 'react';
import { SchemeQuery } from 'graphql/generated';
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { SelectProps } from 'antd';
import {
  // Button,
  PageHeader,
  Card,
  // Modal,
  Skeleton,
  Switch,
  Typography,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Space,
} from 'antd';
// import type { UploadChangeParam } from 'antd/es/upload';
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { Option } = Select;
// const { confirm } = Modal;

interface Props {
  data: SchemeQuery | undefined;
  loading: boolean;
  saving: boolean;
  schemeSubmit: (value: FormData) => void;
}
interface FormData {
  name: string;
  id: string;
  autoApproveOffenders: boolean;
  autoApproveIncidents: boolean;
  logo: { id: string; url: string; optimised: string };
}
const menuItems = [
  { value: -1, label: 'Disabled' },
  { value: 91, label: '3 months' },
  { value: 183, label: '6 months' },
  { value: 365, label: '12 months' },
  { value: 547, label: '18 months' },
  { value: 730, label: '2 years' },
  { value: 1096, label: '3 years' },
  { value: 1826, label: '5 years' },
];
const GroupDetail = ({
  data,
  loading,
  saving,
  schemeSubmit,
}: Props): JSX.Element => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const options: SelectProps['options'] = [];
  for (let i = 0; i < 8; i++) {
    options.push({
      label: menuItems[i].label,
      value: menuItems[i].value,
      disabled: i === 8,
    });
  }
  // const [imgLoading, setImgLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();

  // const handleChange: UploadProps['onChange'] = (
  //   info: UploadChangeParam<UploadFile>
  // ) => {
  //   if (info.file.status === 'uploading') {
  //     setImgLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setimgLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title="Scheme Details"
        subTitle="Changed the scheme name and upload a logo."
      />
      {loading ? (
        <Skeleton />
      ) : (
        <Card>
          <Form
            name="Scheme Details"
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            onFinish={schemeSubmit}
            initialValues={{
              name: data?.scheme?.name,
            }}
          >
            <Title level={4} style={{ marginBottom: 15 }}>
              Scheme Details:
            </Title>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="name"
                  label="Scheme Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a name for the scheme.',
                    },
                  ]}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="logo"
                  label="Scheme Logo"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload a logo for the scheme.',
                  //   },
                  // ]}
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    // beforeUpload={beforeUpload}
                    // onChange={handleChange}
                  >
                    {/* {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : ( */}
                    <div>
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                    {/* )} */}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col>
                <Title level={4} style={{ marginBottom: 15 }}>
                  Auto Approve Options:
                </Title>
              </Col>
              <Col>
                <Text>
                  Enabling auto approve will automatically approve any new
                  incidents and offenders without manual approval.
                </Text>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={4}>
                <Form.Item
                  name="autoApproveIncidents"
                  label="Auto Approve Incident"
                >
                  <Switch onChange={onChange} style={{ marginLeft: 5 }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="autoApproveOffenders"
                  label="Auto Approve Offenders"
                >
                  <Switch onChange={onChange} style={{ marginLeft: 5 }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col>
                <Title level={4} style={{ marginBottom: 15 }}>
                  Date Retention:
                </Title>
              </Col>
              <Col>
                <Text>
                  Select a period of time to retain data before it is
                  automatically deleted. You can also disable this feature and
                  manually audit your data.
                </Text>
              </Col>
            </Row>

            <Row>
              <Col span={5}>
                <Form.Item
                  name="incidentRetention"
                  label="Delete incidents after: "
                  rules={[{ type: 'number', required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                    defaultValue={menuItems}
                    options={options}
                  >
                    <Option value="-1">Disabled</Option>
                    <Option value="female">3 months</Option>
                    <Option value="other">6 months</Option>
                    <Option value="">12 months</Option>
                    <Option value="">18 months</Option>
                    <Option value="">2 years</Option>
                    <Option value="">3 years</Option>
                    <Option value="">5 years</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="offenderRetention"
                  label="Delete offenders after: "
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="-1">Disabled</Option>
                    <Option value="female">3 months</Option>
                    <Option value="other">6 months</Option>
                    <Option value="">12 months</Option>
                    <Option value="">18 months</Option>
                    <Option value="">2 years</Option>
                    <Option value="">3 years</Option>
                    <Option value="">5 years</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10} style={{ marginLeft: 8 }}>
                <Space direction="vertical">
                  <Text>
                    {' '}
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    The selected period of time begins on the date that an
                    offender or incident was last updated.
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    Once this period has elapsed, the item will be transfered to
                    the recycle bin.
                  </Text>

                  <Text>
                    <ExclamationCircleOutlined
                      style={{ margin: 8, color: '#f5222d' }}
                    />
                    It will remain in the recycle bin for 30 days before being
                    permanently deleted.
                  </Text>
                </Space>
              </Col>
            </Row>

            <Row>
              <Col />
            </Row>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('gender') === 'other' ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item>
              <Row style={{ marginTop: 30 }} gutter={16} justify="end">
                <Col>
                  <Button
                    disabled={saving}
                    // onClick={onClose}
                  >
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
                    Save
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default GroupDetail;
