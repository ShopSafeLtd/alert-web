import { Button, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React, { useMemo } from 'react';
import type RGL from 'react-grid-layout';
import { BarGraph, DonutGraph, LineGraph } from 'components/reports/graphs';
import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  IncidentsColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import { useIntl } from 'react-intl';
import useStyles from '../../../styles/report.styles';
import RadialGraph from '../../../../../components/reports/graphs/radialGraph';

import type { AllowedValue, Elements, MetaData } from '../../../types';
import type { TargetedBusinessReportQuery } from 'graphql/reports/queries/business-report.generated';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: TargetedBusinessReportQuery | undefined;
  targetedGoodsData: TargetedGoodsTableData[] | [];
  incidentsTableData: IncidentsTableData[] | [];

  removeItem: (arg0: string) => void;
  layout: RGL.Layout[];
  margin: [number, number];
  rowHeight: number;
  editMode: boolean;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
  metadata: MetaData[];
  setMetadata: (arg0: MetaData[]) => void;
}
const BusinessReport = ({
  loading,
  data,
  targetedGoodsData,
  removeItem,
  changeSize,
  layout,
  margin,
  rowHeight,
  isPrinting,
  editMode,
  incidentsTableData,
  metadata,
  setMetadata,
}: Props) => {
  const classes = useStyles();
  const calculateHeight = (key: string, offset?: number) => {
    const targetElement = layout.find((element) => element.i === key);
    const targetH = targetElement ? targetElement.h : 0;
    return `${
      rowHeight * targetH + margin[1] * (targetH - 1) - (offset || 0)
    }px`;
  };

  const intl = useIntl();
  const components: Elements = {
    incidentsSummary: (
      <Card
        style={{ width: '100%' }}
        bodyStyle={{ width: '100%' }}
        loading={loading}
        key="incidentsSummary"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentsSummary')}
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
              title={intl.formatMessage({
                defaultMessage: 'Total Incidents',
              })}
              value={data?.businessReport?.incidentSummary?.totalIncidents || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUserPolice}
                />
              }
            />
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Last Incident (in range)',
              })}
              value={
                data?.businessReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.businessReport?.incidentSummary?.lastIncidentDate
                    ).toLocaleDateString()
                  : intl.formatMessage({
                      defaultMessage: 'unknown',
                    })
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faCalendar}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Reported to Police',
              })}
              value={
                data?.businessReport?.incidentSummary
                  ?.incidentsReportedToPolice || 0
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUserPolice}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Police Attended',
              })}
              value={
                data?.businessReport?.incidentSummary
                  ?.incidentsWherePoliceAttended || 0
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUserPoliceTie}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Most common crime type',
              })}
              value={
                data?.businessReport?.incidentSummary?.mostCommonCrimeType || ''
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faClipboard}
                />
              }
            />
          </Row>
        </Row>
      </Card>
    ),
    lossSummary: (
      <Card
        style={{ width: '100%' }}
        bodyStyle={{ width: '100%' }}
        loading={loading}
        key="lossSummary"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('lossSummary')}
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
              title={intl.formatMessage({
                defaultMessage: 'Total lost value',
              })}
              value={
                data?.businessReport?.lossTotals?.totalLostValue
                  ? `£${data?.businessReport?.lossTotals?.totalLostValue.toFixed(
                      2
                    )}`
                  : intl.formatMessage({
                      defaultMessage: 'No Losses',
                    })
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faMoneyBill}
                  color="red"
                />
              }
            />
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Total recovered value',
              })}
              value={
                data?.businessReport?.lossTotals?.totalRecoveredValue
                  ? `£${data?.businessReport?.lossTotals?.totalRecoveredValue.toFixed(
                      2
                    )}`
                  : intl.formatMessage({
                      defaultMessage: 'No Recoveries',
                    })
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faMoneyBill}
                  color="green"
                />
              }
            />
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Average Loss Rate',
              })}
              value={`${(
                (data?.businessReport?.lossTotals?.averageSuccessRate || 0) *
                100
              ).toFixed(2)}%`}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faChartLineDown}
                />
              }
            />
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Average Loss per Incident',
              })}
              value={
                `£${(
                  data?.businessReport?.lossTotals?.averagePerIncident || 0
                ).toFixed(2)}` || ''
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faMoneyBill}
                />
              }
            />
          </Row>
        </Row>
      </Card>
    ),

    crimeTypesDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Crime Types',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesDonut') }}
        bodyStyle={{ height: '90%' }}
        key="crimeTypesDonut"
      >
        <Button
          type="text"
          shape="circle"
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          size="small"
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'crimeTypesDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
        />
        <Button
          type="text"
          shape="circle"
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          size="small"
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
        />
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('crimeTypesDonut')}
        />
        {metadata.find((item) => item.key === 'crimeTypesDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'crimeTypesDonut')?.type ===
          'pie' ? (
          <DonutGraph
            isPrinting={isPrinting}
            data={data?.businessReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Crime Types',
            })}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            isPrinting={isPrinting}
            data={data?.businessReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Crime Types',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),
    involvedTagsDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Involved Tags',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('involvedTagsDonut') }}
        bodyStyle={{ height: '90%' }}
        key="involvedTagsDonut"
      >
        <Button
          type="text"
          shape="circle"
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          size="small"
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'involvedTagsDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
        />
        <Button
          type="text"
          shape="circle"
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          size="small"
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
        />
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('involvedTagsDonut')}
        />

        {metadata.find((item) => item.key === 'involvedTagsDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'involvedTagsDonut')?.type ===
          'pie' ? (
          <DonutGraph
            isPrinting={isPrinting}
            data={data?.businessReport?.involvedTagDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Involved Tags',
            })}
            type={
              metadata.find((item) => item.key === 'involvedTagsDonut')
                ?.type as 'donut' | 'pie'
            }
          />
        ) : (
          <BarGraph
            isPrinting={isPrinting}
            data={data?.businessReport?.involvedTagDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Involved Tags',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),
    incidentsDayOfWeekGraph: (
      <Card
        className="no-break"
        loading={loading}
        key="incidentsDayOfWeekGraph"
        style={{ height: calculateHeight('incidentsDayOfWeekGraph') }}
        bodyStyle={{ height: '90%' }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentsDayOfWeekGraph')}
        />
        <LineGraph
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents by day of week',
          })}
          data={data?.businessReport?.incidentDayOfWeekGraph}
          dataLabel={intl.formatMessage({
            defaultMessage: 'incidents',
          })}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
        />
      </Card>
    ),
    goodsTypeLossRecoveredRadial: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Loss/Recovered by Goods Type',
        })}
        className="no-break"
        loading={loading}
        style={{
          height: calculateHeight('goodsTypeLossRecoveredRadial'),
          pageBreakBefore: 'always',
        }}
        bodyStyle={{ height: '90%' }}
        key="goodsTypeLossRecoveredRadial"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('goodsTypeLossRecoveredRadial')}
        />
        <RadialGraph
          isPrinting={isPrinting}
          data={data?.businessReport?.goodsTypeLossRecovered}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Crime Types',
          })}
        />
      </Card>
    ),

    incidentTimeOfDayDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Incidents Time of Day',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('incidentTimeOfDayDonut') }}
        bodyStyle={{ height: '90%' }}
        key="incidentTimeOfDayDonut"
      >
        <Button
          type="text"
          shape="circle"
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          size="small"
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'incidentTimeOfDayDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
        />
        <Button
          type="text"
          shape="circle"
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          size="small"
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
        />
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentTimeOfDayDonut')}
        />
        {metadata.find((item) => item.key === 'incidentTimeOfDayDonut')
          ?.type === 'donut' ||
        metadata.find((item) => item.key === 'incidentTimeOfDayDonut')?.type ===
          'pie' ? (
          <DonutGraph
            isPrinting={isPrinting}
            data={data?.businessReport?.incidentTimeOfDayDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No goods count',
            })}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            isPrinting={isPrinting}
            data={data?.businessReport?.incidentTimeOfDayDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No goods count',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),

    incidentMonthDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Incidents Month',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('incidentMonthDonut') }}
        bodyStyle={{ height: '90%' }}
        key="incidentMonthDonut"
      >
        <Button
          type="text"
          shape="circle"
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
          size="small"
          onClick={() => {
            const updatedMetadata = metadata.map((item) => {
              if (item.key === 'incidentMonthDonut') {
                return { ...item, type: 'bar' };
              }
              return item;
            }) satisfies MetaData[];
            setMetadata(updatedMetadata);
          }}
        />
        <Button
          type="text"
          shape="circle"
          className="change-graph2 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
          size="small"
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
        />
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentMonthDonut')}
        />
        {metadata.find((item) => item.key === 'incidentMonthDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'incidentMonthDonut')?.type ===
          'pie' ? (
          <DonutGraph
            data={data?.businessReport?.incidentMonthGraph}
            isPrinting={isPrinting}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No incidents',
            })}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.businessReport?.incidentMonthGraph}
            isPrinting={isPrinting}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No incidents',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
      </Card>
    ),

    targetedGoodsTable: (
      <Card
        loading={loading}
        className="no-break"
        style={{ height: calculateHeight('targetedGoodsTable') }}
        bodyStyle={{ overflow: 'auto' }}
        key="targetedGoodsTable"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('targetedGoodsTable')}
        />
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Targeted Goods',
          })}
        </Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('targetedGoodsTable', pageSize);
            },
            total: data?.businessReport?.targetedGoods?.total,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${intl.formatMessage({
                defaultMessage: 'of',
              })} ${total}`,
          }}
          columns={TargetGoodsColumns}
          dataSource={targetedGoodsData}
        />
      </Card>
    ),

    incidentsTable: (
      <Card
        loading={loading}
        className="no-break"
        key="incidentsTable"
        style={{ height: calculateHeight('incidentsTable') }}
        bodyStyle={{ overflow: 'auto' }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentsTable')}
        />
        <Title level={4}>
          {intl.formatMessage({ defaultMessage: 'Incidents' })}
        </Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            total: data?.businessReport?.incidentsTable?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${intl.formatMessage({
                defaultMessage: 'of',
              })} ${total}`,
          }}
          columns={IncidentsColumns}
          dataSource={incidentsTableData}
        />
      </Card>
    ),

    pageBreak: (
      <div
        className="page-break"
        key="pageBreak"
        style={{
          borderBottom: '1px solid grey',
          height: '100%',
          display: isPrinting ? 'none' : 'block',
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
          height: '100%',
          display: isPrinting ? 'none' : 'block',
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
          height: '100%',
          display: isPrinting ? 'none' : 'block',
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
          height: '100%',
          display: isPrinting ? 'none' : 'block',
          zIndex: 100,
        }}
      >
        <Typography.Paragraph>
          {intl.formatMessage({ defaultMessage: 'Page 4' })}
        </Typography.Paragraph>
      </div>
    ),
  };

  return useMemo(
    () => layout.map((component) => components[component.i as AllowedValue]),
    [layout, data, loading, incidentsTableData, targetedGoodsData, metadata]
  );
};
export default BusinessReport;
