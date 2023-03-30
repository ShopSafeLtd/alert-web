import React from 'react';
import type { ListIncidentsQuery } from 'graphql/generated';
import { Row, Col, Typography, Divider, Pagination, Spin } from 'antd';
import { Link } from 'react-router-dom';
import useStyles from './IncidentSideList.styles';

interface Props {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const IncidentSideList = ({
  data,
  loading,
  current,
  onPaginationChange,
  pagination,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.sideList}>
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100vh',
          }}
        >
          <Spin />
        </div>
      )}
      {data?.listIncidents?.incidents.map((incident) => (
        <>
          <Link to={`/app/incidents/view/${incident.id}`} key={incident.id}>
            <div
              className={`${classes.item} ${
                current === incident.id ? 'current' : undefined
              }`}
            >
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
                        type="secondary"
                        ellipsis
                      >
                        {incident.business?.name}
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
        </>
      ))}
      {!loading && (
        <Pagination
          total={data?.listIncidents?.total}
          size="small"
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={pagination.pageSize}
          current={pagination.page}
        />
      )}
    </div>
  );
};

export default IncidentSideList;
