import type { BusinessesListQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';

import { formatPoliceAreas } from '#/utils/formatPoliceAreas';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Form,
  Progress,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { PoliceForce } from 'graphql/types';
import React, { type Dispatch } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type {
  Action,
  ExportBusinessState,
  SelectOption,
} from './useExportBusinesses';

import Page from '../../../components/shared-components/AntD/Page/Page';

interface TableData {
  key: string;
  location: string;
  name: string;
  parent?: string;
  parentId?: string;
  totalUsers: number;
}

interface Props {
  data: BusinessesListQuery | undefined;
  dispatch: Dispatch<Action>;
  filtersOpen: boolean;
  getZip: () => void;
  groupData: SelectOption[];
  groupFilter: string[];
  loading: boolean;
  mutationLoading: boolean;
  parentData: SelectOption[];
  parentFilter: string[];
  policeAreas: PoliceForce[];
  setGroupFilter: (filter: string[]) => void;
  setParentFilter: (filter: string[]) => void;
  setPoliceAreas: (areas: PoliceForce[]) => void;
  setTagFilter: (filter: string[]) => void;
  state: ExportBusinessState;
  tagFilter: string[];
  tags: SelectOption[];
  toggleFiltersOpen: () => void;
}

const convertToReadable = (value: null | string): string => {
  if (!value) return '';

  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const ExportBusinessesView = ({
  data,
  dispatch: _,
  filtersOpen,
  getZip,
  groupData,
  groupFilter,
  loading,
  mutationLoading,
  parentData,
  parentFilter,
  policeAreas,
  setGroupFilter,
  setParentFilter,
  setPoliceAreas,
  setTagFilter,
  state,
  tagFilter,
  tags,
  toggleFiltersOpen,
}: Props) => {
  const intl = useIntl();

  return (
    <div style={{ marginLeft: 15 }}>
      <Page>
        <Typography.Title level={3}>
          <FormattedMessage defaultMessage="Export Data" />
        </Typography.Title>
        <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
          <Col flex={1} />
          <Col
            style={{
              marginBottom: 5,
            }}
          >
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Filter Businesses',
              })}
            >
              <Button
                icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
                onClick={toggleFiltersOpen}
              />
            </Tooltip>
          </Col>
          <Col>
            <Button
              disabled={mutationLoading}
              loading={mutationLoading}
              onClick={getZip}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Export Data',
              })}
            </Button>
          </Col>
        </Row>
        <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
          <Col span={2}>
            <Typography.Text>
              {intl.formatMessage(
                {
                  defaultMessage: 'Total Businesses: {count}',
                },
                {
                  count: data?.businessRelay.totalCount || 0,
                }
              )}
            </Typography.Text>
          </Col>
          <Col span={14} />
          <Col flex={1}>
            {state.progress > 0 && (
              <Progress percent={state.progress} size="small" />
            )}
          </Col>
          <Col>
            {state.zipFile && (
              <a download href={state.zipFile}>
                {intl.formatMessage({
                  defaultMessage: 'Download Zip',
                })}
              </a>
            )}
          </Col>
        </Row>
        <Table<TableData>
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
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
                value ? (
                  <Link to={`/${item.parentId || ''}`}>{value}</Link>
                ) : (
                  ''
                ),
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
              dataIndex: 'policeArea',
              key: 'policeArea',
              title: intl.formatMessage({
                defaultMessage: 'Police Area',
              }),
            },
          ]}
          dataSource={data?.businessRelay.edges.map(({ node: item }) => ({
            groups: item.groups,
            key: item.id,
            location: item.locations[0]?.full || '',
            name: item.name,
            parent: item.parent?.name,
            parentId: item.parent?.id,
            policeArea: formatPoliceAreas(item.policeArea),
            tags: item.tags.map(({ name }) => name),
            totalUsers: item.totalUsers,
          }))}
          loading={loading}
          pagination={{
            total: data?.businessRelay.totalCount,
          }}
          size="small"
        />
      </Page>

      <Drawer
        onClose={toggleFiltersOpen}
        title={intl.formatMessage({ defaultMessage: 'Filter Businesses' })}
        visible={filtersOpen}
        width={600}
      >
        <Form layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Parent Business',
                })}
              >
                <Select
                  allowClear
                  maxTagCount={4}
                  mode="multiple"
                  onChange={(value: string[]) => {
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
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Group' })}
              >
                <Select
                  allowClear
                  maxTagCount={4}
                  mode="multiple"
                  onChange={(value: string[]) => {
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
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={intl.formatMessage({ defaultMessage: 'Tags' })}>
                <Select
                  allowClear
                  maxTagCount={4}
                  mode="multiple"
                  onChange={(value: string[]) => {
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
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Police Areas',
                })}
              >
                <Select
                  allowClear
                  maxTagCount={4}
                  mode="multiple"
                  onChange={(value: PoliceForce[]) => {
                    setPoliceAreas(value);
                  }}
                  optionFilterProp="label"
                  options={Object.values(PoliceForce).map((area) => ({
                    label: convertToReadable(area),
                    value: area,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Police Area',
                  })}
                  style={{ width: '100%' }}
                  value={policeAreas}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default ExportBusinessesView;
