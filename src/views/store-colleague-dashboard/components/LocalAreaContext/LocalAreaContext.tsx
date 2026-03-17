import { KpiStatCard } from '#/components/dashboard-widgets';
import { Card, Col, List, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { StoreColleagueDashboardQuery } from '../../graphql/queries/__generated__/store-colleague-dashboard.generated';

interface LocalAreaContextProps {
  context:
    | StoreColleagueDashboardQuery['storeColleagueDashboard']['localAreaContext']
    | null
    | undefined;
  loading: boolean;
}

const LocalAreaContext: React.FC<LocalAreaContextProps> = ({
  context,
  loading,
}) => {
  const intl = useIntl();

  if (!loading && !context) return null;

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Local Area Context' })}
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col sm={12} xs={24}>
          <KpiStatCard
            loading={loading}
            title={intl.formatMessage({
              defaultMessage: 'Scheme Incidents (Week)',
            })}
            value={context?.schemeIncidentsThisWeek ?? null}
          />
        </Col>
        <Col sm={12} xs={24}>
          <KpiStatCard
            loading={loading}
            title={intl.formatMessage({
              defaultMessage: 'Scheme Active Offenders',
            })}
            value={context?.schemeActiveOffenders ?? null}
          />
        </Col>
      </Row>
      {context?.topSchemeOffenders && context.topSchemeOffenders.length > 0 && (
        <>
          <Typography.Title level={5}>
            {intl.formatMessage({ defaultMessage: 'Top Scheme Offenders' })}
          </Typography.Title>
          <List
            dataSource={context.topSchemeOffenders.slice(0, 3)}
            renderItem={(o, idx) => (
              <List.Item>
                <Typography.Text style={{ minWidth: 24 }} type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: '{n}.' },
                    { n: idx + 1 }
                  )}
                </Typography.Text>
                <Typography.Text style={{ flex: 1, marginLeft: 8 }}>
                  {o.name ?? intl.formatMessage({ defaultMessage: 'Unknown' })}
                </Typography.Text>
                <Typography.Text strong>{o.incidentCount}</Typography.Text>
              </List.Item>
            )}
            size="small"
          />
        </>
      )}
    </Card>
  );
};

export default LocalAreaContext;
