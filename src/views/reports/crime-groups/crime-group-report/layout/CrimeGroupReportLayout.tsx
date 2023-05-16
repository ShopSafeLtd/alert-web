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
import useStyles from '../../../styles/report.styles';
import type { CrimeGroupReportQuery } from '../../../../../graphql/generated';
import MultiBarGraph from '../../../../../components/reports/graphs/multiBarGraph';
import type { AllowedValue, Elements } from '../../../types';
import { MetaData } from '../../../types';

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
            <Title level={4}>Incidents Summary</Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title="Last Incident (in range)"
              value={
                data?.crimeGroupReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.crimeGroupReport?.incidentSummary?.lastIncidentDate
                    ).toLocaleDateString()
                  : 'unknown'
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
              title="Reported to Police"
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
              title="Police Attended"
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
              title="Most common crime type"
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
            <Title level={4}>Loss Summary</Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title="Total lost value"
              value={
                data?.crimeGroupReport?.lossTotals?.totalLostValue
                  ? `£${data?.crimeGroupReport?.lossTotals?.totalLostValue.toFixed(
                      2
                    )}`
                  : 'No Losses'
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
              title="Total recovered value"
              value={
                data?.crimeGroupReport?.lossTotals?.totalRecoveredValue
                  ? `£${data?.crimeGroupReport?.lossTotals?.totalRecoveredValue.toFixed(
                      2
                    )}`
                  : 'No Recoveries'
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
              title="Average Success Rate"
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
              title="Average Loss per Incident"
              value={
                `£${data?.crimeGroupReport?.lossTotals?.averagePerIncident.toFixed(
                  2
                )}` || ''
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faMoneyBill}
                />
              }
            />
          </Row>
        </Row>{' '}
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
        <Title level={4}>Offenders</Title>
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
        title="Crime Types"
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
          emptyLabel="No crime types or offenders"
        />
      </Card>
    ),
    offenderGoodsTypeValue: (
      <Card
        title="Crime Types"
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
          emptyLabel="No crime types or offenders"
        />
      </Card>
    ),
    goodsTypeLossRecoveredRadial: (
      <Card
        title="Loss/Recovered by Goods Type"
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
          data={data?.crimeGroupReport?.goodsTypeLossRecovered}
          emptyLabel="No Crime Types"
        />
      </Card>
    ),
    incidentTimeOfDayDonut: (
      <Card
        title="Incidents Time of Day"
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
            data={data?.crimeGroupReport?.incidentTimeOfDayDonut}
            emptyLabel="No goods count"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.crimeGroupReport?.incidentTimeOfDayDonut}
            emptyLabel="No goods count"
            labelFormat="Incidents"
          />
        )}
      </Card>
    ),
    incidentMonthDonut: (
      <Card
        title="Incidents Month"
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
            emptyLabel="No incidents"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.crimeGroupReport?.incidentMonthGraph}
            emptyLabel="No incidents"
            labelFormat="Incidents"
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
          label="Incidents by day of week"
          data={data?.crimeGroupReport?.incidentDayOfWeekGraph}
          dataLabel="incidents"
          emptyLabel="No incidents"
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
        <Title level={4}>Incidents</Title>
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
        <Title level={4}>Targeted Business</Title>
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
        <Title level={4}>Targeted Goods</Title>
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
          label="Incidents heatmap"
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
                    key: (address?.name || '') + i,
                    position: {
                      lat: address?.coords?.lat || 0,
                      lng: address?.coords?.lng || 0,
                    },
                  })
                )
              : undefined
          }
          emptyLabel="No incidents"
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
        <Typography.Paragraph>Page 1</Typography.Paragraph>
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
        <Typography.Paragraph>Page 2</Typography.Paragraph>
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
