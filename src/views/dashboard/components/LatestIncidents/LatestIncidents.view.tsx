import React from 'react';
import { Card, Col, Divider, Row, Skeleton, Typography } from 'antd';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from '#/utils/format-calendar-24h';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import useStyles from './LatestIncidents.styles';
import type { LatestIncidentsQuery } from '#/views/dashboard/graphql/queries/latest-incidents.generated';

const { Title, Text } = Typography;

interface Props {
  data: LatestIncidentsQuery | undefined;
  loading: boolean;
  fetchMoreScroll: () => void;
}

const LatestIncidents = ({
  data,
  loading,
  fetchMoreScroll,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Col
      style={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
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
          wrap={false}
          style={{ margin: '10px 0 10px 5px' }}
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
          gutter={[8, 8]}
          align="stretch"
          style={{ padding: 10, alignItems: 'stretch' }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))}
        </Row>
      ) : (
        <DashboardInfiniteScroll
          dataLength={data?.latestIncidents?.edges?.length ?? 0}
          next={() => fetchMoreScroll()}
          hasMore={!!data?.latestIncidents.pageInfo.hasNextPage}
          id="scroll-incidents"
        >
          <Row wrap={false} className={classes.header}>
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
                <Row wrap={false} className={classes.contentRow}>
                  <Col flex={1}>
                    <Text style={{ fontSize: 14 }}>
                      <Link
                        to={`/app/incidents/view/${incident.id}`}
                        key={incident.id}
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
