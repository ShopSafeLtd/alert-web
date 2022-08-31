import React from 'react';
import { ListIncidentsQuery } from 'graphql/generated';
import { Row, Col, Skeleton, Typography, Divider, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';

interface Props {
  data: ListIncidentsQuery | undefined;
  // loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const IncidentSideList = ({
  data,
  // loading,
  current,
  onPaginationChange,
}: Props): JSX.Element => (
  <div className="incidents-side-list">
    {data?.listIncidents?.incidents.map((incident) => (
      <Link to={`/app/incidents/view/${incident.id}`} key={incident.id}>
        <div
          className={
            current === incident.id ? 'incident-item current' : 'incident-item'
          }
        >
          <Row wrap={false}>
            <Col>
              {incident.images.length > 0 ? (
                <div
                  className="incident-item-image"
                  style={{
                    backgroundImage: `url(${incident.images[0].optimised})`,
                  }}
                />
              ) : (
                <Skeleton.Image className="incident-item-image-skeleton" />
              )}
            </Col>
            <Col className="incident-item-content" flex={1}>
              <Typography.Text strong={current === incident.id} ellipsis>
                {incident.subject}
              </Typography.Text>
              <Typography.Paragraph
                className="incident-item-desc"
                type="secondary"
                ellipsis
              >
                {incident.description}
              </Typography.Paragraph>
              <Typography.Paragraph
                className="incident-item-detail"
                type="secondary"
                ellipsis
              >
                <FontAwesomeIcon
                  className="incident-item-icon"
                  icon={faClock}
                />
                {incident.dayTime}
              </Typography.Paragraph>
              <Typography.Paragraph
                className="incident-item-detail"
                type="secondary"
                ellipsis
              >
                <FontAwesomeIcon className="incident-item-icon" icon={faUser} />
                {incident.createdBy.fullName} -{' '}
                {incident.createdBy.organisation}
              </Typography.Paragraph>
            </Col>
          </Row>
          <Divider className="incident-item-divider" />
        </div>
      </Link>
    ))}
    <Pagination
      total={data?.listIncidents?.total}
      size="small"
      showSizeChanger={false}
      onChange={onPaginationChange}
    />
  </div>
);

export default IncidentSideList;
