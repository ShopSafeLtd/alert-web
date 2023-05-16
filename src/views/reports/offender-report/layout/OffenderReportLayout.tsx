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
import type { OffenderReportQuery } from '../../../../graphql/generated';
import { Age, Build, Gender, Race } from '../../../../graphql/generated';
import useStyles from '../../styles/report.styles';
import WatermarkImage from '../../../../components/images/WatermarkImage.view';
import RadialGraph from '../../../../components/reports/graphs/radialGraph';
import type { AllowedValue, Elements } from '../../types';
import { MetaData } from '../../types';

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
  const calculateHeight = (key: string, offset?: number) => {
    const targetElement = layout.find((element) => element.i === key);
    const targetH = targetElement ? targetElement.h : 0;
    return `${
      rowHeight * targetH + margin[1] * (targetH - 1) - (offset || 0)
    }px`;
  };
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
              Alert ID: {data?.offenderReport?.offenderSummary?.reference}
            </Text>
            <Title level={4} type="secondary">
              Details
            </Title>
            <Descriptions column={2} className={classes.descriptions}>
              <Descriptions.Item className={classes.descItem} label="Gender">
                {getSex(
                  data?.offenderReport?.offenderSummary?.gender ||
                    Gender.Unknown
                )}
              </Descriptions.Item>
              {!data?.offenderReport?.offenderSummary?.dateOfBirth && (
                <Descriptions.Item className={classes.descItem} label="Age">
                  {getAge(
                    data?.offenderReport?.offenderSummary?.age || Age.Unknown
                  )}
                </Descriptions.Item>
              )}
              {data?.offenderReport?.offenderSummary?.dateOfBirth && (
                <Descriptions.Item
                  className={classes.descItem}
                  label="Date of Birth"
                >
                  {moment(
                    data?.offenderReport?.offenderSummary?.dateOfBirth
                  ).format('DD/MM/YYYY')}
                </Descriptions.Item>
              )}
              {data?.offenderReport?.offenderSummary?.dateSource && (
                <Descriptions.Item
                  className={classes.descItem}
                  label="DoB Source"
                >
                  {data?.offenderReport?.offenderSummary?.dateSource}
                </Descriptions.Item>
              )}
              <Descriptions.Item className={classes.descItem} label="Build">
                {getBuild(
                  data?.offenderReport?.offenderSummary?.build || Build.Unknown
                )}
              </Descriptions.Item>
              <Descriptions.Item className={classes.descItem} label="Ethnicity">
                {getEthnicity(
                  data?.offenderReport?.offenderSummary?.race || Race.Unknown
                )}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={1}>
              <Descriptions.Item className={classes.descItem} label="Hair">
                {data?.offenderReport?.offenderSummary?.hair || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item
                className={classes.descItem}
                label="Peculiarities"
              >
                {data?.offenderReport?.offenderSummary?.peculiarities ||
                  'None documented'}
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
            <Title level={4}>Incidents Summary</Title>
          </Col>
          <Row className="stats-row">
            <Statistic
              className={classes.stats}
              title="Last Incident (in range)"
              value={
                data?.offenderReport?.incidentSummary?.lastIncidentDate
                  ? new Date(
                      data?.offenderReport?.incidentSummary?.lastIncidentDate
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
              title="Police Attended"
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
              title="Most common crime type"
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
                data?.offenderReport?.lossTotals?.totalLostValue
                  ? `£${data?.offenderReport?.lossTotals?.totalLostValue.toFixed(
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
                data?.offenderReport?.lossTotals?.totalRecoveredValue
                  ? `£${data?.offenderReport?.lossTotals?.totalRecoveredValue.toFixed(
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
              title="Average Loss per Incident"
              value={
                `£${data?.offenderReport?.lossTotals?.averagePerIncident.toFixed(
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
            data={data?.offenderReport?.crimeTypeDonut}
            emptyLabel="No Crime Types"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.offenderReport?.crimeTypeDonut}
            emptyLabel="No Crime Types"
            labelFormat="Incidents"
          />
        )}
      </Card>
    ),
    crimeTypesByBusinessRadial: (
      <Card
        title="Crime Types By Business"
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
          data={data?.offenderReport?.crimeTypeBusinessRadial}
          emptyLabel="No Crime Types"
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
          data={data?.offenderReport?.goodsTypeLossRecovered}
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
            data={data?.offenderReport?.incidentTimeOfDayDonut}
            emptyLabel="No goods count"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.offenderReport?.incidentTimeOfDayDonut}
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
            data={data?.offenderReport?.incidentMonthGraph}
            emptyLabel="No incidents"
            type={
              metadata.find((item) => item.key === 'crimeTypesDonut')?.type as
                | 'donut'
                | 'pie'
            }
          />
        ) : (
          <BarGraph
            data={data?.offenderReport?.incidentMonthGraph}
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
          data={data?.offenderReport?.incidentDayOfWeekGraph}
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
    incidentsHeatMap: (
      <Card
        className={`${shouldPrint(
          data?.offenderReport?.incidentsTable?.incidents[0]?.location?.geoLat,
          data?.offenderReport?.offenderSummary?.addresses.length
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
      incidentsTableData,
      targetedBusinessData,
      targetedGoodsData,
      metadata,
      isPrinting,
    ]
  );
};
export default OffenderReportLayout;
