import type {
  IncidentsTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import type { OffenderReportQuery } from 'graphql/reports/queries/__generated__/offender-report.generated';
import type RGL from 'react-grid-layout';

import publicOffenderDob from '#/utils/public-offender-dob';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { BarGraph, DonutGraph, HeatMapGoogle } from 'components/reports/graphs';
import {
  IncidentsColumns,
  TargetGoodsColumns,
  TargetedBusinessColumns,
} from 'components/reports/tableColumns';
import { Age, Build, Gender, Race } from 'graphql/types';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { getAge, getBuild, getEthnicity, getSex, shouldPrint } from 'utils';

import type { AllowedValue, Elements, MetaData } from '../../types';

import WatermarkImage from '../../../../components/images/WatermarkImage.view';
import RadialGraph from '../../../../components/reports/graphs/radialGraph';
import useStyles from '../../styles/report.styles';

const { Text, Title } = Typography;

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  data: OffenderReportQuery | undefined;

  editMode: boolean;
  incidentsTableData: [] | IncidentsTableData[];
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  margin: [number, number];
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  rowHeight: number;
  setMetadata: (arg0: MetaData[]) => void;
  targetedBusinessData: [] | TargetedBusinessTableData[];
  targetedGoodsData: [] | TargetedGoodsTableData[];
}
const OffenderReportLayout = ({
  changeSize,
  data,
  editMode,
  incidentsTableData,
  isPrinting,
  layout,
  loading,
  margin,
  metadata,
  removeItem,
  rowHeight,
  setMetadata,
  targetedBusinessData,
  targetedGoodsData,
}: Props) => {
  const classes = useStyles();
  const publicOffenderDOB = publicOffenderDob();
  const calculateHeight = (key: string, offset?: number) => {
    const targetElement = layout.find((element) => element.i === key);
    const targetH = targetElement ? targetElement.h : 0;
    return `${
      rowHeight * targetH + margin[1] * (targetH - 1) - (offset || 0)
    }px`;
  };
  const intl = useIntl();
  const components: Elements = {
    crimeTypesByBusinessRadial: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="crimeTypesByBusinessRadial"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesByBusinessRadial') }}
        title={intl.formatMessage({
          defaultMessage: 'Incident Types by Business',
        })}
      >
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('crimeTypesByBusinessRadial')}
          shape="circle"
          size="small"
          type="text"
        />
        <RadialGraph
          data={data?.offenderReport?.crimeTypeBusinessRadial}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types',
          })}
          isPrinting={isPrinting}
        />
      </Card>
    ),
    crimeTypesDonut: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="crimeTypesDonut"
        loading={loading}
        style={{ height: calculateHeight('crimeTypesDonut') }}
        title={intl.formatMessage({
          defaultMessage: 'Incident Types',
        })}
      >
        <Button
          className="change-graph1 no-print"
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
          className="change-graph2 no-print"
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
          className="card-remove no-print"
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
          <DonutGraph
            data={data?.offenderReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incident Types',
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
            data={data?.offenderReport?.crimeTypeDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incident Types',
            })}
            isPrinting={isPrinting}
            labelFormat={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
          />
        )}
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
          data={data?.offenderReport?.goodsTypeLossRecovered}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incident Types',
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
          defaultMessage: 'Incident Month',
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
            data={data?.offenderReport?.incidentMonthGraph}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incidents',
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
    incidentTimeOfDayDonut: (
      <Card
        bodyStyle={{ height: '90%' }}
        className="no-break"
        key="incidentTimeOfDayDonut"
        loading={loading}
        style={{ height: calculateHeight('incidentTimeOfDayDonut') }}
        title={intl.formatMessage({
          defaultMessage: 'Incident Time of Day',
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
            data={data?.offenderReport?.incidentTimeOfDayDonut}
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Incidents',
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
            data={data?.offenderReport?.incidentTimeOfDayDonut}
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
        <BarGraph
          data={data?.offenderReport?.incidentDayOfWeekGraph}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Incidents',
          })}
          isPrinting={isPrinting}
          labelFormat={intl.formatMessage({
            defaultMessage: 'Incidents by Day of Week',
          })}
        />
      </Card>
    ),

    incidentsHeatMap: (
      <Card
        className={`${shouldPrint(
          data?.offenderReport?.incidentsTable?.incidents[0]?.location?.geoLat,
          data?.offenderReport?.offenderSummary?.addresses.length
        )} no-break`}
        key="incidentsHeatMap"
        loading={loading}
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
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents to display',
          })}
          height={calculateHeight('incidentsHeatMap', 80)}
          isPrinting={isPrinting}
          label={intl.formatMessage({
            defaultMessage: 'Incidents Heat Map',
          })}
          markers={
            data?.offenderReport?.offenderSummary?.addresses &&
            data?.offenderReport?.offenderSummary?.addresses.length > 0
              ? data?.offenderReport?.offenderSummary?.addresses.map(
                  (address) => ({
                    key: address.id || '',
                    label: address.full || '',
                    position: {
                      lat: address.geoLat || 0,
                      lng: address.geoLng || 0,
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
                  icon={faCircleExclamation}
                />
              }
              title={intl.formatMessage({
                defaultMessage: 'Total Incidents',
              })}
              value={data?.offenderReport?.incidentSummary?.totalIncidents || 0}
            />
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
                data?.offenderReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.offenderReport?.incidentSummary?.lastIncidentDate
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
                data?.offenderReport?.incidentSummary
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
                data?.offenderReport?.incidentSummary
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
                data?.offenderReport?.incidentSummary?.mostCommonCrimeType || ''
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
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('incidentsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total: data?.offenderReport?.incidentsTable?.total || 0,
          }}
          size="small"
        />
      </Card>
    ),

    lossSummary: (
      <Card
        bodyStyle={{ width: '100%' }}
        className="no-break"
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
                defaultMessage: 'Total lost value',
              })}
              value={
                data?.offenderReport?.lossTotals?.totalLostValue
                  ? intl.formatNumber(
                      data?.offenderReport?.lossTotals?.totalLostValue || 0,
                      { currency: 'GBP', style: 'currency' }
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
                defaultMessage: 'Total recovered value',
              })}
              value={
                data?.offenderReport?.lossTotals?.totalRecoveredValue
                  ? intl.formatNumber(
                      data?.offenderReport?.lossTotals?.totalRecoveredValue ||
                        0,
                      { currency: 'GBP', style: 'currency' }
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
                (data?.offenderReport?.lossTotals?.averageSuccessRate || 0) *
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
                defaultMessage: 'Average Loss per Incident',
              })}
              value={intl.formatNumber(
                data?.offenderReport?.lossTotals?.averagePerIncident || 0,
                {
                  currency: 'GBP',
                  style: 'currency',
                }
              )}
            />
          </Row>
        </Row>
      </Card>
    ),
    offenderSummary: (
      <Card
        bodyStyle={{ width: '100%' }}
        key="offenderSummary"
        loading={loading}
        style={{ width: '100%' }}
      >
        <Row wrap={false}>
          <Button
            className="card-remove no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
            onClick={() => removeItem('offenderSummary')}
            shape="circle"
            size="small"
            type="text"
          />
          <Col className={classes.imageCol} span={6}>
            {data?.offenderReport?.offenderSummary?.images &&
            data?.offenderReport?.offenderSummary?.images.length > 0 ? (
              <div className={classes.image}>
                <WatermarkImage
                  position={
                    data?.offenderReport?.offenderSummary?.images[0]?.position
                  }
                  url={
                    data?.offenderReport?.offenderSummary?.images[0]
                      ?.optimisedPersisted
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
            <Descriptions className={classes.descriptions} column={2}>
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
    pageBreak: (
      <div
        className="page-break pagebreak"
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
        className="page-break pagebreak"
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
            hideOnSinglePage: true,
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
        className="no-break pagebreak "
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
            hideOnSinglePage: true,
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
      incidentsTableData,
      targetedBusinessData,
      targetedGoodsData,
      metadata,
      isPrinting,
    ]
  );
};
export default OffenderReportLayout;
