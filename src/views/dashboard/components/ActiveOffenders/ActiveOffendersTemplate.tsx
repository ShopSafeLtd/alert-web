import type { AvailableDashboardElements } from '#/state/dashboard-model';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const ActiveOffendersTemplate = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  return (
    <Card
      bodyStyle={{
        height: 'calc(100%)',
      }}
      style={{ height: '100%', margin: 0, overflow: 'hidden' }}
    >
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('activeOffender')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      <Title
        level={4}
        style={{
          fontSize: 16,
          marginBottom: 10,
          marginTop: -10,
        }}
      >
        {intl.formatMessage({
          defaultMessage: 'Recently Active Offenders',
        })}
      </Title>

      <Row
        gutter={[8, 8]}
        style={{
          flexWrap: 'wrap',
          height: 'inherit',
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <Col
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              height: 'fit-content',
            }}
          >
            <Skeleton.Avatar
              active
              shape="square"
              style={{
                borderRadius: '0.625rem',
                height: 140,
                width: 140,
              }}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ActiveOffendersTemplate;
