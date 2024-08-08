import type { UpsertShoeMutation } from '#/views/singleShoe/graphql/mutations/__generated__/upsert-shoe.generated';
import type { ShoesQuery } from '#/views/singleShoe/graphql/queries/__generated__/shoes.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SingleShoeFragment } from 'graphql/fragments/__generated__/shoe.generated';

import AddEditShoe from '#/components/form-components/shoe/AddShoe/AddShoe.container';
import { ShoeSide } from '#/graphql/types';
import { getShoeSide, getShoeType } from '#/types/enums/shoe';
import {
  faEye,
  faPenToSquare,
  faPersonCarryBox,
  faPlus,
  faTrash,
  faTruckFast,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Popconfirm,
  Row,
  Table,
  Tooltip,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ViewShoe from './ViewShoe.modal';

interface Props {
  addShoe: boolean;
  awaitingMatchShoesData: NonNullable<ShoesQuery['shoes']> | null | undefined;
  awaitingMatchShoesLoading: boolean;
  awaitingShippingShoesData:
    | NonNullable<ShoesQuery['shoes']>
    | null
    | undefined;
  awaitingShippingShoesLoading: boolean;
  onDelete: (value: string) => void;
  onReceivedShoe: (value: string) => void;
  onShippedShoe: (value: string) => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  setShoeId: (value: string) => void;
  setViewData: (value: SingleShoeFragment | undefined) => void;
  shippedShoesData: NonNullable<ShoesQuery['shoes']> | null | undefined;
  shippedShoesLoading: boolean;
  shoeId: string;
  toggleAddShoe: () => void;
  updateNewShoeList: MutationUpdaterFn<UpsertShoeMutation>;
  viewData: SingleShoeFragment | undefined;
}

const SingleShoesList = ({
  addShoe,
  awaitingMatchShoesData,
  awaitingMatchShoesLoading,
  awaitingShippingShoesData,
  awaitingShippingShoesLoading,
  onDelete,
  onReceivedShoe,
  onShippedShoe,
  saving,
  search,
  setSearch,
  setShoeId,
  setViewData,
  shippedShoesData,
  shippedShoesLoading,
  shoeId,
  toggleAddShoe,
  updateNewShoeList,
  viewData,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Shoes...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddShoe}
            type="primary"
          >
            <FormattedMessage defaultMessage="Match Shoe" />
          </Button>
        </Col>
      </Row>
      <Card
        title={intl.formatMessage(
          {
            defaultMessage: 'Pending Match: {total}',
          },
          { total: awaitingMatchShoesData?.totalCount }
        )}
      >
        <Table
          columns={[
            {
              dataIndex: 'stockItem',
              ellipsis: true,
              key: 'stockItem',
              title: intl.formatMessage({
                defaultMessage: 'UPC',
              }),
            },
            {
              dataIndex: 'side',
              key: 'side',
              title: intl.formatMessage({
                defaultMessage: 'Side',
              }),
              width: 60,
            },
            {
              dataIndex: 'size',
              key: 'size',
              title: intl.formatMessage({
                defaultMessage: 'Size',
              }),
              width: 50,
            },
            {
              dataIndex: 'colour',
              key: 'colour',
              title: intl.formatMessage({
                defaultMessage: 'Clour',
              }),
            },
            {
              dataIndex: 'style',
              key: 'style',
              title: intl.formatMessage({
                defaultMessage: 'Style',
              }),
            },

            {
              dataIndex: 'type',
              ellipsis: true,
              key: 'type',
              title: intl.formatMessage({
                defaultMessage: 'Type',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'box',
              key: 'box',
              title: intl.formatMessage({
                defaultMessage: 'Box',
              }),
              width: 40,
            },
            {
              dataIndex: 'retailPrice',
              key: 'retailPrice',
              title: intl.formatMessage({
                defaultMessage: 'Retail Price',
              }),
              width: 90,
            },
            {
              dataIndex: 'business',
              ellipsis: true,
              key: 'business',
              title: intl.formatMessage({
                defaultMessage: 'Store',
              }),
              width: 300,
            },
            {
              dataIndex: 'Options',
              key: 'Options',

              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'View More Details',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        onClick={() => {
                          setViewData(record.shoe);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit Shoe Details',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                        onClick={() => {
                          setShoeId(record.key);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Shoe',
                      })}
                    >
                      <Popconfirm
                        onConfirm={() => onDelete(record.key)}
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage: 'Remove this shoe?',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faTrash} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </Row>
              ),
              title: '',
              width: 140,
            },
          ]}
          dataSource={awaitingMatchShoesData?.edges.map(({ node }) => ({
            box: node.box
              ? intl.formatMessage({
                  defaultMessage: 'Yes',
                })
              : intl.formatMessage({
                  defaultMessage: 'No',
                }),
            business: `${node.business.name}, ${node.business.locations[0].full}`,
            colour: node.colour,
            description: node.description,
            key: node.id,
            retailPrice: node.retailPrice,
            shoe: node,
            side:
              node.side === ShoeSide.Left
                ? intl.formatMessage({
                    defaultMessage: 'Left',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Right',
                  }),
            size: node.size,
            stockItem: node.stockItem.sku,
            style: node.style,
            type: getShoeType(node.type),
          }))}
          loading={awaitingMatchShoesLoading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />
      </Card>
      <Card
        title={intl.formatMessage(
          {
            defaultMessage: 'Pending Shipping: {total}',
          },
          { total: awaitingShippingShoesData?.totalCount }
        )}
      >
        <Table
          columns={[
            {
              dataIndex: 'stockItem',
              ellipsis: true,
              key: 'stockItem',
              title: intl.formatMessage({
                defaultMessage: 'UPC',
              }),
            },
            {
              dataIndex: 'side',
              key: 'side',
              title: intl.formatMessage({
                defaultMessage: 'Side',
              }),
              width: 60,
            },
            {
              dataIndex: 'size',
              key: 'size',
              title: intl.formatMessage({
                defaultMessage: 'Size',
              }),
              width: 50,
            },
            {
              dataIndex: 'colour',
              key: 'colour',
              title: intl.formatMessage({
                defaultMessage: 'Clour',
              }),
            },
            {
              dataIndex: 'style',
              key: 'style',
              title: intl.formatMessage({
                defaultMessage: 'Style',
              }),
            },

            {
              dataIndex: 'type',
              ellipsis: true,
              key: 'type',
              title: intl.formatMessage({
                defaultMessage: 'Type',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'box',
              key: 'box',
              title: intl.formatMessage({
                defaultMessage: 'Box',
              }),
              width: 40,
            },
            {
              dataIndex: 'retailPrice',
              key: 'retailPrice',
              title: intl.formatMessage({
                defaultMessage: 'Retail Price',
              }),
              width: 90,
            },
            {
              dataIndex: 'business',
              ellipsis: true,
              key: 'business',
              title: intl.formatMessage({
                defaultMessage: 'Store',
              }),
              width: 300,
            },
            {
              dataIndex: 'Options',
              key: 'Options',

              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'View More Details',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        onClick={() => {
                          setViewData(record.shoe);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Marked as Shipped',
                      })}
                    >
                      <Popconfirm
                        onConfirm={() => onShippedShoe(record.key)}
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage:
                            'Updated status of the shoe to shipped?',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faTruckFast} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Shoe',
                      })}
                    >
                      <Popconfirm
                        onConfirm={() => onDelete(record.key)}
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage:
                            'Do you want to delete this single shoe?',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faTrash} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </Row>
              ),
              title: '',
              width: 140,
            },
          ]}
          dataSource={awaitingShippingShoesData?.edges.map(({ node }) => ({
            box: node.box
              ? intl.formatMessage({
                  defaultMessage: 'Yes',
                })
              : intl.formatMessage({
                  defaultMessage: 'No',
                }),
            business: `${node.business.name}, ${node.business.locations[0].full}`,
            colour: node.colour,
            description: node.description,
            key: node.id,
            retailPrice: node.retailPrice,
            shoe: node,
            side: getShoeSide(node.side),
            size: node.size,
            stockItem: node.stockItem.sku,
            style: node.style,
            type: getShoeType(node.type),
          }))}
          loading={awaitingShippingShoesLoading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />
      </Card>
      <Card
        title={intl.formatMessage(
          {
            defaultMessage: 'Pending Receipt: {total}',
          },
          { total: shippedShoesData?.totalCount }
        )}
      >
        <Table
          columns={[
            {
              dataIndex: 'stockItem',
              ellipsis: true,
              key: 'stockItem',
              title: intl.formatMessage({
                defaultMessage: 'UPC',
              }),
            },
            {
              dataIndex: 'side',
              key: 'side',
              title: intl.formatMessage({
                defaultMessage: 'Side',
              }),
              width: 60,
            },
            {
              dataIndex: 'size',
              key: 'size',
              title: intl.formatMessage({
                defaultMessage: 'Size',
              }),
              width: 50,
            },
            {
              dataIndex: 'colour',
              key: 'colour',
              title: intl.formatMessage({
                defaultMessage: 'Clour',
              }),
            },
            {
              dataIndex: 'style',
              key: 'style',
              title: intl.formatMessage({
                defaultMessage: 'Style',
              }),
            },

            {
              dataIndex: 'type',
              ellipsis: true,
              key: 'type',
              title: intl.formatMessage({
                defaultMessage: 'Type',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'box',
              key: 'box',
              title: intl.formatMessage({
                defaultMessage: 'Box',
              }),
              width: 40,
            },

            {
              dataIndex: 'retailPrice',
              key: 'retailPrice',
              title: intl.formatMessage({
                defaultMessage: 'Retail Price',
              }),
              width: 90,
            },
            {
              dataIndex: 'business',
              ellipsis: true,
              key: 'business',
              title: intl.formatMessage({
                defaultMessage: 'Store',
              }),
              width: 300,
            },
            {
              dataIndex: 'Options',
              key: 'Options',

              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'View More Details',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        onClick={() => {
                          setViewData(record.shoe);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Marked as Received',
                      })}
                    >
                      <Popconfirm
                        onConfirm={() => onReceivedShoe(record.key)}
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage:
                            'Updated status of the shoe to received?',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faPersonCarryBox} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Shoe',
                      })}
                    >
                      <Popconfirm
                        onConfirm={() => onDelete(record.key)}
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage:
                            'Do you want to delete this single shoe?',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faTrash} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </Row>
              ),
              title: '',
              width: 140,
            },
          ]}
          dataSource={shippedShoesData?.edges.map(({ node }) => ({
            box: node.box
              ? intl.formatMessage({
                  defaultMessage: 'Yes',
                })
              : intl.formatMessage({
                  defaultMessage: 'No',
                }),
            business: `${node.business.name}, ${node.business.locations[0].full}`,
            colour: node.colour,
            description: node.description,
            key: node.id,
            retailPrice: node.retailPrice,
            shoe: node,
            side:
              node.side === ShoeSide.Left
                ? intl.formatMessage({
                    defaultMessage: 'Left',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Right',
                  }),
            size: node.size,
            stockItem: node.stockItem.sku,
            style: node.style,
            type: getShoeType(node.type),
          }))}
          loading={shippedShoesLoading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />
      </Card>

      <Drawer
        onClose={toggleAddShoe}
        open={addShoe}
        title={intl.formatMessage({
          defaultMessage: 'Add Shoe',
        })}
        width="800"
      >
        {addShoe ? (
          <AddEditShoe onClose={toggleAddShoe} update={updateNewShoeList} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setShoeId('')}
        open={!!shoeId}
        title={intl.formatMessage({
          defaultMessage: 'Edit Shoe',
        })}
        width="800"
      >
        {shoeId ? (
          <AddEditShoe
            onClose={() => setShoeId('')}
            shoeId={shoeId}
            update={updateNewShoeList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {viewData && (
        <ViewShoe
          data={viewData}
          onClose={() => setViewData(undefined)}
          open={!!viewData}
        />
      )}
    </div>
  );
};

export default SingleShoesList;
