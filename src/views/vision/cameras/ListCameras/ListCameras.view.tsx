import type {
  CameraList,
  DeafultTimeoutForm,
} from '#/views/vision/cameras/ListCameras/useListCameras';
import type { FormInstance } from 'antd';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import DebouncedInput from '#/utils/debounced-input';
import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  PageHeader,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const ListCamerasView = ({
  data,
  defaultTimeout,
  drawerVisible,
  form,
  handleDrawerClose,
  handleEditClick,
  handleFormSubmit,
  loading,
  loadingDefault,
  onPageChange,
  page,
  pageSize,
  search: _,
  setSearch,
  submitting,
  total,
}: {
  data: CameraList[];
  defaultTimeout?: string;
  drawerVisible: boolean;
  form: FormInstance<DeafultTimeoutForm>;
  handleDrawerClose: () => void;
  handleEditClick: () => void;
  handleFormSubmit: () => void;
  loading: boolean;
  loadingDefault: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onUpdateDefaultTimeout: (values: DeafultTimeoutForm) => Promise<void>;
  page: number;
  pageSize: number;
  search?: string;
  setDrawerVisible: (visible: boolean) => void;
  setSearch: (value: null | string) => void;
  submitting: boolean;
  total: number;
}) => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div>
      <PageHeader
        extra={[
          <PermissionCheckWrapper
            key="create-button"
            permission={{
              method: PermissionMethod.Read,
              model: PermissionModel.VisionAi,
            }}
            unauthorizedElement={<div />}
          >
            <Button key="1" onClick={() => navigate('add')} type="primary">
              <FormattedMessage defaultMessage="Create Camera" />
            </Button>
          </PermissionCheckWrapper>,
        ]}
        title={<FormattedMessage defaultMessage="Connected Cameras" />}
      />
      <Card
        extra={
          <PermissionCheckWrapper
            permission={{
              method: PermissionMethod.Write,
              model: PermissionModel.VisionAi,
            }}
            unauthorizedElement={<div />}
          >
            <Button
              icon={<EditOutlined />}
              onClick={handleEditClick}
              size="small"
            >
              <FormattedMessage defaultMessage="Edit" />
            </Button>
          </PermissionCheckWrapper>
        }
        loading={loadingDefault}
        style={{
          margin: `${[0, 16, 16, 16].join('px ')}px`,
        }}
        title={<FormattedMessage defaultMessage="Scheme Default Timeout" />}
      >
        <Typography.Text
          strong
          style={{
            marginRight: 8,
          }}
        >
          <FormattedMessage defaultMessage="Default Duplicate Match Timeout: " />
        </Typography.Text>
        <Typography.Text>{defaultTimeout}</Typography.Text>
      </Card>

      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{
          margin: `${[0, 16, 16, 16].join('px ')}px`,
        }}
      >
        <Row gutter={8} style={{ padding: 16 }}>
          <Col span={6}>
            <DebouncedInput
              allowClear
              onChange={(event) => {
                setSearch(event.target.value || null);
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for camera...',
              })}
              size="small"
            />
          </Col>
        </Row>
        <Table
          columns={[
            {
              dataIndex: 'status',
              key: 'status',
              render: (value) => (
                <Typography.Text
                  type={value === 'Online' ? 'success' : 'danger'}
                >
                  {value}
                </Typography.Text>
              ),
              title: <FormattedMessage defaultMessage="Status" />,
            },
            {
              dataIndex: 'serialNumber',
              key: 'serialNumber',
              title: <FormattedMessage defaultMessage="Serial Number" />,
            },
            {
              dataIndex: 'business',
              key: 'business',
              title: <FormattedMessage defaultMessage="Business" />,
            },
            {
              dataIndex: 'make',
              key: 'make',
              title: <FormattedMessage defaultMessage="Make" />,
            },
            {
              dataIndex: 'model',
              key: 'model',
              title: <FormattedMessage defaultMessage="Model" />,
            },
            {
              dataIndex: 'lastUploaded',
              key: 'lastUploaded',
              title: <FormattedMessage defaultMessage="Last Uploaded" />,
            },
            {
              dataIndex: 'actions',
              key: 'actions',
              render: (_, record: CameraList) => (
                <Space>
                  <Button
                    onClick={() => navigate(`edit/${record.id}/`)}
                    size="small"
                  >
                    <FormattedMessage defaultMessage="Edit" />
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={data}
          loading={loading}
          pagination={{
            current: page,
            hideOnSinglePage: true,
            onChange: onPageChange,
            pageSize,
            showTotal: (totalCount) => `Total ${totalCount} cameras`,
            total,
          }}
          size="small"
        />
      </Card>

      <Drawer
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={handleDrawerClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
            <Button
              loading={submitting}
              onClick={handleFormSubmit}
              type="primary"
            >
              <FormattedMessage defaultMessage="Save" />
            </Button>
          </Space>
        }
        onClose={handleDrawerClose}
        open={drawerVisible}
        title={<FormattedMessage defaultMessage="Edit Default Timeout" />}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={<FormattedMessage defaultMessage="Default Timeout" />}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  name="hours"
                  noStyle
                  rules={[
                    { message: '', required: true },
                    { max: 99, message: '', min: 0, type: 'number' },
                  ]}
                >
                  <Input
                    addonAfter={<FormattedMessage defaultMessage="Hours" />}
                    max={99}
                    min={0}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="minutes"
                  noStyle
                  rules={[
                    { message: '', required: true },
                    { max: 59, message: '', min: 0, type: 'number' },
                  ]}
                >
                  <Input
                    addonAfter={<FormattedMessage defaultMessage="Minutes" />}
                    max={59}
                    min={0}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="seconds"
                  noStyle
                  rules={[
                    { message: '', required: true },
                    { max: 59, message: '', min: 0, type: 'number' },
                  ]}
                >
                  <Input
                    addonAfter={<FormattedMessage defaultMessage="Seconds" />}
                    max={59}
                    min={0}
                    type="number"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="updateAllWithDefault" valuePropName="checked">
            <Checkbox>
              <FormattedMessage defaultMessage="Update all cameras with this default timeout" />
            </Checkbox>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ListCamerasView;
