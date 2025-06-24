import type { SingleShoeFragment } from 'graphql/fragments/__generated__/shoe.generated';

import { getShoeSide, getShoeType } from '#/types/enums/shoe';
import { faEye, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import ViewShoe from './ViewShoe.modal';
import useSingleShoesList from './useSingleShoesList';

const MatchedShoesList = (): JSX.Element => {
  const intl = useIntl();
  const [viewData, setViewData] = useState<SingleShoeFragment | undefined>(
    undefined
  );
  const { matchedShoesData, matchedShoesLoading, onDelete } =
    useSingleShoesList();

  return (
    <div className="list-view">
      {/* <Row gutter={8} style={{ marginBottom: 10 }}>
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
        <Col>
          <Link to={`/app/singleShoeSystem`}>
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faEye}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              {intl.formatMessage({
                defaultMessage: 'View All',
              })}
            </Button>
          </Link>
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
      </Row> */}

      <Card
        title={
          <Row gutter={8} style={{ marginBottom: 10 }}>
            <Col flex={1}>
              <Typography.Title level={3} style={{ marginBottom: 15 }}>
                {intl.formatMessage(
                  {
                    defaultMessage: 'Successfully Matched: {total}',
                  },
                  { total: matchedShoesData?.totalCount || 0 }
                )}
              </Typography.Title>
            </Col>
            <Col>
              <Link to={`/app/singleShoeSystem`}>
                <Button
                  icon={
                    <FontAwesomeIcon
                      icon={faEye}
                      size="lg"
                      style={{ marginRight: 5 }}
                    />
                  }
                >
                  {intl.formatMessage({
                    defaultMessage: 'View All Shoes',
                  })}
                </Button>
              </Link>
            </Col>
          </Row>
        }
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
                          // disabled={saving}
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
          dataSource={matchedShoesData?.edges.map(({ node }) => ({
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
          loading={matchedShoesLoading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />
      </Card>

      {/* <Drawer
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
      </Drawer> */}

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

export default MatchedShoesList;
