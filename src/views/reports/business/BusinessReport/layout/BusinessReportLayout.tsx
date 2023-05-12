import { Button, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChartLineDown,
  faClipboard,
  faMoneyBill,
  faTrash,
  faUserPolice,
  faUserPoliceTie,
} from '@fortawesome/pro-light-svg-icons';
import React, { useMemo } from 'react';
import type RGL from 'react-grid-layout';
import { DonutGraph, LineGraph } from 'components/reports/graphs';
import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  IncidentsColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import useStyles from '../../../styles/report.styles';
import RadialGraph from '../../../../../components/reports/graphs/radialGraph';
import type { TargetedBusinessReportQuery } from '../../../../../graphql/generated';

const { Title } = Typography;

type Elements = {
  [key: string]: JSX.Element;
};

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
                data?.businessReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.businessReport?.incidentSummary?.lastIncidentDate
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
              title="Police Attended"
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
              title="Most common crime type"
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
            <Title level={4}>Loss Summary</Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title="Total lost value"
              value={
                data?.businessReport?.lossTotals?.totalLostValue
                  ? `£${data?.businessReport?.lossTotals?.totalLostValue.toFixed(
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
                data?.businessReport?.lossTotals?.totalRecoveredValue
                  ? `£${data?.businessReport?.lossTotals?.totalRecoveredValue.toFixed(
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
              title="Average Loss per Incident"
              value={
                `£${data?.businessReport?.lossTotals?.averagePerIncident.toFixed(
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
    crimeTypesDonut: (
      <Card
        title="Crime Types"
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesDonut') }}
        bodyStyle={{ height: '90%' }}
        key="crimeTypesDonut"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('crimeTypesDonut')}
        />
        <DonutGraph
          data={data?.businessReport?.crimeTypeDonut}
          emptyLabel="No Crime Types"
        />
      </Card>
    ),
    involvedTagsDonut: (
      <Card
        title="Involved Tags"
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('involvedTagsDonut') }}
        bodyStyle={{ height: '90%' }}
        key="involvedTagsDonut"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('involvedTagsDonut')}
        />
        <DonutGraph
          data={data?.businessReport?.involvedTagDonut}
          emptyLabel="No Involved Tags"
        />
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
          data={data?.businessReport?.incidentDayOfWeekGraph}
          dataLabel="incidents"
          emptyLabel="No incidents"
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
          data={data?.businessReport?.goodsTypeLossRecovered}
          emptyLabel="No Crime Types"
        />
      </Card>
    ),

    incidentTimeOfDayDonut: (
      <Card
        title="Incidents Time of Day"
        className="no-break"
        loading={loading}
        key="incidentTimeOfDayDonut"
        style={{ height: calculateHeight('incidentTimeOfDayDonut') }}
        bodyStyle={{ height: '90%' }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentTimeOfDayDonut')}
        />
        <DonutGraph
          data={data?.businessReport?.incidentTimeOfDayDonut}
          emptyLabel="No goods count"
        />
      </Card>
    ),
    incidentMonthDonut: (
      <Card
        title="Incidents Month"
        className="no-break"
        loading={loading}
        key="incidentMonthDonut"
        style={{ height: calculateHeight('incidentMonthDonut') }}
        bodyStyle={{ height: '90%' }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('incidentMonthDonut')}
        />
        <DonutGraph
          data={data?.businessReport?.incidentMonthGraph}
          emptyLabel="No goods values"
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
            total: data?.businessReport?.targetedGoods?.total,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
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
        <Title level={4}>Incidents</Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            total: data?.businessReport?.incidentsTable?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
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
    () => layout.map((component) => components[component.i]),
    [layout, data, loading, incidentsTableData, targetedGoodsData]
  );
};
export default BusinessReport;
