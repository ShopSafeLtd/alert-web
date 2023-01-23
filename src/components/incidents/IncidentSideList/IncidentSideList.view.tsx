import React from 'react';
import { ListIncidentsQuery } from 'graphql/generated';
import { Row, Col, Skeleton, Typography, Divider, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import useStyles from './IncidentSideList.styles';

interface Props {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const IncidentSideList = ({
  data,
  loading,
  current,
  onPaginationChange,
}: Props): JSX.Element => {
  const classes = useStyles();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <div className={classes.sideList}>
      {data?.listIncidents?.incidents.map((incident) => (
        <Link to={`/app/incidents/view/${incident.id}`} key={incident.id}>
          <div
            className={`${classes.item} ${
              current === incident.id ? 'current' : undefined
            }`}
          >
            <Row wrap={false}>
              {/* <Col>
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
              </Col> */}
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
                      type="secondary"
                      ellipsis
                    >
                      {incident.createdBy.organisation}
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
            <Divider className={classes.itemDivider} />
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
};

export default IncidentSideList;
