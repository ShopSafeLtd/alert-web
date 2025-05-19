import type { AvailableDashboardElements } from '#/state/dashboard-model';

import useStyles from '#/views/dashboard/components/AdminTodos/AdminTodos.styles';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const DraftIncidentsTemplate = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const classes = useStyles();
  const intl = useIntl();

  // const expandedRowRender = (record: TableItem) => (
  //   <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
  //     {intl.formatMessage(
  //       { defaultMessage: 'Description: {description}', id: 'US7L2J' },
  //       {
  //         description: record.description,
  //       }
  //     )}
  //   </Text>
  // );

  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('latestIncidents')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
        type="primary"
      />
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
                defaultMessage: 'Draft Incidents',
              })}
            </Title>
          </Col>
          <Col flex={1} />
        </Row>
      </Card>
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
    </Col>
  );
};

export default DraftIncidentsTemplate;
