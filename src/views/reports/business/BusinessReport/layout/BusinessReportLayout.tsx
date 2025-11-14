import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import type { TargetedBusinessReportQuery } from 'graphql/reports/queries/__generated__/business-report.generated';
import type RGL from 'react-grid-layout';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCalendar,
  faChartBar,
  faChartLineDown,
  faChartPie,
  faClipboard,
  faMoneyBill,
  faTrash,
  faUserPolice,
  faUserPoliceTie,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { BarGraph, DonutGraph, LineGraph } from 'components/reports/graphs';
import {
  IncidentsColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { AllowedValue, Elements, MetaData } from '../../../types';

import RadialGraph from '../../../../../components/reports/graphs/radialGraph';
import useStyles from '../../../styles/report.styles';

const { Title } = Typography;

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  data: TargetedBusinessReportQuery | undefined;
  editMode: boolean;
  incidentsTableData: [] | IncidentsTableData[];

  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  margin: [number, number];
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  rowHeight: number;
  setMetadata: (arg0: MetaData[]) => void;
  targetedGoodsData: [] | TargetedGoodsTableData[];
}
const BusinessReport = ({
  changeSize,
  data,
  editMode,
  incidentsTableData,
  isPrinting,
  layout,
  loading,
  margin,
  metadata,
  removeItem,
  rowHeight,
  setMetadata,
  targetedGoodsData,
}: Props) => {
  const classes = useStyles();
  const calculateHeight = (key: string, offset?: number) => {
    const targetElement = layout.find((element) => element.i === key);
    const targetH = targetElement ? targetElement.h : 0;
    return `${
      rowHeight * targetH + margin[1] * (targetH - 1) - (offset || 0)
    }px`;
  };
  const currency = useAtomValue(currencyAtom);

  const intl = useIntl();

  const components: Elements = {
    crimeTypesDonut: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="crimeTypesDonut"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesDonut') }}
        title={intl.formatMessage({
          defaultMessage: 'Incident Types',
        })}
      >
        <Button
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'crimeTypesDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'crimeTypesDonut') {
                if (item.type === 'donut') return { ...item, type: 'pie' };
                return { ...item, type: 'donut' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('crimeTypesDonut')}
          shape="circle"
          size="small"
          type="text"
        />
        {metadata.find((item) => item.key === 'crimeTypesDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'crimeTypesDonut')?.type ===
          'pie' ? (
          <DonutGraph
            data={data?.businessReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incident Types',
            })}
            isPrinting={isPrinting}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.businessReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incident Types',
            })}
            isPrinting={isPrinting}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),
    goodsTypeLossRecoveredRadial: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="goodsTypeLossRecoveredRadial"
        loading={loading}
        style={{
          height: calculateHeight('goodsTypeLossRecoveredRadial'),
          pageBreakBefore: 'always',
        }}
        title={intl.formatMessage({
          defaultMessage: 'Loss/Recovered by Goods Type',
        })}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('goodsTypeLossRecoveredRadial')}
          shape="circle"
          size="small"
          type="text"
        />
        <RadialGraph
          data={data?.businessReport?.goodsTypeLossRecovered}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types',
          })}
          isPrinting={isPrinting}
        />
      </Card>
    ),

    incidentMonthDonut: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="incidentMonthDonut"
        loading={loading}
        style={{ height: calculateHeight('incidentMonthDonut') }}
        title={intl.formatMessage({
          defaultMessage: 'Incidents Month',
        })}
      >
        <Button
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'incidentMonthDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'incidentMonthDonut') {
                if (item.type === 'donut') return { ...item, type: 'pie' };
                return { ...item, type: 'donut' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('incidentMonthDonut')}
          shape="circle"
          size="small"
          type="text"
        />
        {metadata.find((item) => item.key === 'incidentMonthDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'incidentMonthDonut')?.type ===
          'pie' ? (
          <DonutGraph
            data={data?.businessReport?.incidentMonthGraph}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No incidents',
            })}
            isPrinting={isPrinting}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.businessReport?.incidentMonthGraph}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No incidents',
            })}
            isPrinting={isPrinting}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),
    incidentTimeOfDayDonut: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="incidentTimeOfDayDonut"
        loading={loading}
        style={{ height: calculateHeight('incidentTimeOfDayDonut') }}
        title={intl.formatMessage({
          defaultMessage: 'Incidents Time of Day',
        })}
      >
        <Button
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'incidentTimeOfDayDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'incidentTimeOfDayDonut') {
                if (item.type === 'donut') return { ...item, type: 'pie' };
                return { ...item, type: 'donut' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('incidentTimeOfDayDonut')}
          shape="circle"
          size="small"
          type="text"
        />
        {metadata.find((item) => item.key === 'incidentTimeOfDayDonut')
          ?.type === 'donut' ||
        metadata.find((item) => item.key === 'incidentTimeOfDayDonut')?.type ===
          'pie' ? (
          <DonutGraph
            data={data?.businessReport?.incidentTimeOfDayDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No goods count',
            })}
            isPrinting={isPrinting}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.businessReport?.incidentTimeOfDayDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No goods count',
            })}
            isPrinting={isPrinting}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),
    incidentsDayOfWeekGraph: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="incidentsDayOfWeekGraph"
        loading={loading}
        style={{ height: calculateHeight('incidentsDayOfWeekGraph') }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('incidentsDayOfWeekGraph')}
          shape="circle"
          size="small"
          type="text"
        />
        <LineGraph
          data={data?.businessReport?.incidentDayOfWeekGraph}
          dataLabel={intl.formatMessage({
            defaultMessage: 'incidents',
          })}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents by day of week',
          })}
        />
      </Card>
    ),
    incidentsSummary: (
      <Card
        bodyStyle={{ width: '100%' }}
        key="incidentsSummary"
        loading={loading}
        style={{ width: '100%' }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('incidentsSummary')}
          shape="circle"
          size="small"
          type="text"
        />
        <Row>
          <Col span={12}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Incidents Summary',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUserPolice}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Total Incidents',
              })}
              value={data?.businessReport?.incidentSummary?.totalIncidents || 0}
            />
            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faCalendar}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Last Incident (in range)',
              })}
              value={
                data?.businessReport?.incidentSummary?.lastIncidentDate
                  ? dayjs(
                      data?.businessReport?.incidentSummary?.lastIncidentDate
                    ).format('DD/MM/YYYY')
                  : intl.formatMessage({
                      defaultMessage: 'unknown',
                    })
              }
            />

            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUserPolice}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Reported to Police',
              })}
              value={
                data?.businessReport?.incidentSummary
                  ?.incidentsReportedToPolice || 0
              }
            />

            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUserPoliceTie}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Police Attended',
              })}
              value={
                data?.businessReport?.incidentSummary
                  ?.incidentsWherePoliceAttended || 0
              }
            />

            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faClipboard}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Most common incident type',
              })}
              value={
                data?.businessReport?.incidentSummary?.mostCommonCrimeType || ''
              }
            />
          </Row>
        </Row>
      </Card>
    ),

    incidentsTable: (
      <Card
        bodyStyle={{ overflow: 'auto' }}
        className="no-break"
        key="incidentsTable"
        loading={loading}
        style={{ height: calculateHeight('incidentsTable') }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('incidentsTable')}
          shape="circle"
          size="small"
          type="text"
        />
        <Title level={4}>
          {intl.formatMessage({ defaultMessage: 'Incidents' })}
        </Title>
        <Table
          className="no-break"
          columns={IncidentsColumns}
          dataSource={incidentsTableData}
          pagination={{
            defaultPageSize: 10,
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${intl.formatMessage({
                defaultMessage: 'of',
              })} ${total}`,
            total: data?.businessReport?.incidentsTable?.total || 0,
          }}
          size="small"
        />
      </Card>
    ),

    involvedTagsDonut: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="involvedTagsDonut"
        loading={loading}
        style={{ height: calculateHeight('involvedTagsDonut') }}
        title={intl.formatMessage({
          defaultMessage: 'Involved Tags',
        })}
      >
        <Button
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'involvedTagsDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'involvedTagsDonut') {
                if (item.type === 'donut') return { ...item, type: 'pie' };
                return { ...item, type: 'donut' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('involvedTagsDonut')}
          shape="circle"
          size="small"
          type="text"
        />

        {metadata.find((item) => item.key === 'involvedTagsDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'involvedTagsDonut')?.type ===
          'pie' ? (
          <DonutGraph
            data={data?.businessReport?.involvedTagDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Involved Tags',
            })}
            isPrinting={isPrinting}
            type={
              metadata.find((item) => item.key === 'involvedTagsDonut')
                ?.type as 'donut' | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.businessReport?.involvedTagDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Involved Tags',
            })}
            isPrinting={isPrinting}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),

    lossSummary: (
      <Card
        bodyStyle={{ width: '100%' }}
        key="lossSummary"
        loading={loading}
        style={{ width: '100%' }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('lossSummary')}
          shape="circle"
          size="small"
          type="text"
        />
        <Row>
          <Col span={12}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Loss Summary',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  color="red"
                  icon={faMoneyBill}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Total lost value',
              })}
              value={
                data?.businessReport?.lossTotals?.totalLostValue
                  ? intl.formatNumber(
                      data?.businessReport?.lossTotals?.totalLostValue || 0,
                      {
                        currency,
                        style: 'currency',
                      }
                    )
                  : intl.formatMessage({
                      defaultMessage: 'No Losses',
                    })
              }
            />
            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  color="green"
                  icon={faMoneyBill}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Total recovered value',
              })}
              value={
                data?.businessReport?.lossTotals?.totalRecoveredValue
                  ? intl.formatNumber(
                      data?.businessReport?.lossTotals?.totalRecoveredValue ||
                        0,
                      {
                        currency,
                        style: 'currency',
                      }
                    )
                  : intl.formatMessage({
                      defaultMessage: 'No Recoveries',
                    })
              }
            />
            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faChartLineDown}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Average Loss Rate',
              })}
              value={`${(
                (data?.businessReport?.lossTotals?.averageSuccessRate || 0) *
                100
              ).toFixed(2)}%`}
            />
            <Statistic
              className={classes.stats}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faMoneyBill}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Average Loss per Incident',
              })}
              value={intl.formatNumber(
                data?.businessReport?.lossTotals?.averagePerIncident || 0,
                {
                  currency,
                  style: 'currency',
                }
              )}
            />
          </Row>
        </Row>
      </Card>
    ),

    pageBreak: (
      <div
        className="page-break"
        key="pageBreak"
        style={{
          borderBottom: '1px solid grey',
          display: isPrinting ? 'none' : 'block',
          height: '100%',
          zIndex: 100,
        }}
      >
        <Typography.Paragraph>
          {intl.formatMessage({ defaultMessage: 'Page 1' })}
        </Typography.Paragraph>
      </div>
    ),

    pageBreak2: (
      <div
        className="page-break"
        key="pageBreak2"
        style={{
          borderBottom: '1px solid grey',
          display: isPrinting ? 'none' : 'block',
          height: '100%',
          zIndex: 100,
        }}
      >
        <Typography.Paragraph>
          {intl.formatMessage({ defaultMessage: 'Page 2' })}
        </Typography.Paragraph>
      </div>
    ),

    pageBreak3: (
      <div
        className="page-break"
        key="pageBreak3"
        style={{
          borderBottom: '1px solid grey',
          display: isPrinting ? 'none' : 'block',
          height: '100%',
          zIndex: 100,
        }}
      >
        <Typography.Paragraph>
          {intl.formatMessage({ defaultMessage: 'Page 3' })}
        </Typography.Paragraph>
      </div>
    ),
    pageBreak4: (
      <div
        className="page-break"
        key="pageBreak4"
        style={{
          borderBottom: '1px solid grey',
          display: isPrinting ? 'none' : 'block',
          height: '100%',
          zIndex: 100,
        }}
      >
        <Typography.Paragraph>
          {intl.formatMessage({ defaultMessage: 'Page 4' })}
        </Typography.Paragraph>
      </div>
    ),
    targetedGoodsTable: (
      <Card
        bodyStyle={{ overflow: 'auto' }}
        className="no-break"
        key="targetedGoodsTable"
        loading={loading}
        style={{ height: calculateHeight('targetedGoodsTable') }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('targetedGoodsTable')}
          shape="circle"
          size="small"
          type="text"
        />
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Targeted Goods',
          })}
        </Title>
        <Table
          className="no-break"
          columns={TargetGoodsColumns}
          dataSource={targetedGoodsData}
          pagination={{
            defaultPageSize: 10,
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('targetedGoodsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${intl.formatMessage({
                defaultMessage: 'of',
              })} ${total}`,
            total: data?.businessReport?.targetedGoods?.total,
          }}
          size="small"
        />
      </Card>
    ),
  };

  return useMemo(
    () => layout.map((component) => components[component.i as AllowedValue]),
    [layout, data, loading, incidentsTableData, targetedGoodsData, metadata]
  );
};
export default BusinessReport;
