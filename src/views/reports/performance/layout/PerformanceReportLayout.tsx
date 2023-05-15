import { Button, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCar,
  faChartBar,
  faChartLineDown,
  faChartPie,
  faClipboard,
  faComments,
  faExclamationCircle,
  faMoneyBill,
  faPenToSquare,
  faTrash,
  faUserPolice,
  faUserPoliceTie,
  faUsers,
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
  BusinessTableData,
  ContributionTableData,
  CrimeGroupPerformanceTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  BusinessColumns,
  ContributionColumns,
  CrimeGroupPerformanceColumns,
  OffenderColumns,
  TargetedBusinessColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import type { PerformanceReportQuery } from '../../../../graphql/generated';
import useStyles from '../../styles/report.styles';
import { MetaData } from '../../types';

interface ContributorTable {
  key: string;
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  updatesCreated: number;
  messagesSent: number;
  logins: number;
}

const { Title } = Typography;

type Elements = {
  [key: string]: JSX.Element;
};

interface Props {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
  businessContributionTableData: BusinessTableData[] | [];
  userContributionTableData: ContributionTableData[] | [];
  offendersTableData: OffenderTableData[] | [];
  crimeGroupPerformanceTableData: CrimeGroupPerformanceTableData[] | [];
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
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
const PerformanceReportLayout = ({
  loading,
  data,
  businessContributionTableData,
  userContributionTableData,
  offendersTableData,
  crimeGroupPerformanceTableData,
  targetedBusinessData,
  targetedGoodsData,
  removeItem,
  changeSize,
  layout,
  margin,
  rowHeight,
  isPrinting,
  editMode,
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

  const components: Elements = {
    createdSummary: (
      <Card
        style={{ width: '100%' }}
        bodyStyle={{ width: '100%' }}
        loading={loading}
        key="createdSummary"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('createdSummary')}
        />

        <Row>
          <Col span={12}>
            <Title level={4}>Created Summary</Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title="Incidents Created"
              value={data?.performanceReport?.createdDataCounts?.incidents || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faExclamationCircle}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title="Offenders Created"
              value={data?.performanceReport?.createdDataCounts?.offenders || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUsers}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title="Updated Submitted"
              value={data?.performanceReport?.createdDataCounts?.updates || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faPenToSquare}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title="Messages Sent"
              value={data?.performanceReport?.createdDataCounts?.messages || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faComments}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title="Vehicles Created"
              value={
                data?.performanceReport?.createdDataCounts?.vehicles || 0 || 0
              }
              prefix={
                <FontAwesomeIcon className={classes.prefixIcon} icon={faCar} />
              }
            />

            <Statistic
              className={classes.stats}
              title="Crime Groups Created"
              value={
                data?.performanceReport?.createdDataCounts?.crimeGroups || 0
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUsers}
                />
              }
            />
          </Row>
        </Row>
      </Card>
    ),
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
                data?.performanceReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.performanceReport?.incidentSummary?.lastIncidentDate
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
                data?.performanceReport?.incidentSummary
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
                data?.performanceReport?.incidentSummary
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
                data?.performanceReport?.incidentSummary?.mostCommonCrimeType ||
                ''
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faClipboard}
                />
              }
            />

            <Statistic
              className={classes.stats}
              title="Crime Groups"
              value={
                data?.performanceReport?.createdDataCounts?.crimeGroups || 0
              }
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faUsers}
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
                data?.performanceReport?.lossTotals?.totalLostValue
                  ? `£${data?.performanceReport?.lossTotals?.totalLostValue.toFixed(
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
                data?.performanceReport?.lossTotals?.totalRecoveredValue
                  ? `£${data?.performanceReport?.lossTotals?.totalRecoveredValue.toFixed(
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
                (data?.performanceReport?.lossTotals?.averageSuccessRate || 0) *
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
                `£${data?.performanceReport?.lossTotals?.averagePerIncident.toFixed(
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
            data={data?.performanceReport?.crimeTypeDonut}
            emptyLabel="No Crime Types"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.performanceReport?.crimeTypeDonut}
            emptyLabel="No Crime Types"
            labelFormat="Incidents"
          />
        )}
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
            data={data?.performanceReport?.involvedTagCountDonut}
            emptyLabel="No Involved Tags"
            type={
              metadata.find((item) => item.key === 'involvedTagsDonut')
                ?.type as 'donut' | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.performanceReport?.involvedTagCountDonut}
            emptyLabel="No Involved Tags"
            labelFormat="Incidents"
          />
        )}
      </Card>
    ),

    goodsTypeDonut: (
      <Card
        title="Goods type count"
        className="no-break"
        loading={loading}
        key="goodsTypeDonut"
        style={{ height: calculateHeight('goodsTypeDonut') }}
        bodyStyle={{ height: '90%' }}
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
              if (item.key === 'goodsTypeDonut') {
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
              if (item.key === 'goodsTypeDonut') {
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
          onClick={() => removeItem('goodsTypeDonut')}
        />

        {metadata.find((item) => item.key === 'goodsTypeDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'goodsTypeDonut')?.type ===
          'pie' ? (
          <DonutGraph
            data={data?.performanceReport?.goodsTypeCountDonut}
            emptyLabel="No goods count"
            type={
              metadata.find((item) => item.key === 'goodsTypeDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.performanceReport?.goodsTypeCountDonut}
            emptyLabel="No goods count"
            labelFormat="Incidents"
          />
        )}
      </Card>
    ),
    goodsValueDonut: (
      <Card
        title="Goods type value"
        className="no-break"
        loading={loading}
        key="goodsValueDonut"
        style={{ height: calculateHeight('goodsValueDonut') }}
        bodyStyle={{ height: '90%' }}
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
              if (item.key === 'goodsValueDonut') {
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
              if (item.key === 'goodsValueDonut') {
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
          onClick={() => removeItem('goodsValueDonut')}
        />

        {metadata.find((item) => item.key === 'goodsValueDonut')?.type ===
          'donut' ||
        metadata.find((item) => item.key === 'goodsValueDonut')?.type ===
          'pie' ? (
          <DonutGraph
            labelFormat="£"
            data={data?.performanceReport?.goodsTypeValueDonut}
            emptyLabel="No goods values"
            type={
              metadata.find((item) => item.key === 'goodsValueDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.performanceReport?.goodsTypeValueDonut}
            emptyLabel="No goods values"
            labelFormat="£"
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
          data={data?.performanceReport?.incidentDayOfWeekLine}
          dataLabel="incidents"
          emptyLabel="No incidents"
        />
      </Card>
    ),
    incidentsHeatMap: (
      <Card
        className={`${shouldPrint(
          data?.incidentHeatPerformance?.incidents[0]?.location?.geoLat
        )} no-break`}
        loading={loading}
        key="incidentsHeatMap"
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
            data?.incidentHeatPerformance?.incidents
              ?.filter(
                (incident) =>
                  incident.location?.geoLat && incident.location.geoLng
              )
              .map((incident) => ({
                geoLat: incident?.location?.geoLat || 0,
                geoLng: incident?.location?.geoLng || 0,
              })) || []
          }
          emptyLabel="No incidents"
        />
      </Card>
    ),
    businessContributionTable: (
      <Card
        loading={loading}
        className="no-break"
        key="businessContributionTable"
        style={{ height: calculateHeight('businessContributionTable') }}
        bodyStyle={{ overflow: 'auto' }}
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('businessContributionTable')}
        />
        <Title level={4}>Business Contributions</Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('businessContributionTable', pageSize);
            },
            total: data?.businessContribution?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={BusinessColumns}
          dataSource={businessContributionTableData}
        />
      </Card>
    ),
    topContributors: (
      <Card
        loading={loading}
        className="no-break"
        style={{ height: calculateHeight('topContributors') }}
        bodyStyle={{ overflow: 'auto' }}
        key="topContributors"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('topContributors')}
        />
        <Title level={4}>Top Contributors</Title>
        <Table<ContributorTable>
          size="small"
          className="no-break"
          pagination={{
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('topContributors', pageSize);
            },
            total: data?.userContributions?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={ContributionColumns}
          dataSource={userContributionTableData}
        />
      </Card>
    ),
    offendersTable: (
      <Card
        loading={loading}
        className="no-break"
        style={{ height: calculateHeight('offendersTable') }}
        bodyStyle={{ overflow: 'auto' }}
        key="offendersTable"
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
        <Title level={4}>Offenders Table</Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            hideOnSinglePage: true,
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
    crimeGroupTable: (
      <Card
        loading={loading}
        className="no-break"
        style={{ height: calculateHeight('crimeGroupTable') }}
        bodyStyle={{ overflow: 'auto' }}
        key="crimeGroupTable"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('crimeGroupTable')}
        />
        <Title level={4}>Crime group table</Title>
        <Table
          size="small"
          className="no-break"
          pagination={{
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('crimeGroupTable', pageSize);
            },
            total: data?.crimeGroupPerformance?.total || 0,
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={CrimeGroupPerformanceColumns}
          dataSource={crimeGroupPerformanceTableData}
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
            hideOnSinglePage: true,
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
            hideOnSinglePage: true,
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
    [
      layout,
      data,
      loading,
      businessContributionTableData,
      userContributionTableData,
      offendersTableData,
      crimeGroupPerformanceTableData,
      targetedBusinessData,
      targetedGoodsData,
      metadata,
    ]
  );
};
export default PerformanceReportLayout;
