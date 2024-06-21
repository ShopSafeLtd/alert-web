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
import {
  BarGraph,
  DonutGraph,
  HeatMapGoogle,
  LineGraph,
} from 'components/reports/graphs';
import { shouldPrint } from 'utils';
import type {
  IncidentsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  IncidentsColumns,
  OffenderColumns,
  TargetedBusinessColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import RadialGraph from 'components/reports/graphs/radialGraph';
import { useIntl } from 'react-intl';
import useStyles from '../../../styles/report.styles';

import MultiBarGraph from '../../../../../components/reports/graphs/multiBarGraph';
import type { AllowedValue, Elements, MetaData } from '../../../types';
import type { CrimeGroupReportQuery } from 'graphql/reports/queries/crime-group-report.generated';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: CrimeGroupReportQuery | undefined;
  incidentsTableData: IncidentsTableData[] | [];
  metadata: MetaData[];
  setMetadata: (arg0: MetaData[]) => void;
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  offendersTableData: OffenderTableData[] | [];
  removeItem: (arg0: string) => void;
  layout: RGL.Layout[];
  margin: [number, number];
  rowHeight: number;
  editMode: boolean;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
}
const CrimeGroupReport = ({
  loading,
  data,
  offendersTableData,
  targetedBusinessData,
  targetedGoodsData,
  removeItem,
  changeSize,
  layout,
  margin,
  rowHeight,
  editMode,
  isPrinting,
  metadata,
  setMetadata,
  incidentsTableData,
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
                defaultMessage: 'Last Incident (in range)',
              })}
              value={
                data?.crimeGroupReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.crimeGroupReport?.incidentSummary?.lastIncidentDate
                    ).toLocaleDateString()
                  : intl.formatMessage({
                      defaultMessage: 'Unknown',
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
                data?.crimeGroupReport?.incidentSummary
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
                data?.crimeGroupReport?.incidentSummary
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
                defaultMessage: 'Most Common Crime Type',
              })}
              value={
                data?.crimeGroupReport?.incidentSummary?.mostCommonCrimeType ||
                ''
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
                defaultMessage: 'Total Lost Value',
              })}
              value={
                data?.crimeGroupReport?.lossTotals?.totalLostValue
                  ? `£${data?.crimeGroupReport?.lossTotals?.totalLostValue.toFixed(
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
                defaultMessage: 'Total Recovered Value',
              })}
              value={
                data?.crimeGroupReport?.lossTotals?.totalRecoveredValue
                  ? `£${data?.crimeGroupReport?.lossTotals?.totalRecoveredValue.toFixed(
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
                (data?.crimeGroupReport?.lossTotals?.averageSuccessRate || 0) *
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
                defaultMessage: 'Average Loss Per Incident',
              })}
              value={
                `£${(
                  data?.crimeGroupReport?.lossTotals?.averagePerIncident || 0
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
    offendersTable: (
      <Card
        loading={loading}
        className="no-break"
        key="offendersTable"
        style={{ height: calculateHeight('offendersTable') }}
        bodyStyle={{ overflow: 'auto' }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('offendersTable')}
        />
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Offenders',
          })}
        </Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            onChange: (_, pageSize) => {
              changeSize('offendersTable', pageSize);
            },
            total: data?.offendersPerformance?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={OffenderColumns}
          dataSource={offendersTableData}
        />
      </Card>
    ),
    crimeTypesByOffender: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Crime Types',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesByOffender') }}
        bodyStyle={{ height: '90%' }}
        key="crimeTypesByOffender"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('crimeTypesByOffender')}
        />
        <MultiBarGraph
          data={data?.crimeGroupReport?.crimeTypeByOffender}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Crime Types or Offenders',
          })}
        />
      </Card>
    ),
    offenderGoodsTypeValue: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Crime Types',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('offenderGoodsTypeValue') }}
        bodyStyle={{ height: '90%' }}
        key="offenderGoodsTypeValue"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('offenderGoodsTypeValue')}
        />
        <MultiBarGraph
          data={data?.crimeGroupReport?.offenderGoodsTypeValue}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Crime Types or Offenders',
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
          data={data?.crimeGroupReport?.goodsTypeLossRecovered}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Crime Types or Offenders',
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
            data={data?.crimeGroupReport?.incidentTimeOfDayDonut}
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
            data={data?.crimeGroupReport?.incidentTimeOfDayDonut}
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
          defaultMessage: 'Incidents by Month',
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
            data={data?.crimeGroupReport?.incidentMonthGraph}
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
            data={data?.crimeGroupReport?.incidentMonthGraph}
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
            defaultMessage: 'Incidents by Day of Week',
          })}
          data={data?.crimeGroupReport?.incidentDayOfWeekGraph}
          dataLabel={intl.formatMessage({
            defaultMessage: 'Incidents',
          })}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
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
          {intl.formatMessage({
            defaultMessage: 'Incidents',
          })}
        </Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            total: data?.crimeGroupReport?.incidentsTable?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={IncidentsColumns}
          dataSource={incidentsTableData}
        />
      </Card>
    ),
    targetedBusinessTable: (
      <Card
        loading={loading}
        className="no-break"
        style={{ height: calculateHeight('targetedBusinessTable') }}
        bodyStyle={{ overflow: 'auto' }}
        key="targetedBusinessTable"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('targetedBusinessTable')}
        />
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Targeted Businesses',
          })}
        </Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            onChange: (_, pageSize) => {
              changeSize('targetedBusinessTable', pageSize);
            },
            total:
              data?.businessContribution?.businessContributions?.filter(
                (business) => business.totalIncidents > 0
              ).length || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={TargetedBusinessColumns}
          dataSource={targetedBusinessData}
        />
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
            onChange: (_, pageSize) => {
              changeSize('targetedGoodsTable', pageSize);
            },
            total:
              data?.targetedGoods?.targetedGoods?.filter(
                (business) => business.totalIncidents > 0
              ).length || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={TargetGoodsColumns}
          dataSource={targetedGoodsData}
        />
      </Card>
    ),
    incidentsHeatMap: (
      <Card
        className={`${shouldPrint(
          data?.crimeGroupReport?.crimeGroupMap?.incidentsCoords,
          data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers?.length
        )} no-break`}
        loading={loading}
        key="incidentsHeatMap"
        style={{ height: calculateHeight('incidentsHeatMap') }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentsHeatMap')}
        />
        <HeatMapGoogle
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents Heat Map',
          })}
          data={
            data?.crimeGroupReport?.crimeGroupMap?.incidentsCoords
              ?.filter((incident) => incident?.lat && incident?.lng)
              .map((incident) => ({
                geoLat: incident?.lat || 0,
                geoLng: incident?.lng || 0,
              })) || []
          }
          markers={
            data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers &&
            data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers.length > 0
              ? data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers.map(
                  (address, i) => ({
                    label: address?.name || '',
                    key: (address?.name || '') + i.toString(),
                    position: {
                      lat: address?.coords?.lat || 0,
                      lng: address?.coords?.lng || 0,
                    },
                  })
                )
              : undefined
          }
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents to display',
          })}
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
          {intl.formatMessage({
            defaultMessage: 'Page 1',
          })}
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
          {intl.formatMessage({
            defaultMessage: 'Page 2',
          })}
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
    [
      layout,
      data,
      loading,
      offendersTableData,
      incidentsTableData,
      targetedBusinessData,
      targetedGoodsData,
      isPrinting,
    ]
  );
};
export default CrimeGroupReport;
