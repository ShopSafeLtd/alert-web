import React from 'react';
import { Col, Row, Typography, Card } from 'antd';

import { FormattedMessage } from 'react-intl';
import type { SchemeSharingQuery } from 'graphql/generated';

const { Title, Text } = Typography;

interface Props {
  data: SchemeSharingQuery | undefined;
  loading: boolean;
}

const SchemeDetail = ({ data, loading }: Props): JSX.Element => (
  <div className="list-view">
    <Row style={{ margin: 15 }}>
      <Col>
        <Title level={3}>
          <FormattedMessage
            defaultMessage="Scheme Sharing Settings"
            id="j+w+xC"
          />
        </Title>
      </Col>
    </Row>
    <Card>
      <Title level={3}>
        <FormattedMessage defaultMessage="Connected Schemes" id="Mjpea9" />
      </Title>
      <Text>
        <FormattedMessage
          defaultMessage="Conencted schemes allow for sharing of incidents, offenders, vehicles and crime groups where data is shared directly instead of duplicated. This allows you have central data that is avaliable across these connected schemes."
          id="GK8ull"
        />
      </Text>
      {loading ? (
        <div>
          {data?.scheme.connectedToSchemes.map((scheme) => (
            <div key={scheme.id}>{scheme.name}</div>
          ))}
        </div>
      ) : undefined}
    </Card>
  </div>
);
export default SchemeDetail;
