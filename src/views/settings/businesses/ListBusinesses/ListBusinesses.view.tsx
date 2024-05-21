import React from 'react';
import type { BusinessesListQuery } from 'graphql/generated';
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
import { Link } from 'react-router-dom';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import LinkBusiness from 'components/form-components/businesses/LinkBusiness';
import type { BusinessData } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FilterLabels } from '#/views/settings/businesses/ListBusinesses/useListBusinesses';
import DebouncedInput from '#/utils/debounced-input';
import useStyles from './ListBusinesses.styles';

interface TableData {
  key: string;
  name: string;
  totalUsers: number;
  parent?: string;
  parentId?: string;
  location: string;
}

interface Props {
  data: BusinessesListQuery | undefined;
  loading: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addVisible: boolean;
  toggleAddVisible: () => void;
  linkVisible: boolean;
  toggleLinkVisible: () => void;
  onSubmit: (value: BusinessData) => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  pagination: { page: number; pageSize: number };
  setPagination: (value: { page: number; pageSize: number }) => void;
  parentFilter: string[];
  parentData: FilterLabels[];
  setParentFilter: (value: string[]) => void;
  groupFilter: string[];
  groupData: FilterLabels[];
  setGroupFilter: (value: string[]) => void;
  tagFilter: string[];
  tags: FilterLabels[];
  setTagFilter: (value: string[]) => void;
}

const ListBusinesses = ({
  data,
  loading,
  onSearchChange,
  searchValue,
  addVisible,
  toggleAddVisible,
  linkVisible,
  toggleLinkVisible,
  onSubmit,
  saving,
  deleteConfirm,
  groupData,
  parentData,
  parentFilter,
  setParentFilter,
  setGroupFilter,
  groupFilter,
  tagFilter,
  setTagFilter,
  tags,
  pagination,
  setPagination,
}: Props) => {
  const classNames = useStyles();
  const intl = useIntl();

  const resetPage = () => {
    if (pagination.page !== 1)
      setPagination({ page: 1, pageSize: pagination.pageSize });
  };

  return (
    <div className={classNames.page}>
      <Row gutter={8} className={classNames.actions}>
        <Col span={19} />
        <Col
          span={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 5,
          }}
        >
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Link Existing Business',
              id: '50iYmp',
            })}
          >
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              danger
              onClick={toggleLinkVisible}
            >
              {intl.formatMessage({
                defaultMessage: 'Existing',
                id: 'LHF3Za',
              })}
            </Button>
          </Tooltip>

          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Add New Business',
              id: 'p47asT',
            })}
          >
            <Button
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
              }}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              danger
              onClick={toggleAddVisible}
            >
              {intl.formatMessage({
                defaultMessage: 'New',
                id: 'bW7B87',
              })}
            </Button>
          </Tooltip>
        </Col>

        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Search',
              id: 'xmcVZ0',
            })}
          </Tag>
          <DebouncedInput
            size="small"
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a business...',
              id: 'qaJxSS',
            })}
            allowClear
            defaultValue={searchValue || ''}
            onChange={(e) => {
              resetPage();
              onSearchChange(e.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Select Parent',
              id: '5hxiFS',
            })}
          </Tag>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Parent',
              id: '5hxiFS',
            })}
            value={parentFilter}
            onChange={(value: string[]) => {
              resetPage();

              setParentFilter(value);
            }}
            maxTagCount={4}
            options={parentData}
            optionFilterProp="label"
            allowClear
          />
        </Col>
        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Select Group',
              id: 'UHsAfL',
            })}
          </Tag>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Group',
              id: 'UHsAfL',
            })}
            value={groupFilter}
            maxTagCount={4}
            onChange={(value: string[]) => {
              resetPage();

              setGroupFilter(value);
            }}
            options={groupData}
            optionFilterProp="label"
            allowClear
          />
        </Col>
        <Col span={6}>
          <Tag color="red">
            {intl.formatMessage({
              defaultMessage: 'Select Tag',
              id: 'npEBoK',
            })}
          </Tag>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Tag',
              id: 'npEBoK',
            })}
            maxTagCount={4}
            value={tagFilter}
            onChange={(value: string[]) => {
              resetPage();

              setTagFilter(value);
            }}
            options={tags}
            optionFilterProp="label"
            allowClear
          />
        </Col>
      </Row>
      <Table<TableData>
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'totalUsers',
            dataIndex: 'totalUsers',
            title: intl.formatMessage({
              defaultMessage: 'Total Users',
              id: '/VwiLT',
            }),
          },
          {
            key: 'parent',
            dataIndex: 'parent',
            title: intl.formatMessage({
              defaultMessage: 'Parent',
              id: 'zTbLfn',
            }),
            render: (value, item) =>
              value ? <Link to={`/${item.parentId || ''}`}>{value}</Link> : '',
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: intl.formatMessage({
              defaultMessage: 'Location',
              id: 'rvirM2',
            }),
          },
          {
            key: 'tags',
            title: intl.formatMessage({
              defaultMessage: 'Tags',
              id: '1EYCdR',
            }),
            dataIndex: 'tags',
            // filters: tagFilter,
            render: (value: string[]) => (
              <Tag color="red">
                {value
                  .map((tag, index) => (index === 0 ? tag : ` ${tag}`))
                  .toString()}
              </Tag>
            ),
          },
          {
            key: 'groups',
            title: intl.formatMessage({
              defaultMessage: 'Content Groups',
              id: '3lRewT',
            }),
            dataIndex: 'groups',
            render: (value: { id: string; name: string }[]) => (
              <Typography.Text>
                {value
                  .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                  .toString()}
              </Typography.Text>
            ),
          },
          {
            key: 'Options',
            dataIndex: 'Options',
            width: 60,
            render: (_, record) => (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Remove Business',
                  id: 'fDBTeJ',
                })}
              >
                <Button
                  size="small"
                  disabled={saving}
                  onClick={() => {
                    deleteConfirm(record.key);
                  }}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                />
              </Tooltip>
            ),
          },
        ]}
        dataSource={data?.businessRelay.edges.map(({ node: item }) => ({
          key: item.id,
          name: item.name,
          totalUsers: item.totalUsers,
          parent: item.parent?.name,
          parentId: item.parent?.id,
          location: item.locations[0]?.full || '',
          groups: item.groups,
          tags: item.tags.map(({ name }) => name),
        }))}
        loading={loading}
        size="small"
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.page,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
          },
          total: data?.businessRelay.totalCount,
        }}
      />

      <Drawer
        open={addVisible}
        onClose={toggleAddVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
          id: 'p47asT',
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
        open={linkVisible}
        onClose={toggleLinkVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
          id: 'p47asT',
        })}
        width={600}
      >
        {linkVisible && <LinkBusiness onClose={toggleLinkVisible} />}
      </Drawer>
    </div>
  );
};

export default ListBusinesses;
