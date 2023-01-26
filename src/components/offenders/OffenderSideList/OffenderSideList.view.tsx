import React from 'react';
import { ListOffendersQuery } from 'graphql/generated';
import { Col, Divider, Pagination, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { getLastOffence } from 'utils/offender/get-offender-desc';
import useStyles from './OffenderSideList.styles';

const { Text, Paragraph } = Typography;

interface Props {
  data: ListOffendersQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const OffenderSideList = ({
  data,
  loading,
  current,
  onPaginationChange,
}: Props): JSX.Element => {
  const classes = useStyles();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <div className={classes.offenderSideList}>
      {data?.listOffenders?.offenders.map((offender) => (
        <Link to={`/app/offenders/view/${offender.id}`} key={offender.id}>
          <div
            key={offender.id}
            className={`${classes.offenderItem} ${
              current === offender.id ? 'current' : ''
            }`}
          >
            <Row wrap={false}>
              <Col>
                {offender.images.length > 0 ? (
                  <div
                    className={classes.image}
                    style={{
                      backgroundImage: `url(${offender.images[0].optimised})`,
                    }}
                  />
                ) : (
                  <Skeleton.Image className={classes.imageSkeleton} />
                )}
              </Col>
              <Col className={classes.content} flex={1}>
                <Text
                  className={classes.name}
                  strong={current === offender.id}
                  ellipsis
                >
                  {offender.name}
                </Text>
                <Paragraph>
                  Last Offense:{' '}
                  {getLastOffence(offender.incidents, true).message}
                </Paragraph>
              </Col>
            </Row>
            <Divider className={classes.divider} />
          </div>
        </Link>
      ))}
      <Pagination
        total={data?.listOffenders?.total}
        size="small"
        showSizeChanger={false}
        onChange={onPaginationChange}
      />
    </div>
  );
};

export default OffenderSideList;
