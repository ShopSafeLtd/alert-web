import React from 'react';
import type { OffenderFeedListQuery } from 'graphql/generated';
import { Col, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideListItem from 'components/side-list/SideListItem.view';
import { getEthnicity, getSex } from 'utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './OffenderSideList.styles';
import Loading from '../../shared-components/AntD/Loading';

const { Text, Paragraph } = Typography;

interface Props {
  data: OffenderFeedListQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;

  to?: string;
  fetchMoreScroll: () => void;
}

const OffenderSideList = ({
  data,
  loading,
  current,
  fetchMoreScroll,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl(); // Use the useIntl hook to access the intl object
  const isLoading = loading && !data?.listOffenders?.total;

  return (
    <div className={classes.sideList}>
      <InfiniteScroll
        dataLength={data?.listOffenders?.offenders.length || 0}
        next={fetchMoreScroll}
        hasMore={
          (data?.listOffenders?.offenders?.length || 0) <
            (data?.listOffenders?.total || 0) || false
        }
        loader={<Loading />}
        style={{ overflowX: 'hidden' }}
        height="100vh"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <b>-----------</b>
          </p>
        }
        className={classes.infiniteScroll}
      >
        {isLoading
          ? Array.from({ length: 24 }).map(() => (
              <SideListItem loading current={false}>
                <Row wrap={false}>
                  <Col className={classes.itemContent} flex={1}>
                    <div />
                  </Col>
                </Row>
              </SideListItem>
            ))
          : data?.listOffenders?.offenders.map((offender) => (
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
                      <Paragraph
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
                      </Paragraph>
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
      </InfiniteScroll>
    </div>
  );
};

export default OffenderSideList;
