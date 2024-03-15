/* eslint-disable react/no-unused-prop-types */
import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useStoreActions, useStoreState } from '#/state';
import type { Model } from 'graphql/generated';
import { Role, SortOrder, useSchemeGroupsQuery } from 'graphql/generated';
import type { DateType } from '#/types/DataType';
import type { FeedItemFilters } from '#/state/data-model';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import type RGL from 'react-grid-layout';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

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
  intl: IntlShape;
  saving: boolean;
  setSaving: (value: boolean) => void;
  userId: string;
  marqueeString?: string | null;
  groupsLoading: boolean;
  layout: DashboardLayout[];
  rowOrCol: (arg0: AvailableDashboardElements) => 'row' | 'col';
  getWidth: (arg0: AvailableDashboardElements) => number;
  getHeight: (arg0: AvailableDashboardElements) => number;
}

const DashboardContext = createContext<DashboardContextT | undefined>(
  undefined
);
export type DashboardLayout = RGL.Layout & {
  i: AvailableDashboardElements;
};
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
export const generateHeight = () => {
  const windowHeight = window.innerHeight;
  if (windowHeight <= 920) {
    return Number.parseInt((windowHeight / 35).toFixed(0), 10) + 1;
  }
  if (windowHeight > 920 && windowHeight <= 1200) {
    return Number.parseInt((windowHeight / 29).toFixed(0), 10) + 1;
  }
  if (windowHeight > 1200) {
    return Number.parseInt((windowHeight / 27).toFixed(0), 10) + 1;
  }

  // Default value for any other window height
  return 30; // Default value for small screens
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
  const { isSet, schemeLayouts, initialLayout } = useStoreState(
    (state) => state.dashboard
  );

  const dashboardLayout = useMemo(
    () =>
      isSet
        ? schemeLayouts[schemeId] ?? initialLayout
        : { marquee: null, layout: [] },
    [schemeId, isSet]
  );

  const [saving, setSaving] = useState(false);
  const [marqueeString, setMarqueeString] = useState<string | null>(
    dashboardLayout.marquee
  );

  useEffect(() => {
    setMarqueeString(dashboardLayout?.marquee);
  }, [dashboardLayout]);

  const adminRights = role !== Role.User;
  const intl = useIntl();
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

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
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

  const getWidth = useCallback(
    (itemId: AvailableDashboardElements) =>
      dashboardLayout.layout.find(({ i }) => i === itemId)?.w ?? 0,
    [dashboardLayout]
  );
  const getHeight = useCallback(
    (itemId: AvailableDashboardElements) =>
      (dashboardLayout.layout.find(({ i }) => i === itemId)?.h ?? 0) *
      generateHeight(),
    [dashboardLayout]
  );
  const rowOrCol = useCallback(
    (itemId: AvailableDashboardElements) => {
      const layoutI = dashboardLayout.layout.find(({ i }) => i === itemId);
      if (layoutI) {
        // return layoutI.h / 2 >= layoutI.w ? 'col' : 'row';
        return layoutI.h > 5 ? 'col' : 'row';
      }
      return 'col';
    },
    [dashboardLayout]
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
      intl,
      saving,
      setSaving,
      userId,
      marqueeString,
      groupsLoading,
      layout: dashboardLayout.layout,
      getWidth,
      rowOrCol,
      getHeight,
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
      intl,
      saving,
      setSaving,
      marqueeString,
      userId,
      groupsLoading,
      dashboardLayout,
      rowOrCol,
      getWidth,
      getHeight,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
