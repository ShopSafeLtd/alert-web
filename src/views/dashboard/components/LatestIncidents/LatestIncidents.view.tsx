import type { LatestIncidentsQuery } from '#/views/dashboard/graphql/queries/__generated__/latest-incidents.generated';

import FormatCalendar from '#/utils/format-calendar-24h';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import { Card, Col, Divider, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './LatestIncidents.styles';

const { Text, Title } = Typography;

interface Props {
  data: LatestIncidentsQuery | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
}

const LatestIncidents = ({
  data,
  fetchMoreScroll,
  loading,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{ margin: 0 }}
      >
        <Row
          align="middle"
          gutter={8}
          style={{ margin: '10px 0 10px 5px' }}
          wrap={false}
        >
          <Col style={{ minWidth: 'min-content' }}>
            <Title className={classes.title} style={{ fontSize: 16 }}>
              {intl.formatMessage({
                defaultMessage: 'Latest Incidents',
              })}
            </Title>
          </Col>
          <Col flex={1} />
        </Row>
      </Card>
      {loading ? (
        <Row
          align="stretch"
          gutter={[8, 8]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))}
        </Row>
      ) : (
        <DashboardInfiniteScroll
          dataLength={data?.latestIncidents?.edges?.length ?? 0}
          hasMore={!!data?.latestIncidents.pageInfo.hasNextPage}
          id="scroll-incidents"
          next={() => fetchMoreScroll()}
        >
          <Row className={classes.header} wrap={false}>
            <Col flex={1}>
              {intl.formatMessage({
                defaultMessage: 'Description',
              })}
            </Col>
            <Col>
              {intl.formatMessage({
                defaultMessage: 'Date',
              })}
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <div>
            {data?.latestIncidents?.edges?.map(({ node: incident }) => (
              <>
                <Row className={classes.contentRow} wrap={false}>
                  <Col flex={1}>
                    <Text style={{ fontSize: 14 }}>
                      <Link
                        key={incident.id}
                        to={`/app/incidents/view/${incident.id}`}
                      >
                        {incident.description.slice(0, 63)}
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        {incident.description.length > 62 && '...'}
                      </Link>
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontSize: 14 }}>
                      {FormatCalendar(incident.date)}
                    </Text>
                  </Col>
                </Row>
                <Divider style={{ margin: 0 }} />
              </>
            ))}
          </div>
        </DashboardInfiniteScroll>
      )}
    </Col>
  );
};

export default LatestIncidents;
