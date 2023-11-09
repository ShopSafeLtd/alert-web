import React from 'react';
import type { ListIncidentsAllSchemesQuery } from 'graphql/generated';
import { Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import SideListItem from 'components/side-list/SideListItem.view';
import { useIntl } from 'react-intl';
import useStyles from './IncidentSideList.styles';
import InfiniteSideScrollList from '../../side-list/InfiniteSideList';

interface Props {
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        undefined | null
      >
    | null
    | undefined;
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
  const classes = useStyles();
  const intl = useIntl();

  const isLoading = loading && !data?.total;

  const incidentItems = data?.incidents?.map((incident) => (
    <Link to={`/app/incidents/view/${incident.id}`} key={incident.id}>
      <SideListItem current={current === incident.id}>
        <Row wrap={false}>
          <Col className={classes.itemContent} flex={1}>
            <Row>
              <Col flex={1}>
                <Typography.Text strong={current === incident.id} ellipsis>
                  {incident.subject}
                </Typography.Text>
              </Col>
              <Col style={{ fontSize: 12 }}>
                {incident.approved ? (
                  <Typography.Text type="success">
                    {intl.formatMessage({
                      defaultMessage: 'Approved',
                      id: '6XFO/C',
                    })}
                  </Typography.Text>
                ) : (
                  <Typography.Text type="warning">
                    {intl.formatMessage({
                      defaultMessage: 'Unapproved',
                      id: 'vfWKA1',
                    })}
                  </Typography.Text>
                )}
              </Col>
            </Row>

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
      dataLength={data?.incidents?.length}
      next={next}
      hasMore={(data?.incidents?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={incidentItems}
    />
  );
};

export default IncidentSideList;
