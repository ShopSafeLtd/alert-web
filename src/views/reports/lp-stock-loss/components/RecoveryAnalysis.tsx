import type { AgChartOptions } from 'ag-charts-community';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreState } from '#/state';
import { AgCharts } from 'ag-charts-react';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { LpStockLossReportQuery } from '../graphql/__generated__/lp-stock-loss-report.generated';

type RecoveryAnalysisData =
  LpStockLossReportQuery['lpStockLossReport']['recoveryAnalysis'];

interface RecoveryAnalysisProps {
  data: RecoveryAnalysisData;
  loading: boolean;
}

const RecoveryAnalysis: React.FC<RecoveryAnalysisProps> = ({
  data,
  loading,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const theme = darkMode ? 'ag-default-dark' : 'ag-default';

  const byGoodsTypeOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        { position: 'bottom', type: 'number' },
        { position: 'left', type: 'category' },
      ],
      data: [...(data?.byGoodsType ?? [])].sort(
        (a, b) => b.recoveryRate - a.recoveryRate
      ),
      series: [
        {
          direction: 'horizontal',
          fill: '#52c41a',
          stroke: '#52c41a',
          type: 'bar',
          xKey: 'name',
          yKey: 'recoveryRate',
          yName: intl.formatMessage({ defaultMessage: 'Recovery Rate' }),
        },
      ],
      theme,
    }),
    [data, intl, theme]
  );

  const byBusinessOptions: AgChartOptions = useMemo(
    () => ({
      axes: [
        {
          label: {
            formatter: ({ value }: { value: number }) =>
              intl.formatNumber(value, {
                currency,
                notation: 'compact',
                style: 'currency',
              }),
          },
          position: 'bottom',
          title: { text: intl.formatMessage({ defaultMessage: 'Value Lost' }) },
          type: 'number',
        },
        {
          label: {
            formatter: ({ value }: { value: number }) =>
              `${(value * 100).toFixed(0)}%`,
          },
          max: 1,
          min: 0,
          position: 'left',
          title: {
            text: intl.formatMessage({ defaultMessage: 'Recovery Rate' }),
          },
          type: 'number',
        },
      ],
      data: (data?.byBusiness ?? []).filter((b) => b.recoveryRate > 0),
      series: [
        {
          fill: '#1890ff',
          marker: { fill: '#1890ff', size: 8, stroke: '#1890ff' },
          stroke: '#1890ff',
          tooltip: {
            renderer: ({
              datum,
            }: {
              datum: {
                name: string;
                recoveryRate: number;
                totalValueLost: number;
              };
            }) => ({
              content: `${intl.formatMessage({ defaultMessage: 'Value Lost' })}: ${intl.formatNumber(datum.totalValueLost, { currency, style: 'currency' })}\n${intl.formatMessage({ defaultMessage: 'Recovery Rate' })}: ${(datum.recoveryRate * 100).toFixed(1)}%`,
              title: datum.name,
            }),
          },
          type: 'scatter',
          xKey: 'totalValueLost',
          yKey: 'recoveryRate',
        },
      ],
      theme,
    }),
    [data, currency, intl, theme]
  );

  if (loading && !data) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (!data) {
    return (
      <Empty
        description={intl.formatMessage({
          defaultMessage: 'No data available',
        })}
      />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col lg={12} style={{ display: 'flex' }} xs={24}>
        <Card
          style={{ flex: 1 }}
          title={intl.formatMessage({
            defaultMessage: 'Recovery by Goods Type',
          })}
        >
          {data.byGoodsType.length === 0 ? (
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'No data available',
              })}
            />
          ) : (
            <div style={{ height: 400 }}>
              <AgCharts options={byGoodsTypeOptions} />
            </div>
          )}
        </Card>
      </Col>

      <Col lg={12} style={{ display: 'flex' }} xs={24}>
        <Card
          style={{ flex: 1 }}
          title={intl.formatMessage({ defaultMessage: 'Recovery by Business' })}
        >
          {data.byBusiness.length === 0 ? (
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'No data available',
              })}
            />
          ) : (
            <div style={{ height: 400 }}>
              <AgCharts options={byBusinessOptions} />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default RecoveryAnalysis;

interface RecoveryItemsSummaryProps {
  data: RecoveryAnalysisData;
}

export const RecoveryItemsSummary: React.FC<RecoveryItemsSummaryProps> = ({
  data,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  if (
    !data ||
    (data.zeroRecoveryItems.length === 0 &&
      data.highestAbsoluteRecoveryItems.length === 0)
  ) {
    return null;
  }

  return (
    <Card>
      <Row gutter={[32, 16]}>
        {data.zeroRecoveryItems.length > 0 && (
          <Col md={12} xs={24}>
            <div
              style={{
                alignItems: 'baseline',
                display: 'flex',
                gap: 8,
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <Typography.Text strong>
                {intl.formatMessage({
                  defaultMessage: 'Items with Zero Recovery',
                })}
              </Typography.Text>
              <Button
                onClick={() => {
                  const header = 'Name,SKU,Stock Item ID,Value Lost\n';
                  const rows = data.zeroRecoveryItems
                    .map(
                      (item) =>
                        `"${item.name ?? ''}","${item.sku ?? ''}","${item.stockItemId}",${item.totalValueLost}`
                    )
                    .join('\n');
                  const blob = new Blob([header + rows], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'zero-recovery-items.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                size="small"
                type="default"
              >
                {intl.formatMessage({ defaultMessage: 'Download CSV' })}
              </Button>
            </div>
            <Typography.Text type="secondary">
              {intl.formatMessage(
                {
                  defaultMessage:
                    '{count} items with a combined value of {value} were lost with no recovery.',
                },
                {
                  count: data.zeroRecoveryItems.length,
                  value: intl.formatNumber(
                    data.zeroRecoveryItems.reduce(
                      (sum, i) => sum + i.totalValueLost,
                      0
                    ),
                    { currency, style: 'currency' }
                  ),
                }
              )}
            </Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 16 }}>
              {[...data.zeroRecoveryItems]
                .sort((a, b) => b.totalValueLost - a.totalValueLost)
                .slice(0, 5)
                .map((item) => (
                  <li key={item.stockItemId}>
                    <Typography.Text type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: '{name} — {value}' },
                        {
                          name: item.name ?? item.sku ?? item.stockItemId,
                          value: intl.formatNumber(item.totalValueLost, {
                            currency,
                            style: 'currency',
                          }),
                        }
                      )}
                    </Typography.Text>
                  </li>
                ))}
            </ul>
          </Col>
        )}

        {data.zeroRecoveryItems.length > 0 &&
          data.highestAbsoluteRecoveryItems.length > 0 && (
            <Col md={0} xs={24}>
              <Divider style={{ margin: 0 }} />
            </Col>
          )}

        {data.highestAbsoluteRecoveryItems.length > 0 && (
          <Col md={12} xs={24}>
            <Typography.Text
              strong
              style={{ display: 'block', marginBottom: 12 }}
            >
              {intl.formatMessage({ defaultMessage: 'Highest Recovery Items' })}
            </Typography.Text>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {data.highestAbsoluteRecoveryItems.map((item) => (
                <li key={item.stockItemId}>
                  <Typography.Text type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: '{name} — {value}' },
                      {
                        name: item.name ?? item.sku ?? item.stockItemId,
                        value: intl.formatNumber(item.totalValueLost, {
                          currency,
                          style: 'currency',
                        }),
                      }
                    )}
                  </Typography.Text>
                </li>
              ))}
            </ul>
          </Col>
        )}
      </Row>
    </Card>
  );
};
