import type { Age, Build, Gender, Race } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userSchemesAtom } from '#/providers/UserProvider/UserProvider';
import { OffenderSort } from '#/state';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useReducer, useState } from 'react';

import type {
  OffenderSearchDetailsFragment,
  SearchOffendersQuery,
  SearchOffendersQueryVariables,
} from './graphql/queries/__generated__/search-offender.generated';

import { useSearchOffendersQuery } from './graphql/queries/__generated__/search-offender.generated';

type Props = {
  offenderIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
  type: 'multiple' | 'single';
  update?: (value: OffenderSearchDetailsFragment) => void;
  updateMany?: (value: OffenderSearchDetailsFragment[]) => void;
};

interface Return {
  age: Age[];
  build: Build[];
  clearFilters: () => void;
  currentId: string | undefined;
  data: SearchOffendersQuery | undefined;
  ethnicity: Race[];
  hair?: string;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  loadingMore: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  pagination: { page: number; pageSize: number };
  peculiarities?: string;
  saving: boolean;
  search?: string;
  selectOffender: (id: string) => void;
  selectedLoading: boolean;
  selectedOffender: OffenderSearchDetailsFragment | null | undefined;
  selectedOffenders: OffenderSearchDetailsFragment[] | undefined;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setCurrentId: (value: string | undefined) => void;
  setEthnicity: (value: Race[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  setSex: (value: Gender[]) => void;
  sex: Gender[];
}

// Define the State
interface State {
  age: Age[];
  build: Build[];
  ethnicity: Race[];
  groups: string[];
  hair?: string;
  lightBox: {
    index: number;
    open: boolean;
  };
  order: OffenderSort;
  pagination: {
    page: number;
    pageSize: number;
  };
  peculiarities?: string;
  search?: string;
  sex: Gender[];
}

// Define the Action Enum
enum ActionType {
  RESET_STATE = 'RESET_STATE',
  SET_AGE = 'SET_AGE',
  SET_BUILD = 'SET_BUILD',
  SET_ETHNICITY = 'SET_ETHNICITY',
  SET_GROUPS = 'SET_GROUPS',
  SET_HAIR = 'SET_HAIR',
  SET_LIGHTBOX = 'SET_LIGHTBOX',
  SET_ORDER = 'SET_ORDER',
  SET_PAGINATION = 'SET_PAGINATION',
  SET_PECULIARITIES = 'SET_PECULIARITIES',
  SET_SEARCH = 'SET_SEARCH',
  SET_SEX = 'SET_SEX',
}

// Define the Action
type Action =
  | {
      payload: { page: number; pageSize: number };
      type: ActionType.SET_PAGINATION;
    }
  | { payload: { index: number; open: boolean }; type: ActionType.SET_LIGHTBOX }
  | { payload: Age[]; type: ActionType.SET_AGE }
  | { payload: Build[]; type: ActionType.SET_BUILD }
  | { payload: Gender[]; type: ActionType.SET_SEX }
  | { payload: OffenderSort; type: ActionType.SET_ORDER }
  | { payload: Race[]; type: ActionType.SET_ETHNICITY }
  | { payload: string | undefined; type: ActionType.SET_HAIR }
  | { payload: string | undefined; type: ActionType.SET_PECULIARITIES }
  | { payload: string | undefined; type: ActionType.SET_SEARCH }
  | { payload: string[]; type: ActionType.SET_GROUPS }
  | { type: ActionType.RESET_STATE };

// Create the Reducer Function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_ORDER: {
      return {
        ...state,
        order: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    }
    case ActionType.SET_AGE: {
      return {
        ...state,
        age: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    }
    case ActionType.SET_BUILD: {
      return {
        ...state,
        build: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    }
    case ActionType.SET_SEX: {
      return {
        ...state,
        pagination: { ...state.pagination, page: 1 },
        sex: action.payload,
      };
    }
    case ActionType.SET_GROUPS: {
      return {
        ...state,
        groups: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    }
    case ActionType.SET_HAIR: {
      return {
        ...state,
        hair: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    }
    case ActionType.SET_PECULIARITIES: {
      return {
        ...state,
        pagination: { ...state.pagination, page: 1 },
        peculiarities: action.payload,
      };
    }
    case ActionType.SET_ETHNICITY: {
      return {
        ...state,
        ethnicity: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    }
    case ActionType.SET_SEARCH: {
      return {
        ...state,
        pagination: { ...state.pagination, page: 1 },
        search: action.payload,
      };
    }
    case ActionType.SET_PAGINATION: {
      return { ...state, pagination: action.payload };
    }
    case ActionType.SET_LIGHTBOX: {
      return { ...state, lightBox: action.payload };
    }
    case ActionType.RESET_STATE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

// Initial State
const initialState: State = {
  age: [],
  build: [],
  ethnicity: [],
  groups: [],
  hair: undefined,
  lightBox: {
    index: 0,
    open: false,
  },
  order: OffenderSort.updatedAtDesc,
  pagination: {
    page: 1,
    pageSize: 36,
  },
  peculiarities: undefined,
  search: undefined,
  sex: [],
};

const useAddExistingOffender = ({
  offenderIds,
  onClose,
  takeAllSchemes,
  type,
  update,
  updateMany,
}: Props): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userSchemeIds = useAtomValue(userSchemesAtom).map((el) => el.schemeId);

  const [saving, setSaving] = useState(false);
  const [selectedOffenders, setSelectedOffenders] = useState<
    OffenderSearchDetailsFragment[] | undefined
  >(undefined);

  const [currentId, setCurrentIdState] = useState<string | undefined>(
    undefined
  );

  const [
    {
      age,
      build,
      ethnicity,
      groups,
      hair,
      lightBox,
      order,
      pagination,
      peculiarities,
      search,
      sex,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const variables: SearchOffendersQueryVariables = {
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    where: {
      age:
        age?.length > 0
          ? {
              in: age,
            }
          : undefined,
      build:
        build?.length > 0
          ? {
              in: build,
            }
          : undefined,
      exclude: offenderIds || undefined,
      gender:
        sex.length > 0
          ? {
              in: sex,
            }
          : undefined,
      groups: groups?.length > 0 ? groups : undefined,
      hair,
      peculiarities,
      race:
        ethnicity?.length > 0
          ? {
              in: ethnicity,
            }
          : undefined,
      schemes: takeAllSchemes ? userSchemeIds : [schemeId],
      searchTerm: search || undefined,
    },
  };

  const { data, fetchMore, loading } = useSearchOffendersQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    variables: {
      first: pagination.pageSize,
      ...variables,
    },
  });

  const [fetchingMore, setFetchingMore] = useState(false);
  const onPaginationChange = (page: number, pageSize: number) => {
    setFetchingMore(true);
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchingMore(false);
        if (!fetchMoreResult) return prev;
        const prevIds = new Set(
          prev.searchOffenders.edges.map(({ node: offender }) => offender.id)
        );
        const newData = fetchMoreResult.searchOffenders.edges.filter(
          ({ node: offender }) => !prevIds.has(offender.id)
        );
        return {
          ...fetchMoreResult,
          searchOffenders: {
            ...fetchMoreResult.searchOffenders,
            edges: [...prev.searchOffenders.edges, ...newData],
          },
        };
      },
      variables: {
        after: data?.searchOffenders?.pageInfo?.endCursor,
        ...variables,
      },
    });
    dispatch({
      payload: { page, pageSize },
      type: ActionType.SET_PAGINATION,
    });

    // setPagination({
    //   ...pagination,
    //   page,
    // })
  };

  const clearFilters = () => dispatch({ type: ActionType.RESET_STATE });

  const onSubmit = () => {
    console.log('onSubmit111');

    setSaving(true);
    if (type === 'single' && update) {
      if (!currentId) return;
      const selectedOffender = data?.searchOffenders.edges.find(
        ({ node: offender }) => offender.id === currentId
      )?.node;
      if (currentId && selectedOffender && selectedOffender.id === currentId) {
        console.log('onSubmit22');

        update({
          age: selectedOffender.age || null,
          build: selectedOffender.build || null,
          dateOfBirth: selectedOffender.dateOfBirth || null,
          gender: selectedOffender.gender || null,
          hair: selectedOffender.hair,
          id: selectedOffender.id,
          images:
            selectedOffender.images.map(
              ({ id, optimised, position, rotation }) => ({
                id,
                optimised,
                position,
                rotation,
              })
            ) || null,
          lastActive: selectedOffender.lastActive || null,
          name: selectedOffender.name,
          peculiarities: selectedOffender.peculiarities,
          race: selectedOffender.race || null,
          reference: selectedOffender.reference,
          tags: selectedOffender.tags,
          totalIncidents: selectedOffender.totalIncidents || 0,
          totalValue: selectedOffender.totalValue || 0,
          updatedAt: selectedOffender.updatedAt || null,
        });
      }
    }

    if (type === 'multiple' && updateMany) {
      if (!selectedOffenders || selectedOffenders.length === 0) return;
      updateMany(selectedOffenders);
    }
    setSaving(false);
    onClose();
  };

  const openLightbox = (index: number) => {
    dispatch({
      payload: { index, open: !lightBox.open },
      type: ActionType.SET_LIGHTBOX,
    });
  };

  const setCurrentId = (value: string | undefined) => {
    setCurrentIdState(value || undefined);
  };

  const selectOffender = (id: string) => {
    const alreadySelected = selectedOffenders?.find(
      (offender) => offender.id === id
    );
    if (alreadySelected) {
      setSelectedOffenders(
        selectedOffenders?.filter((offender) => offender.id !== id)
      );
    } else {
      const newOffender = data?.searchOffenders.edges.find(
        ({ node: offender }) => offender.id === id
      )?.node;
      if (newOffender) {
        setSelectedOffenders([...(selectedOffenders || []), newOffender]);
      }
    }

    setCurrentIdState(undefined);
  };

  const setAge = (value: Age[]) =>
    dispatch({ payload: value, type: ActionType.SET_AGE });

  const setBuild = (value: Build[]) =>
    dispatch({ payload: value, type: ActionType.SET_BUILD });

  const setEthnicity = (value: Race[]) =>
    dispatch({
      payload: value,
      type: ActionType.SET_ETHNICITY,
    });

  const setHair = (value: string) =>
    dispatch({ payload: value, type: ActionType.SET_HAIR });

  const setPeculiarities = (value: string) =>
    dispatch({ payload: value, type: ActionType.SET_PECULIARITIES });

  const setSearch = (value: string) =>
    dispatch({ payload: value, type: ActionType.SET_SEARCH });

  const setSex = (value: Gender[]) =>
    dispatch({ payload: value, type: ActionType.SET_SEX });

  return {
    age,
    build,
    clearFilters,
    currentId,
    data,
    ethnicity,
    hair,
    lightBoxOpen: lightBox,
    loading: data?.searchOffenders?.edges ? false : loading,
    loadingMore: fetchingMore,
    onPaginationChange,
    onSubmit,
    openLightbox,
    pagination,
    peculiarities,
    saving,
    search,
    selectOffender,
    selectedLoading: false,
    selectedOffender: currentId
      ? data?.searchOffenders.edges.find(
          ({ node: offender }) => offender.id === currentId
        )?.node
      : undefined,
    selectedOffenders,
    setAge,
    setBuild,
    setCurrentId,
    setEthnicity,
    setHair,
    setPeculiarities,
    setSearch,
    setSex,
    sex,
  };
};

export default useAddExistingOffender;
