import type {
  BusinessesListQuery,
  BusinessesListQueryVariables,
} from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import type { PoliceForce, TodoStatusInput } from 'graphql/types';
import type { Dispatch } from 'react';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useExportBusinessesMutation } from '#/views/data-management/export-business/graphql/mutations/__generated__/create-zip.generated';
import { useBusinessTagsQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-business-tags.generated';
import { useBusinessesListQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import { useListGroupsQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-groups.generated';
import { useParentBusinessesListQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-parent-business-ids.generated';
import dayjs from 'dayjs';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

interface Return {
  data: BusinessesListQuery | undefined;
  dispatch: Dispatch<Action>;
  filtersOpen: boolean;
  getZip: () => void;
  groupData: SelectOption[];
  groupFilter: string[];
  loading: boolean;
  mutationLoading: boolean;
  parentData: SelectOption[];
  parentFilter: string[];
  policeAreas: PoliceForce[];
  setGroupFilter: (filter: string[]) => void;
  setParentFilter: (filter: string[]) => void;
  setPoliceAreas: (areas: PoliceForce[]) => void;
  setTagFilter: (filter: string[]) => void;
  state: ExportBusinessState;
  tagFilter: string[];
  tags: SelectOption[];
  toggleFiltersOpen: () => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type ActionType = 'SET_PROGRESS' | 'SET_TOTAL' | 'SET_ZIP_FILE';

export type Action = {
  payload: null | number | string;
  type: ActionType;
};

export interface ExportBusinessState {
  progress: number;
  status?: TodoStatusInput;
  total: number;
  zipFile: null | string;
}

const useExportBusinesses = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [parentFilter, setParentFilter] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [policeAreas, setPoliceAreas] = useState<PoliceForce[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const initialState: ExportBusinessState = {
    progress: 0,
    total: 0,
    zipFile: null,
  };

  const variables: BusinessesListQueryVariables = {
    orderBy: {
      name: SortOrder.Asc,
    },
    take: 10,
    where: {
      groups:
        groupFilter.length > 0
          ? { some: { id: { in: groupFilter } } }
          : undefined,
      parent:
        parentFilter.length > 0 ? { id: { in: parentFilter } } : undefined,
      policeArea: policeAreas.length > 0 ? { hasSome: policeAreas } : undefined,
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
      tags:
        tagFilter.length > 0 ? { some: { id: { in: tagFilter } } } : undefined,
    },
  };

  const reducer = (
    state: ExportBusinessState,
    action: Action
  ): ExportBusinessState => {
    switch (action.type) {
      case 'SET_TOTAL': {
        return {
          ...state,
          total: action.payload as number,
        };
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
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, loading } = useBusinessesListQuery({
    variables,
  });

  const animationFrameRef = useRef<null | number>(null);

  const [createZip, { loading: mutationLoading }] = useExportBusinessesMutation(
    {
      onCompleted: (d) => {
        if (d && d.createBusinessCsvZip) {
          dispatch({
            payload: d.createBusinessCsvZip,
            type: 'SET_ZIP_FILE',
          });
          dispatch({
            payload: 100,
            type: 'SET_PROGRESS',
          });

          const link = document.createElement('a');
          link.href = d.createBusinessCsvZip;
          link.download = `export-businesses-${dayjs().format('YYYY-MM-DD')}.zip`;
          document.body.append(link);
          link.click();
          link.remove();
        }
      },
    }
  );

  const getZip = () => {
    dispatch({
      payload: null,
      type: 'SET_ZIP_FILE',
    });
    dispatch({
      payload: 0,
      type: 'SET_PROGRESS',
    });

    if (variables.where) {
      void createZip({
        variables: {
          where: variables.where,
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
    }
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

  const CACHE_FIRST = 'cache-first';

  const { data: QueryGroups } = useListGroupsQuery({
    nextFetchPolicy: CACHE_FIRST,
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const { data: QueryParentData } = useParentBusinessesListQuery({
    nextFetchPolicy: CACHE_FIRST,
    variables: {
      hasChildrenOnly: true,
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  const { data: QueryTags } = useBusinessTagsQuery({
    nextFetchPolicy: CACHE_FIRST,
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  const groupData = useMemo(
    () =>
      QueryGroups?.groups?.map((group) => ({
        label: group.name,
        value: group.id,
      })) || [],
    [QueryGroups]
  );

  const parentData = useMemo(
    () =>
      QueryParentData?.businessRelay?.edges?.map(({ node: parent }) => ({
        label: parent.name,
        value: parent.id,
      })) || [],
    [QueryParentData]
  );

  const tags = useMemo(
    () =>
      QueryTags?.tags?.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })) || [],
    [QueryTags]
  );

  const toggleFiltersOpen = () => setFiltersOpen(!filtersOpen);

  return {
    data,
    dispatch,
    filtersOpen,
    getZip,
    groupData,
    groupFilter,
    loading,
    mutationLoading,
    parentData,
    parentFilter,
    policeAreas,
    setGroupFilter,
    setParentFilter,
    setPoliceAreas,
    setTagFilter,
    state,
    tagFilter,
    tags,
    toggleFiltersOpen,
  };
};

export default useExportBusinesses;
