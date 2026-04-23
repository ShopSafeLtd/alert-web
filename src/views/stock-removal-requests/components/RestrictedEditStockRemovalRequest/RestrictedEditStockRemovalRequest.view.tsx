import type {
  StockRemovalRequestsQuery,
  StockRemovalRequestsQueryVariables,
} from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';

import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import {
  currentPermissionsAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import { useUpdateStockRemovalRequestRestrictedMutation } from '#/views/stock-removal-requests/components/RestrictedEditStockRemovalRequest/graphql/__generated__/update-stock-removal-request-restricted.generated';
import ViewStockRemovalRequest from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/ViewStockRemovalRequest.view';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { StockRemovalRequestsDocument } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import { Button, Col, Form, Input, Row, Skeleton, notification } from 'antd';
import { PermissionMethod, PermissionModel, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  requestId: string;
}

export interface FormData {
  approvers: string[];
  shippingAddressLine1?: string;
  shippingAddressLine2?: string;
  shippingCity?: string;
  shippingCountry?: string;
  shippingCounty?: string;
  shippingPostcode?: string;
}

const APPROVER_GROUP_ID = 'cmg9nfl260017ityalcaluw9r';
const DC_GROUP_ID = 'cmgfd4l4r0000it3n4u2eckmf';

const RestrictedEditStockRemovalRequest = ({ onClose, requestId }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const currentUser = useAtomValue(currentUserAtom);
  const currentUserId = currentUser?.id;
  const permissions = useAtomValue(currentPermissionsAtom);

  const [saving, setSaving] = useState(false);
  const [unauthorizedAccess, setUnauthorizedAccess] = useState(false);

  const { data: requestData, loading } = useStockRemovalRequestQuery({
    variables: {
      where: {
        id: requestId,
      },
    },
  });

  const hasEditPermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Edit,
          model: PermissionModel.StockRemovalRequests,
        },
        permissions,
      }),
    [permissions]
  );

  // Check if user can edit this request
  const canEditRequest = useMemo(() => {
    if (!requestData?.stockRemovalRequest || !currentUserId) return false;
    const isCreator =
      requestData.stockRemovalRequest.createdBy.id === currentUserId;
    return isCreator || hasEditPermission;
  }, [requestData, currentUserId, hasEditPermission]);

  // Check if current user is in DC group
  const isUserInDCGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === DC_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check authorization when data loads
  useEffect(() => {
    if (requestData?.stockRemovalRequest && !canEditRequest) {
      setUnauthorizedAccess(true);
      notification.info({
        description: intl.formatMessage({
          defaultMessage:
            'You do not have permission to edit this request. Showing view-only mode.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Access Restricted',
        }),
        placement: 'bottomRight',
      });
    }
  }, [requestData, canEditRequest, intl]);

  useEffect(() => {
    if (requestData?.stockRemovalRequest) {
      const request = requestData.stockRemovalRequest;
      form.setFieldsValue({
        approvers: request.approvers.map((a) => a.user.id),
        shippingAddressLine1: request.shippingAddressLine1 ?? undefined,
        shippingAddressLine2: request.shippingAddressLine2 ?? undefined,
        shippingCity: request.shippingCity ?? undefined,
        shippingCountry: request.shippingCountry ?? undefined,
        shippingCounty: request.shippingCounty ?? undefined,
        shippingPostcode: request.shippingPostcode ?? undefined,
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
          shippingAddressLine1: values.shippingAddressLine1,
          shippingAddressLine2: values.shippingAddressLine2,
          shippingCity: values.shippingCity,
          shippingCountry: values.shippingCountry,
          shippingCounty: values.shippingCounty,
          shippingPostcode: values.shippingPostcode,
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

  // If user doesn't have permission to edit, show view-only mode
  if (unauthorizedAccess) {
    return <ViewStockRemovalRequest requestId={requestId} />;
  }

  return (
    <Form<FormData> form={form} layout="vertical" onFinish={onFinish}>
      {!isUserInDCGroup && (
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
      )}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Address Line 1' })}
            name="shippingAddressLine1"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Address Line 2' })}
            name="shippingAddressLine2"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'City' })}
            name="shippingCity"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'County' })}
            name="shippingCounty"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Postcode' })}
            name="shippingPostcode"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Country' })}
            name="shippingCountry"
          >
            <Input disabled={saving} />
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
