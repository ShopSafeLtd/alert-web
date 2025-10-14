import type {
  StockRemovalRequestsQuery,
  StockRemovalRequestsQueryVariables,
} from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';

import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useUpdateStockRemovalRequestRestrictedMutation } from '#/views/stock-removal-requests/components/RestrictedEditStockRemovalRequest/graphql/__generated__/update-stock-removal-request-restricted.generated';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { StockRemovalRequestsDocument } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import { Button, Col, Form, Input, Row, Skeleton, notification } from 'antd';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  requestId: string;
}

export interface FormData {
  approvers: string[];
  shippingAddress?: string;
}

const APPROVER_GROUP_ID = 'cmg9nfl260017ityalcaluw9r';

const RestrictedEditStockRemovalRequest = ({ onClose, requestId }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const currentUserId = useAtomValue(currentUserAtom)?.id;

  const [saving, setSaving] = useState(false);

  const { data: requestData, loading } = useStockRemovalRequestQuery({
    variables: {
      where: {
        id: requestId,
      },
    },
  });

  useEffect(() => {
    if (requestData?.stockRemovalRequest) {
      const request = requestData.stockRemovalRequest;
      form.setFieldsValue({
        approvers: request.approvers.map((a) => a.user.id),
        shippingAddress: request.shippingAddress ?? undefined,
      });
    }
  }, [requestData, form]);

  const [updateRemovalRequest] = useUpdateStockRemovalRequestRestrictedMutation(
    {
      update: (store, { data: res }) => {
        if (
          res?.updateStockRemovalRequest === null ||
          res?.updateStockRemovalRequest === undefined
        )
          return;
        const existingData = store.readQuery<
          StockRemovalRequestsQuery,
          StockRemovalRequestsQueryVariables
        >({
          query: StockRemovalRequestsDocument,
          variables: {
            orderBy: [
              {
                createdAt: SortOrder.Desc,
              },
            ],
            where: {
              schemeId: currentScheme,
            },
          },
        });

        if (!existingData?.stockRemovalRequests) return;

        const updatedEdges = existingData.stockRemovalRequests.edges.map(
          (edge) => {
            if (edge.node.id === res.updateStockRemovalRequest.id) {
              return {
                node: {
                  ...edge.node,
                  approvers: res.updateStockRemovalRequest.approvers,
                },
              };
            }
            return edge;
          }
        );

        store.writeQuery<
          StockRemovalRequestsQuery,
          StockRemovalRequestsQueryVariables
        >({
          data: {
            stockRemovalRequests: {
              edges: updatedEdges,
              totalCount: existingData.stockRemovalRequests.totalCount,
            },
          },
          query: StockRemovalRequestsDocument,
          variables: {
            orderBy: [
              {
                createdAt: SortOrder.Desc,
              },
            ],
            where: {
              schemeId: currentScheme,
            },
          },
        });
      },
    }
  );

  const onFinish = (values: FormData) => {
    setSaving(true);
    void updateRemovalRequest({
      onCompleted: (_data) => {
        setSaving(false);
        notification.success({
          description: intl.formatMessage({
            defaultMessage:
              'The approvers and shipping address have been updated.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Request Updated',
          }),
          placement: 'bottomRight',
        });
        onClose();
      },
      onError: () => {
        setSaving(false);
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Something went wrong.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Error Updating Request',
          }),
          placement: 'bottomRight',
        });
      },
      variables: {
        data: {
          approverIds: values.approvers,
          shippingAddress: values.shippingAddress,
        },
        where: {
          id: requestId,
        },
      },
    });
  };

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <Form<FormData> form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Select Approvers' })}
            name="approvers"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select at least one approver.',
                }),
                required: true,
              },
            ]}
          >
            <UsersSelect
              allowClear
              mode="multiple"
              queryVars={{
                where: {
                  AND: [
                    {
                      groups: {
                        some: {
                          id: {
                            equals: APPROVER_GROUP_ID,
                          },
                        },
                      },
                    },
                    {
                      id: {
                        not: {
                          equals: currentUserId ?? '',
                        },
                      },
                    },
                  ],
                },
              }}
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Shipping Address' })}
            name="shippingAddress"
          >
            <Input.TextArea disabled={saving} rows={4} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" style={{ paddingTop: 20 }}>
        <Col>
          <Button
            disabled={saving}
            htmlType="submit"
            loading={saving}
            type="primary"
          >
            <FormattedMessage defaultMessage="Update Request" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RestrictedEditStockRemovalRequest;
