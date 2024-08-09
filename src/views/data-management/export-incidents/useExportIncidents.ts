import type { Dispatch } from 'react';

import { useCreateCsvZipMutation } from '#/views/data-management/export-incidents/graphql/mutations/__generated__/create-zip.generated';
import { usePreviewIncidentExportQuery } from '#/views/data-management/export-incidents/graphql/queries/__generated__/export-incidents-preview.generated';
import { useExportFiltersQuery } from '#/views/data-management/export-incidents/graphql/queries/__generated__/scheme-details.generated';
import { useEffect, useReducer, useRef } from 'react';

import { useStoreState } from '../../../state';

interface Return {
  dispatch: Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  state: ExportIncidentsState;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ActionType =
  | 'SET_DATA'
  | 'SET_OPTIONS'
  | 'SET_PROGRESS'
  | 'SET_ZIP_FILE'
  | 'UPDATE_BUSINESS_IDS'
  | 'UPDATE_CRIME_GROUP_IDS'
  | 'UPDATE_END_DATE'
  | 'UPDATE_GROUP_IDS'
  | 'UPDATE_SKIP'
  | 'UPDATE_START_DATE'
  | 'UPDATE_TAKE';

export type Action = {
  payload:
    | { [key in Options]: SelectOption[] }
    | { data: ExportIncidentsState['data'] }
    | Date
    | null
    | number
    | string
    | string[];
  type: ActionType;
};

type Options = 'businessOptions' | 'crimeGroupOptions' | 'groupOptions';

export interface ExportIncidentsState {
  businessIds: string[];
  businessOptions: SelectOption[];
  crimeGroupIds: string[];
  crimeGroupOptions: SelectOption[];
  data: {
    activityCount: number;
    incidentCount: number;
    incidentItemsCount: number;
    incidents: {
      date: Date;
      description: string;
      id: string;
    }[];
    offenderCount: number;
    vehicleCount: number;
  };
  endDate: Date;
  groupIds: string[];
  groupOptions: SelectOption[];
  progress: number;
  skip: number;
  startDate: Date;
  take: number;
  zipFile: null | string;
}

const useExportIncidents = (): Return => {
  const { id: schemeId } = useStoreState((state) => state.scheme);

  const initialState: ExportIncidentsState = {
    businessIds: [],
    businessOptions: [],
    crimeGroupIds: [],
    crimeGroupOptions: [],
    data: {
      activityCount: 0,
      incidentCount: 0,
      incidentItemsCount: 0,
      incidents: [],
      offenderCount: 0,
      vehicleCount: 0,
    },
    endDate: new Date(),
    groupIds: [],
    groupOptions: [],
    progress: 0,
    skip: 0,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    take: 10,
    zipFile: null,
  };

  const reducer = (
    state: ExportIncidentsState,
    action: Action
  ): ExportIncidentsState => {
    switch (action.type) {
      case 'UPDATE_TAKE': {
        if (typeof action.payload === 'number') {
          return { ...state, take: action.payload };
        }
        break;
      }

      case 'UPDATE_SKIP': {
        if (typeof action.payload === 'number') {
          return { ...state, skip: action.payload };
        }
        break;
      }

      case 'UPDATE_GROUP_IDS': {
        return { ...state, groupIds: action.payload as string[] };
      }

      case 'UPDATE_BUSINESS_IDS': {
        return { ...state, businessIds: action.payload as string[] };
      }

      case 'UPDATE_CRIME_GROUP_IDS': {
        return { ...state, crimeGroupIds: action.payload as string[] };
      }

      case 'UPDATE_START_DATE': {
        if (action.payload instanceof Date) {
          return { ...state, startDate: action.payload };
        }
        break;
      }

      case 'UPDATE_END_DATE': {
        if (action.payload instanceof Date) {
          return { ...state, endDate: action.payload };
        }
        break;
      }
      case 'SET_OPTIONS': {
        const options = action.payload as { [key in Options]: SelectOption[] };
        return { ...state, ...options };
      }

      case 'SET_DATA': {
        const data = action.payload as { data: ExportIncidentsState['data'] };
        return { ...state, ...data };
      }

      case 'SET_PROGRESS': {
        const progress = action.payload as number;
        if (state.progress === 100 && progress !== 100 && progress !== 0) {
          return state;
        }
        return { ...state, progress };
      }

      case 'SET_ZIP_FILE': {
        const zipFile = action.payload as null | string;
        return { ...state, zipFile };
      }

      default: {
        return state;
      }
    }

    // If the payload type check fails, return the current state.
    return state;
  };

  // Create the useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading } = usePreviewIncidentExportQuery({
    onCompleted: (data) => {
      if (data) {
        dispatch({
          payload: {
            data: data.previewIncidentExport,
          },
          type: 'SET_DATA',
        });
      } else {
        dispatch({
          payload: {
            data: initialState.data,
          },
          type: 'SET_DATA',
        });
      }
    },
    variables: {
      skip: state.skip,
      take: state.take,
      where: {
        businessIds: state.businessIds,
        crimeGroupIds: state.crimeGroupIds,
        dateRange: {
          endDate: state.endDate,
          startDate: state.startDate,
        },
        groupIds: state.groupIds,
      },
    },
  });

  const { loading: filtersLoading } = useExportFiltersQuery({
    onCompleted: (filterOptions) => {
      if (filterOptions && filterOptions?.scheme) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { businesses, groups, schemeTags } = filterOptions?.scheme;

        const groupOptions = groups.map((group) => ({
          label: group.name,
          value: group.id,
        }));

        const businessOptions = businesses.map((business) => ({
          label: business.name,
          value: business.id,
        }));

        const schemeTagsOptions = schemeTags.map((schemeTag) => ({
          label: schemeTag.name,
          value: schemeTag.id,
        }));

        dispatch({
          payload: {
            businessOptions,
            crimeGroupOptions: [...schemeTagsOptions],
            groupOptions,
          },
          type: 'SET_OPTIONS',
        });
      }
    },
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  const animationFrameRef = useRef<null | number>(null);

  const [createZip] = useCreateCsvZipMutation({
    onCompleted: (d) => {
      if (d && d.createCsvZip) {
        dispatch({
          payload: d.createCsvZip,
          type: 'SET_ZIP_FILE',
        });
        dispatch({
          payload: 100,
          type: 'SET_PROGRESS',
        });
      }
    },
  });

  const getZip = () => {
    dispatch({
      payload: null,
      type: 'SET_ZIP_FILE',
    });
    dispatch({
      payload: 0,
      type: 'SET_PROGRESS',
    });

    void createZip({
      variables: {
        where: {
          businessIds: state.businessIds,
          crimeGroupIds: state.crimeGroupIds,
          dateRange: {
            endDate: state.endDate,
            startDate: state.startDate,
          },
          groupIds: state.groupIds,
        },
      },
    });

    // Start the animation when the button is clicked
    const targetProgress = 80;
    const startTime = Date.now();
    const duration = 15_000;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= duration) {
        dispatch({
          payload: null,
          type: 'SET_ZIP_FILE',
        });
        dispatch({
          payload: targetProgress,
          type: 'SET_PROGRESS',
        });
      } else {
        const newProgress = (elapsedTime / duration) * targetProgress;

        dispatch({
          payload: Math.floor(newProgress),
          type: 'SET_PROGRESS',
        });
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  };

  useEffect(
    () => () => {
      // Clean up the animation frame when the component unmounts or the button is clicked again
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    []
  );

  return {
    dispatch,
    getZip,
    loading: loading || filtersLoading,
    state,
  };
};

export default useExportIncidents;
