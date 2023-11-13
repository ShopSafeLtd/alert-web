import React from 'react';
import type { ListIncidentsAllSchemesQuery } from 'graphql/generated';
import { Row, Col, Input, Table, Button, Typography, Select } from 'antd';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import type { IncidentFilters } from 'state/data-model';
import useStyles from './SelectIncidents.styles';

const { Paragraph, Text } = Typography;

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        undefined | null
      >
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  variables: IncidentFilters;
  clearFilters: () => void;
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  setBusinessesFilter: (value: string[]) => void;
  businessesLoading: boolean;
  goodsLoading: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  setGroupsFilter: (value: string[]) => void;
  setPeculiarities: (value: string) => void;
  setCrimeTypesFilter: (value: string[]) => void;
}

const SelectIncidents = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  pagination,
  onPaginationChange,
  onSelect,
  setPeculiarities,
  setGroupsFilter,
  businesses,
  goods,
  setCrimeTypesFilter,
  setGoodsFilter,
  setBusinessesFilter,
  goodsLoading,
  businessesLoading,
  variables,
  groups,
  groupsLoading,
  crimeTypes,
  tagsLoading,
  clearFilters,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const {
    crimeTypes: crimeTypesFilter,
    groups: groupsFilter,
    businesses: businessesFilter,
    goods: goodsFilter,
    peculiarities,
  } = variables;
  return (
    <div>
      <Row gutter={16}>
        <Col span={19} className={classes.list}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Incidents...',
              id: 'gvqTQ8',
            })}
            allowClear
          />

          <Table
            columns={[
              {
                key: 'reference',
                dataIndex: 'reference',
                width: 65,
                title: intl.formatMessage({
                  defaultMessage: 'Alert ID',
                  id: 'k8ZNgH',
                }),
                render: (value, record) => (
                  <Link to={`/app/incidents/view/${record.incidentId}`}>
                    {value}
                  </Link>
                ),
              },
              {
                key: 'subject',
                dataIndex: 'subject',
                title: intl.formatMessage({
                  defaultMessage: 'Subject',
                  id: 'LLtKhp',
                }),
              },
              {
                key: 'date',
                dataIndex: 'date',
                title: intl.formatMessage({
                  defaultMessage: 'Date',
                  id: 'P7PLVj',
                }),
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
                key: 'offenders',
                dataIndex: 'offenders',
                title: intl.formatMessage({
                  defaultMessage: 'Offenders',
                  id: 'xb54TN',
                }),
              },
            ]}
            dataSource={data?.incidents.map((incident) => ({
              incidentId: incident.id,
              subject: incident.subject,
              reference: incident.reference,
              date: incident.dayTime,
              location: incident.business?.name || incident.location?.full,
              offenders: incident.offenders
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
                .toString(),
              key: incident.id,
            }))}
            rowSelection={{
              type: 'checkbox',
              onSelect,
            }}
            pagination={{
              hideOnSinglePage: true,
              total: data?.total,
              onChange: onPaginationChange,
              pageSize: pagination.pageSize,
              current: pagination.page,
              showSizeChanger: false,
              position: ['bottomCenter'],
            }}
            loading={loading}
            size="small"
          />
        </Col>
        <Col className={classes.filters} span={5}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters', id: 'zSOvI0' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
            </Text>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
              mode="multiple"
              className={classes.filterSelect}
              size="small"
              maxTagCount={2}
              allowClear
              loading={groupsLoading}
              onChange={setGroupsFilter}
              value={groupsFilter}
            >
              {groups.map((group) => (
                <Select.Option value={group.value}>{group.label}</Select.Option>
              ))}
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Crime Types',
                id: 'Piba4q',
              })}
            </Text>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Crime Types',
                id: 'Piba4q',
              })}
              mode="multiple"
              className={classes.filterSelect}
              size="small"
              maxTagCount={2}
              allowClear
              value={crimeTypesFilter}
              loading={tagsLoading}
              onChange={setCrimeTypesFilter}
            >
              {crimeTypes.map((tag) => (
                <Select.Option value={tag.value}>{tag.label}</Select.Option>
              ))}
            </Select>
          </div>

          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Goods Involved',
                id: 'oXvpCQ',
              })}
            </Text>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Goods Involved',
                id: 'oXvpCQ',
              })}
              mode="multiple"
              className={classes.filterSelect}
              size="small"
              allowClear
              maxTagCount={2}
              onChange={setGoodsFilter}
              value={goodsFilter}
              loading={goodsLoading}
            >
              {goods.map((good) => (
                <Select.Option value={good.value}>{good.label}</Select.Option>
              ))}
            </Select>
          </div>

          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Incident has happened at...',
                id: 'ZNawcf',
              })}
            </Text>
            <Select
              mode="multiple"
              className={classes.filterSelect}
              allowClear
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Businesses',
                id: 'MZynHZ',
              })}
              value={businessesFilter}
              onChange={setBusinessesFilter}
              loading={businessesLoading}
              optionLabelProp="textLabel"
              options={businesses.map((item) => ({
                textLabel: item.label,
                label: (
                  <div style={{ display: 'inline-block' }} key={item.value}>
                    <Typography.Text>{item.label}</Typography.Text>
                    <div>
                      <Typography.Text>{item.location}</Typography.Text>
                    </div>
                  </div>
                ),
                value: item.value,
              }))}
            />
          </div>

          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Peculiarities',
                id: '9s+ZmX',
              })}
            </Text>
            <Input.TextArea
              value={peculiarities}
              onChange={(e) => setPeculiarities(e.target.value)}
            />
          </div>
          <Row justify="end" className={classes.clearRow}>
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                  id: 'MsGXc3',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
        <Col>
          <Button onClick={onClose} disabled={saving} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
          </Button>
        </Col>
        <Col>
          <Button
            loading={saving}
            disabled={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Add Incidents',
              id: 'kKj7sq',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SelectIncidents;
