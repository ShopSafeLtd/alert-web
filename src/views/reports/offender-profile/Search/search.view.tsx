import React from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Skeleton,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { SearchOffendersQuery } from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import useStyles from './search.styles';

const { Title } = Typography;

interface Props {
  searchOffendersData: SearchOffendersQuery | undefined;
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
  searchValue,
  handleSearchChange,
  setSelectedOffender,
  currentSearchPage,
  onSearchPageChange,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
    id: '5jeq8P',
  });
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
          <Input
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for an offender...',
              id: 'KBPSuo',
            })}
            value={searchValue}
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
          },
          {
            key: 'age',
            dataIndex: 'age',
            title: intl.formatMessage({
              defaultMessage: 'Age',
              id: '9oNQSC',
            }),
          },
          {
            key: 'build',
            dataIndex: 'build',
            title: intl.formatMessage({
              defaultMessage: 'Build',
              id: 'RSctv1',
            }),
          },
          {
            key: 'gender',
            dataIndex: 'gender',
            title: intl.formatMessage({
              defaultMessage: 'gender',
              id: 'D1GrfQ',
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
            render: (_, item) => (
              <Button onClick={() => setSelectedOffender(item.key)}>
                {intl.formatMessage({
                  defaultMessage: 'Select',
                  id: 'kQAf2d',
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
            age: offender.age ? getAge(offender.age) : unknown,
            build: offender.build ? getBuild(offender.build) : unknown,
            race: offender.race ? getEthnicity(offender.race) : unknown,
            gender: offender.gender ? getSex(offender.gender) : unknown,
            tags: offender.tags,
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
