import type { FilterProps } from '#/views/reports/performance/layout/PerformanceReportLayout';
import type { MetaData } from '#/views/reports/types';
import type {
  GridReadyEvent,
  PaginationChangedEvent,
} from 'ag-grid-charts-enterprise';

import { useActivitiesTableReportLazyQuery } from '#/views/reports/performance/ActivitesTable/graphql/__generated__/ActivtiesTableReport.generated';
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

interface TData {
  assignedUsers: string;
  business?: null | string;
  completedDate: string;
  createdDate: string;
  dueDate: string;
  name?: null | string;
}

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
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  const toggleSettingsOpen = () => setSettingsOpen(!settingOpen);
  const onPaginationChanged = (event: PaginationChangedEvent<TData>) => {
    if (event.newPageSize) setPageSize(event.api.paginationGetPageSize());
    if (event.newPage) setPage(event.api.paginationGetCurrentPage());
  };

  const [getData] = useActivitiesTableReportLazyQuery({
    variables: {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        createdAt: filters.dateRange,
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

  const onGridReady = (params: GridReadyEvent<TData>) => {
    params.api.setGridOption('serverSideDatasource', {
      getRows: (rowParams) => {
        getData()
          .then(({ data }) => {
            rowParams.success({
              rowCount: data?.todoRelay.totalCount,
              rowData:
                data?.todoRelay.edges.map(({ node }) => ({
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
                })) ?? [],
            });
          })
          .catch((error) => {
            rowParams.fail();
            console.error('Error loading data:', error);
          });
      },
    });
  };

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

      <div
        className="ag-theme-quartz-auto-dark"
        style={{ height: 800, marginTop: 20 }}
      >
        <AgGridReact<TData>
          columnDefs={[
            { field: 'name' },
            { field: 'business' },
            { field: 'createdDate' },
            { field: 'dueDate' },
            { field: 'completedDate' },
            { field: 'assignedUsers' },
          ]}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
          pagination
          paginationPageSize={100}
          paginationPageSizeSelector={[20, 50, 100, 200, 400]}
          rowModelType="serverSide"
        />
      </div>
    </>
  );
};

export default ActivitiesTable;
