/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/upsert-brand.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import AddBrand from '#/components/form-components/brands/AddBrand';
import EditBrand from '#/components/form-components/brands/EditBrand';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const { confirm } = Modal;

interface Props {
  addBrand: boolean;
  brandId: string;
  data:
    | {
        node: {
          businesses: {
            __typename?: 'Business';
            id: string;
            name: string;
          }[];
          description?: null | string;
          id: string;
          name: string;
        };
      }[]
    | null
    | undefined;
  loading: boolean;
  onDelete: (value: string) => void;
  saving: boolean;
  search: string;
  setBrandId: (value: string) => void;
  setSearch: (value: string) => void;
  toggleAddBrand: () => void;
  updateNewBrandList: MutationUpdaterFn<UpsertBrandMutation>;
}

const BrandList = ({
  addBrand,
  brandId,
  data,
  loading,
  onDelete,
  saving,
  search,
  setBrandId,
  setSearch,
  toggleAddBrand,
  updateNewBrandList,
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
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Brands...',
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
            onClick={toggleAddBrand}
            type="primary"
          >
            <FormattedMessage defaultMessage="Add Brand" />
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
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
            dataIndex: 'businesses',
            filters: businessFilter,
            key: 'businesses',
            // @ts-ignore
            onFilter: (
              value: boolean | number | string,
              record: { businesses: { id: string; name: string }[] }
            ) => record.businesses.some(({ id }) => id === value),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            render: (value: { id: string; name: string }[]) =>
              value.map(({ id, name }, index) => (
                <Link to={`/app/scheme-settings/businesses/view/${id || ''}`}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <Tag color="red"> {index === 0 ? name : ` ${name}`}</Tag>
                </Link>
              )),
            title: intl.formatMessage({
              defaultMessage: 'Businesses',
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
            dataIndex: 'Options',
            key: 'Options',
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Brand',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setBrandId(record.key);
                      }}
                      size="small"
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
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      // onClick={() => {
                      //   onDelete(record.key);
                      // }}
                      onClick={() =>
                        confirm({
                          content: intl.formatMessage({
                            defaultMessage:
                              'Click delete if you wish to delete this brand. It will be removed from the list and added to the recycle bin for 30 days before being permanently deleted.',
                          }),
                          okText: intl.formatMessage({
                            defaultMessage: 'Delete',
                          }),
                          onOk: () => onDelete(record.key),
                          title: intl.formatMessage({
                            defaultMessage:
                              'Do you want to delete this business?',
                          }),
                        })
                      }
                      size="small"
                    />
                    {/* </Popconfirm> */}
                  </Tooltip>
                </Col>
              </Row>
            ),
            title: '',
            width: 100,
          },
        ]}
        dataSource={data?.map(({ node: brand }) => ({
          businesses: brand.businesses,
          description: brand.description || '',
          key: brand.id || '',
          name: brand.name || '',
        }))}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
        style={{ marginRight: 10 }}
      />

      <Drawer
        onClose={toggleAddBrand}
        open={addBrand}
        title={intl.formatMessage({
          defaultMessage: 'Add Brand',
        })}
        width="400"
      >
        {addBrand ? (
          <AddBrand onClose={toggleAddBrand} update={updateNewBrandList} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setBrandId('')}
        open={!!brandId}
        title={intl.formatMessage({
          defaultMessage: 'Edit Brand',
        })}
        width="400"
      >
        <EditBrand brandId={brandId} onClose={() => setBrandId('')} />
      </Drawer>
    </div>
  );
};

export default BrandList;
