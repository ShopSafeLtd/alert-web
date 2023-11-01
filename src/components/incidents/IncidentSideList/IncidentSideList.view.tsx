import React from 'react';
import type { ListIncidentsFeedQuery } from 'graphql/generated';
import { Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import SideListItem from 'components/side-list/SideListItem.view';
import useStyles from './IncidentSideList.styles';
import InfiniteSideScrollList from '../../side-list/InfiniteSideList';

interface Props {
  data: ListIncidentsFeedQuery | undefined;
  loading: boolean;
  next: () => void;
  current?: string;
}

const IncidentSideList = ({
  data,
  loading,
  current,
  next,
}: Props): JSX.Element => {
  const { listIncidents } = data || {};
  const { incidents, total } = listIncidents || {};
  const classes = useStyles();

  const isLoading = loading && !data?.listIncidents?.total;

  const incidentItems = incidents?.map((incident) => (
    <Link to={`/app/incidents/view/${incident.id}`} key={incident.id}>
      <SideListItem current={current === incident.id}>
        <Row wrap={false}>
          <Col className={classes.itemContent} flex={1}>
            <Typography.Text strong={current === incident.id} ellipsis>
              {incident.subject}
            </Typography.Text>
            <Typography.Paragraph
              className={classes.itemDesc}
              type="secondary"
              ellipsis
            >
              {incident.description}
            </Typography.Paragraph>
            <Row>
              <Col flex={1}>
                <Typography.Paragraph
                  className={classes.itemDetail}
                  style={{ marginRight: 10 }}
                  type="secondary"
                  ellipsis
                >
                  {incident.business?.name || incident.location?.full}
                </Typography.Paragraph>
              </Col>
              <Col>
                <Typography.Paragraph
                  className={classes.itemDetail}
                  type="secondary"
                  ellipsis
                >
                  {incident.dayTime}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </SideListItem>
    </Link>
  ));

  return (
    <InfiniteSideScrollList
      dataLength={incidents?.length}
      next={next}
      hasMore={(incidents?.length || 0) < (total || 0)}
      isLoading={isLoading}
      items={incidentItems}
    />
  );
};

export default IncidentSideList;
