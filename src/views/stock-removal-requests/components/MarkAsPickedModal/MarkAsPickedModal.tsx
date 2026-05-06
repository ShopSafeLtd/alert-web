import type { UploadFile } from 'antd/es/upload/interface';

import customRequest from '#/utils/custom-request';
import { useMarkStockRemovalRequestAsPickedMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/mark-picked.generated';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Table,
  Upload,
  notification,
} from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Item {
  __typename?: 'StockRemovalItem';
  barcode?: null | string;
  brand?: null | string;
  id: string;
  name?: null | string;
  pickedQuantity?: null | number;
  requestedQuantity?: null | number;
  sku?: null | string;
  tmid?: null | string;
  tracking?: null | string;
  value?: null | number;
}

interface Props {
  isDC: boolean;
  items: Item[];
  onClose: () => void;
  requestId: string;
  visible: boolean;
}

interface PickedItemFormData {
  itemId: string;
  pickedQuantity: number;
}

const MarkAsPickedModal = ({
  isDC,
  items,
  onClose,
  requestId,
  visible,
}: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [markAsPicked] = useMarkStockRemovalRequestAsPickedMutation();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values: Record<string, number | string>) => {
        setSubmitting(true);

        // Build items array from form values
        const pickedItems: PickedItemFormData[] = items.map((item) => ({
          itemId: item.id,
          pickedQuantity: (values[`picked_${item.id}`] as number) || 0,
        }));

        const images = fileList
          .filter((f) => f.status === 'done' && f.response)
          .map((f) => {
            const response = f.response as
              | Array<{ blobName?: string; mimetype?: string; url?: string }>
              | undefined;
            const data = response?.[0];
            return {
              filename: data?.blobName ?? f.name ?? '',
              mimetype: data?.mimetype ?? f.type ?? 'image/jpeg',
              url: data?.url ?? '',
            };
          })
          .filter((img) => img.url);

        // Build mutation data
        const mutationData: {
          id: string;
          images?: { filename: string; mimetype: string; url: string }[];
          items: PickedItemFormData[];
          tmid?: string;
          tracking?: string;
        } = {
          id: requestId,
          images: images.length > 0 ? images : undefined,
          items: pickedItems,
        };

        // Add TMID and tracking at request level for DC users
        if (isDC) {
          mutationData.tmid = values.tmid as string;
          mutationData.tracking = values.tracking as string;
        }

        void markAsPicked({
          onCompleted: () => {
            setSubmitting(false);
            notification.success({
              description: intl.formatMessage({
                defaultMessage:
                  'Items have been marked as picked successfully.',
              }),
              message: intl.formatMessage({
                defaultMessage: 'Marked as Picked',
              }),
              placement: 'bottomRight',
            });
            form.resetFields();
            setFileList([]);
            onClose();
          },
          onError: (error) => {
            setSubmitting(false);
            notification.error({
              description:
                error.message ||
                intl.formatMessage({
                  defaultMessage: 'Something went wrong.',
                }),
              message: intl.formatMessage({
                defaultMessage: 'Error Marking as Picked',
              }),
              placement: 'bottomRight',
            });
          },
          refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
          variables: {
            data: mutationData,
          },
        });
      })
      .catch(() => {
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Please fill in all required fields.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Validation Error',
          }),
          placement: 'bottomRight',
        });
      });
  };

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Item Name' }),
      width: 200,
    },
    ...(isDC
      ? [
          {
            dataIndex: 'brand',
            key: 'brand',
            title: intl.formatMessage({ defaultMessage: 'Brand' }),
            width: 150,
          },
          {
            dataIndex: 'sku',
            key: 'sku',
            title: intl.formatMessage({ defaultMessage: 'SKU' }),
            width: 120,
          },
        ]
      : []),
    {
      dataIndex: 'requestedQuantity',
      key: 'requestedQuantity',
      render: (qty: null | number | undefined) => qty?.toString() ?? '-',
      title: intl.formatMessage({ defaultMessage: 'Requested' }),
      width: 100,
    },
    {
      dataIndex: 'pickedQuantity',
      key: 'pickedQuantity',
      render: (_: unknown, record: Item) => (
        <Form.Item
          name={`picked_${record.id}`}
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Required',
              }),
              required: true,
            },
            {
              message: intl.formatMessage({
                defaultMessage: 'Must be a positive number',
              }),
              min: 0,
              type: 'number',
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <InputNumber
            min={0}
            placeholder={intl.formatMessage({
              defaultMessage: 'Qty',
            })}
            style={{ width: '100%' }}
          />
        </Form.Item>
      ),
      title: intl.formatMessage({ defaultMessage: 'Picked Qty' }),
      width: 120,
    },
  ];

  return (
    <Modal
      footer={[
        <Button key="cancel" onClick={onClose}>
          <FormattedMessage defaultMessage="Cancel" />
        </Button>,
        <Button
          key="submit"
          loading={submitting}
          onClick={handleSubmit}
          type="primary"
        >
          <FormattedMessage defaultMessage="Mark as Picked" />
        </Button>,
      ]}
      onCancel={onClose}
      open={visible}
      title={intl.formatMessage({ defaultMessage: 'Mark Items as Picked' })}
      width={700}
    >
      <Form form={form} layout="vertical">
        {isDC && (
          <>
            <Row gutter={16}>
              <Col span={24}>
                <FormattedMessage defaultMessage="Enter the TMID and tracking number for this request, then enter the picked quantity for each item." />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({ defaultMessage: 'TMID' })}
                  name="tmid"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'TMID is required',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter TMID',
                    })}
                    rows={3}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Tracking Number',
                  })}
                  name="tracking"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Tracking number is required',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter tracking number',
                    })}
                    rows={3}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {!isDC && (
          <Row style={{ marginBottom: 16 }}>
            <Col span={24}>
              <FormattedMessage defaultMessage="Enter the picked quantity for each item." />
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={intl.formatMessage({ defaultMessage: 'Images' })}>
              <Upload
                accept=".png,.jpeg,.jpg,.webp"
                customRequest={customRequest}
                fileList={fileList}
                listType="picture-card"
                multiple
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
              >
                {fileList.length >= 5 ? null : (
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                  <div>
                    + {intl.formatMessage({ defaultMessage: 'Upload' })}
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          scroll={{ x: 500 }}
          size="small"
        />
      </Form>
    </Modal>
  );
};

export default MarkAsPickedModal;
