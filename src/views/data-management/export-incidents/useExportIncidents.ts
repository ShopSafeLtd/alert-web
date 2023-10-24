import type { Dispatch } from 'react';
import { useEffect, useReducer, useRef } from 'react';
import {
  useCreateCsvZipMutation,
  useExportFiltersQuery,
  usePreviewIncidentExportQuery,
} from '../../../graphql/generated';
import { useStoreState } from '../../../state';

interface Return {
  loading: boolean;
  state: ExportIncidentsState;
  dispatch: Dispatch<Action>;
  getZip: () => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ActionType =
  | 'UPDATE_TAKE'
  | 'UPDATE_SKIP'
  | 'UPDATE_GROUP_IDS'
  | 'UPDATE_BUSINESS_IDS'
  | 'UPDATE_CRIME_GROUP_IDS'
  | 'UPDATE_START_DATE'
  | 'UPDATE_END_DATE'
  | 'SET_OPTIONS'
  | 'SET_DATA'
  | 'SET_ZIP_FILE'
  | 'SET_PROGRESS';

export type Action = {
  type: ActionType;
  payload:
    | number
    | string
    | Date
    | string[]
    | null
    | { [key in Options]: SelectOption[] }
    | { data: ExportIncidentsState['data'] };
};

type Options = 'groupOptions' | 'businessOptions' | 'crimeGroupOptions';

export interface ExportIncidentsState {
  take: number;
  endDate: Date;
  skip: number;
  startDate: Date;
  groupIds: string[];
  crimeGroupIds: string[];
  businessIds: string[];
  groupOptions: SelectOption[];
  businessOptions: SelectOption[];
  crimeGroupOptions: SelectOption[];
  progress: number;
  zipFile: string | null;
  data: {
    activityCount: number;
    incidentCount: number;
    incidentItemsCount: number;
    incidents: {
      id: string;
      date: Date;
      description: string;
    }[];
    offenderCount: number;
    vehicleCount: number;
  };
}

const useExportIncidents = (): Return => {
  const { id: schemeId } = useStoreState((state) => state.scheme);

  const initialState: ExportIncidentsState = {
    take: 10,
    skip: 0,
    groupIds: [],
    businessIds: [],
    crimeGroupIds: [],
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    endDate: new Date(),
    groupOptions: [],
    businessOptions: [],
    crimeGroupOptions: [],
    progress: 0,
    zipFile: null,
    data: {
      activityCount: 0,
      incidentCount: 0,
      incidentItemsCount: 0,
      incidents: [],
      offenderCount: 0,
      vehicleCount: 0,
    },
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
        const zipFile = action.payload as string | null;
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
    variables: {
      take: state.take,
      skip: state.skip,
      where: {
        businessIds: state.businessIds,
        crimeGroupIds: state.crimeGroupIds,
        groupIds: state.groupIds,
        dateRange: {
          startDate: state.startDate,
          endDate: state.endDate,
        },
      },
    },
    onCompleted: (data) => {
      if (data) {
        dispatch({
          type: 'SET_DATA',
          payload: {
            data: data.previewIncidentExport,
          },
        });
      } else {
        dispatch({
          type: 'SET_DATA',
          payload: {
            data: initialState.data,
          },
        });
      }
    },
  });

  const { loading: filtersLoading } = useExportFiltersQuery({
    variables: {
      where: {
        id: schemeId,
      },
    },
    onCompleted: (filterOptions) => {
      if (filterOptions && filterOptions?.scheme) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { groups, businesses, schemeTags } = filterOptions?.scheme;

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
          type: 'SET_OPTIONS',
          payload: {
            groupOptions,
            businessOptions,
            crimeGroupOptions: [...schemeTagsOptions],
          },
        });
      }
    },
  });

  const animationFrameRef = useRef<number | null>(null);

  const [createZip] = useCreateCsvZipMutation({
    onCompleted: (d) => {
      if (d && d.createCsvZip) {
        dispatch({
          type: 'SET_ZIP_FILE',
          payload: d.createCsvZip,
        });
        dispatch({
          type: 'SET_PROGRESS',
          payload: 100,
        });
      }
    },
  });

  const getZip = () => {
    dispatch({
      type: 'SET_ZIP_FILE',
      payload: null,
    });
    dispatch({
      type: 'SET_PROGRESS',
      payload: 0,
    });

    void createZip({
      variables: {
        where: {
          businessIds: state.businessIds,
          crimeGroupIds: state.crimeGroupIds,
          groupIds: state.groupIds,
          dateRange: {
            startDate: state.startDate,
            endDate: state.endDate,
          },
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
          type: 'SET_ZIP_FILE',
          payload: null,
        });
        dispatch({
          type: 'SET_PROGRESS',
          payload: targetProgress,
        });
      } else {
        const newProgress = (elapsedTime / duration) * targetProgress;

        dispatch({
          type: 'SET_PROGRESS',
          payload: Math.floor(newProgress),
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
    loading: loading || filtersLoading,
    state,
    dispatch,
    getZip,
  };
};

export default useExportIncidents;
