import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Skeleton,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChartBar,
  faChartLineDown,
  faChartPie,
  faCircleExclamation,
  faClipboard,
  faMoneyBill,
  faTrash,
  faUserPolice,
  faUserPoliceTie,
} from '@fortawesome/pro-light-svg-icons';
import React, { useMemo } from 'react';
import type RGL from 'react-grid-layout';
import { BarGraph, DonutGraph, HeatMapGoogle } from 'components/reports/graphs';
import { getAge, getBuild, getEthnicity, getSex, shouldPrint } from 'utils';
import type {
  IncidentsTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  IncidentsColumns,
  TargetedBusinessColumns,
  TargetGoodsColumns,
} from 'components/reports/tableColumns';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import useStyles from '../../styles/report.styles';
import WatermarkImage from '../../../../components/images/WatermarkImage.view';
import RadialGraph from '../../../../components/reports/graphs/radialGraph';
import type { AllowedValue, Elements, MetaData } from '../../types';
import { Age, Build, Gender, Race, Role } from 'graphql/types';
import type { OffenderReportQuery } from 'graphql/reports/queries/offender-report.generated';

const { Title, Text } = Typography;

interface Props {
  loading: boolean;
  data: OffenderReportQuery | undefined;

  targetedBusinessData: TargetedBusinessTableData[] | [];
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
const OffenderReportLayout = ({
  loading,
  data,
  incidentsTableData,
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
}: Props) => {
  const classes = useStyles();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  const calculateHeight = (key: string, offset?: number) => {
    const targetElement = layout.find((element) => element.i === key);
    const targetH = targetElement ? targetElement.h : 0;
    return `${
      rowHeight * targetH + margin[1] * (targetH - 1) - (offset || 0)
    }px`;
  };
  const intl = useIntl();
  const components: Elements = {
    offenderSummary: (
      <Card
        style={{ width: '100%' }}
        bodyStyle={{ width: '100%' }}
        loading={loading}
        key="offenderSummary"
      >
        <Row wrap={false}>
          <Button
            type="text"
            shape="circle"
            className="card-remove no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
            size="small"
            onClick={() => removeItem('offenderSummary')}
          />
          <Col className={classes.imageCol} span={6}>
            {data?.offenderReport?.offenderSummary?.images &&
            data?.offenderReport?.offenderSummary?.images.length > 0 ? (
              <div className={classes.image}>
                <WatermarkImage
                  url={
                    data?.offenderReport?.offenderSummary?.images[0]
                      ?.optimisedPersisted
                  }
                  position={
                    data?.offenderReport?.offenderSummary?.images[0]?.position
                  }
                />
              </div>
            ) : (
              <Skeleton.Image className={classes.imageSkeleton} />
            )}
          </Col>
          <Col className={classes.detailsBody}>
            <Title className={classes.title} level={2}>
              {data?.offenderReport?.offenderSummary?.name}
            </Title>
            <Text type="secondary">
              {intl.formatMessage(
                {
                  defaultMessage: 'Alert ID: {ref}',
                },
                {
                  ref: data?.offenderReport?.offenderSummary?.reference,
                }
              )}
            </Text>
            <Title level={4} type="secondary">
              {intl.formatMessage({
                defaultMessage: 'Details',
              })}
            </Title>
            <Descriptions column={2} className={classes.descriptions}>
              <Descriptions.Item
                className={classes.descItem}
                label={intl.formatMessage({
                  defaultMessage: 'Gender',
                })}
              >
                {getSex(
                  data?.offenderReport?.offenderSummary?.gender ||
                    Gender.Unknown
                )}
              </Descriptions.Item>
              {publicOffenderDOB &&
                !data?.offenderReport?.offenderSummary?.dateOfBirth && (
                  <Descriptions.Item
                    className={classes.descItem}
                    label={intl.formatMessage({
                      defaultMessage: 'Age',
                    })}
                  >
                    {getAge(
                      data?.offenderReport?.offenderSummary?.age || Age.Unknown
                    )}
                  </Descriptions.Item>
                )}
              {publicOffenderDOB &&
                data?.offenderReport?.offenderSummary?.dateOfBirth && (
                  <Descriptions.Item
                    className={classes.descItem}
                    label={intl.formatMessage({
                      defaultMessage: 'Date of Birth',
                    })}
                  >
                    {moment(
                      data?.offenderReport?.offenderSummary?.dateOfBirth
                    ).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                )}
              {data?.offenderReport?.offenderSummary?.dateSource && (
                <Descriptions.Item
                  className={classes.descItem}
                  label={intl.formatMessage({
                    defaultMessage: 'DoB Source',
                  })}
                >
                  {data?.offenderReport?.offenderSummary?.dateSource}
                </Descriptions.Item>
              )}
              <Descriptions.Item
                className={classes.descItem}
                label={intl.formatMessage({
                  defaultMessage: 'Build',
                })}
              >
                {getBuild(
                  data?.offenderReport?.offenderSummary?.build || Build.Unknown
                )}
              </Descriptions.Item>
              <Descriptions.Item
                className={classes.descItem}
                label={intl.formatMessage({
                  defaultMessage: 'Ethnicity',
                })}
              >
                {getEthnicity(
                  data?.offenderReport?.offenderSummary?.race || Race.Unknown
                )}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={1}>
              <Descriptions.Item
                className={classes.descItem}
                label={intl.formatMessage({
                  defaultMessage: 'Hair',
                })}
              >
                {data?.offenderReport?.offenderSummary?.hair ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                className={classes.descItem}
                label={intl.formatMessage({
                  defaultMessage: 'Characteristics',
                })}
              >
                {data?.offenderReport?.offenderSummary?.peculiarities ||
                  intl.formatMessage({
                    defaultMessage: 'None documented',
                  })}
              </Descriptions.Item>
            </Descriptions>
          </Col>
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
              })}
            </Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Total Incidents',
              })}
              value={data?.offenderReport?.incidentSummary?.totalIncidents || 0}
              prefix={
                <FontAwesomeIcon
                  className={classes.prefixIcon}
                  icon={faCircleExclamation}
                />
              }
            />
            <Statistic
              className={classes.stats}
              title={intl.formatMessage({
                defaultMessage: 'Last Incident (in range)',
              })}
              value={
                data?.offenderReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.offenderReport?.incidentSummary?.lastIncidentDate
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
                data?.offenderReport?.incidentSummary
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
                data?.offenderReport?.incidentSummary
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
                data?.offenderReport?.incidentSummary?.mostCommonCrimeType || ''
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
        className="no-break"
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
                data?.offenderReport?.lossTotals?.totalLostValue
                  ? intl.formatNumber(
                      data?.offenderReport?.lossTotals?.totalLostValue || 0,
                      { style: 'currency', currency: 'GBP' }
                    )
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
                data?.offenderReport?.lossTotals?.totalRecoveredValue
                  ? intl.formatNumber(
                      data?.offenderReport?.lossTotals?.totalRecoveredValue ||
                        0,
                      { style: 'currency', currency: 'GBP' }
                    )
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
                (data?.offenderReport?.lossTotals?.averageSuccessRate || 0) *
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
                  data?.offenderReport?.lossTotals?.averagePerIncident || 0
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
            data={data?.offenderReport?.crimeTypeDonut}
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
            data={data?.offenderReport?.crimeTypeDonut}
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
    crimeTypesByBusinessRadial: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Crime Types by Business',
        })}
        className="no-break"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesByBusinessRadial') }}
        bodyStyle={{ height: '90%' }}
        key="crimeTypesByBusinessRadial"
      >
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={() => removeItem('crimeTypesByBusinessRadial')}
        />
        <RadialGraph
          isPrinting={isPrinting}
          data={data?.offenderReport?.crimeTypeBusinessRadial}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Crime Types',
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
          data={data?.offenderReport?.goodsTypeLossRecovered}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Crime Types',
          })}
        />
      </Card>
    ),

    incidentTimeOfDayDonut: (
      <Card
        title={intl.formatMessage({
          defaultMessage: 'Incident Time of Day',
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
            data={data?.offenderReport?.incidentTimeOfDayDonut}
            isPrinting={isPrinting}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incidents',
            })}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.offenderReport?.incidentTimeOfDayDonut}
            isPrinting={isPrinting}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incidents',
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
          defaultMessage: 'Incident Month',
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
            data={data?.offenderReport?.incidentMonthGraph}
            isPrinting={isPrinting}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incidents',
            })}
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.offenderReport?.incidentMonthGraph}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incidents',
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
        <BarGraph
          labelFormat={intl.formatMessage({
            defaultMessage: 'Incidents by Day of Week',
          })}
          data={data?.offenderReport?.incidentDayOfWeekGraph}
          isPrinting={isPrinting}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incidents',
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
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            total: data?.offenderReport?.incidentsTable?.total || 0,
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
        className="no-break pagebreak "
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
          data?.offenderReport?.incidentsTable?.incidents[0]?.location?.geoLat,
          data?.offenderReport?.offenderSummary?.addresses.length
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
          height={calculateHeight('incidentsHeatMap', 80)}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents Heat Map',
          })}
          data={
            data?.offenderReport?.incidentsTable?.incidents
              ?.filter(
                (incident) =>
                  incident.location?.geoLat && incident.location.geoLng
              )
              .map((incident) => ({
                geoLat: incident?.location?.geoLat || 0,
                geoLng: incident?.location?.geoLng || 0,
              })) || []
          }
          markers={
            data?.offenderReport?.offenderSummary?.addresses &&
            data?.offenderReport?.offenderSummary?.addresses.length > 0
              ? data?.offenderReport?.offenderSummary?.addresses.map(
                  (address) => ({
                    label: address.full || '',
                    key: address.id || '',
                    position: {
                      lat: address.geoLat || 0,
                      lng: address.geoLng || 0,
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
        className="page-break pagebreak"
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
        className="page-break pagebreak"
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
      incidentsTableData,
      targetedBusinessData,
      targetedGoodsData,
      metadata,
      isPrinting,
    ]
  );
};
export default OffenderReportLayout;
