import type {
  BusinessTableData,
  ContributionTableData,
  CrimeGroupPerformanceTableData,
  InvestigationsTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import type { PerformanceReportQuery } from 'graphql/reports/queries/__generated__/performance-report.generated';
import type RGL from 'react-grid-layout';

import BusinessCrimeTypeGraph from '#/components/reports/components/BusinessCrimeTypeGraph/BusinessCrimeTypeGraph';
import BusinessIncidentCountGraph from '#/components/reports/components/BusinessIncidentCountGraph/BusinessIncidentCountGraph';
import BusinessLossRecoveredGraph from '#/components/reports/components/BusinessLossRecoveredGraph/BusinessCrimeTypeGraph';
import IncidentsByDayOfWeekGraph from '#/components/reports/components/IncidentsByDayOfWeekGraph/IncidentsByDayOfWeekGraph';
import TargetedBusinessTable from '#/components/reports/components/TargetedBusinessTable/TargetedBusinessTable.view';
import UserIncidentCountGraph from '#/components/reports/components/UserIncidentCountGraph/UserIncidentCountGraph';
import TotalUserSessionsGraph from '#/components/reports/components/UserSessionsGraph/TotalUserSessionsGraph';
import Graph from '#/components/reports/graphs/graph';
import ActivitiesGraphView from '#/views/reports/performance/ActivitesGraph/ActivitiesGraph';
import ActivitySummary from '#/views/reports/performance/ActivitiesReports/summary/ActivitySummary';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Statistic, Table, Typography } from 'antd';
import CustomQuestionsCountGraph from 'components/reports/components/CustomQuestionsCountGraph/CustomQuestionsCountGraph';
import {
  BarGraph,
  HeatMapGoogle,
  TimeHeatMap,
} from 'components/reports/graphs';
import {
  BusinessColumns,
  ContributionColumns,
  CrimeGroupPerformanceColumns,
  InvestigationsColumns,
  OffenderColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import { LanguageCode } from 'graphql/types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { shouldPrint } from 'utils';

import type { AllowedValue, MetaData, ReportItemTypes } from '../../types';
import type { Props as HookProps } from '../hooks/types';

// import UserSessionsGraph from '#/components/reports/components/UserSessionsGraph/TotalUserSessionsGraph';
import useStyles from '../../styles/report.styles';

interface ContributorTable {
  fullName: string;
  incidentsCreated: number;
  key: string;
  logins: number;
  messagesSent: number;
  offendersCreated: number;
  updatesCreated: number;
}

const { Title } = Typography;

export type FilterProps = Pick<
  HookProps,
  | 'dateRange'
  | 'schemeId'
  | 'selectedBrands'
  | 'selectedGroups'
  | 'selectedIndustries'
  | 'selectedRoles'
>;

interface Props {
  businessContributionTableData: [] | BusinessTableData[];
  changeSize: (arg0: string, arg1: number) => void;
  crimeGroupPerformanceTableData: [] | CrimeGroupPerformanceTableData[];
  data: PerformanceReportQuery | undefined;
  editMode: boolean;
  filters: FilterProps;
  investigationsData: [] | InvestigationsTableData[];
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
  userContributionTableData: [] | ContributionTableData[];
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
  businessContributionTableData,
  changeSize,
  crimeGroupPerformanceTableData,
  data,
  editMode,
  filters,
  investigationsData,
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
  userContributionTableData,
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
    component: AllowedValue;
    key: AllowedValue;
  }

  const getComponent = ({ component, key }: GetComponentArgs) => {
    // eslint-disable-next-line sonarjs/max-switch-cases
    switch (component) {
      case 'activityGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <ActivitiesGraphView
              editMode={editMode}
              filters={filters}
              isPrinting={isPrinting}
              metaData={generateDefaultMetaData(key, 'bar', metadata)}
              onNavigate={() => navigate('/app/reports/user-engagement')}
              removeItem={() => removeItem(key)}
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
            />
          </Card>
        );
      }

      case 'activitySummary': {
        return (
          <Card
            bodyStyle={{ width: '100%' }}
            key="activitySummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <ActivitySummary
              editMode={editMode}
              filters={filters}
              removeItem={removeItem}
            />
          </Card>
        );
      }
      case 'createdSummary': {
        return (
          <Card
            bodyStyle={{ width: '100%' }}
            key="createdSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('createdSummary')}
              shape="circle"
              size="small"
              type="text"
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
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faExclamationCircle}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Incidents Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.incidents || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUsers}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Offenders Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.offenders || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faPenToSquare}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Updates Submitted',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.updates || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faComments}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Messages Sent',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.messages || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faCar}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Vehicles Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.vehicles ||
                    0 ||
                    0
                  }
                />
                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUsers}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Bulletins Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.bulletins || 0
                  }
                />
                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUsers}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Crime Groups Created',
                  })}
                  value={
                    data?.performanceReport?.createdDataCounts?.crimeGroups || 0
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
            bodyStyle={{ width: '100%' }}
            key="incidentsSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
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
              <Row wrap={false}>
                <Col>
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
                      data?.performanceReport?.incidentSummary?.lastIncidentDate
                        ? new Date(
                            data?.performanceReport?.incidentSummary?.lastIncidentDate
                          ).toLocaleDateString()
                        : 'unknown'
                    }
                  />
                </Col>
                <Col>
                  <Statistic
                    className={classes.stats}
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faClipboard}
                      />
                    }
                    title={intl.formatMessage({
                      defaultMessage: 'Top Incident Type',
                    })}
                    value={
                      data?.performanceReport?.incidentSummary
                        ?.mostCommonCrimeType || ''
                    }
                    valueRender={(node) => (
                      <Typography.Text
                        ellipsis
                        style={{ maxWidth: 130, overflow: 'hidden' }}
                      >
                        {node}
                      </Typography.Text>
                    )}
                  />
                </Col>
                <Col>
                  <Statistic
                    className={classes.stats}
                    prefix={
                      <FontAwesomeIcon
                        className={classes.prefixIcon}
                        icon={faUsers}
                      />
                    }
                    title={intl.formatMessage({
                      defaultMessage: 'Crime Groups',
                    })}
                    value={
                      data?.performanceReport?.createdDataCounts?.crimeGroups ||
                      0
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
            bodyStyle={{ width: '100%' }}
            key="basicPoliceSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('basicPoliceSummary')}
              shape="circle"
              size="small"
              type="text"
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
                    data?.performanceReport?.policeSummary
                      ?.totalReportedIncidents || 0
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
                    data?.performanceReport?.policeSummary
                      ?.totalAttendedIncidents || 0
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
            bodyStyle={{ width: '100%' }}
            key="policeSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('policeSummary')}
              shape="circle"
              size="small"
              type="text"
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
                    data?.performanceReport?.policeSummary
                      ?.totalReportedIncidents || 0
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
                    data?.performanceReport?.policeSummary
                      ?.totalAttendedIncidents || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faImages}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Custody Images',
                  })}
                  value={
                    data?.performanceReport?.policeSummary?.totalPoliceImages ||
                    0
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
            bodyStyle={{ width: '100%' }}
            key="investigationSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('investigationSummary')}
              shape="circle"
              size="small"
              type="text"
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
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faClipboard}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Currently Open',
                  })}
                  value={
                    data?.performanceReport?.investigationSummary.open || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faClipboardMedical}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Opened',
                  })}
                  value={
                    data?.performanceReport?.investigationSummary.opened || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faClipboardCheck}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Closed',
                  })}
                  value={
                    data?.performanceReport?.investigationSummary.closed || 0
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
            bodyStyle={{ width: '100%' }}
            key="outcomeSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('outcomeSummary')}
              shape="circle"
              size="small"
              type="text"
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
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faUserPlus}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Verified IDs',
                  })}
                  value={
                    data?.performanceReport?.policeSummary
                      ?.totalVerifiedOffenders || 0
                  }
                />
                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faHandcuffs}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Arrests',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalArrests || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faBan}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'CBO Count',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalCBOCount || 0
                  }
                />

                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faCalendarWeek}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'CBO Durations',
                  })}
                  value={intl.formatMessage(
                    {
                      defaultMessage: '{value} months',
                    },
                    {
                      value:
                        data?.performanceReport?.outcomeSummary
                          ?.totalCBOYears || 0,
                    }
                  )}
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
                />
                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faStarOfLife}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Rehabilitation Orders',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalRehabOrders ||
                    0
                  }
                />
                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faReceipt}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Fines Issued',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalFinesCount ||
                    0
                  }
                />
                <Statistic
                  className={classes.stats}
                  prefix={
                    <FontAwesomeIcon
                      className={classes.prefixIcon}
                      icon={faMoneyBills}
                    />
                  }
                  title={intl.formatMessage({
                    defaultMessage: 'Fines Value',
                  })}
                  value={
                    data?.performanceReport?.outcomeSummary?.totalFinesValue ||
                    0
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
            bodyStyle={{ width: '100%' }}
            key="lossSummary"
            loading={loading}
            style={{ width: '100%' }}
          >
            <Button
              className="cancelDrag card-remove no-print"
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
                    data?.performanceReport?.lossTotals?.totalLostValue
                      ? intl.formatNumber(
                          data?.performanceReport?.lossTotals?.totalLostValue ||
                            0,
                          { currency: 'GBP', style: 'currency' }
                        )
                      : intl.formatMessage({
                          defaultMessage: '--',
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
                    defaultMessage: 'Total recovered',
                  })}
                  value={
                    data?.performanceReport?.lossTotals?.totalRecoveredValue
                      ? intl.formatNumber(
                          data?.performanceReport?.lossTotals
                            ?.totalRecoveredValue || 0,
                          { currency: 'GBP', style: 'currency' }
                        )
                      : intl.formatMessage({
                          defaultMessage: '--',
                        })
                  }
                />
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
                    defaultMessage: 'Total Loss',
                  })}
                  value={
                    data?.performanceReport?.lossTotals?.totalRecoveredValue
                      ? intl.formatNumber(
                          (data?.performanceReport?.lossTotals
                            ?.totalLostValue || 0) -
                            (data?.performanceReport?.lossTotals
                              ?.totalRecoveredValue || 0),
                          { currency: 'GBP', style: 'currency' }
                        )
                      : intl.formatMessage({
                          defaultMessage: '--',
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
                    (data?.performanceReport?.lossTotals?.averageSuccessRate ||
                      0) * 100
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
                    defaultMessage: 'Average Incident Value',
                  })}
                  value={intl.formatNumber(
                    data?.performanceReport?.lossTotals?.averagePerIncident ||
                      0,
                    {
                      currency: 'GBP',
                      style: 'currency',
                    }
                  )}
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
                    defaultMessage: 'Average Loss Value',
                  })}
                  value={intl.formatNumber(
                    data?.performanceReport?.lossTotals
                      ?.averageLossPerIncident || 0,
                    {
                      currency: 'GBP',
                      style: 'currency',
                    }
                  )}
                />
              </Row>
            </Row>
          </Card>
        );
      }
      case 'crimeTypesDonut': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="crimeTypesDonut"
            loading={loading}
            style={{ height: calculateHeight('crimeTypesDonut') }}
          >
            <Button
              className="cancelDrag change-graph1 no-print"
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
              className="cancelDrag change-graph2 no-print"
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
              className="cancelDrag card-remove no-print"
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
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Incident Types',
                })}
                graphOptions={{
                  data: data?.performanceReport?.crimeTypeDonut.map((item) => ({
                    count: item.value,
                    type: item.label,
                  })),
                  legend: {
                    position: 'right',
                  },
                  series: [
                    {
                      angleKey: 'count',
                      calloutLabel: {
                        enabled: false,
                      },
                      calloutLabelKey: 'type',
                      calloutLabelName: 'type',
                      innerRadiusRatio: 0.7,
                      labelKey: 'count',
                      sectorLabelKey: 'count',
                      // @ts-expect-error graph type error
                      type:
                        metadata.find((item) => item.key === 'crimeTypesDonut')
                          ?.type === 'pie'
                          ? 'pie'
                          : 'donut',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.crimeTypeDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Incident Types',
                })}
                loading={!!data?.performanceReport?.crimeTypeDonut}
              />
            ) : (
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Incident Types',
                })}
                graphOptions={{
                  data: data?.performanceReport?.crimeTypeDonut.map((item) => ({
                    count: item.value,
                    type: item.label,
                  })),
                  legend: {
                    enabled: false,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'type',
                      yKey: 'count',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.crimeTypeDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Incident Types',
                })}
                loading={!!data?.performanceReport?.crimeTypeDonut}
              />
            )}
          </Card>
        );
      }
      case 'involvedTagsDonut': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="involvedTagsDonut"
            loading={loading}
            style={{ height: calculateHeight('involvedTagsDonut') }}
          >
            <Button
              className="cancelDrag change-graph1 no-print"
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
              className="cancelDrag change-graph2 no-print"
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
              className="cancelDrag card-remove no-print"
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
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Involved Tags',
                })}
                graphOptions={{
                  data: data?.performanceReport?.involvedTagCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                  legend: {
                    position: 'right',
                  },
                  series: [
                    {
                      angleKey: 'count',
                      calloutLabel: {
                        enabled: false,
                      },
                      calloutLabelKey: 'type',
                      calloutLabelName: 'type',
                      innerRadiusRatio: 0.7,
                      labelKey: 'count',
                      sectorLabelKey: 'count',
                      // @ts-expect-error graph type error
                      type:
                        metadata.find(
                          (item) => item.key === 'involvedTagsDonut'
                        )?.type === 'pie'
                          ? 'pie'
                          : 'donut',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.involvedTagCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Involved Tags',
                })}
                loading={!!data?.performanceReport?.involvedTagCountDonut}
              />
            ) : (
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Involved Tags',
                })}
                graphOptions={{
                  data: data?.performanceReport?.involvedTagCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                  legend: {
                    enabled: false,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'type',
                      yKey: 'count',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.involvedTagCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Involved Tags',
                })}
                loading={!!data?.performanceReport?.crimeTypeDonut}
              />
            )}
          </Card>
        );
      }
      case 'goodsTypeDonut': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="goodsTypeDonut"
            loading={loading}
            style={{ height: calculateHeight('goodsTypeDonut') }}
          >
            <Button
              className="cancelDrag change-graph1 no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
              onClick={() => {
                const updatedMetadata = metadata.map((item) => {
                  if (item.key === 'goodsTypeDonut') {
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
              className="cancelDrag change-graph2 no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
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
              shape="circle"
              size="small"
              type="text"
            />
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('goodsTypeDonut')}
              shape="circle"
              size="small"
              type="text"
            />

            {metadata.find((item) => item.key === 'goodsTypeDonut')?.type ===
              'donut' ||
            metadata.find((item) => item.key === 'goodsTypeDonut')?.type ===
              'pie' ? (
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Goods Types',
                })}
                graphOptions={{
                  data: data?.performanceReport?.goodsTypeCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                  legend: {
                    position: 'right',
                  },
                  series: [
                    {
                      angleKey: 'count',
                      calloutLabel: {
                        enabled: false,
                      },
                      calloutLabelKey: 'type',
                      calloutLabelName: 'type',
                      innerRadiusRatio: 0.7,
                      labelKey: 'count',
                      sectorLabelKey: 'count',
                      // @ts-expect-error graph type error
                      type:
                        metadata.find((item) => item.key === 'goodsTypeDonut')
                          ?.type === 'pie'
                          ? 'pie'
                          : 'donut',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.goodsTypeCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Goods Type Count',
                })}
                loading={!!data?.performanceReport?.goodsTypeCountDonut}
              />
            ) : (
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Goods Type',
                })}
                graphOptions={{
                  data: data?.performanceReport?.goodsTypeCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                  legend: {
                    enabled: false,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'type',
                      yKey: 'count',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.goodsTypeCountDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Goods Type Count',
                })}
                loading={!!data?.performanceReport?.goodsTypeCountDonut}
              />
            )}
          </Card>
        );
      }
      case 'goodsValueDonut': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="goodsValueDonut"
            loading={loading}
            style={{ height: calculateHeight('goodsValueDonut') }}
          >
            <Button
              className="cancelDrag change-graph1 no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
              onClick={() => {
                const updatedMetadata = metadata.map((item) => {
                  if (item.key === 'goodsValueDonut') {
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
              className="cancelDrag change-graph2 no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
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
              shape="circle"
              size="small"
              type="text"
            />
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('goodsValueDonut')}
              shape="circle"
              size="small"
              type="text"
            />

            {metadata.find((item) => item.key === 'goodsValueDonut')?.type ===
              'donut' ||
            metadata.find((item) => item.key === 'goodsValueDonut')?.type ===
              'pie' ? (
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Goods Data',
                })}
                graphOptions={{
                  data: data?.performanceReport?.goodsTypeValueDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                  legend: {
                    position: 'right',
                  },
                  series: [
                    {
                      angleKey: 'count',
                      calloutLabel: {
                        enabled: false,
                      },
                      calloutLabelKey: 'type',
                      calloutLabelName: 'type',
                      innerRadiusRatio: 0.7,
                      labelKey: 'count',
                      sectorLabel: {
                        formatter: ({ value }: { value: number }) =>
                          intl.formatNumber(value || 0, {
                            currency: 'GBP',
                            style: 'currency',
                          }),
                      },
                      sectorLabelKey: 'count',
                      // @ts-expect-error graph type error
                      type:
                        metadata.find((item) => item.key === 'goodsValueDonut')
                          ?.type === 'pie'
                          ? 'pie'
                          : 'donut',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      field: 'count',
                      valueFormatter: ({ value }: { value: number }) =>
                        intl.formatNumber(value || 0, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                    },
                  ],
                  rowData: data?.performanceReport.goodsTypeValueDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Goods Type Value',
                })}
                loading={!!data?.performanceReport?.goodsTypeValueDonut}
              />
            ) : (
              <Graph
                emptyLabel={intl.formatMessage({
                  defaultMessage: 'No Goods Data',
                })}
                graphOptions={{
                  data: data?.performanceReport?.goodsTypeValueDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                  legend: {
                    enabled: false,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'type',
                      yKey: 'count',
                    },
                  ],
                }}
                gridOptions={{
                  columnDefs: [
                    {
                      field: 'type',
                    },
                    {
                      cellRenderer: (value) =>
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        intl.formatNumber(value || 0, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                      field: 'count',
                    },
                  ],
                  rowData: data?.performanceReport.goodsTypeValueDonut.map(
                    (item) => ({
                      count: item.value,
                      type: item.label,
                    })
                  ),
                }}
                isPrinting={isPrinting}
                label={intl.formatMessage({
                  defaultMessage: 'Goods Type Value',
                })}
                loading={!!data?.performanceReport?.goodsTypeValueDonut}
              />
            )}
          </Card>
        );
      }
      case 'incidentsDayOfWeekGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="incidentsDayOfWeekGraph"
            loading={loading}
            style={{ height: calculateHeight('incidentsDayOfWeekGraph') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('incidentsDayOfWeekGraph')}
              shape="circle"
              size="small"
              type="text"
            />
            <IncidentsByDayOfWeekGraph
              data={
                data?.performanceReport.incidentDayOfWeekLine.map((item) => ({
                  count: item.value,
                  data: item.label,
                })) ?? []
              }
              isPrinting={isPrinting}
              loading={!!data?.performanceReport.incidentDayOfWeekLine}
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
            key="incidentsHeatMap"
            loading={loading}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('incidentsHeatMap')}
              shape="circle"
              size="small"
              type="text"
            />
            <HeatMapGoogle
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
              height={calculateHeight('incidentsHeatMap', 80)}
              isPrinting={isPrinting}
              label={intl.formatMessage({
                defaultMessage: 'Incidents Heatmap',
              })}
            />
          </Card>
        );
      }
      case 'businessContributionTable': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="businessContributionTable"
            loading={loading}
            style={{ height: calculateHeight('businessContributionTable') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('businessContributionTable')}
              shape="circle"
              size="small"
              type="text"
            />
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Business Contribution',
              })}
            </Title>
            <Table
              className="no-break"
              columns={BusinessColumns}
              dataSource={businessContributionTableData}
              pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true,
                onChange: (_, pageSize) => {
                  changeSize('businessContributionTable', pageSize);
                },
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
                total: data?.businessContribution?.total || 0,
              }}
              size="small"
            />
          </Card>
        );
      }
      case 'topContributors': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="topContributors"
            loading={loading}
            style={{ height: calculateHeight('topContributors') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('topContributors')}
              shape="circle"
              size="small"
              type="text"
            />
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Top Contributors',
              })}
            </Title>
            <Table<ContributorTable>
              className="no-break"
              columns={ContributionColumns}
              dataSource={userContributionTableData}
              pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true,
                onChange: (_, pageSize) => {
                  changeSize('topContributors', pageSize);
                },
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
                total: data?.userContributions?.total || 0,
              }}
              size="small"
            />
          </Card>
        );
      }
      case 'offendersTable': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="offendersTable"
            loading={loading}
            style={{ height: calculateHeight('offendersTable') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('offendersTable')}
              shape="circle"
              size="small"
              type="text"
            />
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Offenders Table',
              })}
            </Title>
            <Table
              className="no-break"
              columns={OffenderColumns}
              dataSource={offendersTableData}
              pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true,
                onChange: (_, pageSize) => {
                  changeSize('offendersTable', pageSize);
                },
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
                total: data?.offendersPerformance?.total || 0,
              }}
              size="small"
            />
          </Card>
        );
      }
      case 'crimeGroupTable': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="crimeGroupTable"
            loading={loading}
            style={{ height: calculateHeight('crimeGroupTable') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('crimeGroupTable')}
              shape="circle"
              size="small"
              type="text"
            />
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Crime Group Table',
              })}
            </Title>
            <Table
              className="no-break"
              columns={CrimeGroupPerformanceColumns}
              dataSource={crimeGroupPerformanceTableData}
              pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true,
                onChange: (_, pageSize) => {
                  changeSize('crimeGroupTable', pageSize);
                },
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
                total: data?.crimeGroupPerformance?.total || 0,
              }}
              size="small"
            />
          </Card>
        );
      }
      case 'targetedBusinessTable': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="targetedBusinessTable"
            loading={loading}
            style={{ height: calculateHeight('targetedBusinessTable') }}
          >
            <TargetedBusinessTable
              changeSize={changeSize}
              editMode={editMode}
              key="targetedBusinessTable"
              metadata={metadata}
              removeItem={() => removeItem('targetedBusinessTable')}
              setMetadata={setMetadata}
              targetedBusinessData={targetedBusinessData}
              total={
                data?.businessContribution?.businessContributions?.filter(
                  (business) => business.totalIncidents > 0
                ).length ?? 0
              }
            />
          </Card>
        );
      }
      case 'targetedGoodsTable': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="targetedGoodsTable"
            loading={loading}
            style={{ height: calculateHeight('targetedGoodsTable') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
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
                  `${range[0]}-${range[1]} of ${total}`,
                total:
                  data?.targetedGoods?.targetedGoods?.filter(
                    (business) => business.totalIncidents > 0
                  ).length || 0,
              }}
              size="small"
            />
          </Card>
        );
      }
      case 'investigationsTable': {
        return (
          <Card
            bodyStyle={{ overflow: 'auto' }}
            className="no-break"
            key="investigationsTable"
            loading={loading}
            style={{ height: calculateHeight('investigationsTable') }}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('investigationsTable')}
              shape="circle"
              size="small"
              type="text"
            />
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Investigations',
              })}
            </Title>
            <Table
              className="no-break"
              columns={InvestigationsColumns}
              dataSource={investigationsData}
              pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true,
                onChange: (_, pageSize) => {
                  changeSize('investigationsTable', pageSize);
                },
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
                total: data?.investigationPerformance?.total || 0,
              }}
              size="small"
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
        );
      }
      case 'pageBreak2': {
        return (
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
        );
      }
      case 'pageBreak3': {
        return (
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
        );
      }
      case 'pageBreak4': {
        return (
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
        );
      }
      case 'timeHeatMap': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="timeHeatMap"
            loading={loading}
            style={{ height: calculateHeight('timeHeatMap') }}
            title={intl.formatMessage({
              defaultMessage: 'Incidents By Time',
            })}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('timeHeatMap')}
              shape="circle"
              size="small"
              type="text"
            />
            <TimeHeatMap
              bottomLabel="time"
              data={data?.performanceReport?.timeHeatMap}
              emptyLabel={intl.formatMessage({
                defaultMessage: 'No incidents',
              })}
              isPrinting={isPrinting}
              labelFormat=""
            />
          </Card>
        );
      }
      case 'priorityGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key="priorityGraph"
            loading={loading}
            style={{ height: calculateHeight('priorityGraph') }}
            title={intl.formatMessage({
              defaultMessage: 'Priorty Graph',
            })}
          >
            <Button
              className="cancelDrag card-remove no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={() => removeItem('priorityGraph')}
              shape="circle"
              size="small"
              type="text"
            />
            <BarGraph
              data={data?.performanceReport?.priorityGraph}
              emptyLabel={intl.formatMessage({
                defaultMessage: 'No incidents',
              })}
              isPrinting={isPrinting}
              labelFormat={intl.formatMessage({
                defaultMessage: 'Priority Graph',
              })}
            />
          </Card>
        );
      }
      case 'customQuestionsCountGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <CustomQuestionsCountGraph
              editMode={editMode}
              fullMetadata={metadata}
              isPrinting={isPrinting}
              metaData={metadata.find((item) => item.key === key)}
              metaDataKey={key}
              setMetadata={setMetadata}
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
                      propId: value,
                      type: 'donut',
                    },
                  ]);
                }
              }}
              variables={{
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  languageCode: LanguageCode.En,
                  questionId:
                    metadata.find((item) => item.key === key)?.propId || '',
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
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
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <TotalUserSessionsGraph
              editMode={editMode}
              isPrinting={isPrinting}
              onNavigate={() => navigate('/app/reports/user-engagement')}
              removeItem={() => removeItem(key)}
              variables={{
                take: 10,
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
            />
          </Card>
        );
      }
      case 'userIncidentCountGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <UserIncidentCountGraph
              editMode={editMode}
              isPrinting={isPrinting}
              metaData={generateDefaultMetaData(key, 'bar', metadata)}
              onNavigate={() => navigate('/app/reports/user-engagement')}
              removeItem={() => removeItem(key)}
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
              variables={{
                take: 10,
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
            />
          </Card>
        );
      }
      case 'businessIncidentCountGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <BusinessIncidentCountGraph
              allMeta={metadata}
              editMode={editMode}
              isPrinting={isPrinting}
              metaData={generateDefaultMetaData(key, 'donut', metadata)}
              onNavigate={() => navigate('/app/reports/business-engagement')}
              removeItem={() => removeItem(key)}
              setMetaData={setMetadata}
              variables={{
                take: 10,
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
            />
          </Card>
        );
      }
      case 'businessCrimeTypeGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <BusinessCrimeTypeGraph
              editMode={editMode}
              isPrinting={isPrinting}
              onNavigate={() => navigate('/app/reports/business-engagement')}
              removeItem={() => removeItem(key)}
              variables={{
                take: 10,
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
            />
          </Card>
        );
      }
      case 'businessLossRecoveredGraph': {
        return (
          <Card
            bodyStyle={{ height: '90%' }}
            className="no-break"
            key={key}
            loading={loading}
            style={{ height: calculateHeight(key) }}
          >
            <BusinessLossRecoveredGraph
              editMode={editMode}
              isPrinting={isPrinting}
              onNavigate={() => navigate('/app/reports/business-engagement')}
              removeItem={() => removeItem(key)}
              variables={{
                take: 10,
                where: {
                  brandIds: filters.selectedBrands,
                  dateRange: filters.dateRange,
                  groupIds: filters.selectedGroups,
                  industryIds: filters.selectedIndustries,
                  roleIds: filters.selectedRoles,
                  schemeIds: [filters.schemeId],
                },
              }}
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
          component: component.i.split('_')[0] as AllowedValue,
          key: component.i as AllowedValue,
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
