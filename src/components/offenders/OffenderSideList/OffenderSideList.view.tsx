import React from 'react';
import type { ListOffendersQuery } from 'graphql/generated';
import { Col, Pagination, Row, Skeleton, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideList from 'components/side-list/SideList.view';
import SideListItem from 'components/side-list/SideListItem.view';
import { getEthnicity, getSex } from 'utils';
import useStyles from './OffenderSideList.styles';

const { Text, Paragraph } = Typography;

interface Props {
  data: ListOffendersQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
  to?: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const OffenderSideList = ({
  data,
  loading,
  current,
  onPaginationChange,
  to,
  pagination,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl(); // Use the useIntl hook to access the intl object

  return (
    <SideList>
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100vh',
          }}
        >
          <Spin />
        </div>
      )}
      {data?.listOffenders?.offenders.map((offender) => (
        <Link
          to={`${to || '/app/offenders/view/'}${offender.id}`}
          key={offender.id}
        >
          <SideListItem current={current === offender.id}>
            <Row wrap={false}>
              <Col>
                {offender.images.length > 0 ? (
                  <div className={classes.image}>
                    <WatermarkImage
                      url={offender.images[0].optimised}
                      position={offender.images[0].position}
                    />
                  </div>
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
                <Text
                  className={classes.reference}
                  strong={current === offender.id}
                  ellipsis
                >
                  {intl.formatMessage(
                    {
                      id: '377fsC',
                      defaultMessage: 'Alert ID: {reference}',
                    },
                    { reference: offender.reference }
                  )}
                </Text>
                <Paragraph className={classes.detail} ellipsis>
                  {offender.race && getEthnicity(offender.race)}
                </Paragraph>
                <Paragraph className={classes.detail} ellipsis>
                  {offender.gender && getSex(offender.gender)}
                </Paragraph>
              </Col>
            </Row>
          </SideListItem>
        </Link>
      ))}
      {!loading && (
        <Pagination
          total={data?.listOffenders?.total}
          size="small"
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={pagination.pageSize}
          current={pagination.page}
        />
      )}
    </SideList>
  );
};

export default OffenderSideList;
