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
  type: DetectActionType[];
  cameraSort: SortOrder | null;
}

type FilterAction =
  | { type: 'SET_TYPE_FILTER'; payload: DetectActionType[] }
  | { type: 'SET_CAMERA_SORT'; payload: SortOrder | null };

const initialFilterState: FilterState = {
  type: [],
  cameraSort: null,
};

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case 'SET_TYPE_FILTER':
      return { ...state, type: action.payload };
    case 'SET_CAMERA_SORT':
      return { ...state, cameraSort: action.payload };
    default:
      return state;
  }
};

interface Return {
  data: DetectionConfigItem[];
  loading: boolean;
  search?: string;
  setSearch: (value: string | null) => void;
  totalCount: number;
  filterState: FilterState;
  handleTableChange: (
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DetectionConfigItem>
      | SorterResult<DetectionConfigItem>[]
  ) => void;
  setPage: (page: number) => void;
}

const useListDetectionConfigs = (): Return => {
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const currentScheme = useAtomValue(currentSchemeIdAtom) ?? '';
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const variables: ListDetectionConfigsQueryVariables = {
    where: {
      search: search || undefined,
      schemeId: currentScheme,
      type: filterState.type.length > 0 ? filterState.type : undefined,
    },

    skip: (page - 1) * 20,
    take: 20,
    order: filterState.cameraSort || undefined,
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
          key: config.id,
          id: config.id,
          name: config.name,
          type: config.type,
          minimumConfidenceTrigger: config.minimumConfidenceTrigger,
          minimumPriorityTrigger: config.minimumPriorityTrigger,
          cameraCount: config.cameraCount,
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
        type: 'SET_TYPE_FILTER',
        payload: (filters.type as DetectActionType[]) || [],
      });
    }
    if (!Array.isArray(sorter) && sorter.columnKey === 'cameraCount') {
      dispatch({
        type: 'SET_CAMERA_SORT',
        payload: sorter.order
          ? sorter.order === 'ascend'
            ? SortOrder.Asc
            : SortOrder.Desc
          : null,
      });
    }
  };

  return {
    data,
    loading,
    search: search ?? undefined,
    setSearch,
    totalCount,
    filterState,
    handleTableChange,
    setPage,
  };
};

export default useListDetectionConfigs;
