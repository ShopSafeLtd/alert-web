import type { ListDetectionConfigsQueryVariables } from '#/views/vision/detection-configs/graphql/queries/__generated__/list-configs.generated';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import type { DetectActionType } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListDetectionConfigsQuery } from '#/views/vision/detection-configs/graphql/queries/__generated__/list-configs.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import { useMemo, useReducer, useState } from 'react';

import type { DetectionConfigItem } from './types';

export interface FilterState {
  cameraSort: SortOrder | null;
  type: DetectActionType[];
}

type FilterAction =
  | { payload: DetectActionType[]; type: 'SET_TYPE_FILTER' }
  | { payload: SortOrder | null; type: 'SET_CAMERA_SORT' };

const initialFilterState: FilterState = {
  cameraSort: null,
  type: [],
};

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case 'SET_TYPE_FILTER': {
      return { ...state, type: action.payload };
    }
    case 'SET_CAMERA_SORT': {
      return { ...state, cameraSort: action.payload };
    }
    default: {
      return state;
    }
  }
};

interface Return {
  data: DetectionConfigItem[];
  filterState: FilterState;
  handleTableChange: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DetectionConfigItem>
      | SorterResult<DetectionConfigItem>[]
  ) => void;
  loading: boolean;
  search?: string;
  setPage: (page: number) => void;
  setSearch: (value: null | string) => void;
  totalCount: number;
}

const useListDetectionConfigs = (): Return => {
  const [search, setSearch] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const currentScheme = useAtomValue(currentSchemeIdAtom) ?? '';
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const variables: ListDetectionConfigsQueryVariables = {
    order: filterState.cameraSort || undefined,

    skip: (page - 1) * 20,
    take: 20,
    where: {
      schemeId: currentScheme,
      search: search || undefined,
      type: filterState.type.length > 0 ? filterState.type : undefined,
    },
  };

  const { data: initData, loading } = useListDetectionConfigsQuery({
    fetchPolicy: 'cache-first',
    variables,
  });

  const data: DetectionConfigItem[] = useMemo(() => {
    if (initData?.detectionConfigs?.edges) {
      return initData.detectionConfigs.edges.map((edge) => {
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
      });
    }
    return [];
  }, [initData]);

  const totalCount = initData?.detectionConfigs?.totalCount ?? 0;

  const handleTableChange = (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DetectionConfigItem>
      | SorterResult<DetectionConfigItem>[]
  ) => {
    if (filters.type !== undefined) {
      dispatch({
        payload: (filters.type as DetectActionType[]) || [],
        type: 'SET_TYPE_FILTER',
      });
    }
    if (!Array.isArray(sorter) && sorter.columnKey === 'cameraCount') {
      dispatch({
        payload: sorter.order
          ? sorter.order === 'ascend'
            ? SortOrder.Asc
            : SortOrder.Desc
          : null,
        type: 'SET_CAMERA_SORT',
      });
    }
  };

  return {
    data,
    filterState,
    handleTableChange,
    loading,
    search: search ?? undefined,
    setPage,
    setSearch,
    totalCount,
  };
};

export default useListDetectionConfigs;
