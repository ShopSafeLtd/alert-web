/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  Button,
  Col,
  Drawer,
  Input,
  Modal,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import AddBrand from '#/components/form-components/brands/AddBrand';
import type { MutationUpdaterFn } from '@apollo/client';
import EditBrand from '#/components/form-components/brands/EditBrand';
import { Link } from 'react-router-dom';
import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/upsert-brand.generated';

const { confirm } = Modal;

interface Props {
  data:
    | {
        node: {
          id: string;
          name: string;
          description?: string | null;
          businesses: Array<{
            __typename?: 'Business';
            id: string;
            name: string;
          }>;
        };
      }[]
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addBrand: boolean;
  toggleAddBrand: () => void;
  saving: boolean;
  onDelete: (value: string) => void;
  updateNewBrandList: MutationUpdaterFn<UpsertBrandMutation>;
  brandId: string;
  setBrandId: (value: string) => void;
}

const BrandList = ({
  data,
  loading,
  search,
  setSearch,
  addBrand,
  toggleAddBrand,
  updateNewBrandList,
  saving,
  onDelete,
  brandId,
  setBrandId,
}: Props): JSX.Element => {
  const intl = useIntl();
  const businessIds = new Set(
    data?.flatMap(({ node: el }) => el.businesses.map(({ id }) => id))
  );
  const businessData = data?.flatMap(({ node: el }) => ({
    text: el?.name || '',
    value: el?.id || '',
  }));
  const businessFilter = [...businessIds]
    .map((id) => businessData?.find(({ value: el }) => el === id))
    .map((el) => ({ text: el?.text || '', value: el?.value || '' }));

  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Brands...',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type="primary"
            onClick={toggleAddBrand}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Add Brand" />
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        style={{ marginRight: 10 }}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            dataIndex: 'name',
            width: 200,
            // render: (value, record) => (
            //   <Typography.Link
            //     disabled={saving}
            //     onClick={() => {
            //       setBrandId(record.key);
            //     }}
            //   >
            //     {value}
            //   </Typography.Link>
            // ),
          },
          {
            key: 'businesses',
            title: intl.formatMessage({
              defaultMessage: 'Businesses',
            }),
            dataIndex: 'businesses',
            filters: businessFilter,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onFilter: (
              value: string | number | boolean,
              record: { businesses: { id: string; name: string }[] }
            ) => record.businesses.some(({ id }) => id === value),
            render: (value: { id: string; name: string }[]) =>
              value.map(({ id, name }, index) => (
                <Link to={`/app/scheme-settings/businesses/view/${id || ''}`}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <Tag color="red"> {index === 0 ? name : ` ${name}`}</Tag>
                </Link>
              )),
          },
          {
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
            dataIndex: 'description',
            ellipsis: true,
          },

          {
            key: 'Options',
            title: '',
            dataIndex: 'Options',
            width: 100,
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Brand',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setBrandId(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Brand',
                    })}
                  >
                    {/* <Popconfirm
                      overlayInnerStyle={{ padding: 10 }}
                      title={intl.formatMessage({
                        defaultMessage:
                          'Are you sure you want to delete this brand?',
                        id: 'bYLZFu',
                      })}
                      onConfirm={() => onDelete(record.key)}
                    > */}
                    <Button
                      size="small"
                      disabled={saving}
                      // onClick={() => {
                      //   onDelete(record.key);
                      // }}
                      onClick={() =>
                        confirm({
                          title: intl.formatMessage({
                            defaultMessage:
                              'Do you want to delete this business?',
                          }),
                          content: intl.formatMessage({
                            defaultMessage:
                              'Click delete if you wish to delete this brand. It will be removed from the list and added to the recycle bin for 30 days before being permanently deleted.',
                          }),
                          okText: intl.formatMessage({
                            defaultMessage: 'Delete',
                          }),
                          onOk: () => onDelete(record.key),
                        })
                      }
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                    {/* </Popconfirm> */}
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={data?.map(({ node: brand }) => ({
          key: brand.id || '',
          name: brand.name || '',
          description: brand.description || '',
          businesses: brand.businesses,
        }))}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Brand',
        })}
        open={addBrand}
        width="400"
        onClose={toggleAddBrand}
      >
        {addBrand ? (
          <AddBrand update={updateNewBrandList} onClose={toggleAddBrand} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Brand',
        })}
        open={!!brandId}
        width="400"
        onClose={() => setBrandId('')}
      >
        <EditBrand brandId={brandId} onClose={() => setBrandId('')} />
      </Drawer>
    </div>
  );
};

export default BrandList;
