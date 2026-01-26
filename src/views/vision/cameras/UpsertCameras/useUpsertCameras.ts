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
  make: null | string | undefined;
  model: null | string | undefined;
  serialNumber: null | string | undefined;
  status: string;
}
export interface CameraUpsertForm {
  businessId: string[];
  detectionConfigs: string[];
  duplicateMatchTimeout: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  groups: string[];
  make: null | string | undefined;
  model: null | string | undefined;
  serialNumber: string;
}
interface Return {
  data: ViewAiCameraQuery['aiVisionCamera'] | null | undefined;
  detectionConfigs: DetectionConfigItem[];
  editId: null | string;
  form: FormInstance<CameraUpsertForm>;
  handleFormSubmit: (formData: CameraUpsertForm) => void;
  loading: boolean;
}

interface DetectionConfigItem {
  cameraCount: number;
  id: string;
  key: string;
  minimumConfidenceTrigger: AiVisionMatchConfidence;
  minimumPriorityTrigger: AiVisionMatchPriority;
  name: string;
  type: DetectActionType;
}
const useUpsertCameras = ({ id }: { id: null | string }): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const navigate = useNavigate();
  const [form] = Form.useForm<CameraUpsertForm>();
  const [submitting, setSubmitting] = useState(false);
  const [settingState, setSettingState] = useState(!!id);
  const configVariables: ListDetectionConfigsQueryVariables = {
    where: {
      schemeId: currentScheme,
      search: undefined,
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
        cameraCount: config.cameraCount,
        id: config.id,
        key: config.id,
        minimumConfidenceTrigger: config.minimumConfidenceTrigger,
        minimumPriorityTrigger: config.minimumPriorityTrigger,
        name: config.name,
        type: config.type,
      };
    }) ?? [];

  const { data, loading } = useViewAiCameraQuery({
    fetchPolicy: 'cache-and-network',
    skip: !id,
    variables: {
      where: {
        id: id || '',
      },
    },
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
        businessId: [config.business.id],
        detectionConfigs: validConfigs.map((c) => c.id) || [],
        duplicateMatchTimeout: {
          hours: hours || 0,
          minutes: minutes || 0,
          seconds: seconds || 0,
        },
        groups: config.groups?.map((g) => g.id) || [],
        make: config.make || undefined,
        model: config.model || undefined,
        serialNumber: config.serialNumber || '',
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
          business: formData.businessId[0],
          duplicateMatchTimeout: timeoutString,
          groups: {
            connect: newGroups.map((id) => id),
            disconnect: missingGroups.map((id) => id),
          },
          id: id || undefined,
          make: formData.make,
          model: formData.model,
          onDetect: {
            connect: newConfigs.map((id) => id),
            disconnect: missingConfigs.map((id) => id),
          },
          scheme: currentScheme,
          serialNumber: formData.serialNumber,
        },
      },
    });
  };

  return {
    data: data?.aiVisionCamera,
    detectionConfigs,
    editId: id,
    form,
    handleFormSubmit,
    loading: loading || detectConfigsLoading || submitting || settingState,
  };
};

export default useUpsertCameras;
