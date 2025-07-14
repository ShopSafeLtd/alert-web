import type { TodoExportPreviewQuery } from '#/views/data-management/export-activities/graphql/queries/__generated__/todo-export-preview.generated';
import type { Dispatch } from 'react';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateActivityCsvZipMutation } from '#/views/data-management/export-activities/graphql/mutations/__generated__/create-zip.generated';
import { useTodoExportPreviewQuery } from '#/views/data-management/export-activities/graphql/queries/__generated__/todo-export-preview.generated';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TodoStatusInput, TodoUserModeInput } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useReducer, useRef } from 'react';
import { useIntl } from 'react-intl';

dayjs.extend(utc);

interface Return {
  dispatch: Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  selectedGroups: string[];
  state: ExportActivitiesState;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ActionType =
  | 'ALL_BUSINESSES'
  | 'SET_DATA'
  | 'SET_OPTIONS'
  | 'SET_PROGRESS'
  | 'SET_TOTAL'
  | 'SET_ZIP_FILE'
  | 'UPDATE_ALL_GROUPS'
  | 'UPDATE_ALL_STATUSES'
  | 'UPDATE_ALL_USERS'
  | 'UPDATE_ASSIGNED_USERS'
  | 'UPDATE_BUSINESS_IDS'
  | 'UPDATE_COMPLETED_AT'
  | 'UPDATE_CREATED_AT'
  | 'UPDATE_DUE_DATE'
  | 'UPDATE_GROUP_IDS'
  | 'UPDATE_SKIP'
  | 'UPDATE_STATUS'
  | 'UPDATE_TAKE';

export type Action = {
  payload:
    | { [key in Options]: SelectOption[] }
    | { allGroups: boolean }
    | { allStatuses: boolean }
    | { allUsers: boolean }
    | { assignedUsers: string[] }
    | { data: ExportActivitiesState['data'] }
    | { endDate: Date; startDate: Date }
    | { status: TodoStatusInput[] }
    | Date
    | boolean
    | null
    | number
    | string
    | string[];
  type: ActionType;
};

type Options = 'businessOptions' | 'crimeGroupOptions' | 'groupOptions';

export interface ExportActivitiesState {
  allBusinesses: boolean;
  allGroups: boolean;
  allStatuses: boolean;
  allUsers: boolean;
  assignedUsers: string[];
  businessIds: string[];
  completedAt: { endDate: Date; startDate: Date } | null;
  createdAt: { endDate: Date; startDate: Date } | null;
  data: TodoExportPreviewQuery['todoExportRelay']['edges'][0]['node'][];
  dueDate: { endDate: Date; startDate: Date } | null;
  groupIds: string[];
  progress: number;
  status: TodoStatusInput;
  take: number;
  total: number;
  zipFile: null | string;
}

dayjs.extend(utc);

export function usePresetDateRanges(): Record<string, [Date, Date]> {
  const intl = useIntl();
  const now = dayjs();

  return {
    [intl.formatMessage({ defaultMessage: 'Last 7 Days' })]: [
      now.subtract(7, 'day').startOf('day').add(1, 'second').toDate(),
      now.endOf('day').toDate(),
    ],
    [intl.formatMessage({ defaultMessage: 'Last 30 Days' })]: [
      now.subtract(1, 'month').startOf('day').add(1, 'second').toDate(),
      now.endOf('day').toDate(),
    ],
    [intl.formatMessage({ defaultMessage: 'Last Day' })]: [
      now.subtract(1, 'day').startOf('day').add(1, 'second').toDate(),
      now.subtract(1, 'day').endOf('day').toDate(),
    ],
    [intl.formatMessage({ defaultMessage: 'Last Year' })]: [
      now.subtract(1, 'year').startOf('day').add(1, 'second').toDate(),
      now.endOf('day').toDate(),
    ],
    [intl.formatMessage({ defaultMessage: 'Month to Date' })]: [
      now.startOf('month').add(1, 'second').toDate(),
      now.endOf('day').toDate(),
    ],
    [intl.formatMessage({ defaultMessage: 'Previous Month' })]: [
      now.subtract(1, 'month').startOf('month').toDate(),
      now.subtract(1, 'month').endOf('month').toDate(),
    ],
    [intl.formatMessage({ defaultMessage: 'Year to Date' })]: [
      now.startOf('year').add(1, 'second').toDate(),
      now.endOf('day').toDate(),
    ],
  };
}
const useExportActivities = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const initialState: ExportActivitiesState = {
    allBusinesses: true,
    allGroups: true,
    allStatuses: true,
    allUsers: true,
    assignedUsers: [],
    businessIds: [],
    completedAt: null,
    createdAt: {
      endDate: dayjs().endOf('day').toDate(),
      startDate: dayjs()
        .subtract(1, 'month')
        .startOf('day')
        .add(1, 'second')
        .toDate(),
    },
    data: [],
    dueDate: null,
    groupIds: [],
    progress: 0,
    status: TodoStatusInput.All,
    take: 10,
    total: 0,
    zipFile: null,
  };

  const reducer = (
    state: ExportActivitiesState,
    action: Action
  ): ExportActivitiesState => {
    switch (action.type) {
      case 'UPDATE_ASSIGNED_USERS': {
        return {
          ...state,
          assignedUsers: action.payload as string[],
          zipFile: null,
        };
      }
      case 'UPDATE_ALL_USERS': {
        return {
          ...state,
          allUsers: action.payload as boolean,
          assignedUsers: [],
          zipFile: null,
        };
      }
      case 'UPDATE_COMPLETED_AT': {
        return {
          ...state,
          completedAt: action.payload as {
            endDate: Date;
            startDate: Date;
          } | null,
          zipFile: null,
        };
      }
      case 'SET_TOTAL': {
        return {
          ...state,
          total: action.payload as number,
        };
      }
      case 'UPDATE_CREATED_AT': {
        return {
          ...state,
          createdAt: action.payload as {
            endDate: Date;
            startDate: Date;
          } | null,
          zipFile: null,
        };
      }
      case 'UPDATE_DUE_DATE': {
        return {
          ...state,
          dueDate: action.payload as { endDate: Date; startDate: Date } | null,
          zipFile: null,
        };
      }
      case 'UPDATE_ALL_GROUPS': {
        return {
          ...state,
          allGroups: action.payload as boolean,
          groupIds: [],
          zipFile: null,
        };
      }
      case 'UPDATE_STATUS': {
        return {
          ...state,
          status: action.payload as TodoStatusInput,
          zipFile: null,
        };
      }
      case 'UPDATE_ALL_STATUSES': {
        return {
          ...state,
          allStatuses: action.payload as boolean,
          status: TodoStatusInput.All,
          zipFile: null,
        };
      }
      case 'UPDATE_TAKE': {
        if (typeof action.payload === 'number') {
          return { ...state, take: action.payload, zipFile: null };
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

      case 'SET_OPTIONS': {
        const options = action.payload as { [key in Options]: SelectOption[] };
        return { ...state, ...options, zipFile: null };
      }

      case 'SET_DATA': {
        const data = action.payload as { data: ExportActivitiesState['data'] };
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

      default: {
        return state;
      }
    }

    return state;
  };
  // Create the useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading } = useTodoExportPreviewQuery({
    onCompleted: (data) => {
      if (data) {
        dispatch({
          payload: {
            data: data.todoExportRelay.edges.map((edge) => edge.node),
          },
          type: 'SET_DATA',
        });
        dispatch({
          payload: data.todoExportRelay.totalCount,
          type: 'SET_TOTAL',
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
      take: state.take,
      where: {
        assignedUsers:
          state.assignedUsers && state.assignedUsers.length > 0
            ? state.assignedUsers
            : undefined,
        businessIds:
          state.businessIds && state.businessIds.length > 0
            ? state.businessIds
            : undefined,
        completedAt: state.completedAt
          ? {
              endDate: state.completedAt.endDate,
              startDate: state.completedAt.startDate,
            }
          : undefined,
        createdAt: state.createdAt
          ? {
              endDate: state.createdAt.endDate,
              startDate: state.createdAt.startDate,
            }
          : undefined,
        dueDate: state.dueDate
          ? {
              endDate: state.dueDate.endDate,
              startDate: state.dueDate.startDate,
            }
          : undefined,
        groupIds:
          state.groupIds && state.groupIds.length > 0
            ? state.groupIds
            : undefined,
        schemeIds: [schemeId],
        status:
          state.status && state.status !== TodoStatusInput.All
            ? state.status
            : TodoStatusInput.All,
        userMode:
          state.allUsers ?? state.assignedUsers?.length
            ? TodoUserModeInput.Selected
            : TodoUserModeInput.All,
      },
    },
  });

  const animationFrameRef = useRef<null | number>(null);

  const [createZip] = useCreateActivityCsvZipMutation({
    onCompleted: (d) => {
      if (d && d.createActivityCsvZip) {
        dispatch({
          payload: d.createActivityCsvZip,
          type: 'SET_ZIP_FILE',
        });
        dispatch({
          payload: 100,
          type: 'SET_PROGRESS',
        });

        const link = document.createElement('a');
        link.href = d.createActivityCsvZip;
        link.download = `export-activities-${dayjs().format('YYYY-MM-DD')}.zip`;
        document.body.append(link);
        link.click();
        link.remove();
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
          assignedUsers:
            state.assignedUsers && state.assignedUsers.length > 0
              ? state.assignedUsers
              : undefined,
          businessIds:
            state.businessIds && state.businessIds.length > 0
              ? state.businessIds
              : undefined,
          completedAt: state.completedAt
            ? {
                endDate: dayjs
                  .utc(state.completedAt.endDate)
                  .hour(23)
                  .minute(59)
                  .toDate(),
                startDate: dayjs
                  .utc(state.completedAt.startDate)
                  .hour(0)
                  .minute(1)
                  .toDate(),
              }
            : undefined,
          createdAt: state.createdAt
            ? {
                endDate: dayjs
                  .utc(state.createdAt.endDate)
                  .hour(23)
                  .minute(59)
                  .toDate(),
                startDate: dayjs
                  .utc(state.createdAt.startDate)
                  .hour(0)
                  .minute(1)
                  .toDate(),
              }
            : undefined,
          dueDate: state.dueDate
            ? {
                endDate: dayjs
                  .utc(state.dueDate.endDate)
                  .hour(23)
                  .minute(59)
                  .toDate(),
                startDate: dayjs
                  .utc(state.dueDate.startDate)
                  .hour(0)
                  .minute(1)
                  .toDate(),
              }
            : undefined,
          groupIds:
            state.groupIds && state.groupIds.length > 0
              ? state.groupIds
              : undefined,
          status:
            state.status && state.status !== TodoStatusInput.All
              ? state.status
              : TodoStatusInput.All,
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
    loading,
    selectedGroups: state.groupIds,
    state,
  };
};

export default useExportActivities;
