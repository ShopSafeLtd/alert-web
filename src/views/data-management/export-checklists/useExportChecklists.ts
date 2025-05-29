import type { PreviewChecklistExportQuery } from '#/views/data-management/export-checklists/graphql/queries/__generated__/export-checklists-preview.generated';
import type { Dispatch } from 'react';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateChecklistCsvZipMutation } from '#/views/data-management/export-checklists/graphql/mutations/__generated__/create-zip.generated';
import { usePreviewChecklistExportQuery } from '#/views/data-management/export-checklists/graphql/queries/__generated__/export-checklists-preview.generated';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ChecklistStatus } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useReducer, useRef } from 'react';

dayjs.extend(utc);

interface Return {
  dispatch: Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  state: ExportChecklistState;
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
  | 'UPDATE_END_DATE'
  | 'UPDATE_START_DATE'
  | 'UPDATE_USER_IDS';

export type Action = {
  payload:
    | { [key in Options]: SelectOption[] }
    | { data: ExportChecklistState['data'] }
    | Date
    | null
    | number
    | string
    | string[];
  type: ActionType;
};

type Options = 'businessOptions' | 'roleOptions' | 'userOptions';

export interface ExportChecklistState {
  businessIds: string[];
  data: PreviewChecklistExportQuery['activeChecklistExportPreview']['edges'];
  endDate: Date;
  progress: number;
  skip: number;
  startDate: Date;
  take: number;
  userIds: string[];
  zipFile: null | string;
}

const useExportChecklists = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const initialState: ExportChecklistState = {
    businessIds: [],
    data: [],
    endDate: new Date(),
    progress: 0,
    skip: 0,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    take: 10,
    userIds: [],
    zipFile: null,
  };

  const reducer = (
    state: ExportChecklistState,
    action: Action
  ): ExportChecklistState => {
    switch (action.type) {
      case 'UPDATE_BUSINESS_IDS': {
        return { ...state, businessIds: action.payload as string[] };
      }
      case 'UPDATE_USER_IDS': {
        return { ...state, userIds: action.payload as string[] };
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
        const data = action.payload as { data: ExportChecklistState['data'] };
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

  const { loading } = usePreviewChecklistExportQuery({
    onCompleted: (data) => {
      if (data) {
        dispatch({
          payload: {
            data: data.activeChecklistExportPreview.edges,
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
      first: 10,
      range: {
        dateRange: {
          endDate: dayjs.utc(state.endDate).hour(23).minute(59).toDate(),
          startDate: dayjs.utc(state.startDate).hour(0).minute(1).toDate(),
        },
      },
      where: {
        OR: [
          {
            checklist: {
              business: state.businessIds?.length
                ? { some: { id: { in: state.businessIds } } }
                : undefined,
              schemes: {
                some: { id: { equals: schemeId } },
              },
            },
          },
          {
            business: state.businessIds?.length
              ? { id: { in: state.businessIds } }
              : undefined,
            checklist: {
              schemes: {
                some: { id: { equals: schemeId } },
              },
            },
            completedBy: state.userIds
              ? { id: { in: state.userIds } }
              : undefined,
          },
        ],
        status: {
          equals: ChecklistStatus.Completed,
        },
      },
    },
  });

  const animationFrameRef = useRef<null | number>(null);

  const [createZip] = useCreateChecklistCsvZipMutation({
    onCompleted: (d) => {
      if (d && d.createChecklistCsvZip) {
        dispatch({
          payload: d.createChecklistCsvZip,
          type: 'SET_ZIP_FILE',
        });
        dispatch({
          payload: 100,
          type: 'SET_PROGRESS',
        });
      }
    },
    onError: (e) => {
      console.error('Error creating zip:', e);
      dispatch({
        payload: null,
        type: 'SET_ZIP_FILE',
      });
      dispatch({
        payload: 0,
        type: 'SET_PROGRESS',
      });
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
        range: {
          dateRange: {
            endDate: dayjs.utc(state.endDate).hour(23).minute(59).toDate(),
            startDate: dayjs.utc(state.startDate).hour(0).minute(1).toDate(),
          },
        },
        where: {
          OR: [
            {
              checklist: {
                business: state.businessIds?.length
                  ? { some: { id: { in: state.businessIds } } }
                  : undefined,
                schemes: {
                  some: { id: { equals: schemeId } },
                },
              },
            },
            {
              business: state.businessIds?.length
                ? { id: { in: state.businessIds } }
                : undefined,
              checklist: {
                schemes: {
                  some: { id: { equals: schemeId } },
                },
              },
              completedBy: state.userIds
                ? { id: { in: state.userIds } }
                : undefined,
            },
          ],
          status: {
            equals: ChecklistStatus.Completed,
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
    loading,
    state,
  };
};

export default useExportChecklists;
