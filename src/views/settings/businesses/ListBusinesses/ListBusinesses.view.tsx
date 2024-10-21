import type { BusinessesListQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import type { FilterLabels } from '#/views/settings/businesses/ListBusinesses/useListBusinesses';
import type { BusinessData } from 'types/DataType';

import DebouncedInput from '#/utils/debounced-input';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import LinkBusiness from 'components/form-components/businesses/LinkBusiness';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './ListBusinesses.styles';

interface TableData {
  key: string;
  location: string;
  name: string;
  parent?: string;
  parentId?: string;
  totalUsers: number;
}

interface Props {
  addVisible: boolean;
  data: BusinessesListQuery | undefined;
  deleteConfirm: (value: string) => void;
  groupData: FilterLabels[];
  groupFilter: string[];
  linkVisible: boolean;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onSubmit: (value: BusinessData) => void;
  onUpdateLinkBusiness: (value: string) => void;
  pagination: { page: number; pageSize: number };
  parentData: FilterLabels[];
  parentFilter: string[];
  saving: boolean;
  searchValue: string;
  setGroupFilter: (value: string[]) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setParentFilter: (value: string[]) => void;
  setTagFilter: (value: string[]) => void;
  tagFilter: string[];
  tags: FilterLabels[];
  toggleAddVisible: () => void;
  toggleLinkVisible: () => void;
}

const ListBusinesses = ({
  addVisible,
  data,
  deleteConfirm,
  groupData,
  groupFilter,
  linkVisible,
  loading,
  onSearchChange,
  onSubmit,
  onUpdateLinkBusiness,
  pagination,
  parentData,
  parentFilter,
  saving,
  searchValue,
  setGroupFilter,
  setPagination,
  setParentFilter,
  setTagFilter,
  tagFilter,
  tags,
  toggleAddVisible,
  toggleLinkVisible,
}: Props) => {
  const classNames = useStyles();
  const intl = useIntl();

  const resetPage = () => {
    if (pagination.page !== 1)
      setPagination({ page: 1, pageSize: pagination.pageSize });
  };

  return (
    <div className={classNames.page}>
      <Row className={classNames.actions} gutter={8}>
        <Col span={19} />
        <Col
          span={4}
          style={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 5,
          }}
        >
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Link Existing Business',
            })}
          >
            <Button
              danger
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleLinkVisible}
              style={{
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'Existing',
              })}
            </Button>
          </Tooltip>

          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Add New Business',
            })}
          >
            <Button
              danger
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleAddVisible}
              style={{
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'New',
              })}
            </Button>
          </Tooltip>
        </Col>

        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Search',
            })}
          </Tag>
          <DebouncedInput
            allowClear
            defaultValue={searchValue || ''}
            onChange={(e) => {
              resetPage();
              onSearchChange(e.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a business...',
            })}
            size="small"
          />
        </Col>
        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Select Parent',
            })}
          </Tag>
          <Select
            allowClear
            maxTagCount={4}
            mode="multiple"
            onChange={(value: string[]) => {
              resetPage();

              setParentFilter(value);
            }}
            optionFilterProp="label"
            options={parentData}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Parent',
            })}
            style={{ width: '100%' }}
            value={parentFilter}
          />
        </Col>
        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Select Group',
            })}
          </Tag>
          <Select
            allowClear
            maxTagCount={4}
            mode="multiple"
            onChange={(value: string[]) => {
              resetPage();

              setGroupFilter(value);
            }}
            optionFilterProp="label"
            options={groupData}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Group',
            })}
            style={{ width: '100%' }}
            value={groupFilter}
          />
        </Col>
        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Select Tag',
            })}
          </Tag>
          <Select
            allowClear
            maxTagCount={4}
            mode="multiple"
            onChange={(value: string[]) => {
              resetPage();

              setTagFilter(value);
            }}
            optionFilterProp="label"
            options={tags}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Tag',
            })}
            style={{ width: '100%' }}
            value={tagFilter}
          />
        </Col>
      </Row>
      <Table<TableData>
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
          },
          {
            dataIndex: 'totalUsers',
            key: 'totalUsers',
            title: intl.formatMessage({
              defaultMessage: 'Total Users',
            }),
          },
          {
            dataIndex: 'parent',
            key: 'parent',
            render: (value, item) =>
              value ? <Link to={`/${item.parentId || ''}`}>{value}</Link> : '',
            title: intl.formatMessage({
              defaultMessage: 'Parent',
            }),
          },
          {
            dataIndex: 'location',
            key: 'location',
            title: intl.formatMessage({
              defaultMessage: 'Location',
            }),
          },
          {
            dataIndex: 'tags',
            key: 'tags',
            // filters: tagFilter,
            render: (value: string[]) => (
              <Tag color="red">
                {value
                  .map((tag, index) => (index === 0 ? tag : ` ${tag}`))
                  .toString()}
              </Tag>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Tags',
            }),
          },
          {
            dataIndex: 'groups',
            key: 'groups',
            render: (value: { id: string; name: string }[]) => (
              <Typography.Text>
                {value
                  .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                  .toString()}
              </Typography.Text>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Content Groups',
            }),
          },
          {
            dataIndex: 'Options',
            key: 'Options',
            render: (_, record) => (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Remove Business',
                })}
              >
                <Button
                  disabled={saving}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                  onClick={() => {
                    deleteConfirm(record.key);
                  }}
                  size="small"
                />
              </Tooltip>
            ),
            width: 60,
          },
        ]}
        dataSource={data?.businessRelay.edges.map(({ node: item }) => ({
          groups: item.groups,
          key: item.id,
          location: item.locations[0]?.full || '',
          name: item.name,
          parent: item.parent?.name,
          parentId: item.parent?.id,
          tags: item.tags.map(({ name }) => name),
          totalUsers: item.totalUsers,
        }))}
        loading={loading}
        pagination={{
          current: pagination.page,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
          },
          pageSize: pagination.pageSize,
          total: data?.businessRelay.totalCount,
        }}
        size="small"
      />

      <Drawer
        onClose={toggleAddVisible}
        open={addVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
        })}
        width={600}
      >
        {addVisible && (
          <AddBusiness
            onClose={toggleAddVisible}
            saving={saving}
            update={onSubmit}
          />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkVisible}
        open={linkVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
        })}
        width={600}
      >
        {linkVisible && (
          <LinkBusiness
            onClose={toggleLinkVisible}
            saving={saving}
            update={onUpdateLinkBusiness}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ListBusinesses;
