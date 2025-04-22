import type { FilterProps } from '#/views/reports/performance/layout/PerformanceReportLayout';
import type { MetaData } from '#/views/reports/types';

import { useActivitiesTableReportQuery } from '#/views/reports/performance/ActivitesTable/graphql/__generated__/ActivtiesTableReport.generated';
import {
  faBarsProgress,
  faChartBar,
  faChartPie,
  faCogs,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AgGridReact } from 'ag-grid-react';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import { TodoStatusInput, TodoUserModeInput } from 'graphql/types';
import React, { useState } from 'react';

interface Props {
  editMode: boolean;
  filters: FilterProps;
  isPrinting: boolean;
  metaData?: MetaData;
  removeItem: () => void;
  setMetaData: (arg0: MetaData) => void;
}

const ActivitiesTable = ({
  editMode,
  filters,
  metaData,
  removeItem,
  setMetaData,
}: Props) => {
  const [settingOpen, setSettingsOpen] = useState(false);

  const toggleSettingsOpen = () => setSettingsOpen(!settingOpen);

  const { data } = useActivitiesTableReportQuery({
    variables: {
      where: {
        // createdAt: filters.dateRange,
        groupIds:
          filters.selectedGroups.length > 0
            ? filters.selectedGroups
            : undefined,
        schemeIds: filters.schemeId ? [filters.schemeId] : [],
        status: TodoStatusInput.Uncompleted,
        userMode: TodoUserModeInput.All,
      },
    },
  });

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
                console.log({ ...metaData, type: 'linear-gauge' });
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

      <div className="ag-theme-quartz-auto-dark" style={{ height: 500 }}>
        <AgGridReact
          columnDefs={[
            { field: 'name' },
            { field: 'business' },
            { field: 'createdDate' },
            { field: 'dueDate' },
            { field: 'completedDate' },
            { field: 'assignedUsers' },
          ]}
          rowData={data?.todoRelay.edges.map(({ node }) => ({
            assignedUsers: node.assignedUsers
              .map((item) => item.fullName)
              .toString(),
            business: node.business?.name ?? '',
            completedDate: node.completedDate
              ? dayjs(node.completedDate).format('DD/MM/YYYY')
              : '',
            createdDate: dayjs(node.createdAt).format('DD/MM/YYYY'),
            dueDate: dayjs(node.dueDate).format('DD/MM/YYYY'),
            name: node.name,
          }))}
        />
      </div>
    </>
  );
};

export default ActivitiesTable;
