import UpsertCamerasView from '#/views/vision/cameras/UpsertCameras/UpsertCameras.view';
import useUpsertCameras from '#/views/vision/cameras/UpsertCameras/useUpsertCameras';
import React from 'react';
import { useParams } from 'react-router-dom';

const UpsertCamerasContainer = () => {
  const id = useParams()?.id || null;
  const { data, detectionConfigs, editId, form, handleFormSubmit, loading } =
    useUpsertCameras({ id });
  return (
    <UpsertCamerasView
      data={data}
      detectionConfigs={detectionConfigs}
      editId={editId}
      form={form}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
    />
  );
};

export default UpsertCamerasContainer;
