import type { Dispatch } from 'react';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useQueueIncidentCsvExportMutation } from '#/views/data-management/export-incidents/graphql/mutations/__generated__/create-zip.generated';
import { usePreviewIncidentExportQuery } from '#/views/data-management/export-incidents/graphql/queries/__generated__/export-incidents-preview.generated';
import { useExportFiltersQuery } from '#/views/data-management/export-incidents/graphql/queries/__generated__/scheme-details.generated';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAtomValue } from 'jotai/index';
import { useReducer } from 'react';

dayjs.extend(utc);

interface Return {
  dispatch: Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  mutationLoading: boolean;
  selectedGroups: string[];
  state: ExportIncidentsState;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ActionType =
  | 'ALL_BUSINESSES'
  | 'SET_DATA'
  | 'SET_JOB_SUBMITTED'
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
    | {
        estimatedTime: null | string | undefined;
        jobId: null | string;
        jobSubmitted: boolean;
      }
    | Date
    | boolean
    | null
    | number
    | string
    | string[];
  type: ActionType;
};

type Options = 'businessOptions' | 'crimeGroupOptions' | 'groupOptions';

export interface ExportIncidentsState {
  allBusinesses: boolean;
  businessIds: string[];
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
  estimatedTime: null | string | undefined;
  groupIds: string[];
  jobId: null | string;
  jobSubmitted: boolean;
  progress: number;
  skip: number;
  startDate: Date;
  take: number;
  zipFile: null | string;
}

const useExportIncidents = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const initialState: ExportIncidentsState = {
    allBusinesses: false,
    businessIds: [],
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
    estimatedTime: null,
    groupIds: [],
    jobId: null,
    jobSubmitted: false,
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
          return { ...state, take: action.payload, zipFile: null };
        }
        break;
      }

      case 'UPDATE_SKIP': {
        if (typeof action.payload === 'number') {
          return { ...state, skip: action.payload, zipFile: null };
        }
        break;
      }

      case 'UPDATE_GROUP_IDS': {
        return {
          ...state,
          groupIds: action.payload as string[],
          zipFile: null,
        };
      }

      case 'UPDATE_BUSINESS_IDS': {
        return {
          ...state,
          businessIds: action.payload as string[],
          zipFile: null,
        };
      }

      case 'UPDATE_CRIME_GROUP_IDS': {
        return {
          ...state,
          crimeGroupIds: action.payload as string[],
          zipFile: null,
        };
      }

      case 'UPDATE_START_DATE': {
        if (action.payload instanceof Date) {
          return { ...state, startDate: action.payload, zipFile: null };
        }
        break;
      }

      case 'UPDATE_END_DATE': {
        if (action.payload instanceof Date) {
          return { ...state, endDate: action.payload, zipFile: null };
        }
        break;
      }

      case 'SET_OPTIONS': {
        const options = action.payload as { [key in Options]: SelectOption[] };
        return { ...state, ...options, zipFile: null };
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

      case 'ALL_BUSINESSES': {
        const allBusinesses = action.payload as boolean;
        return { ...state, allBusinesses, businessIds: [], zipFile: null };
      }

      case 'SET_JOB_SUBMITTED': {
        const { estimatedTime, jobId, jobSubmitted } = action.payload as {
          estimatedTime: null | string | undefined;
          jobId: null | string;
          jobSubmitted: boolean;
        };
        return { ...state, estimatedTime, jobId, jobSubmitted };
      }

      default: {
        return state;
      }
    }

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
    skip: state.groupIds.length === 0,
    variables: {
      skip: state.skip,
      take: state.take,
      where: {
        businessIds: state.businessIds,
        crimeGroupIds: state.crimeGroupIds,
        dateRange: {
          endDate: dayjs.utc(state.endDate).hour(23).minute(59).toDate(),
          startDate: dayjs.utc(state.startDate).hour(0).minute(1).toDate(),
        },
        groupIds: state.groupIds,
      },
    },
  });

  const { loading: filtersLoading } = useExportFiltersQuery({
    onCompleted: (filterOptions) => {
      if (filterOptions && filterOptions?.scheme) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { schemeTags } = filterOptions?.scheme;

        const schemeTagsOptions = schemeTags
          .map((schemeTag) => ({
            label: schemeTag.name,
            value: schemeTag.id,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        dispatch({
          payload: {
            businessOptions: [],
            crimeGroupOptions: [...schemeTagsOptions],
            groupOptions: [],
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

  const [createZip, { loading: mutationLoading }] =
    useQueueIncidentCsvExportMutation({
      onCompleted: (d) => {
        if (d && d.queueIncidentCsvExport) {
          dispatch({
            payload: {
              estimatedTime: d.queueIncidentCsvExport.estimatedTime,
              jobId: d.queueIncidentCsvExport.jobId,
              jobSubmitted: true,
            },
            type: 'SET_JOB_SUBMITTED',
          });
        }
      },
    });

  const getZip = () => {
    dispatch({
      payload: {
        estimatedTime: null,
        jobId: null,
        jobSubmitted: false,
      },
      type: 'SET_JOB_SUBMITTED',
    });

    void createZip({
      variables: {
        where: {
          businessIds: state.businessIds,
          crimeGroupIds: state.crimeGroupIds,
          dateRange: {
            endDate: dayjs.utc(state.endDate).hour(23).minute(59).toDate(),
            startDate: dayjs.utc(state.startDate).hour(0).minute(1).toDate(),
          },
          groupIds: state.groupIds,
        },
      },
    });
  };

  return {
    dispatch,
    getZip,
    loading: loading || filtersLoading,
    mutationLoading,
    selectedGroups: state.groupIds,
    state,
  };
};

export default useExportIncidents;
