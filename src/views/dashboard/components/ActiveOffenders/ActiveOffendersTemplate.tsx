import React from 'react';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const { Title } = Typography;

const ActiveOffendersTemplate = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  return (
    <Card
      style={{ height: '100%', margin: 0, overflow: 'hidden' }}
      bodyStyle={{
        height: 'calc(100%)',
      }}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('activeOffender')}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
      <Title
        level={4}
        style={{
          fontSize: 16,
          marginTop: -10,
          marginBottom: 10,
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
                height: 140,
                width: 140,
                borderRadius: '0.625rem',
              }}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ActiveOffendersTemplate;
