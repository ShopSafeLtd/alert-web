import React from 'react';
import {
  Button,
  Col,
  Image,
  Input,
  Row,
  Skeleton,
  Table,
  Tag,
  Typography,
} from 'antd';
import { SearchOffendersQuery } from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
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
  return (
    <div className={classes.searchPage}>
      <Title level={3}>Select an offender to view</Title>
      <Row className={classes.toolbar}>
        <Col span={8}>
          <Input
            placeholder="Search for an offender..."
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
                  <Image
                    className={classes.searchImage}
                    // eslint-disable-next-line
                    src={images[0]?.optimised}
                  />
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
            title: 'Name',
          },
          {
            key: 'age',
            dataIndex: 'age',
            title: 'Age',
          },
          {
            key: 'build',
            dataIndex: 'build',
            title: 'Build',
          },
          {
            key: 'gender',
            dataIndex: 'gender',
            title: 'Gender',
          },
          {
            key: 'tags',
            dataIndex: 'tags',
            title: 'Tags',
            render: (tags: { id: string; name: string }[]) =>
              tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>),
          },
          {
            key: 'action',
            dataIndex: 'action',
            title: '',
            render: (_, item) => (
              <Button onClick={() => setSelectedOffender(item.key)}>
                Select
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
            age: offender.age ? getAge(offender.age) : 'Unknown',
            build: offender.build ? getBuild(offender.build) : 'Unknown',
            race: offender.race ? getEthnicity(offender.race) : 'Unknown',
            gender: offender.gender ? getSex(offender.gender) : 'Unknown',
            tags: offender.tags,
          })
        )}
        pagination={{
          current: currentSearchPage,
          onChange: onSearchPageChange,
          total: searchOffendersData?.listOffenders?.total,
          pageSizeOptions: ['20', '50', '100'],
          defaultPageSize: 20,
          showTotal: (total) => `Total offenders: ${total}`,
        }}
        size="small"
      />
    </div>
  );
};

export default OffenderProfile;
