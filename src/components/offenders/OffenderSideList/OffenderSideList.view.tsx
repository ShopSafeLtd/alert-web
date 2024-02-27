import React from 'react';
import type { ListOffendersRelayQuery } from 'graphql/generated';
import { Col, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideListItem from 'components/side-list/SideListItem.view';
import useStyles from './OffenderSideList.styles';
import InfiniteSideScrollList from '../../side-list/InfiniteSideList';

const { Text } = Typography;

interface Props {
  data:
    | Exclude<ListOffendersRelayQuery['listOffendersRelay'], undefined | null>
    | null
    | undefined;
  loading: boolean;
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
  const intl = useIntl();
  const isLoading = loading && !data?.pageInfo.hasNextPage;

  const offenderItems = data?.edges?.map(({ node: offender }) => (
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

            <Row style={{ marginTop: -5 }}>
              <Col flex={1}>
                <Text className={classes.reference} ellipsis type="secondary">
                  {intl.formatMessage(
                    {
                      id: '377fsC',
                      defaultMessage: 'Alert ID: {reference}',
                    },
                    { reference: offender.reference }
                  )}
                </Text>
              </Col>
            </Row>
            {offender.approved ? (
              <Text style={{ fontSize: 12 }} type="success" ellipsis>
                {intl.formatMessage({
                  defaultMessage: 'Approved',
                  id: '6XFO/C',
                })}
              </Text>
            ) : (
              <Text style={{ fontSize: 12 }} type="warning" ellipsis>
                {intl.formatMessage({
                  defaultMessage: 'Unapproved',
                  id: 'vfWKA1',
                })}
              </Text>
            )}
            <Row gutter={6} wrap={false}>
              <Col>
                <Text style={{ fontSize: 12 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Incidents:',
                    id: '+nRUf9',
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
      next={fetchMoreScroll}
      hasMore={data?.pageInfo.hasNextPage}
      isLoading={isLoading}
      items={offenderItems}
    />
  );
};

export default OffenderSideList;
