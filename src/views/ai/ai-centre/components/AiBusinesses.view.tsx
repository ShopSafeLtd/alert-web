import { Button, Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AiBusinesses = () => (
  <>
    <Row align="middle" style={{ marginBottom: 20, marginTop: 20 }}>
      <Col flex={1}>
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          <FormattedMessage defaultMessage="Hot Spot Businesses" />
        </Typography.Title>
      </Col>
      <Col>
        <Button type="text">
          <FormattedMessage defaultMessage="View All Hot Spots" />
        </Button>
      </Col>
    </Row>
    <Card
      bodyStyle={{
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: 6 }}>
        <FormattedMessage defaultMessage="Frquency of violent incidents increasing in Store 145" />
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 0 }} type="secondary">
        <FormattedMessage defaultMessage="Incident data within Alert suggests a possible connection between Will Garrod and Regional Meat Group, an entity flagged in previous reports related to suspected organised retail crime. AI analysis identified multiple references to Garrod in theft reports involving high-value meat products, correlating with known Regional Meat Group activity." />
      </Typography.Text>
    </Card>
    <Card
      bodyStyle={{
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: 6 }}>
        <FormattedMessage defaultMessage="Store 671 has reported three kiosk breaches this month" />
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 0 }} type="secondary">
        <FormattedMessage defaultMessage="Incident data within Alert suggests a possible connection between Will Garrod and Regional Meat Group, an entity flagged in previous reports related to suspected organised retail crime. AI analysis identified multiple references to Garrod in theft reports involving high-value meat products, correlating with known Regional Meat Group activity." />
      </Typography.Text>
    </Card>
    <Card
      bodyStyle={{
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: 6 }}>
        <FormattedMessage defaultMessage="Store 671 has reported three kiosk breaches this month" />
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 0 }} type="secondary">
        <FormattedMessage defaultMessage="Incident data within Alert suggests a possible connection between Will Garrod and Regional Meat Group, an entity flagged in previous reports related to suspected organised retail crime. AI analysis identified multiple references to Garrod in theft reports involving high-value meat products, correlating with known Regional Meat Group activity." />
      </Typography.Text>
    </Card>
    <Card
      bodyStyle={{
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: 6 }}>
        <FormattedMessage defaultMessage="Store 671 has reported three kiosk breaches this month" />
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 0 }} type="secondary">
        <FormattedMessage defaultMessage="Incident data within Alert suggests a possible connection between Will Garrod and Regional Meat Group, an entity flagged in previous reports related to suspected organised retail crime. AI analysis identified multiple references to Garrod in theft reports involving high-value meat products, correlating with known Regional Meat Group activity." />
      </Typography.Text>
    </Card>
    <Card
      bodyStyle={{
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: 6 }}>
        <FormattedMessage defaultMessage="Store 671 has reported three kiosk breaches this month" />
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 0 }} type="secondary">
        <FormattedMessage defaultMessage="Incident data within Alert suggests a possible connection between Will Garrod and Regional Meat Group, an entity flagged in previous reports related to suspected organised retail crime. AI analysis identified multiple references to Garrod in theft reports involving high-value meat products, correlating with known Regional Meat Group activity." />
      </Typography.Text>
    </Card>
  </>
);

export default AiBusinesses;
