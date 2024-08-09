import type { SearchOffenderReportsQuery } from '#/views/reports/offender-profile/Search/__generated__/search-offender-report.generated';

import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { Button, Col, Row, Skeleton, Table, Tag, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import DebouncedInput from 'utils/debounced-input';

import useStyles from './search.styles';

const { Title } = Typography;

interface Props {
  currentSearchPage: number;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchPageChange: (page: number, pageSize: number) => void;
  searchOffenderLoading: boolean;
  searchOffendersData: SearchOffenderReportsQuery | undefined;
  searchValue: string;
  setSelectedOffender: (value: string) => void;
}

const OffenderProfile = ({
  currentSearchPage,
  handleSearchChange,
  onSearchPageChange,
  searchOffenderLoading,
  searchOffendersData,
  searchValue: _,
  setSelectedOffender,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const { reportId } = useParams();
  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId={reportId ?? ''}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col flex={1} style={{ height: '100vh', overflow: 'auto' }}>
        <div className={classes.searchPage}>
          <Title level={3}>
            {intl.formatMessage({
              defaultMessage: 'Select an offender to view',
            })}
          </Title>
          <Row className={classes.toolbar}>
            <Col span={8}>
              <DebouncedInput
                allowClear
                onChange={handleSearchChange}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for an offender...',
                })}
              />
            </Col>
          </Row>
          <Table
            columns={[
              {
                dataIndex: 'images',
                key: 'images',
                onCell: () => ({
                  className: classes.imageCell,
                }),
                // eslint-disable-next-line
                render: (images: { id: string; optimised: string }[]) =>
                  // eslint-disable-next-line
                  images.length > 0 ? (
                    <div className={classes.searchImageContainer}>
                      <div className={classes.searchImage}>
                        <WatermarkImage url={images[0]?.optimised} />
                      </div>
                    </div>
                  ) : (
                    <Skeleton.Image className={classes.imageSkeleton} />
                  ),
                title: '',
              },
              {
                dataIndex: 'name',
                key: 'name',
                render: (value) => (
                  <Typography.Text strong style={{ fontSize: 14 }}>
                    {value}
                  </Typography.Text>
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Name',
                }),
              },
              {
                dataIndex: 'totalIncidents',
                key: 'totalIncidents',
                title: intl.formatMessage({
                  defaultMessage: 'Incident Count',
                }),
              },
              {
                dataIndex: 'totalValue',
                key: 'totalValue',
                render: (value: number) =>
                  intl.formatMessage(
                    {
                      defaultMessage: '£{value}',
                    },
                    {
                      value: value.toFixed(0),
                    }
                  ),
                title: intl.formatMessage({
                  defaultMessage: 'Total Loss',
                }),
              },
              {
                dataIndex: 'lastIncident',
                key: 'lastIncident',
                title: intl.formatMessage({
                  defaultMessage: 'Last Incident',
                }),
              },
              {
                dataIndex: 'tags',
                key: 'tags',
                render: (tags: { id: string; name: string }[]) =>
                  tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>),
                title: intl.formatMessage({
                  defaultMessage: 'Tags',
                }),
              },
              {
                dataIndex: 'action',
                key: 'action',
                onCell: () => ({
                  className: classes.actionCell,
                }),
                render: (__, item) => (
                  <Button
                    onClick={() => setSelectedOffender(item.key)}
                    style={{ marginRight: 20 }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'View Report',
                    })}
                  </Button>
                ),
                title: '',
              },
            ]}
            dataSource={searchOffendersData?.listOffenders?.offenders.map(
              (offender) => ({
                images: offender.images,
                key: offender.id,
                lastIncident: offender.latestIncident?.dayTime,
                name: offender.name,
                tags: offender.tags,
                totalIncidents: offender.totalIncidents,
                totalValue: offender.totalValue,
              })
            )}
            loading={searchOffenderLoading}
            pagination={{
              current: currentSearchPage,
              defaultPageSize: 20,
              hideOnSinglePage: true,
              onChange: onSearchPageChange,
              pageSizeOptions: ['20', '50', '100'],
              showTotal: (total) =>
                intl.formatMessage(
                  {
                    defaultMessage: 'Total offenders: {total}',
                  },
                  {
                    total,
                  }
                ),
              total: searchOffendersData?.listOffenders?.total,
            }}
            size="small"
          />
        </div>
      </Col>
    </Row>
  );
};

export default OffenderProfile;
