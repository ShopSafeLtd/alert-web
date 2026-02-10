import type { FilterProps } from '#/views/reports/performance/layout/PerformanceReportLayout';
import type { MetaData } from '#/views/reports/types';

import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import Graph from '#/components/reports/graphs/graph';
import { useActivityGraphQuery } from '#/views/reports/performance/ActivitesGraph/graphql/queries/__generated__/activities-graph.generated';
import {
  faBarsProgress,
  faChartBar,
  faChartPie,
  faCogs,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface FormValue {
  label: string;
  userFilter: string[];
}

interface Props {
  editMode: boolean;
  filters: FilterProps;
  isPrinting: boolean;
  metaData?: MetaData;
  removeItem: () => void;
  setMetaData: (arg0: MetaData) => void;
}

const ActivitiesGraphView = ({
  editMode,
  filters,
  isPrinting,
  metaData,
  removeItem,
  setMetaData,
}: Props) => {
  const intl = useIntl();
  const [settingOpen, setSettingsOpen] = useState(false);

  const toggleSettingsOpen = () => setSettingsOpen(!settingOpen);

  const { data, loading: queryLoading } = useActivityGraphQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        createdAt: filters.dateRange,
        groupIds: filters.selectedGroups || [],
        roles: filters.selectedRoles || [],
        schemeIds: filters.schemeId ? [filters.schemeId] : [],
        userIds: (metaData?.filters?.userFilter as string[]) ?? undefined,
      },
    },
  });

  const onFormFinish = (value: FormValue) => {
    if (metaData && setMetaData) {
      console.log({
        ...metaData,
        filters: { userFilter: value.userFilter },
        label: value.label,
      });
      setMetaData({
        ...metaData,
        filters: { userFilter: value.userFilter },
        label: value.label,
      });
    }

    toggleSettingsOpen();
  };

  const calcCompletedPercentage = () => {
    const total =
      data?.activityGraph
        .map((item) => item.value)
        .reduce((a, b) => a + b, 0) ?? 0;
    const completed =
      data?.activityGraph.find((item) => item.label === 'Completed')?.value ??
      0;

    return (completed / total) * 100;
  };

  console.log(calcCompletedPercentage());

  return (
    <>
      {editMode ? (
        <Row className="graph-settings-row" gutter={4}>
          <Col>
            <Button
              className="no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faCogs} size="lg" />}
              onClick={toggleSettingsOpen}
              shape="circle"
              size="small"
              type="text"
            />
          </Col>
          <Col>
            <Button
              className="no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faBarsProgress} size="lg" />}
              onClick={() => {
                if (metaData && setMetaData) {
                  setMetaData({ ...metaData, type: 'linear-gauge' });
                }
              }}
              shape="circle"
              size="small"
              type="text"
            />
          </Col>
          <Col>
            <Button
              className="no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
              onClick={() => {
                if (metaData && setMetaData) {
                  setMetaData({ ...metaData, type: 'bar' });
                }
              }}
              shape="circle"
              size="small"
              type="text"
            />
          </Col>
          <Col>
            <Button
              className="no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
              onClick={() => {
                if (metaData && setMetaData) {
                  if (metaData?.type === 'donut') {
                    setMetaData({ ...metaData, type: 'pie' });
                  } else {
                    setMetaData({ ...metaData, type: 'donut' });
                  }
                }
              }}
              shape="circle"
              size="small"
              type="text"
            />
          </Col>
          <Col>
            <Button
              className="no-print"
              hidden={!editMode}
              icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
              onClick={removeItem}
              shape="circle"
              size="small"
              type="text"
            />
          </Col>
        </Row>
      ) : (
        <div />
      )}
      {metaData?.type === 'bar' ? (
        <Graph
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Activities',
          })}
          graphOptions={{
            data: data?.activityGraph.map((item) => ({
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
            rowData: data?.activityGraph.map((item) => ({
              count: item.value,
              type: item.label,
            })),
          }}
          isPrinting={isPrinting}
          label={
            metaData?.label ??
            intl.formatMessage({
              defaultMessage: 'Activity Status',
            })
          }
          loading={
            !queryLoading &&
            !!data?.activityGraph &&
            data.activityGraph.length > 0
          }
        />
      ) : (
        <Graph
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Activities',
          })}
          graphOptions={{
            data: data?.activityGraph.map((item) => ({
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
                type: metaData?.type === 'pie' ? 'pie' : 'donut',
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
            rowData: data?.activityGraph.map((item) => ({
              count: item.value,
              type: item.label,
            })),
          }}
          isPrinting={isPrinting}
          label={
            metaData?.label ??
            intl.formatMessage({
              defaultMessage: 'Activity Status',
            })
          }
          loading={
            !queryLoading &&
            !!data?.activityGraph &&
            data.activityGraph.length > 0
          }
        />
      )}

      <Drawer
        onClose={toggleSettingsOpen}
        open={settingOpen}
        title={intl.formatMessage({
          defaultMessage: 'Graph Settings',
        })}
        width={400}
      >
        <Form<FormValue>
          initialValues={{
            label: metaData?.label ?? '',
            userFilter: metaData?.filters?.userFilter ?? [],
          }}
          layout="vertical"
          onFinish={onFormFinish}
        >
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Graph Name' })}
            name="label"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'User Filter' })}
            name="userFilter"
          >
            <UsersSelect
              allowClear
              mode="multiple"
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Users',
              })}
            />
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Col>
                <Button htmlType="submit">
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ActivitiesGraphView;
