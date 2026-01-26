import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Spin } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';

import ReportingAreasView from './ReportingAreas.view';
import useReportingAreas from './useReportingAreas';

const ReportingAreasContainer: React.FC = () => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const {
    areas,
    clearDrawnGeometry,
    closeDrawer,
    drawerMode,
    drawingMode,
    drawnGeometry,
    form,
    handleCreate,
    handleDelete,
    handleDrawComplete,
    handleUpdate,
    loading,
    openCreateDrawer,
    openEditDrawer,
    selectedArea,
    setDrawingMode,
    setSelectedArea,
    sidebarCollapsed,
    submitting,
    toggleSidebar,
  } = useReportingAreas(schemeId || '');

  if (!schemeId) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" tip="Loading scheme..." />
      </div>
    );
  }

  return (
    <ReportingAreasView
      areas={areas}
      drawerMode={drawerMode}
      drawingMode={drawingMode}
      drawnGeometry={drawnGeometry}
      form={form}
      loading={loading}
      onClearDrawing={clearDrawnGeometry}
      onCloseDrawer={closeDrawer}
      onCreate={(values) => {
        void handleCreate(values);
      }}
      onDelete={(id) => {
        void handleDelete(id);
      }}
      onDrawComplete={handleDrawComplete}
      onOpenCreateDrawer={openCreateDrawer}
      onOpenEditDrawer={openEditDrawer}
      onSelectArea={setSelectedArea}
      onSetDrawingMode={setDrawingMode}
      onToggleSidebar={toggleSidebar}
      onUpdate={(id, values) => {
        void handleUpdate(id, values);
      }}
      selectedArea={selectedArea}
      sidebarCollapsed={sidebarCollapsed}
      submitting={submitting}
    />
  );
};

export default ReportingAreasContainer;
