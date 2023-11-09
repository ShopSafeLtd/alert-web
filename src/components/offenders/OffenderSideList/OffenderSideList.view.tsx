import React from 'react';
import type { ListOffendersAllSchemesQuery } from 'graphql/generated';
import { Col, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideListItem from 'components/side-list/SideListItem.view';
import { getEthnicity, getSex } from 'utils';
import useStyles from './OffenderSideList.styles';
import InfiniteSideScrollList from '../../side-list/InfiniteSideList';

const { Text, Paragraph } = Typography;

interface Props {
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >
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
  const isLoading = loading && !data?.total;

  const offenderItems = data?.offenders?.map((offender) => (
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

            <Row>
              <Col flex={1}>
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
              </Col>
              <Col style={{ fontSize: 12, marginRight: -5 }}>
                {offender.approved ? (
                  <Text type="success" ellipsis>
                    {intl.formatMessage({
                      defaultMessage: 'Approved',
                      id: '6XFO/C',
                    })}
                  </Text>
                ) : (
                  <Text type="warning" ellipsis>
                    {intl.formatMessage({
                      defaultMessage: 'Unapproved',
                      id: 'vfWKA1',
                    })}
                  </Text>
                )}
              </Col>
            </Row>
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
  ));

  return (
    <InfiniteSideScrollList
      dataLength={data?.offenders?.length}
      next={fetchMoreScroll}
      hasMore={(data?.offenders?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={offenderItems}
    />
  );
};

export default OffenderSideList;
