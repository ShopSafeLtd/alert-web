import type {
  ApolloError,
  MutationUpdaterFn,
  Reference,
  StoreObject,
} from '@apollo/client';
import type { FormInstance } from 'antd/lib/form';

import { Form, notification } from 'antd';
import { useCallback, useState } from 'react';

import type {
  CreateGeographicalAreaInput,
  UpdateGeographicalAreaInput,
} from '../../../graphql/types';
import type {
  AreaGeometry,
  CircleGeometry,
  DrawerMode,
  DrawingMode,
  GeographicalArea,
  PolygonGeometry,
  ReportingAreaFormData,
} from './types';

import {
  type CreateGeographicalAreaMutation,
  useCreateGeographicalAreaMutation,
} from './graphql/mutations/__generated__/create-geographical-area.generated';
import {
  type DeleteGeographicalAreaMutation,
  useDeleteGeographicalAreaMutation,
} from './graphql/mutations/__generated__/delete-geographical-area.generated';
import {
  type UpdateGeographicalAreaMutation,
  useUpdateGeographicalAreaMutation,
} from './graphql/mutations/__generated__/update-geographical-area.generated';
import {
  type GeographicalAreasQuery,
  useGeographicalAreasQuery,
} from './graphql/queries/__generated__/geographical-areas.generated';
import { GeographicalAreasDocument } from './graphql/queries/__generated__/geographical-areas.generated';

interface UseReportingAreasReturn {
  // Data
  areas: GeographicalArea[];
  clearDrawnGeometry: () => void;
  closeDrawer: () => void;

  // Drawer state
  drawerMode: DrawerMode;
  // Drawing state
  drawingMode: DrawingMode;

  drawnGeometry: AreaGeometry | null;
  error: ApolloError | undefined;

  // Form state
  form: FormInstance<ReportingAreaFormData>;
  // CRUD operations
  handleCreate: (values: ReportingAreaFormData) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleDrawComplete: (geometry: AreaGeometry) => void;

  handleUpdate: (id: string, values: ReportingAreaFormData) => Promise<void>;
  loading: boolean;
  openCreateDrawer: () => void;
  openEditDrawer: (area: GeographicalArea) => void;
  // Selection state
  selectedArea: GeographicalArea | null;

  setDrawingMode: (mode: DrawingMode) => void;
  setSelectedArea: (area: GeographicalArea | null) => void;

  // Sidebar state
  sidebarCollapsed: boolean;
  submitting: boolean;
  toggleSidebar: () => void;
}

export const useReportingAreas = (
  schemeId: string
): UseReportingAreasReturn => {
  const [form] = Form.useForm<ReportingAreaFormData>();
  const [selectedArea, setSelectedArea] = useState<GeographicalArea | null>(
    null
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>(null);
  const [drawnGeometry, setDrawnGeometry] = useState<AreaGeometry | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Query
  const { data, error, loading } = useGeographicalAreasQuery({
    skip: !schemeId,
    variables: { schemeId },
  });

  const areas = (data?.geographicalAreas || []) as GeographicalArea[];

  // Cache updater functions
  const updateCacheAfterCreate: MutationUpdaterFn<CreateGeographicalAreaMutation> =
    useCallback(
      (cache, { data }) => {
        if (!data?.createGeographicalArea) return;

        const existingData = cache.readQuery<GeographicalAreasQuery>({
          query: GeographicalAreasDocument,
          variables: { schemeId },
        });

        if (existingData) {
          cache.writeQuery({
            data: {
              geographicalAreas: [
                ...existingData.geographicalAreas,
                data.createGeographicalArea,
              ],
            },
            query: GeographicalAreasDocument,
            variables: { schemeId },
          });
        }
      },
      [schemeId]
    );

  const updateCacheAfterUpdate: MutationUpdaterFn<UpdateGeographicalAreaMutation> =
    useCallback((cache, { data }) => {
      if (!data?.updateGeographicalArea) return;
      // Apollo will automatically update the cache for updates
    }, []);

  const updateCacheAfterDelete: MutationUpdaterFn<DeleteGeographicalAreaMutation> =
    useCallback((cache, { data }) => {
      if (!data?.deleteGeographicalArea) return;
      cache.evict({
        id: cache.identify(
          data.deleteGeographicalArea as Reference | StoreObject
        ),
      });
      cache.gc();
    }, []);

  // Mutations
  const [createMutation] = useCreateGeographicalAreaMutation();
  const [updateMutation] = useUpdateGeographicalAreaMutation();
  const [deleteMutation] = useDeleteGeographicalAreaMutation();

  // Drawer handlers
  const openCreateDrawer = useCallback(() => {
    setDrawerMode('create');
    setSelectedArea(null);
    setDrawnGeometry(null);
    form.resetFields();
  }, [form]);

  const openEditDrawer = useCallback(
    (area: GeographicalArea) => {
      setDrawerMode('edit');
      setSelectedArea(area);
      const geometry: AreaGeometry | null = area.circle
        ? ({ ...area.circle, type: 'circle' } as CircleGeometry)
        : area.polygon
          ? ({ ...area.polygon, type: 'polygon' } as PolygonGeometry)
          : null;
      setDrawnGeometry(geometry);
      form.setFieldsValue({
        color: area.color,
        description: area.description,
        name: area.name,
      });
    },
    [form]
  );

  const closeDrawer = useCallback(() => {
    setDrawerMode(null);
    setSelectedArea(null);
    setDrawnGeometry(null);
    setDrawingMode(null);
    form.resetFields();
  }, [form]);

  // Sidebar handlers
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  // Drawing handlers
  const handleDrawComplete = useCallback((geometry: AreaGeometry) => {
    setDrawnGeometry(geometry);
    setDrawingMode(null);
  }, []);

  const clearDrawnGeometry = useCallback(() => {
    setDrawnGeometry(null);
    setDrawingMode(null);
  }, []);

  // CRUD handlers
  const handleCreate = useCallback(
    async (values: ReportingAreaFormData) => {
      if (!drawnGeometry) {
        notification.error({
          description: 'Please draw an area on the map',
          message: 'Invalid Geometry',
        });
        return;
      }

      setSubmitting(true);

      try {
        const input: CreateGeographicalAreaInput =
          drawnGeometry.type === 'circle'
            ? {
                circle: {
                  latitude: drawnGeometry.latitude,
                  longitude: drawnGeometry.longitude,
                  radiusMeters: drawnGeometry.radiusMeters,
                },
                color: values.color,
                description: values.description,
                name: values.name,
                schemeId,
              }
            : {
                color: values.color,
                description: values.description,
                name: values.name,
                polygon: {
                  coordinates: drawnGeometry.coordinates,
                },
                schemeId,
              };

        await createMutation({
          update: updateCacheAfterCreate,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          variables: { data: input },
        });

        notification.success({
          description: `${values.name} has been created successfully.`,
          message: 'Area Created',
        });

        closeDrawer();
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
        notification.error({
          description: errorMessage,
          message: 'Error Creating Area',
        });
      } finally {
        setSubmitting(false);
      }
    },
    [
      drawnGeometry,
      schemeId,
      createMutation,
      updateCacheAfterCreate,
      closeDrawer,
    ]
  );

  const handleUpdate = useCallback(
    async (id: string, values: ReportingAreaFormData) => {
      setSubmitting(true);

      try {
        // Build input with optional geometry if modified
        const input: UpdateGeographicalAreaInput = drawnGeometry
          ? drawnGeometry.type === 'circle'
            ? {
                circle: {
                  latitude: drawnGeometry.latitude,
                  longitude: drawnGeometry.longitude,
                  radiusMeters: drawnGeometry.radiusMeters,
                },
                color: values.color,
                description: values.description,
                name: values.name,
              }
            : {
                color: values.color,
                description: values.description,
                name: values.name,
                polygon: {
                  coordinates: drawnGeometry.coordinates,
                },
              }
          : {
              color: values.color,
              description: values.description,
              name: values.name,
            };

        await updateMutation({
          update: updateCacheAfterUpdate,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          variables: { data: input, id },
        });

        notification.success({
          description: `${values.name} has been updated successfully.`,
          message: 'Area Updated',
        });

        closeDrawer();
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
        notification.error({
          description: errorMessage,
          message: 'Error Updating Area',
        });
      } finally {
        setSubmitting(false);
      }
    },
    [drawnGeometry, updateMutation, updateCacheAfterUpdate, closeDrawer]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const area = areas.find((a) => a.id === id);

      try {
        await deleteMutation({
          update: updateCacheAfterDelete,
          variables: { id },
        });

        notification.success({
          description: `${area?.name || 'Area'} has been deleted successfully.`,
          message: 'Area Deleted',
        });

        if (selectedArea?.id === id) {
          setSelectedArea(null);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
        notification.error({
          description: errorMessage,
          message: 'Error Deleting Area',
        });
      }
    },
    [areas, deleteMutation, updateCacheAfterDelete, selectedArea]
  );

  return {
    // Data
    areas,
    clearDrawnGeometry,
    closeDrawer,

    // Drawer state
    drawerMode,
    // Drawing state
    drawingMode,

    drawnGeometry,
    error,

    // Form state
    form,
    // CRUD operations
    handleCreate,
    handleDelete,
    handleDrawComplete,

    handleUpdate,
    loading,
    openCreateDrawer,
    openEditDrawer,
    // Selection state
    selectedArea,

    setDrawingMode,
    setSelectedArea,

    // Sidebar state
    sidebarCollapsed,
    submitting,
    toggleSidebar,
  };
};

export default useReportingAreas;
