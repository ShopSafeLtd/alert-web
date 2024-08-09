import type { ListIncidentsAllSchemesQuery } from 'graphql/incidents/queries/__generated__/list-incidents-all-schemes.generated';

import { Col, Row, Typography } from 'antd';
import SideListItem from 'components/side-list/SideListItem.view';
import { IncidentPriority } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import InfiniteSideScrollList from '../../side-list/InfiniteSideList';
import useStyles from './IncidentSideList.styles';

const getPriorityBorder = (value: IncidentPriority) => {
  if (value === IncidentPriority.High) return '5px solid rgb(222, 68, 54)';
  if (value === IncidentPriority.Medium) return '5px solid #ffc542';
  return undefined;
};

interface Props {
  current?: string;
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        null | undefined
      >
    | null
    | undefined;
  loading: boolean;
  next: () => void;
}

const IncidentSideList = ({
  current,
  data,
  loading,
  next,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  const isLoading = loading && !data?.total;

  const incidentItems = data?.incidents?.map((incident) => (
    <Link key={incident.id} to={`/app/incidents/view/${incident.id}`}>
      <SideListItem
        current={current === incident.id}
        style={{
          borderLeft: getPriorityBorder(incident.priority),
        }}
      >
        <Row wrap={false}>
          <Col className={classes.itemContent} flex={1}>
            <Row>
              <Col flex={1}>
                <Typography.Text ellipsis strong={current === incident.id}>
                  {incident.subject}
                </Typography.Text>
              </Col>
              <Col style={{ fontSize: 12 }}>
                {incident.approved ? (
                  <Typography.Text type="success">
                    {intl.formatMessage({
                      defaultMessage: 'Approved',
                    })}
                  </Typography.Text>
                ) : (
                  <Typography.Text type="warning">
                    {intl.formatMessage({
                      defaultMessage: 'Unapproved',
                    })}
                  </Typography.Text>
                )}
              </Col>
            </Row>

            <Typography.Paragraph
              className={classes.itemDesc}
              ellipsis
              type="secondary"
            >
              {incident.description}
            </Typography.Paragraph>
            <Row>
              <Col flex={1}>
                <Typography.Paragraph
                  className={classes.itemDetail}
                  ellipsis
                  style={{ marginRight: 10 }}
                  type="secondary"
                >
                  {incident.business?.name || incident.location?.full}
                </Typography.Paragraph>
              </Col>
              <Col>
                <Typography.Paragraph
                  className={classes.itemDetail}
                  ellipsis
                  type="secondary"
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
      hasMore={(data?.incidents?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={incidentItems}
      next={next}
    />
  );
};

export default IncidentSideList;
