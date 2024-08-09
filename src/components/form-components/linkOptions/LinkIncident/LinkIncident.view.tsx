import type { ListIncidentsAllSchemesQuery } from 'graphql/incidents/queries/__generated__/list-incidents-all-schemes.generated';
import type { IncidentFilters } from 'state/data-model';

import { Button, Col, Input, Row, Select, Table, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './LinkIncident.styles';

const { Paragraph, Text } = Typography;

interface Props {
  businesses: { label: string; location: string; value: string }[];
  businessesLoading: boolean;
  clearFilters: () => void;
  crimeTypes: { label: string; value: string }[];
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        null | undefined
      >
    | null
    | undefined;
  goods: { label: string; value: string }[];
  goodsLoading: boolean;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  onClose: () => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  saving: boolean;
  search: string;
  setBusinessesFilter: (value: string[]) => void;
  setCrimeTypesFilter: (value: string[]) => void;
  setGoodsFilter: (value: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  tagsLoading: boolean;
  variables: IncidentFilters;
}

const LinkIncident = ({
  businesses,
  businessesLoading,
  clearFilters,
  crimeTypes,
  data,
  goods,
  goodsLoading,
  groups,
  groupsLoading,
  loading,
  onClose,
  onPaginationChange,
  onSelect,
  onSubmit,
  pagination,
  saving,
  search,
  setBusinessesFilter,
  setCrimeTypesFilter,
  setGoodsFilter,
  setGroupsFilter,
  setPeculiarities,
  setSearch,
  tagsLoading,
  variables,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const {
    businesses: businessesFilter,
    crimeTypes: crimeTypesFilter,
    goods: goodsFilter,
    groups: groupsFilter,
    peculiarities,
  } = variables;
  return (
    <div>
      <Row gutter={16}>
        <Col className={classes.list} span={19}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Incidents...',
            })}
            value={search}
          />

          <Table
            columns={[
              {
                dataIndex: 'reference',
                key: 'reference',
                render: (value, record) => (
                  <Link to={`/app/incidents/view/${record.incidentId}`}>
                    {value}
                  </Link>
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Alert ID',
                }),
                width: 65,
              },
              {
                dataIndex: 'subject',
                key: 'subject',
                title: intl.formatMessage({
                  defaultMessage: 'Subject',
                }),
              },
              {
                dataIndex: 'date',
                key: 'date',
                title: intl.formatMessage({
                  defaultMessage: 'Date',
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
                dataIndex: 'offenders',
                key: 'offenders',
                title: intl.formatMessage({
                  defaultMessage: 'Offenders',
                }),
              },
            ]}
            dataSource={data?.incidents.map((incident) => ({
              date: incident.dayTime,
              incidentId: incident.id,
              key: incident.id,
              location: incident.business?.name || incident.location?.full,
              offenders: incident.offenders
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
                .toString(),
              reference: incident.reference,
              subject: incident.subject,
            }))}
            loading={loading}
            pagination={{
              current: pagination.page,
              hideOnSinglePage: true,
              onChange: onPaginationChange,
              pageSize: pagination.pageSize,
              position: ['bottomCenter'],
              showSizeChanger: false,
              total: data?.total,
            }}
            rowSelection={{
              onSelect,
              type: 'radio',
            }}
            size="small"
          />
        </Col>
        <Col className={classes.filters} span={5}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={groupsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={setGroupsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              size="small"
              value={groupsFilter}
            >
              {groups.map((group) => (
                <Select.Option key={group.value} value={group.value}>
                  {group.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Incident Types',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={tagsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={setCrimeTypesFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Incident Types',
              })}
              size="small"
              value={crimeTypesFilter}
            >
              {crimeTypes.map((tag) => (
                <Select.Option key={tag.value} value={tag.value}>
                  {tag.label}
                </Select.Option>
              ))}
            </Select>
            {/* <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Crime Types',
                id: 'Piba4q',
              })}
              mode="multiple" className={classes.filterSelect}
              size="small"
              allowClear
              maxTagCount={2}
              onChange={setCrimeTypesFilter}
              value={crimeTypesFilter}
              loading={tagsLoading}
            >
              {crimeTypes.map((tag) => (
                <Select.Option value={tag.value}>{tag.label}</Select.Option>
              ))}
            </Select> */}
          </div>

          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Goods Involved',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={goodsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={setGoodsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Goods Involved',
              })}
              size="small"
              value={goodsFilter}
            >
              {goods.map((good) => (
                <Select.Option key={good.value} value={good.value}>
                  {good.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Incident has happened at...',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={businessesLoading}
              mode="multiple"
              onChange={setBusinessesFilter}
              optionLabelProp="textLabel"
              options={businesses.map((item) => ({
                label: (
                  <div key={item.value} style={{ display: 'inline-block' }}>
                    <Typography.Text>{item.label}</Typography.Text>
                    <div>
                      <Typography.Text>{item.location}</Typography.Text>
                    </div>
                  </div>
                ),
                textLabel: item.label,
                value: item.value,
              }))}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Businesses',
              })}
              value={businessesFilter}
            />
          </div>

          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
            </Text>
            <Input.TextArea
              onChange={(e) => setPeculiarities(e.target.value)}
              value={peculiarities}
            />
          </div>
          <Row className={classes.clearRow} justify="end">
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Link Incident',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkIncident;
