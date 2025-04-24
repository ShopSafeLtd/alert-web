import type { GoodsData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpdateIncidentGoodsMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-goods.generated';

import AddGoods from '#/components/form-components/incident/goods/AddGoods';
import EditGoods from '#/components/form-components/incident/goods/EditGoods';
import {
  currencyAtom,
  currentSchemeAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '#/types/enums/profile-update-type';
import errorNotification from '#/types/mutation_notifications/error_notification';
import successNotification from '#/types/mutation_notifications/success_notification';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { useUpdateIncidentGoodsMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-goods.generated';
import { GoodsMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const { Paragraph, Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editRights: boolean;
  incidentId: string;
  loading: boolean;
  saving: boolean;
  setSaving: (value: boolean) => void;
}

const Items = ({
  data,
  deleteRights,
  editRights,
  incidentId,
  loading,
  saving,
  setSaving,
}: Props) => {
  const intl = useIntl();
  const goodsMode = useAtomValue(currentSchemeAtom)?.goodsMode;
  const [editGoodsData, setEditGoodsData] = useState<GoodsData | null>(null);
  const [addGoods, setAddGoods] = useState(false);
  const currency = useAtomValue(currencyAtom);

  const [updateIncidentGoods] = useUpdateIncidentGoodsMutation({
    onError: () => {
      errorNotification();
    },
  });

  const toggleAddGoods = () => {
    setAddGoods(!addGoods);
  };
  const updateGoodsList: MutationUpdaterFn<UpdateIncidentGoodsMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.updateIncident === null || res?.updateIncident === undefined)
      return;

    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          incidentItems: res.updateIncident.incidentItems,
        },
      },
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
  };

  const onAddGoods = (value: GoodsData) => {
    setSaving(true);
    if (value) {
      void updateIncidentGoods({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.added
          );
        },
        update: updateGoodsList,
        variables: {
          id: incidentId,
          incidentItems: {
            create: [
              {
                goodsType: value.goodsTypeId
                  ? {
                      connect: {
                        id: value.goodsTypeId || '',
                      },
                    }
                  : undefined,
                name: value.name,
                quantity: value.quantity,
                recoveredQuantity: value.recoveredQuantity,
                recoveredValue: value.recoveredValue || 0,
                sku: value.sku,
                stockItem: value.stockItemId
                  ? {
                      connect: {
                        id: value.stockItemId,
                      },
                    }
                  : undefined,
                value: value.value || 0,
              },
            ],
          },
        },
      }).finally(() => {
        toggleAddGoods();
        setSaving(false);
      });
    }
  };

  const onEditGoods = (value: GoodsData) => {
    setSaving(true);
    if (value)
      void updateIncidentGoods({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          id: incidentId,
          incidentItems: {
            update: [
              {
                data: {
                  goodsType: {
                    connect: {
                      id: value.goodsTypeId || '',
                    },
                  },
                  name: { set: value.name },
                  recoveredValue: { set: value.recoveredValue || 0 },
                  value: { set: value.value || 0 },
                },
                where: {
                  id: value.id,
                },
              },
            ],
          },
        },
        // update: updateGoodsList,
      }).finally(() => {
        setEditGoodsData(null);
        setSaving(false);
      });
  };
  const onDeleteGoods = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentGoods({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.deleted
          );
          setSaving(false);
        },
        onError: () => {
          setSaving(false);
        },
        update: (store, { data: res }) => {
          if (res?.updateIncident === null || res?.updateIncident === undefined)
            return;
          const existingData = store.readQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });

          if (!existingData?.incident) return;
          store.writeQuery<ViewIncidentQuery>({
            data: {
              __typename: 'Query',
              incident: {
                ...existingData.incident,
                incidentItems: existingData.incident.incidentItems.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });
        },
        variables: {
          id: incidentId,
          incidentItems: {
            deleteMany: [
              {
                id: {
                  equals: value,
                },
              },
            ],
          },
        },
      });
  };

  return (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Items',
              })}
            </Title>
          </Col>
          {editRights && (
            <Col>
              <Button
                className="no-print"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddGoods}
                size="small"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Item',
                })}
              </Button>
            </Col>
          )}
        </Row>
        {data?.incident?.incidentItems.length && !loading ? (
          <Table
            columns={
              goodsMode === GoodsMode.Generic
                ? [
                    {
                      dataIndex: 'name',
                      key: 'name',
                      title: intl.formatMessage({
                        defaultMessage: 'Name',
                      }),
                    },
                    {
                      dataIndex: 'value',
                      key: 'value',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency,
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Value',
                      }),
                    },
                    {
                      dataIndex: 'recoveredValue',
                      key: 'recoveredValue',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency,
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Recovered Value',
                      }),
                    },
                    {
                      dataIndex: 'itemTotal',
                      key: 'itemTotal',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency,
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Item Total',
                      }),
                    },
                    {
                      dataIndex: 'Options',
                      key: 'Options',
                      render: (_, record) => (
                        <Row className="no-print" gutter={8}>
                          {editRights && (
                            <Col>
                              <Tooltip
                                title={intl.formatMessage({
                                  defaultMessage: 'Edit Item',
                                })}
                              >
                                <Button
                                  disabled={saving}
                                  icon={
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  }
                                  onClick={() => {
                                    setEditGoodsData(record.item);
                                  }}
                                  size="small"
                                />
                              </Tooltip>
                            </Col>
                          )}
                          {deleteRights && (
                            <Col>
                              <Tooltip
                                title={intl.formatMessage({
                                  defaultMessage: 'Remove Item',
                                })}
                              >
                                <Popconfirm
                                  cancelText={intl.formatMessage({
                                    defaultMessage: 'No',
                                  })}
                                  okText={intl.formatMessage({
                                    defaultMessage: 'Yes',
                                  })}
                                  onConfirm={() => onDeleteGoods(record.key)}
                                  overlayInnerStyle={{
                                    padding: 10,
                                  }}
                                  placement="topLeft"
                                  title={intl.formatMessage({
                                    defaultMessage: 'Remove the item?',
                                  })}
                                  trigger="hover"
                                >
                                  <Button
                                    disabled={saving}
                                    // }
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                    // onClick={() =>
                                    //   onDeleteGoods(record.key)
                                    size="small"
                                  />
                                </Popconfirm>
                              </Tooltip>
                            </Col>
                          )}
                        </Row>
                      ),
                      title: '',
                      width: 100,
                    },
                  ]
                : [
                    {
                      dataIndex: 'name',
                      key: 'name',
                      render: (value: string) => (
                        <Tooltip title={value}>
                          <Paragraph
                            ellipsis={{ rows: 1 }}
                            style={{
                              marginBottom: 0,
                              width: 200,
                            }}
                          >
                            {value}
                          </Paragraph>
                        </Tooltip>
                      ),
                      title: intl.formatMessage({
                        defaultMessage: 'Name',
                      }),
                    },
                    {
                      dataIndex: 'sku',
                      key: 'sku',
                      title: intl.formatMessage({
                        defaultMessage: 'SKU',
                      }),
                    },
                    {
                      dataIndex: 'value',
                      key: 'value',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency,
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Item Value',
                      }),
                    },
                    {
                      dataIndex: 'quantity',
                      key: 'quantity',
                      title: intl.formatMessage({
                        defaultMessage: 'Quantity',
                      }),
                    },
                    {
                      dataIndex: 'recoveredQuantity',
                      key: 'recoveredQuantity',
                      title: intl.formatMessage({
                        defaultMessage: 'Recovered',
                      }),
                    },
                    {
                      dataIndex: 'itemTotal',
                      key: 'itemTotal',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency,
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Item Total',
                      }),
                    },
                  ]
            }
            dataSource={data?.incident?.incidentItems.map((item) => ({
              item,
              itemTotal:
                goodsMode === GoodsMode.Generic
                  ? (item.value ?? 0) - (item.recoveredQuantity ?? 0)
                  : (item.value ?? 0) * (item.quantity ?? 0) -
                    (item.value ?? 0) * (item.recoveredQuantity ?? 0),
              key: item.id ?? '',
              name: item.name ?? '',
              quantity: item.quantity ?? 0,
              recoveredQuantity: item.recoveredQuantity ?? 0,
              recoveredValue: item.recoveredValue ?? 0,
              sku: item.sku ?? '',
              value: item.value ?? 0,
            }))}
            pagination={{
              hideOnSinglePage: true,
              pageSize: 100,
            }}
            size="small"
            // TODO
            // eslint-disable-next-line react/no-unstable-nested-components
            summary={(tableData) => {
              const value = tableData
                .map((item) => item.value || 0)
                .reduce((a, b) => a + b, 0);
              const totalRecoveredValue = tableData
                .map((item) => item.recoveredValue || 0)
                .reduce((a, b) => a + b, 0);
              const totalQnty = tableData
                .map((item) => item.quantity || 0)
                .reduce((a, b) => a + b, 0);
              const totalRecoveredQnty = tableData
                .map((item) => item.recoveredQuantity || 0)
                .reduce((a, b) => a + b, 0);
              const totalValue = tableData
                .map((item) => item.itemTotal || 0)
                .reduce((a, b) => a + b, 0);

              return goodsMode === GoodsMode.Generic ? (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Totals: ',
                    })}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    {intl.formatNumber(value, {
                      currency,
                      style: 'currency',
                    })}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    {intl.formatNumber(totalRecoveredValue, {
                      currency,
                      style: 'currency',
                    })}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    {intl.formatNumber(totalValue, {
                      currency,
                      style: 'currency',
                    })}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} />
                </Table.Summary.Row>
              ) : (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} />
                  <Table.Summary.Cell index={1} />
                  <Table.Summary.Cell index={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Total: ',
                    })}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>{totalQnty}</Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    {totalRecoveredQnty}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    {intl.formatNumber(totalValue, {
                      currency,
                      style: 'currency',
                    })}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No items for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        onClose={toggleAddGoods}
        open={addGoods}
        title={intl.formatMessage({
          defaultMessage: 'Add New Item',
        })}
        width="1000"
        zIndex={999}
      >
        {addGoods ? (
          <AddGoods onClose={toggleAddGoods} update={onAddGoods} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditGoodsData(null)}
        open={!!editGoodsData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Item',
        })}
        width="400"
        zIndex={999}
      >
        {editGoodsData ? (
          <EditGoods
            data={editGoodsData}
            onClose={() => setEditGoodsData(null)}
            saving={saving}
            update={onEditGoods}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Items;
