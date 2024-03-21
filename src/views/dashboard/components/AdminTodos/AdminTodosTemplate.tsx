import React from 'react';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import useStyles from '#/views/dashboard/components/AdminTodos/AdminTodos.styles';
import { useIntl } from 'react-intl';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const { Title } = Typography;

const AdminTodosTemplate = ({
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
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('adminTodos')}
        icon={<FontAwesomeIcon icon={faTrash} />}
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
          wrap={false}
          style={{ margin: '10px 0 10px 5px' }}
        >
          <Col style={{ minWidth: 'min-content' }}>
            <Title className={classes.title} style={{ fontSize: 16 }}>
              {intl.formatMessage({
                defaultMessage: 'Activities',
                id: 'UmEsZF',
              })}
            </Title>
          </Col>
          <Col flex={1} />

          <Col>
            <Button
              type="text"
              style={{ marginRight: -5 }}
              danger
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
            >
              {intl.formatMessage({
                defaultMessage: 'New',
                id: 'bW7B87',
              })}
            </Button>
          </Col>
        </Row>
      </Card>
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
    </Col>
  );
};

export default AdminTodosTemplate;
