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
  TargetedBusinessColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import { useIntl } from 'react-intl';
import type { PerformanceReportQuery } from '../../../../graphql/generated';
import useStyles from '../../styles/report.styles';
import type { AllowedValue, Elements, MetaData } from '../../types';

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
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Created Summary',
                id: 'gNrgvu',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Incidents Created',
                id: 'UOcKMI',
              })}
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
              title={intl.formatMessage({
                defaultMessage: 'Offenders Created',
                id: 'kNP3in',
              })}
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
              title={intl.formatMessage({
                defaultMessage: 'Updates Submitted',
                id: 'E/xqrh',
              })}
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
              title={intl.formatMessage({
                defaultMessage: 'Messages Sent',
                id: 'QGQoOa',
              })}
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
              title={intl.formatMessage({
                defaultMessage: 'Vehicles Created',
                id: 'PX1DHW',
              })}
              value={
                data?.performanceReport?.createdDataCounts?.vehicles || 0 || 0
              }
              prefix={
                <FontAwesomeIcon className={classes.prefixIcon} icon={faCar} />
              }
            />
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Bulletins Created',
                id: 'd5dcOZ',
              })}
              value={data?.performanceReport?.createdDataCounts?.bulletins || 0}
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
                id: '4bsmSr',
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
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Incidents Summary',
                id: 'DGld1Y',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Last Incident (in range)',
                id: 'lI3BDd',
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

            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Most Common Crime Type',
                id: 'jbbNOa',
              })}
              valueRender={(node) => (
                <Typography.Text
                  ellipsis
                  style={{ maxWidth: 150, overflow: 'hidden' }}
                >
                  {node}
                </Typography.Text>
              )}
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
              title={intl.formatMessage({
                defaultMessage: 'Crime Groups',
                id: 'a0aLil',
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
    ),
    policeSummary: (
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
          onClick={() => removeItem('incidentsSummary')}
        />
        <Row>
          <Col span={12}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Police Engagement Summary',
                id: 'ue8y5S',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Reported to Police',
                id: 'LhTpVN',
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
                id: 'ES0Nc8',
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
                id: 'eSwB1J',
              })}
              value={
                data?.performanceReport?.policeSummary?.totalPoliceImages || 0
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
    ),
    investigationSummary: (
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
          onClick={() => removeItem('incidentsSummary')}
        />
        <Row>
          <Col span={12}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Investigation Summary',
                id: '6uUMrA',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Currently Open',
                id: 'KeeTbC',
              })}
              value={data?.performanceReport?.investigationSummary.open || 0}
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
                id: 'ADKsID',
              })}
              value={data?.performanceReport?.investigationSummary.opened || 0}
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
                id: 'Fv1ZSz',
              })}
              value={data?.performanceReport?.investigationSummary.closed || 0}
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
    ),
    outcomeSummary: (
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
                id: 'hHUmrO',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Verified IDs',
                id: '+YBMvu',
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
                id: 'uyYgh0',
              })}
              value={data?.performanceReport?.outcomeSummary?.totalArrests || 0}
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
                id: 'cQmqi4',
              })}
              value={
                data?.performanceReport?.outcomeSummary?.totalCBOCount || 0
              }
              prefix={
                <FontAwesomeIcon className={classes.prefixIcon} icon={faBan} />
              }
            />

            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'CBO Durations',
                id: 'E/Ctgr',
              })}
              value={intl.formatMessage(
                {
                  defaultMessage: '{value} years',
                  id: '0tCt48',
                },
                {
                  value:
                    data?.performanceReport?.outcomeSummary?.totalCBOYears || 0,
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
                id: 'JBWog3',
              })}
              value={intl.formatMessage(
                {
                  defaultMessage: '{value} months',
                  id: 'Cc1A8J',
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
                id: '+KMkeb',
              })}
              value={
                data?.performanceReport?.outcomeSummary?.totalRehabOrders || 0
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
                id: '/mIqOm',
              })}
              value={
                data?.performanceReport?.outcomeSummary?.totalFinesCount || 0
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
                id: 'JXR8hB',
              })}
              value={
                data?.performanceReport?.outcomeSummary?.totalFinesValue || 0
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
                id: 'O0DXtz',
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Total lost value',
                id: 'xhO9Od',
              })}
              value={
                data?.performanceReport?.lossTotals?.totalLostValue
                  ? intl.formatNumber(
                      data?.performanceReport?.lossTotals?.totalLostValue || 0,
                      { style: 'currency', currency: 'GBP' }
                    )
                  : intl.formatMessage({
                      defaultMessage: 'No Losses',
                      id: '9RLqIM',
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
                id: '3A1IaB',
              })}
              value={
                data?.performanceReport?.lossTotals?.totalRecoveredValue
                  ? intl.formatNumber(
                      data?.performanceReport?.lossTotals
                        ?.totalRecoveredValue || 0,
                      { style: 'currency', currency: 'GBP' }
                    )
                  : intl.formatMessage({
                      defaultMessage: 'No Recoveries',
                      id: 'i7IHf9',
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
                id: 'LPr3Nh',
              })}
              value={
                data?.performanceReport?.lossTotals?.totalRecoveredValue
                  ? intl.formatNumber(
                      (data?.performanceReport?.lossTotals?.totalLostValue ||
                        0) -
                        (data?.performanceReport?.lossTotals
                          ?.totalRecoveredValue || 0),
                      { style: 'currency', currency: 'GBP' }
                    )
                  : intl.formatMessage({
                      defaultMessage: 'No Loss',
                      id: '4z5NxE',
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

                id: 'VSxLGp',
              })}
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
              title={intl.formatMessage({
                defaultMessage: 'Average Loss per Incident',
                id: 'k62cVY',
              })}
              value={
                `£${(
                  data?.performanceReport?.lossTotals?.averagePerIncident || 0
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
          id: 'Piba4q',
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
            emptyLabel="No Crime Types"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            isPrinting={isPrinting}
            data={data?.performanceReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Crime Types',
              id: 'BbTEjZ',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
              id: 'mtr3R4',
            })}
          />
        )}
      </Card>
    ),
    involvedTagsDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Involved Tags',
          id: 'hqB+1X',
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
            emptyLabel="No Involved Tags"
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
              id: 'N26vgU',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
              id: 'mtr3R4',
            })}
          />
        )}
      </Card>
    ),

    goodsTypeDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Goods Type Count',
          id: 'z1wXYP',
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
              id: '2t8hXG',
            })}
            type={
              metadata.find((item) => item.key === 'goodsTypeDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            isPrinting={isPrinting}
            data={data?.performanceReport?.goodsTypeCountDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No goods count',
              id: '2t8hXG',
            })}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
              id: 'mtr3R4',
            })}
          />
        )}
      </Card>
    ),
    goodsValueDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Goods type value',
          id: 'YQkHXw',
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
              id: 'pbIqi6',
            })}
            type={
              metadata.find((item) => item.key === 'goodsValueDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            isPrinting={isPrinting}
            data={data?.performanceReport?.goodsTypeValueDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No goods values',
              id: 'pbIqi6',
            })}
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
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents by day of week',
            id: 'LPtzWr',
          })}
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
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents heatmap',
            id: 'UTvOxQ',
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
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Business contribution',
            id: '5ETgSz',
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
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Top Contributors',
            id: 'r67UpQ',
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
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Offenders Table',
            id: 'pSy8jU',
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
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Crime Group Table',
            id: 'RBV3cF',
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
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Targeted Business',
            id: 'CA+Z1B',
          })}
        </Title>
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
        <Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Targeted Goods',
            id: 'dLBbg0',
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
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={TargetGoodsColumns}
          dataSource={targetedGoodsData}
        />
      </Card>
    ),
    investigationsTable: (
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
            id: 'juQ8mz',
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
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
          columns={InvestigationsColumns}
          dataSource={investigationsData}
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
            id: 'hEAGzW',
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
            id: 'Q3p9d3',
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
          {intl.formatMessage({ defaultMessage: 'Page 3', id: '4GDn7Z' })}
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
          {intl.formatMessage({ defaultMessage: 'Page 4', id: 'DSruLZ' })}
        </Typography.Paragraph>
      </div>
    ),
    timeHeatMap: (
      <Card
        className="no-break"
        loading={loading}
        key="timeHeatMap"
        style={{ height: calculateHeight('timeHeatMap') }}
        bodyStyle={{ height: '90%' }}
        title={intl.formatMessage({
          defaultMessage: 'Incidents by time',
          id: '+YmxWP',
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
          labelFormat={intl.formatMessage({
            defaultMessage: 'Incidents by Time',
            id: '/G6eOJ',
          })}
          data={data?.performanceReport?.timeHeatMap}
          emptyLabel="No incidents"
          bottomLabel="time"
        />
      </Card>
    ),
    priorityGraph: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Priorty Graph',
          id: '6qZYxN',
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
            id: 'vZ/a8V',
          })}
          data={data?.performanceReport?.priorityGraph}
          emptyLabel="No incidents"
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
