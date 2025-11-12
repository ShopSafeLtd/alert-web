import type { ViewAiCameraQuery } from '#/views/vision/cameras/UpsertCameras/graphql/queries/__generated__/ViewCamera.generated';
import type { ListDetectionConfigsQueryVariables } from '#/views/vision/detection-configs/graphql/queries/__generated__/list-configs.generated';
import type { FormInstance } from 'antd';
import type {
  AiVisionMatchConfidence,
  AiVisionMatchPriority,
  DetectActionType,
} from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useViewAiCameraQuery } from '#/views/vision/cameras/UpsertCameras/graphql/queries/__generated__/ViewCamera.generated';
import { useListDetectionConfigsQuery } from '#/views/vision/detection-configs/graphql/queries/__generated__/list-configs.generated';
import { Form } from 'antd';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUpsertAiCameraMutation } from './graphql/mutations/__generated__/upsert-camera.generated';

export interface CameraList {
  business: string;
  lastUploaded: string;
  make: string | null | undefined;
  model: string | null | undefined;
  serialNumber: string | null | undefined;
  status: string;
}
export interface CameraUpsertForm {
  make: string | null | undefined;
  model: string | null | undefined;
  serialNumber: string;
  detectionConfigs: string[];
  groups: string[];
  businessId: string[];
  duplicateMatchTimeout: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
interface Return {
  loading: boolean;
  data: ViewAiCameraQuery['aiVisionCamera'] | null | undefined;
  form: FormInstance<CameraUpsertForm>;
  detectionConfigs: DetectionConfigItem[];
  handleFormSubmit: (formData: CameraUpsertForm) => void;
  editId: string | null;
}

interface DetectionConfigItem {
  key: string;
  id: string;
  name: string;
  type: DetectActionType;
  minimumConfidenceTrigger: AiVisionMatchConfidence;
  minimumPriorityTrigger: AiVisionMatchPriority;
  cameraCount: number;
}
const useUpsertCameras = ({ id }: { id: string | null }): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const navigate = useNavigate();
  const [form] = Form.useForm<CameraUpsertForm>();
  const [submitting, setSubmitting] = useState(false);
  const [settingState, setSettingState] = useState(!!id);
  const configVariables: ListDetectionConfigsQueryVariables = {
    where: {
      search: undefined,
      schemeId: currentScheme,
      type: undefined,
    },
  };

  const { data: detectConfigsData, loading: detectConfigsLoading } =
    useListDetectionConfigsQuery({
      fetchPolicy: 'cache-first',
      variables: configVariables,
    });

  const detectionConfigs =
    detectConfigsData?.detectionConfigs?.edges.map((edge) => {
      const config = edge.node;
      return {
        key: config.id,
        id: config.id,
        name: config.name,
        type: config.type,
        minimumConfidenceTrigger: config.minimumConfidenceTrigger,
        minimumPriorityTrigger: config.minimumPriorityTrigger,
        cameraCount: config.cameraCount,
      };
    }) ?? [];

  const { data, loading } = useViewAiCameraQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: id || '',
      },
    },
    skip: !id,
  });

  useEffect(() => {
    if (data?.aiVisionCamera && detectionConfigs.length > 0) {
      const config = data.aiVisionCamera;
      const validConfigs =
        config.onDetect?.filter((c) =>
          detectionConfigs.some((dc) => dc.id === c.id)
        ) || [];

      // Parse duplicateMatchTimeout from string (HH:MM:SS) to object
      const timeoutString = config.duplicateMatchTimeout || '00:00:00';
      const [hours, minutes, seconds] = timeoutString.split(':').map(Number);

      form.setFieldsValue({
        make: config.make || undefined,
        model: config.model || undefined,
        serialNumber: config.serialNumber || '',
        detectionConfigs: validConfigs.map((c) => c.id) || [],
        groups: config.groups?.map((g) => g.id) || [],
        businessId: [config.business.id],
        duplicateMatchTimeout: {
          hours: hours || 0,
          minutes: minutes || 0,
          seconds: seconds || 0,
        },
      });

      setSettingState(false);
    }
  }, [data, detectionConfigs, form]);

  const [upsertCamera] = useUpsertAiCameraMutation({
    onCompleted: () => {
      void navigate('/app/vision/cameras');
    },
  });

  const handleFormSubmit = (formData: CameraUpsertForm) => {
    setSubmitting(true);

    // Convert duplicateMatchTimeout from object to string (HH:MM:SS)
    const { hours, minutes, seconds } = formData.duplicateMatchTimeout;
    const timeoutString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const originalGroups = data?.aiVisionCamera?.groups?.map((g) => g.id) || [];
    const missingGroups = originalGroups.filter(
      (id) => !formData.groups.includes(id)
    );
    const newGroups = formData.groups.filter(
      (id) => !originalGroups.includes(id)
    );

    const originalConfigs =
      data?.aiVisionCamera?.onDetect?.map((c) => c.id) || [];
    const missingConfigs = originalConfigs.filter(
      (id) => !formData.detectionConfigs.includes(id)
    );
    const newConfigs = formData.detectionConfigs.filter(
      (id) => !originalConfigs.includes(id)
    );
    void upsertCamera({
      variables: {
        data: {
          id: id || undefined,
          scheme: currentScheme,
          business: formData.businessId[0],
          duplicateMatchTimeout: timeoutString,
          groups: {
            connect: newGroups.map((id) => id),
            disconnect: missingGroups.map((id) => id),
          },
          model: formData.model,
          make: formData.make,
          serialNumber: formData.serialNumber,
          onDetect: {
            connect: newConfigs.map((id) => id),
            disconnect: missingConfigs.map((id) => id),
          },
        },
      },
    });
  };

  return {
    loading: loading || detectConfigsLoading || submitting || settingState,
    detectionConfigs,
    data: data?.aiVisionCamera,
    form,
    handleFormSubmit,
    editId: id,
  };
};

export default useUpsertCameras;
