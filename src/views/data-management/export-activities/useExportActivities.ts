import type { TodoExportPreviewQuery } from '#/views/data-management/export-activities/graphql/queries/__generated__/todo-export-preview.generated';
import type { Dispatch } from 'react';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateActivityCsvZipMutation } from '#/views/data-management/export-activities/graphql/mutations/__generated__/create-zip.generated';
import { useTodoExportPreviewQuery } from '#/views/data-management/export-activities/graphql/queries/__generated__/todo-export-preview.generated';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TodoStatusInput, TodoUserModeInput } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useReducer } from 'react';
import { useIntl } from 'react-intl';

dayjs.extend(utc);

interface Return {
  dispatch: Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  mutationLoading: boolean;
  selectedGroups: string[];
  state: ExportActivitiesState;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ActionType =
  | 'ALL_BUSINESSES'
  | 'RESET_FILTERS'
  | 'SET_DATA'
  | 'SET_JOB_SUBMITTED'
  | 'SET_OPTIONS'
  | 'SET_TOTAL'
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
    | {
        estimatedTime: null | string | undefined;
        jobId: null | string;
        jobSubmitted: boolean;
      }
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
  estimatedTime: null | string | undefined;
  groupIds: string[];
  jobId: null | string;
  jobSubmitted: boolean;
  status: TodoStatusInput;
  take: number;
  total: number;
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
    estimatedTime: null,
    groupIds: [],
    jobId: null,
    jobSubmitted: false,
    status: TodoStatusInput.All,
    take: 10,
    total: 0,
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
          jobSubmitted: false,
        };
      }
      case 'UPDATE_ALL_USERS': {
        return {
          ...state,
          allUsers: action.payload as boolean,
          assignedUsers: [],
          jobSubmitted: false,
        };
      }
      case 'UPDATE_COMPLETED_AT': {
        return {
          ...state,
          completedAt: action.payload as {
            endDate: Date;
            startDate: Date;
          } | null,
          jobSubmitted: false,
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
          jobSubmitted: false,
        };
      }
      case 'UPDATE_DUE_DATE': {
        return {
          ...state,
          dueDate: action.payload as { endDate: Date; startDate: Date } | null,
          jobSubmitted: false,
        };
      }
      case 'UPDATE_ALL_GROUPS': {
        return {
          ...state,
          allGroups: action.payload as boolean,
          groupIds: [],
          jobSubmitted: false,
        };
      }
      case 'UPDATE_STATUS': {
        return {
          ...state,
          jobSubmitted: false,
          status: action.payload as TodoStatusInput,
        };
      }
      case 'UPDATE_ALL_STATUSES': {
        return {
          ...state,
          allStatuses: action.payload as boolean,
          jobSubmitted: false,
          status: TodoStatusInput.All,
        };
      }
      case 'UPDATE_TAKE': {
        if (typeof action.payload === 'number') {
          return { ...state, jobSubmitted: false, take: action.payload };
        }
        break;
      }
      case 'UPDATE_GROUP_IDS': {
        return {
          ...state,
          groupIds: action.payload as string[],
          jobSubmitted: false,
        };
      }

      case 'UPDATE_BUSINESS_IDS': {
        return {
          ...state,
          businessIds: action.payload as string[],
          jobSubmitted: false,
        };
      }

      case 'SET_OPTIONS': {
        const options = action.payload as { [key in Options]: SelectOption[] };
        return { ...state, ...options, jobSubmitted: false };
      }

      case 'SET_DATA': {
        const data = action.payload as { data: ExportActivitiesState['data'] };
        return { ...state, ...data };
      }

      case 'SET_JOB_SUBMITTED': {
        const { estimatedTime, jobId, jobSubmitted } = action.payload as {
          estimatedTime: null | string | undefined;
          jobId: null | string;
          jobSubmitted: boolean;
        };
        return { ...state, estimatedTime, jobId, jobSubmitted };
      }

      case 'ALL_BUSINESSES': {
        const allBusinesses = action.payload as boolean;
        return {
          ...state,
          allBusinesses,
          businessIds: [],
          jobSubmitted: false,
        };
      }

      case 'RESET_FILTERS': {
        return {
          ...state,
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
          dueDate: null,
          groupIds: [],
          jobSubmitted: false,
          status: TodoStatusInput.All,
        };
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

  const [queueExport, { loading: mutationLoading }] =
    useCreateActivityCsvZipMutation({
      onCompleted: (d) => {
        if (d?.createActivityCsvZip) {
          dispatch({
            payload: {
              estimatedTime: null,
              jobId: d.createActivityCsvZip,
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

    void queueExport({
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
  };

  return {
    dispatch,
    getZip,
    loading,
    mutationLoading,
    selectedGroups: state.groupIds,
    state,
  };
};

export default useExportActivities;
