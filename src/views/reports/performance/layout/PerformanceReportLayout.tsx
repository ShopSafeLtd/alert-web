import { Button, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faCalendar,
  faCalendarWeek,
  faCar,
  faChartBar,
  faChartLineDown,
  faChartPie,
  faClipboard,
  faClipboardCheck,
  faClipboardMedical,
  faComments,
  faExclamationCircle,
  faHandcuffs,
  faImages,
  faMoneyBill,
  faMoneyBills,
  faPenToSquare,
  faReceipt,
  faStarOfLife,
  faTrash,
  faUserPlus,
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
  TimeHeatMap,
} from 'components/reports/graphs';
import { shouldPrint } from 'utils';
import type {
  BusinessTableData,
  ContributionTableData,
  CrimeGroupPerformanceTableData,
  InvestigationsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  BusinessColumns,
  ContributionColumns,
  CrimeGroupPerformanceColumns,
  InvestigationsColumns,
  OffenderColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import { useIntl } from 'react-intl';
import CustomQuestionsCountGraph from 'components/reports/components/CustomQuestionsCountGraph/CustomQuestionsCountGraph';
import BusinessIncidentCountGraph from '#/components/reports/components/BusinessIncidentCountGraph/BusinessIncidentCountGraph';
import UserIncidentCountGraph from '#/components/reports/components/UserIncidentCountGraph/UserIncidentCountGraph';
import BusinessCrimeTypeGraph from '#/components/reports/components/BusinessCrimeTypeGraph/BusinessCrimeTypeGraph';
import { useNavigate } from 'react-router';
import BusinessLossRecoveredGraph from '#/components/reports/components/BusinessLossRecoveredGraph/BusinessCrimeTypeGraph';
// import UserSessionsGraph from '#/components/reports/components/UserSessionsGraph/TotalUserSessionsGraph';

import useStyles from '../../styles/report.styles';
import type { AllowedValue, MetaData, ReportItemTypes } from '../../types';
import type { Props as HookProps } from '../hooks/types';
import TotalUserSessionsGraph from '#/components/reports/components/UserSessionsGraph/TotalUserSessionsGraph';
import TargetedBusinessTable from '#/components/reports/components/TargetedBusinessTable/TargetedBusinessTable.view';
import type { PerformanceReportQuery } from 'graphql/reports/queries/performance-report.generated';
import { LanguageCode } from 'graphql/types';

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

type FilterProps = Pick<
  HookProps,
  | 'dateRange'
  | 'selectedRoles'
  | 'selectedIndustries'
  | 'selectedBrands'
  | 'selectedGroups'
  | 'schemeId'
>;

interface Props {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
  businessContributionTableData: BusinessTableData[] | [];
  userContributionTableData: ContributionTableData[] | [];
  offendersTableData: OffenderTableData[] | [];
  crimeGroupPerformanceTableData: CrimeGroupPerformanceTableData[] | [];
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  investigationsData: InvestigationsTableData[] | [];
  removeItem: (arg0: string) => void;
  layout: RGL.Layout[];
  margin: [number, number];
  rowHeight: number;
  editMode: boolean;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
  metadata: MetaData[];
  setMetadata: (arg0: MetaData[]) => void;
  filters: FilterProps;
}

const generateDefaultMetaData = (
  key: AllowedValue,
  type: ReportItemTypes,
  metaData: MetaData[]
) => {
  const found = metaData.find((item) => item.key === key);
  if (found) {
    return found;
  }
  return {
    key,
    type,
  };
};

const PerformanceReportLayout = ({
  loading,
  data,
  businessContributionTableData,
  userContributionTableData,
  offendersTableData,
  crimeGroupPerformanceTableData,
  targetedBusinessData,
  targetedGoodsData,
  investigationsData,
  removeItem,
  changeSize,
  layout,
  margin,
  rowHeight,
  isPrinting,
  editMode,
  metadata,
  setMetadata,
  filters,
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
  const navigate = useNavigate();

  interface GetComponentArgs {
    key: AllowedValue;
    component: AllowedValue;
  }

  const getComponent = ({ key, component }: GetComponentArgs) => {
    switch (component) {
      case 'createdSummary': {
        return (
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
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Created Summary',
                  })}
                </Title>
              </Col>
              <Row className="stats-row">
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Incidents Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.incidents || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faExclamationCircle}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Offenders Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.offenders || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUsers}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Updates Submitted',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.updates || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faPenToSquare}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Messages Sent',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.messages || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faComments}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Vehicles Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.vehicles ||
                    0 ||
                    0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faCar}
                    />
                  }
                />
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Bulletins Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.bulletins || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUsers}
                    />
                  }
                />
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Crime Groups Created',
                  })}
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
        );
      }
      case 'incidentsSummary': {
        return (
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
              <Row wrap={false}>
                <Col>
                  <Statistic
                    className={classes.stats}
                    title={intl.formatMessage({
                      defaultMessage: 'Last Incident (in range)',
                    })}
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
                </Col>
                <Col>
                  <Statistic
                    className={classes.stats}
                    title={intl.formatMessage({
                      defaultMessage: 'Top Incident Type',
                    })}
                    valueRender={(node) => (
                      <Typography.Text
                        ellipsis
                        style={{ maxWidth: 130, overflow: 'hidden' }}
                      >
                        {node}
                      </Typography.Text>
                    )}
                    value={
                      data?.performanceReport?.incidentSummary
                        ?.mostCommonCrimeType || ''
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faClipboard}
                      />
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    className={classes.stats}
                    title={intl.formatMessage({
                      defaultMessage: 'Crime Groups',
                    })}
                    value={
                      data?.performanceReport?.createdDataCounts?.crimeGroups ||
                      0
                    }
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faUsers}
                      />
                    }
                  />
                </Col>
              </Row>
            </Row>
          </Card>
        );
      }
      case 'basicPoliceSummary': {
        return (
          <Card
            style={{ width: '100%' }}
            bodyStyle={{ width: '100%' }}
            loading={loading}
            key="basicPoliceSummary"
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('basicPoliceSummary')}
            />
            <Row>
              <Col span={12}>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Basic Police Engagement Summary',
                  })}
                </Title>
              </Col>
              <Row className="stats-row">
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Reported to Police',
                  })}
                  value={
                    data?.performanceReport?.policeSummary
                      ?.totalReportedIncidents || 0
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
                    data?.performanceReport?.policeSummary
                      ?.totalAttendedIncidents || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUserPoliceTie}
                    />
                  }
                />
              </Row>
            </Row>
          </Card>
        );
      }
      case 'policeSummary': {
        return (
          <Card
            style={{ width: '100%' }}
            bodyStyle={{ width: '100%' }}
            loading={loading}
            key="policeSummary"
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('policeSummary')}
            />
            <Row>
              <Col span={12}>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Police Engagement Summary',
                  })}
                </Title>
              </Col>
              <Row className="stats-row">
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Reported to Police',
                  })}
                  value={
                    data?.performanceReport?.policeSummary
                      ?.totalReportedIncidents || 0
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
                    data?.performanceReport?.policeSummary
                      ?.totalAttendedIncidents || 0
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
                    defaultMessage: 'Custody Images',
                  })}
                  value={
                    data?.performanceReport?.policeSummary?.totalPoliceImages ||
                    0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faImages}
                    />
                  }
                />
              </Row>
            </Row>
          </Card>
        );
      }

      case 'investigationSummary': {
        return (
          <Card
            style={{ width: '100%' }}
            bodyStyle={{ width: '100%' }}
            loading={loading}
            key="investigationSummary"
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('investigationSummary')}
            />
            <Row>
              <Col span={12}>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Investigation Summary',
                  })}
                </Title>
              </Col>
              <Row className="stats-row">
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Currently Open',
                  })}
                  value={
                    data?.performanceReport?.investigationSummary.open || 0
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
                  title={intl.formatMessage({
                    defaultMessage: 'Opened',
                  })}
                  value={
                    data?.performanceReport?.investigationSummary.opened || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faClipboardMedical}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Closed',
                  })}
                  value={
                    data?.performanceReport?.investigationSummary.closed || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faClipboardCheck}
                    />
                  }
                />
              </Row>
            </Row>
          </Card>
        );
      }
      case 'outcomeSummary': {
        return (
          <Card
            style={{ width: '100%' }}
            bodyStyle={{ width: '100%' }}
            loading={loading}
            key="outcomeSummary"
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('outcomeSummary')}
            />
            <Row>
              <Col span={12}>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Outcomes Summary',
                  })}
                </Title>
              </Col>
              <Row className="stats-row">
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Verified IDs',
                  })}
                  value={
                    data?.performanceReport?.policeSummary
                      ?.totalVerifiedOffenders || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUserPlus}
                    />
                  }
                />
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Arrests',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalArrests || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faHandcuffs}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'CBO Count',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalCBOCount || 0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faBan}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'CBO Durations',
                  })}
                  value={intl.formatMessage(
                    {
                      defaultMessage: '{value} years',
                    },
                    {
                      value:
                        data?.performanceReport?.outcomeSummary
                          ?.totalCBOYears || 0,
                    }
                  )}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faCalendarWeek}
                    />
                  }
                />

                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Prison Sentences',
                  })}
                  value={intl.formatMessage(
                    {
                      defaultMessage: '{value} weeks',
                    },
                    {
                      value:
                        data?.performanceReport?.outcomeSummary
                          ?.totalPrisonSentenceMonths || 0,
                    }
                  )}
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
                    defaultMessage: 'Rehabilitation Orders',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalRehabOrders ||
                    0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faStarOfLife}
                    />
                  }
                />
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Fines Issued',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalFinesCount ||
                    0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faReceipt}
                    />
                  }
                />
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Fines Value',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalFinesValue ||
                    0
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faMoneyBills}
                    />
                  }
                />
              </Row>
            </Row>
          </Card>
        );
      }
      case 'lossSummary': {
        return (
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
                    data?.performanceReport?.lossTotals?.totalLostValue
                      ? intl.formatNumber(
                          data?.performanceReport?.lossTotals?.totalLostValue ||
                            0,
                          { style: 'currency', currency: 'GBP' }
                        )
                      : intl.formatMessage({
                          defaultMessage: '--',
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
                    defaultMessage: 'Total recovered',
                  })}
                  value={
                    data?.performanceReport?.lossTotals?.totalRecoveredValue
                      ? intl.formatNumber(
                          data?.performanceReport?.lossTotals
                            ?.totalRecoveredValue || 0,
                          { style: 'currency', currency: 'GBP' }
                        )
                      : intl.formatMessage({
                          defaultMessage: '--',
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
                    defaultMessage: 'Total Loss',
                  })}
                  value={
                    data?.performanceReport?.lossTotals?.totalRecoveredValue
                      ? intl.formatNumber(
                          (data?.performanceReport?.lossTotals
                            ?.totalLostValue || 0) -
                            (data?.performanceReport?.lossTotals
                              ?.totalRecoveredValue || 0),
                          { style: 'currency', currency: 'GBP' }
                        )
                      : intl.formatMessage({
                          defaultMessage: '--',
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
                    defaultMessage: 'Average Loss Rate',
                  })}
                  value={`${(
                    (data?.performanceReport?.lossTotals?.averageSuccessRate ||
                      0) * 100
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
                    defaultMessage: 'Average Incident Value',
                  })}
                  value={
                    `£${(
                      data?.performanceReport?.lossTotals?.averagePerIncident ||
                      0
                    ).toFixed(2)}` || ''
                  }
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faMoneyBill}
                    />
                  }
                />
                <Statistic
                  className={classes.stats}
                  title={intl.formatMessage({
                    defaultMessage: 'Average Loss Value',
                  })}
                  value={
                    `£${(
                      data?.performanceReport?.lossTotals
                        ?.averageLossPerIncident || 0
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
        );
      }
      case 'crimeTypesDonut': {
        return (
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Incident Types',
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
                data={data?.performanceReport?.crimeTypeDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Incident Types',
                })}
                type={
                  metadata.find((item) => item.key === 'crimeTypesDonut')
                    ?.type as 'donut' | 'pie'
                }
              />
            ) : (
              <BarGraph
                isPrinting={isPrinting}
                data={data?.performanceReport?.crimeTypeDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Incident Types',
                })}
                labelFormat={intl.formatMessage({
                  defaultMessage: 'Incidents',
                })}
              />
            )}
          </Card>
        );
      }
      case 'involvedTagsDonut': {
        return (
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
                data={data?.performanceReport?.involvedTagCountDonut}
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
                data={data?.performanceReport?.involvedTagCountDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Involved Tags',
                })}
                labelFormat={intl.formatMessage({
                  defaultMessage: 'Incidents',
                })}
              />
            )}
          </Card>
        );
      }
      case 'goodsTypeDonut': {
        return (
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Goods Type Count',
            })}
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
                isPrinting={isPrinting}
                data={data?.performanceReport?.goodsTypeCountDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No goods count',
                })}
                type={
                  metadata.find((item) => item.key === 'goodsTypeDonut')
                    ?.type as 'donut' | 'pie'
                }
              />
            ) : (
              <BarGraph
                isPrinting={isPrinting}
                data={data?.performanceReport?.goodsTypeCountDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No goods count',
                })}
                labelFormat={intl.formatMessage({
                  defaultMessage: 'Incidents',
                })}
              />
            )}
          </Card>
        );
      }
      case 'goodsValueDonut': {
        return (
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Goods type value',
            })}
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
                isPrinting={isPrinting}
                labelFormat="£"
                data={data?.performanceReport?.goodsTypeValueDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No goods values',
                })}
                type={
                  metadata.find((item) => item.key === 'goodsValueDonut')
                    ?.type as 'donut' | 'pie'
                }
              />
            ) : (
              <BarGraph
                isPrinting={isPrinting}
                data={data?.performanceReport?.goodsTypeValueDonut}
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No goods values',
                })}
                labelFormat="£"
              />
            )}
          </Card>
        );
      }
      case 'incidentsDayOfWeekGraph': {
        return (
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
              data={data?.performanceReport?.incidentDayOfWeekLine}
              dataLabel="incidents"
              emptyLabel={intl.formatMessage({
                defaultMessage: 'No incidents',
              })}
            />
          </Card>
        );
      }
      case 'incidentsHeatMap': {
        return (
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
              isPrinting={isPrinting}
              label={intl.formatMessage({
                defaultMessage: 'Incidents heatmap',
              })}
              height={calculateHeight('incidentsHeatMap', 80)}
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
              emptyLabel={intl.formatMessage({
                defaultMessage: 'No incidents',
              })}
            />
          </Card>
        );
      }
      case 'businessContributionTable': {
        return (
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
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Business contribution',
              })}
            </Title>
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
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={BusinessColumns}
              dataSource={businessContributionTableData}
            />
          </Card>
        );
      }
      case 'topContributors': {
        return (
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
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Top Contributors',
              })}
            </Title>
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
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={ContributionColumns}
              dataSource={userContributionTableData}
            />
          </Card>
        );
      }
      case 'offendersTable': {
        return (
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
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Offenders Table',
              })}
            </Title>
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
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={OffenderColumns}
              dataSource={offendersTableData}
            />
          </Card>
        );
      }
      case 'crimeGroupTable': {
        return (
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
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Crime Group Table',
              })}
            </Title>
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
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={CrimeGroupPerformanceColumns}
              dataSource={crimeGroupPerformanceTableData}
            />
          </Card>
        );
      }
      case 'targetedBusinessTable': {
        return (
          <Card
            loading={loading}
            className="no-break"
            style={{ height: calculateHeight('targetedBusinessTable') }}
            bodyStyle={{ overflow: 'auto' }}
            key="targetedBusinessTable"
          >
            <TargetedBusinessTable
              key="targetedBusinessTable"
              editMode={editMode}
              removeItem={() => removeItem('targetedBusinessTable')}
              changeSize={changeSize}
              total={
                data?.businessContribution?.businessContributions?.filter(
                  (business) => business.totalIncidents > 0
                ).length ?? 0
              }
              targetedBusinessData={targetedBusinessData}
              metadata={metadata}
              setMetadata={setMetadata}
            />
          </Card>
        );
      }
      case 'targetedGoodsTable': {
        return (
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
                total:
                  data?.targetedGoods?.targetedGoods?.filter(
                    (business) => business.totalIncidents > 0
                  ).length || 0,
                defaultPageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={TargetGoodsColumns}
              dataSource={targetedGoodsData}
            />
          </Card>
        );
      }
      case 'investigationsTable': {
        return (
          <Card
            loading={loading}
            className="no-break"
            style={{ height: calculateHeight('investigationsTable') }}
            bodyStyle={{ overflow: 'auto' }}
            key="investigationsTable"
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('investigationsTable')}
            />
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Investigations',
              })}
            </Title>
            <Table
              size="small"
              className="no-break"
              pagination={{
                hideOnSinglePage: true,
                onChange: (_, pageSize) => {
                  changeSize('investigationsTable', pageSize);
                },
                total: data?.investigationPerformance?.total || 0,
                defaultPageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
              columns={InvestigationsColumns}
              dataSource={investigationsData}
            />
          </Card>
        );
      }
      case 'pageBreak': {
        return (
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
        );
      }
      case 'pageBreak2': {
        return (
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
        );
      }
      case 'pageBreak3': {
        return (
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
        );
      }
      case 'pageBreak4': {
        return (
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
        );
      }
      case 'timeHeatMap': {
        return (
          <Card
            className="no-break"
            loading={loading}
            key="timeHeatMap"
            style={{ height: calculateHeight('timeHeatMap') }}
            bodyStyle={{ height: '90%' }}
            title={intl.formatMessage({
              defaultMessage: 'Incidents by time',
            })}
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('timeHeatMap')}
            />
            <TimeHeatMap
              isPrinting={isPrinting}
              labelFormat=""
              data={data?.performanceReport?.timeHeatMap}
              emptyLabel={intl.formatMessage({
                defaultMessage: 'No incidents',
              })}
              bottomLabel="time"
            />
          </Card>
        );
      }
      case 'priorityGraph': {
        return (
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Priorty Graph',
            })}
            className="no-break"
            loading={loading}
            key="priorityGraph"
            style={{ height: calculateHeight('priorityGraph') }}
            bodyStyle={{ height: '90%' }}
          >
            <Button
              type="text"
              shape="circle"
              className="card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
              size="small"
              onClick={() => removeItem('priorityGraph')}
            />
            <BarGraph
              isPrinting={isPrinting}
              labelFormat={intl.formatMessage({
                defaultMessage: 'Priority Graph',
              })}
              data={data?.performanceReport?.priorityGraph}
              emptyLabel={intl.formatMessage({
                defaultMessage: 'No incidents',
              })}
            />
          </Card>
        );
      }
      case 'customQuestionsCountGraph': {
        return (
          <Card
            className="no-break"
            loading={loading}
            style={{ height: calculateHeight(key) }}
            bodyStyle={{ height: '90%' }}
            key={key}
          >
            <CustomQuestionsCountGraph
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  questionId:
                    metadata.find((item) => item.key === key)?.propId || '',
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  languageCode: LanguageCode.En,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
              editMode={editMode}
              isPrinting={isPrinting}
              updateQuestionId={(value: string) => {
                const keyExists = metadata.find((item) => key === item.key);
                if (keyExists) {
                  const updatedMetadata = metadata.map((item) => {
                    if (item.key === key) {
                      return { ...item, propId: value };
                    }
                    return item;
                  }) satisfies MetaData[];
                  setMetadata(updatedMetadata);
                } else {
                  setMetadata([
                    ...metadata,
                    {
                      key,
                      type: 'donut',
                      propId: value,
                    },
                  ]);
                }
              }}
              metaData={metadata.find((item) => item.key === key)}
            />
          </Card>
        );
      }
      // case 'userSessionsDonut': {
      //   return (
      //     <Card
      //       className="no-break"
      //       loading={loading}
      //       style={{ height: calculateHeight(key) }}
      //       bodyStyle={{ height: '90%' }}
      //       key={key}
      //     >
      //       <UserSessionsGraph
      //         variables={{
      //           where: {
      //             brandIds: filters.selectedBrands,
      //             dateRange: filters.dateRange,
      //             groupIds: filters.selectedGroups,
      //             industryIds: filters.selectedIndustries,
      //             roleIds: filters.selectedRoles,
      //             schemeIds: [filters.schemeId],
      //           },
      //           take: 10,
      //         }}
      //         editMode={editMode}
      //         isPrinting={isPrinting}
      //         removeItem={() => removeItem(key)}
      //         onNavigate={() => navigate('/app/reports/user-engagement')}
      //       />
      //     </Card>
      //   );
      // }
      case 'userSessionsDonut': {
        return (
          <Card
            className="no-break"
            loading={loading}
            style={{ height: calculateHeight(key) }}
            bodyStyle={{ height: '90%' }}
            key={key}
          >
            <TotalUserSessionsGraph
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
                take: 10,
              }}
              editMode={editMode}
              isPrinting={isPrinting}
              removeItem={() => removeItem(key)}
              onNavigate={() => navigate('/app/reports/user-engagement')}
            />
          </Card>
        );
      }
      case 'userIncidentCountGraph': {
        return (
          <Card
            className="no-break"
            loading={loading}
            style={{ height: calculateHeight(key) }}
            bodyStyle={{ height: '90%' }}
            key={key}
          >
            <UserIncidentCountGraph
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
                take: 10,
              }}
              editMode={editMode}
              isPrinting={isPrinting}
              removeItem={() => removeItem(key)}
              metaData={generateDefaultMetaData(key, 'bar', metadata)}
              setMetaData={(value: MetaData) => {
                const updatedMetadata = metadata.map((item) => {
                  if (item.key === key) {
                    return (
                      value || generateDefaultMetaData(key, 'bar', metadata)
                    );
                  }
                  return item;
                }) satisfies MetaData[];
                setMetadata(updatedMetadata);
              }}
              onNavigate={() => navigate('/app/reports/user-engagement')}
            />
          </Card>
        );
      }
      case 'businessIncidentCountGraph': {
        return (
          <Card
            className="no-break"
            loading={loading}
            style={{ height: calculateHeight(key) }}
            bodyStyle={{ height: '90%' }}
            key={key}
          >
            <BusinessIncidentCountGraph
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
                take: 10,
              }}
              editMode={editMode}
              isPrinting={isPrinting}
              removeItem={() => removeItem(key)}
              metaData={generateDefaultMetaData(key, 'donut', metadata)}
              setMetaData={setMetadata}
              allMeta={metadata}
              onNavigate={() => navigate('/app/reports/business-engagement')}
            />
          </Card>
        );
      }
      case 'businessCrimeTypeGraph': {
        return (
          <Card
            className="no-break"
            loading={loading}
            style={{ height: calculateHeight(key) }}
            bodyStyle={{ height: '90%' }}
            key={key}
          >
            <BusinessCrimeTypeGraph
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
                take: 10,
              }}
              isPrinting={isPrinting}
              editMode={editMode}
              removeItem={() => removeItem(key)}
              onNavigate={() => navigate('/app/reports/business-engagement')}
            />
          </Card>
        );
      }
      case 'businessLossRecoveredGraph': {
        return (
          <Card
            className="no-break"
            loading={loading}
            style={{ height: calculateHeight(key) }}
            bodyStyle={{ height: '90%' }}
            key={key}
          >
            <BusinessLossRecoveredGraph
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,

                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
                take: 10,
              }}
              editMode={editMode}
              removeItem={() => removeItem(key)}
              onNavigate={() => navigate('/app/reports/business-engagement')}
              isPrinting={isPrinting}
            />
          </Card>
        );
      }
      default: {
        return <div />;
      }
    }
  };

  return useMemo(
    () =>
      layout.map((component) =>
        getComponent({
          key: component.i as AllowedValue,
          component: component.i.split('_')[0] as AllowedValue,
        })
      ),
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
      filters,
    ]
  );
};
export default PerformanceReportLayout;
