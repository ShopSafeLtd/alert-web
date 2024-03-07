/* eslint-disable react/no-unused-prop-types */
import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useStoreActions, useStoreState } from '#/state';
import type { Model } from 'graphql/generated';
import { Role, SortOrder, useSchemeGroupsQuery } from 'graphql/generated';
import type { DateType } from '#/types/DataType';
import type { FeedItemFilters } from '#/state/data-model';

interface DashboardContextT {
  children?: ReactNode;
  schemeId: string;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  adminRights: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGroupsFilter: (value: string[]) => void;
  setTypesFilter: (value: Model[]) => void;
  clearFilters: () => void;
  setGallery: (values: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  variables: FeedItemFilters;
}
const DashboardContext = createContext<DashboardContextT | undefined>(
  undefined
);

// Create a custom hook to use the context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider'
    );
  }
  return context;
};

export const DashboardProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const setFeedItemsState = useStoreActions(
    (actions) => actions.data.setFeedItems
  );
  const pagination = useStoreState((state) => state.data.feedItems.pagination);
  const variables = useStoreState((state) => state.data.feedItems.variables);
  const { id: userId, role } = useStoreState((state) => state.user);
  const [lightBoxOpen, setLightBoxOpen] = useState({ open: false, index: 0 });
  const [sortFilter, setSortFilter] = useState(false);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const adminRights = role !== Role.User;

  // Handlers
  const setOrder = useCallback(
    (value: SortOrder) => {
      setFeedItemsState({
        pagination,
        variables: { ...variables, order: value },
      });
    },
    [pagination, variables, setFeedItemsState]
  );

  const setSearch = useCallback(
    (value: string) => {
      setFeedItemsState({
        pagination,
        variables: { ...variables, search: value },
      });
    },
    [pagination, variables, setFeedItemsState]
  );

  const setGroupsFilter = useCallback(
    (value: string[]) => {
      setFeedItemsState({
        pagination,
        variables: { ...variables, groups: value },
      });
    },
    [pagination, variables, setFeedItemsState]
  );

  const setTypesFilter = useCallback(
    (value: Model[]) => {
      setFeedItemsState({
        pagination,
        variables: { ...variables, types: value },
      });
    },
    [pagination, variables, setFeedItemsState]
  );

  const setGallery = useCallback(
    (value: string[]) => {
      setFeedItemsState({
        pagination,
        variables: { ...variables, gallery: value },
      });
    },
    [pagination, variables, setFeedItemsState]
  );

  const setCreatedAtFilter = useCallback(
    (value: DateType | undefined) => {
      setFeedItemsState({
        pagination,
        variables: { ...variables, createdAt: value },
      });
    },
    [pagination, variables, setFeedItemsState]
  );

  const toggleSortFilter = useCallback(() => {
    setSortFilter((prevSortFilter) => !prevSortFilter);
  }, []);

  const clearFilters = useCallback(() => {
    setFeedItemsState({
      pagination,
      variables: {
        order: SortOrder.Desc,
        search: '',
        createdAt: undefined,
        gallery: [],
        groups: [],
        types: [],
      },
    });
  }, [setFeedItemsState, pagination]);

  const openLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    setLightBoxOpen({ open: true, index });
  };

  const { data: groupsData } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.SchemeAdmin
            ? undefined
            : {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const groups = useMemo(
    () =>
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    [groupsData]
  );

  // Value to be provided through context
  const value = useMemo(
    () => ({
      schemeId,
      setOrder,
      setSearch,
      groups,
      adminRights,
      sortFilter,
      toggleSortFilter,
      setGroupsFilter,
      setTypesFilter,
      clearFilters,
      setGallery,
      setCreatedAtFilter,
      lightboxElements,
      openLightbox,
      lightBoxOpen,
      variables,
    }),
    [
      schemeId,
      setOrder,
      setSearch,
      adminRights,
      sortFilter,
      toggleSortFilter,
      setGroupsFilter,
      setTypesFilter,
      clearFilters,
      setGallery,
      setCreatedAtFilter,
      lightboxElements,
      lightBoxOpen,
      variables,
      groups,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
