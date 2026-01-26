import type { FormInstance } from 'antd';

import { Modal } from 'antd';
import React, { useState } from 'react';

import type {
  AreaGeometry,
  DrawerMode,
  DrawingMode,
  GeographicalArea,
  ReportingAreaFormData,
} from './types';

import AreasListSidebar from './components/AreasListSidebar';
import MapDrawingToolbar from './components/MapDrawingToolbar';
import ReportingAreaDrawer from './components/ReportingAreaDrawer';
import ReportingAreasMap from './components/ReportingAreasMap';

interface ReportingAreasViewProps {
  areas: GeographicalArea[];
  drawerMode: DrawerMode;
  drawingMode: DrawingMode;
  drawnGeometry: AreaGeometry | null;
  form: FormInstance;
  loading: boolean;
  onClearDrawing: () => void;
  onCloseDrawer: () => void;
  onCreate: (values: ReportingAreaFormData) => void;
  onDelete: (id: string) => void;
  onDrawComplete: (geometry: AreaGeometry) => void;
  onOpenCreateDrawer: () => void;
  onOpenEditDrawer: (area: GeographicalArea) => void;
  onSelectArea: (area: GeographicalArea) => void;
  onSetDrawingMode: (mode: DrawingMode) => void;
  onToggleSidebar: () => void;
  onUpdate: (id: string, values: ReportingAreaFormData) => void;
  selectedArea: GeographicalArea | null;
  sidebarCollapsed: boolean;
  submitting: boolean;
}

export const ReportingAreasView: React.FC<ReportingAreasViewProps> = ({
  areas,
  drawerMode,
  drawingMode,
  drawnGeometry,
  form,
  loading,
  onClearDrawing,
  onCloseDrawer,
  onCreate,
  onDelete,
  onDrawComplete,
  onOpenCreateDrawer,
  onOpenEditDrawer,
  onSelectArea,
  onSetDrawingMode,
  onToggleSidebar,
  onUpdate,
  selectedArea,
  sidebarCollapsed,
  submitting,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleDelete = (id: string) => {
    const area = areas.find((a) => a.id === id);
    Modal.confirm({
      cancelText: 'Cancel',
      content: `Are you sure you want to delete "${area?.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      onOk: () => onDelete(id),
      title: 'Delete Reporting Area',
    });
  };

  const handleFormSubmit = (
    values: Omit<ReportingAreaFormData, 'geometry'>
  ) => {
    const formData: ReportingAreaFormData = {
      color: values.color,
      description: values.description,
      geometry: drawnGeometry,
      name: values.name,
    };

    if (drawerMode === 'create') {
      onCreate(formData);
    } else if (drawerMode === 'edit' && selectedArea) {
      onUpdate(selectedArea.id, formData);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Panel - Show either List or Form */}
      {drawerMode ? (
        <ReportingAreaDrawer
          drawingMode={drawingMode}
          drawnGeometry={drawnGeometry}
          form={form}
          mode={drawerMode}
          onClearDrawing={onClearDrawing}
          onClose={onCloseDrawer}
          onDrawCircle={() => onSetDrawingMode('circle')}
          onDrawPolygon={() => onSetDrawingMode('polygon')}
          onSubmit={handleFormSubmit}
          open={!!drawerMode}
          submitting={submitting}
        />
      ) : (
        <AreasListSidebar
          areas={areas}
          collapsed={sidebarCollapsed}
          loading={loading}
          onCreateArea={onOpenCreateDrawer}
          onDeleteArea={handleDelete}
          onEditArea={onOpenEditDrawer}
          onSearchChange={setSearchValue}
          onSelectArea={onSelectArea}
          onToggle={onToggleSidebar}
          searchValue={searchValue}
          selectedArea={selectedArea}
        />
      )}

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReportingAreasMap
          areas={areas}
          drawingMode={drawingMode}
          onAreaClick={onSelectArea}
          onDrawComplete={onDrawComplete}
          selectedArea={selectedArea}
        />

        {/* Drawing Toolbar (only show when drawer is open) */}
        {drawerMode && (
          <MapDrawingToolbar
            disabled={submitting}
            drawingMode={drawingMode}
            onCancel={() => onSetDrawingMode(null)}
            onDrawCircle={() => onSetDrawingMode('circle')}
            onDrawPolygon={() => onSetDrawingMode('polygon')}
            onEditMode={() => onSetDrawingMode('edit')}
          />
        )}
      </div>
    </div>
  );
};

export default ReportingAreasView;
