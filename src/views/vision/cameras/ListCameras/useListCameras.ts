import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useUpdateDefaultTimeoutMutation } from '#/views/vision/cameras/ListCameras/graphql/mutations/__generated__/upsert-default-timeout.generated';
import { useSchemeDetectTimeoutQuery } from '#/views/vision/cameras/ListCameras/graphql/queries/__generated__/SchemeMatch.generated';
import { useListVisionCamerasQuery } from '#/views/vision/cameras/ListCameras/graphql/queries/__generated__/VisionCameras.generated';
import { Form } from 'antd';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

const uploadInLast24Hours = (lastUploaded: Date) => {
  const uploadedDate = new Date(lastUploaded);
  const now = new Date();
  const diffInMs = now.getTime() - uploadedDate.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return diffInHours <= 24;
};

export interface CameraList {
  business: string;
  id: string;
  lastUploaded: string;
  make: null | string | undefined;
  model: null | string | undefined;
  serialNumber: null | string | undefined;
  status: string;
}

interface Return {
  data: CameraList[];
  defaultTimeout?: string;
  drawerVisible: boolean;
  form: ReturnType<typeof Form.useForm<DeafultTimeoutForm>>[0];
  handleDrawerClose: () => void;
  handleEditClick: () => void;
  handleFormSubmit: () => void;
  loading: boolean;
  loadingDefault: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onUpdateDefaultTimeout: (values: DeafultTimeoutForm) => Promise<void>;
  page: number;
  pageSize: number;
  search?: string;
  setDrawerVisible: (visible: boolean) => void;
  setSearch: (value: null | string) => void;
  submitting: boolean;
  total: number;
}

export interface DeafultTimeoutForm {
  hours: number;
  minutes: number;
  seconds: number;
  updateAllWithDefault: boolean;
}

const useListCameras = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [search, setSearch] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm<DeafultTimeoutForm>();
  const [submitting, setSubmitting] = useState(false);

  const { data, loading, refetch } = useListVisionCamerasQuery({
    variables: {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        schemeIds: [currentScheme],
        search,
      },
    },
  });

  const { data: schemeDefault, loading: loadingDefault } =
    useSchemeDetectTimeoutQuery({
      variables: { where: { id: currentScheme } },
    });

  const [upsertDefaultTimeout] = useUpdateDefaultTimeoutMutation({
    onCompleted: () => {
      void refetch();
    },
  });

  const sortedData =
    data?.aiVisionCameras.edges.map((edge) => ({
      business: edge.node.business.name,
      id: edge.node.id,
      lastUploaded: edge.node.lastUploaded
        ? new Date(edge.node.lastUploaded).toLocaleString()
        : 'No uploads',
      make: edge.node.make,
      model: edge.node.model,
      serialNumber: edge.node.serialNumber,
      status:
        edge.node.lastUploaded &&
        uploadInLast24Hours(new Date(edge.node.lastUploaded))
          ? 'Online'
          : 'Offline',
    })) ?? [];

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const handleUpdateDefaultTimeout = async (values: DeafultTimeoutForm) => {
    const hours = String(values.hours).padStart(2, '0');
    const minutes = String(values.minutes).padStart(2, '0');
    const seconds = String(values.seconds).padStart(2, '0');
    const timeoutString = `${hours}:${minutes}:${seconds}`;

    await upsertDefaultTimeout({
      variables: {
        scheme: currentScheme,
        timeout: timeoutString,
        updateAllCamerasOnDefault: values.updateAllWithDefault,
      },
    });
  };

  const handleEditClick = () => {
    const defaultTimeoutValue =
      schemeDefault?.scheme?.duplicateMatchTimeout || '00:00:00';
    const [hours, minutes, seconds] = defaultTimeoutValue
      .split(':')
      .map(Number);

    form.setFieldsValue({
      hours: hours || 0,
      minutes: minutes || 0,
      seconds: seconds || 0,
      updateAllWithDefault: false,
    });
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = () => {
    void form
      .validateFields()
      .then((values) => {
        setSubmitting(true);
        void handleUpdateDefaultTimeout(values)
          .then(() => {
            setSubmitting(false);
            setDrawerVisible(false);
            form.resetFields();
          })
          .catch(() => {
            setSubmitting(false);
          });
      })
      .catch(() => {
        // Validation failed, do nothing
      });
  };

  return {
    data: sortedData,
    defaultTimeout: schemeDefault?.scheme?.duplicateMatchTimeout ?? undefined,
    drawerVisible,
    form,
    handleDrawerClose,
    handleEditClick,
    handleFormSubmit,
    loading,
    loadingDefault,
    onPageChange: handlePageChange,
    onUpdateDefaultTimeout: handleUpdateDefaultTimeout,
    page,
    pageSize,
    search: search ?? undefined,
    setDrawerVisible,
    setSearch,
    submitting,
    total: data?.aiVisionCameras.totalCount ?? 0,
  };
};

export default useListCameras;
