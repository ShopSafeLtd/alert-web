import React from 'react';
import { Button, Col, Row, Skeleton, Table, Tag, Typography } from 'antd';
import type { SearchOffenderReportsQuery } from 'graphql/generated';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import DebouncedInput from 'utils/debounced-input';
import useStyles from './search.styles';

const { Title } = Typography;

interface Props {
  searchOffendersData: SearchOffenderReportsQuery | undefined;
  searchOffenderLoading: boolean;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedOffender: (value: string) => void;
  currentSearchPage: number;
  onSearchPageChange: (page: number, pageSize: number) => void;
}

const OffenderProfile = ({
  searchOffenderLoading,
  searchOffendersData,
  searchValue: _,
  handleSearchChange,
  setSelectedOffender,
  currentSearchPage,
  onSearchPageChange,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classes.searchPage}>
      <Title level={3}>
        {intl.formatMessage({
          defaultMessage: 'Select an offender to view',
          id: 'ioDzAV',
        })}
      </Title>
      <Row className={classes.toolbar}>
        <Col span={8}>
          <DebouncedInput
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for an offender...',
              id: 'KBPSuo',
            })}
            allowClear
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      <Table
        columns={[
          {
            key: 'images',
            dataIndex: 'images',
            title: '',
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
            onCell: () => ({
              className: classes.imageCell,
            }),
          },
          {
            key: 'name',
            dataIndex: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
            render: (value) => (
              <Typography.Text style={{ fontSize: 14 }} strong>
                {value}
              </Typography.Text>
            ),
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incident Count',
              id: 'otC1Ao',
            }),
          },
          {
            key: 'totalValue',
            dataIndex: 'totalValue',
            title: intl.formatMessage({
              defaultMessage: 'Total Loss',
              id: 'LPr3Nh',
            }),
            render: (value: number) =>
              intl.formatMessage(
                {
                  defaultMessage: '£{value}',
                  id: 'pCmP/V',
                },
                {
                  value: value.toFixed(0),
                }
              ),
          },
          {
            key: 'lastIncident',
            dataIndex: 'lastIncident',
            title: intl.formatMessage({
              defaultMessage: 'Last Incident',
              id: 'kJuP0b',
            }),
          },
          {
            key: 'tags',
            dataIndex: 'tags',
            title: intl.formatMessage({
              defaultMessage: 'Tags',
              id: '1EYCdR',
            }),
            render: (tags: { id: string; name: string }[]) =>
              tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>),
          },
          {
            key: 'action',
            dataIndex: 'action',
            title: '',
            render: (__, item) => (
              <Button
                style={{ marginRight: 20 }}
                onClick={() => setSelectedOffender(item.key)}
              >
                {intl.formatMessage({
                  defaultMessage: 'View Report',
                  id: '9KJQ2Y',
                })}
              </Button>
            ),
            onCell: () => ({
              className: classes.actionCell,
            }),
          },
        ]}
        loading={searchOffenderLoading}
        dataSource={searchOffendersData?.listOffenders?.offenders.map(
          (offender) => ({
            key: offender.id,
            name: offender.name,
            images: offender.images,
            tags: offender.tags,
            totalIncidents: offender.totalIncidents,
            totalValue: offender.totalValue,
            lastIncident: offender.latestIncident?.dayTime,
          })
        )}
        pagination={{
          hideOnSinglePage: true,
          current: currentSearchPage,
          onChange: onSearchPageChange,
          total: searchOffendersData?.listOffenders?.total,
          pageSizeOptions: ['20', '50', '100'],
          defaultPageSize: 20,
          showTotal: (total) =>
            intl.formatMessage(
              {
                defaultMessage: 'Total offenders: {total}',
                id: 'LFId63',
              },
              {
                total,
              }
            ),
        }}
        size="small"
      />
    </div>
  );
};

export default OffenderProfile;
