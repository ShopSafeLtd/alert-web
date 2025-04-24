import type {
  IncidentsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import type { CrimeGroupReportQuery } from 'graphql/reports/queries/__generated__/crime-group-report.generated';
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
import {
  BarGraph,
  DonutGraph,
  HeatMapGoogle,
  LineGraph,
} from 'components/reports/graphs';
import RadialGraph from 'components/reports/graphs/radialGraph';
import {
  IncidentsColumns,
  OffenderColumns,
  TargetGoodsColumns,
  TargetedBusinessColumns,
} from 'components/reports/tableColumns';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { shouldPrint } from 'utils';

import type { AllowedValue, Elements, MetaData } from '../../../types';

import MultiBarGraph from '../../../../../components/reports/graphs/multiBarGraph';
import useStyles from '../../../styles/report.styles';

const { Title } = Typography;

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  data: CrimeGroupReportQuery | undefined;
  editMode: boolean;
  incidentsTableData: [] | IncidentsTableData[];
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  margin: [number, number];
  metadata: MetaData[];
  offendersTableData: [] | OffenderTableData[];
  removeItem: (arg0: string) => void;
  rowHeight: number;
  setMetadata: (arg0: MetaData[]) => void;
  targetedBusinessData: [] | TargetedBusinessTableData[];
  targetedGoodsData: [] | TargetedGoodsTableData[];
}
const CrimeGroupReport = ({
  changeSize,
  data,
  editMode,
  incidentsTableData,
  isPrinting,
  layout,
  loading,
  margin,
  metadata,
  offendersTableData,
  removeItem,
  rowHeight,
  setMetadata,
  targetedBusinessData,
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
    crimeTypesByOffender: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="crimeTypesByOffender"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesByOffender') }}
        title={intl.formatMessage({
          defaultMessage: 'Incident Types',
        })}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('crimeTypesByOffender')}
          shape="circle"
          size="small"
          type="text"
        />
        <MultiBarGraph
          data={data?.crimeGroupReport?.crimeTypeByOffender}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types or Offenders',
          })}
        />
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
          data={data?.crimeGroupReport?.goodsTypeLossRecovered}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types or Offenders',
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
          defaultMessage: 'Incidents by Month',
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
            data={data?.crimeGroupReport?.incidentMonthGraph}
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
            data={data?.crimeGroupReport?.incidentMonthGraph}
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
            data={data?.crimeGroupReport?.incidentTimeOfDayDonut}
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
            data={data?.crimeGroupReport?.incidentTimeOfDayDonut}
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
          data={data?.crimeGroupReport?.incidentDayOfWeekGraph}
          dataLabel={intl.formatMessage({
            defaultMessage: 'Incidents',
          })}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents by Day of Week',
          })}
        />
      </Card>
    ),
    incidentsHeatMap: (
      <Card
        className={`${shouldPrint(
          data?.crimeGroupReport?.crimeGroupMap?.incidentsCoords,
          data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers?.length
        )} no-break`}
        key="incidentsHeatMap"
        loading={loading}
        style={{ height: calculateHeight('incidentsHeatMap') }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('incidentsHeatMap')}
          shape="circle"
          size="small"
          type="text"
        />
        <HeatMapGoogle
          data={
            data?.crimeGroupReport?.crimeGroupMap?.incidentsCoords
              ?.filter((incident) => incident?.lat && incident?.lng)
              .map((incident) => ({
                geoLat: incident?.lat || 0,
                geoLng: incident?.lng || 0,
              })) || []
          }
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents to display',
          })}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents Heat Map',
          })}
          markers={
            data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers &&
            data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers.length > 0
              ? data?.crimeGroupReport?.crimeGroupMap?.offenderMarkers.map(
                  (address, i) => ({
                    key: (address?.name || '') + i.toString(),
                    label: address?.name || '',
                    position: {
                      lat: address?.coords?.lat || 0,
                      lng: address?.coords?.lng || 0,
                    },
                  })
                )
              : undefined
          }
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
                  icon={faCalendar}
                />
              }
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
                data?.crimeGroupReport?.incidentSummary
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
                data?.crimeGroupReport?.incidentSummary
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
                defaultMessage: 'Most Common Incident Type',
              })}
              value={
                data?.crimeGroupReport?.incidentSummary?.mostCommonCrimeType ||
                ''
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
          {intl.formatMessage({
            defaultMessage: 'Incidents',
          })}
        </Title>
        <Table
          className="no-break"
          columns={IncidentsColumns}
          dataSource={incidentsTableData}
          pagination={{
            defaultPageSize: 10,
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total: data?.crimeGroupReport?.incidentsTable?.total || 0,
          }}
          size="small"
        />
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
                defaultMessage: 'Total Lost Value',
              })}
              value={
                data?.crimeGroupReport?.lossTotals?.totalLostValue
                  ? intl.formatNumber(
                      data?.crimeGroupReport?.lossTotals?.totalLostValue || 0,
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
                defaultMessage: 'Total Recovered Value',
              })}
              value={
                data?.crimeGroupReport?.lossTotals?.totalRecoveredValue
                  ? intl.formatNumber(
                      data?.crimeGroupReport?.lossTotals?.totalRecoveredValue ||
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
                (data?.crimeGroupReport?.lossTotals?.averageSuccessRate || 0) *
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
                defaultMessage: 'Average Loss Per Incident',
              })}
              value={intl.formatNumber(
                data?.crimeGroupReport?.lossTotals?.averagePerIncident || 0,
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

    offenderGoodsTypeValue: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="offenderGoodsTypeValue"
        loading={loading}
        style={{ height: calculateHeight('offenderGoodsTypeValue') }}
        title={intl.formatMessage({
          defaultMessage: 'Incident Types',
        })}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('offenderGoodsTypeValue')}
          shape="circle"
          size="small"
          type="text"
        />
        <MultiBarGraph
          data={data?.crimeGroupReport?.offenderGoodsTypeValue}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types or Offenders',
          })}
        />
      </Card>
    ),
    offendersTable: (
      <Card
        bodyStyle={{ overflow: 'auto' }}
        className="no-break"
        key="offendersTable"
        loading={loading}
        style={{ height: calculateHeight('offendersTable') }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('offendersTable')}
          shape="circle"
          size="small"
          type="text"
        />
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Offenders',
          })}
        </Title>
        <Table
          className="no-break"
          columns={OffenderColumns}
          dataSource={offendersTableData}
          pagination={{
            defaultPageSize: 10,
            onChange: (_, pageSize) => {
              changeSize('offendersTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total: data?.offendersPerformance?.total || 0,
          }}
          size="small"
        />
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
          display: isPrinting ? 'none' : 'block',
          height: '100%',
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
    targetedBusinessTable: (
      <Card
        bodyStyle={{ overflow: 'auto' }}
        className="no-break"
        key="targetedBusinessTable"
        loading={loading}
        style={{ height: calculateHeight('targetedBusinessTable') }}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('targetedBusinessTable')}
          shape="circle"
          size="small"
          type="text"
        />
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Targeted Businesses',
          })}
        </Title>
        <Table
          className="no-break"
          columns={TargetedBusinessColumns}
          dataSource={targetedBusinessData}
          pagination={{
            defaultPageSize: 10,
            onChange: (_, pageSize) => {
              changeSize('targetedBusinessTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total:
              data?.businessContribution?.businessContributions?.filter(
                (business) => business.totalIncidents > 0
              ).length || 0,
          }}
          size="small"
        />
      </Card>
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
            onChange: (_, pageSize) => {
              changeSize('targetedGoodsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total:
              data?.targetedGoods?.targetedGoods?.filter(
                (business) => business.totalIncidents > 0
              ).length || 0,
          }}
          size="small"
        />
      </Card>
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
