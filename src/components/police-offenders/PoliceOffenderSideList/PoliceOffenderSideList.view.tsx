import type { SharedOffendersFeedQuery } from '#/views/police-offenders/graphql/queries/__generated__/shared-offenders-feed.generated';

import { currencySymbolAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faExclamationCircle,
  faExclamationTriangle,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Skeleton, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideListItem from 'components/side-list/SideListItem.view';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import InfiniteSideScrollList from '../../side-list/InfiniteSideList';
import useStyles from './PoliceOffenderSideList.styles';

const { Text } = Typography;

const getLevel = (value: number): 'high' | 'low' | 'medium' => {
  if (value >= 70) return 'high';
  if (value >= 40) return 'medium';
  return 'low';
};

interface Props {
  current?: string;
  data:
    | Exclude<SharedOffendersFeedQuery['sharedOffenderRelay'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  to?: string;
}

const PriorityBadge = ({ score }: { score: number }): JSX.Element | null => {
  const intl = useIntl();
  const level = getLevel(score);

  // Hide low priority badges completely
  if (level === 'low') return null;

  const config = {
    high: {
      color: '#ff4d4f',
      icon: faExclamationCircle,
      text: intl.formatMessage({ defaultMessage: 'High' }),
    },
    medium: {
      color: '#faad14',
      icon: faExclamationTriangle,
      text: intl.formatMessage({ defaultMessage: 'Medium' }),
    },
  };

  const { color, icon, text } = config[level];

  return (
    <Tooltip
      title={intl.formatMessage(
        { defaultMessage: 'Priority: {text} ({score}/100)' },
        { score, text }
      )}
    >
      <span style={{ color, fontSize: 12 }}>
        <FontAwesomeIcon icon={icon} />
      </span>
    </Tooltip>
  );
};

const PoliceOffenderSideList = ({
  current,
  data,
  fetchMoreScroll,
  loading,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const { prefix: currency } = useAtomValue(currencySymbolAtom);
  const isLoading = loading && !data?.pageInfo.hasNextPage;

  const offenderItems = data?.edges?.map(({ node: offender }) => (
    <Link
      key={offender.id}
      to={`${to || '/app/police-offenders/view/'}${offender.id}`}
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
            <Row align="middle" gutter={6} wrap={false}>
              <Col flex={1}>
                <Text
                  className={classes.name}
                  ellipsis
                  strong={current === offender.id}
                >
                  {offender.name ||
                    intl.formatMessage({ defaultMessage: 'Unknown' })}
                </Text>
              </Col>
              {offender.policePriorityScore !== null &&
                offender.policePriorityScore !== undefined &&
                offender.policePriorityScore >= 40 && (
                  <Col>
                    <PriorityBadge score={offender.policePriorityScore} />
                  </Col>
                )}
            </Row>

            <Row gutter={6} style={{ marginTop: 4 }} wrap={false}>
              <Col>
                <Text style={{ fontSize: 12 }} type="secondary">
                  {intl.formatMessage({ defaultMessage: 'Incidents:' })}
                </Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 12 }}>{offender.totalIncidents}</Text>
              </Col>
            </Row>

            {offender.totalLossValue !== null &&
              offender.totalLossValue !== undefined && (
                <Row gutter={6} style={{ marginTop: 2 }} wrap={false}>
                  <Col>
                    <Text style={{ fontSize: 12 }} type="secondary">
                      {intl.formatMessage({ defaultMessage: 'Total Loss:' })}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontSize: 12 }}>
                      {currency}
                      {offender.totalLossValue.toLocaleString()}
                    </Text>
                  </Col>
                </Row>
              )}
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

export default PoliceOffenderSideList;
