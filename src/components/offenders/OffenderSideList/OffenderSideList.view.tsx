import { Col, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom'; // Import the useIntl hook
import type { ListOffendersRelayQuery } from '#/views/profiles/offenders/OffenderFeed/graphql/queries/__generated__/offender-feed.generated';

import WatermarkImage from 'components/images/WatermarkImage.view';
import SideListItem from 'components/side-list/SideListItem.view';

import InfiniteSideScrollList from '../../side-list/InfiniteSideList';
import useStyles from './OffenderSideList.styles';

const { Text } = Typography;

interface Props {
  current?: string;
  data:
    | Exclude<ListOffendersRelayQuery['listOffendersRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  to?: string;
}

const OffenderSideList = ({
  current,
  data,
  fetchMoreScroll,
  loading,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const isLoading = loading && !data?.pageInfo.hasNextPage;

  const offenderItems = data?.edges?.map(({ node: offender }) => (
    <Link
      key={offender.id}
      to={`${to || '/app/offenders/view/'}${offender.id}`}
    >
      <SideListItem current={current === offender.id}>
        <Row wrap={false}>
          <Col>
            {offender.images.length > 0 ? (
              <div className={classes.image}>
                <WatermarkImage
                  position={offender.images[0].position}
                  rotation={offender.images[0].rotation}
                  url={offender.images[0].optimised}
                />
              </div>
            ) : (
              <Skeleton.Image className={classes.imageSkeleton} />
            )}
          </Col>
          <Col className={classes.content} flex={1}>
            <Text
              className={classes.name}
              ellipsis
              strong={current === offender.id}
            >
              {offender.name}
            </Text>

            <Row style={{ marginTop: -5 }}>
              <Col flex={1}>
                <Text className={classes.reference} ellipsis type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {reference}',
                    },
                    { reference: offender.reference }
                  )}
                </Text>
              </Col>
            </Row>
            {offender.approved ? (
              <Text ellipsis style={{ fontSize: 12 }} type="success">
                {intl.formatMessage({
                  defaultMessage: 'Approved',
                })}
              </Text>
            ) : (
              <Text ellipsis style={{ fontSize: 12 }} type="warning">
                {intl.formatMessage({
                  defaultMessage: 'Unapproved',
                })}
              </Text>
            )}
            <Row gutter={6} wrap={false}>
              <Col>
                <Text style={{ fontSize: 12 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Incidents:',
                  })}
                </Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 12 }}>{offender.totalIncidents}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </SideListItem>
    </Link>
  ));

  return (
    <InfiniteSideScrollList
      dataLength={data?.edges?.length}
      hasMore={data?.pageInfo.hasNextPage}
      isLoading={isLoading}
      items={offenderItems}
      next={fetchMoreScroll}
    />
  );
};

export default OffenderSideList;
