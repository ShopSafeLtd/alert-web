import UpsertCamerasView from '#/views/vision/cameras/UpsertCameras/UpsertCameras.view';
import useUpsertCameras from '#/views/vision/cameras/UpsertCameras/useUpsertCameras';
import { useParams } from 'react-router-dom';

const UpsertCamerasContainer = () => {
  const id = useParams()?.id || null;
  const { data, loading, detectionConfigs, form, handleFormSubmit, editId } =
    useUpsertCameras({ id });
  return (
    <UpsertCamerasView
      loading={loading}
      data={data}
      detectionConfigs={detectionConfigs}
      form={form}
      handleFormSubmit={handleFormSubmit}
      editId={editId}
    />
  );
};

export default UpsertCamerasContainer;
