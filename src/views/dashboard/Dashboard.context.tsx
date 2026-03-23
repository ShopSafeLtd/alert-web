/* eslint-disable react/no-unused-prop-types */
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { FeedItemFilters } from '#/state/data-model';
import type { DateType } from '#/types/DataType';
import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';
import type { Model } from 'graphql/types';
import type { ReactNode } from 'react';
import type RGL from 'react-grid-layout';
import type { IntlShape } from 'react-intl';

import { useGroupsContext } from '#/context/groups-context';
import {
  currentSchemeIdAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useStoreActions, useStoreState } from '#/state';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

interface DashboardContextT {
  adminRights: boolean;
  children?: ReactNode;
  clearFilters: () => void;
  getHeight: (arg0: AvailableDashboardElements) => number;
  getWidth: (arg0: AvailableDashboardElements) => number;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  intl: IntlShape;
  layout: DashboardLayout[];
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  marqueeString?: null | string;
  openLightbox: (elements: { src: string }[], index: number) => void;
  rowOrCol: (arg0: AvailableDashboardElements) => 'col' | 'row';
  saving: boolean;
  schemeId: string;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSaving: (value: boolean) => void;
  setSearch: (value: string) => void;
  setTypesFilter: (value: Model[]) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  userId: string;
  variables: FeedItemFilters;
}

const DashboardContext = createContext<DashboardContextT | undefined>(
  undefined
);
export type DashboardLayout = {
  i: AvailableDashboardElements;
  metadata?: DashboardGraphMetadata | string; // Metadata for configurable components
} & RGL.Layout;
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
const getWidthMultiplier = (windowWidth: number): number => {
  if (windowWidth <= 1024) return 0.85;
  if (windowWidth <= 1280) return 0.92;
  if (windowWidth <= 1440) return 1;
  if (windowWidth <= 1600) return 1.06;
  return 1.12;
};

export const generateHeight = (): number => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const multiplier = getWidthMultiplier(windowWidth);

  let base: number;
  if (windowHeight <= 920) {
    base = Number.parseInt((windowHeight / 35).toFixed(0), 10) + 1;
  } else if (windowHeight <= 1200) {
    base = Number.parseInt((windowHeight / 29).toFixed(0), 10) + 1;
  } else {
    base = Number.parseInt((windowHeight / 27).toFixed(0), 10) + 1;
  }

  return Math.round(base * multiplier);
};

export const useGenerateHeight = (): number => {
  const [rowHeight, setRowHeight] = useState(() => generateHeight());
  useEffect(() => {
    const handleResize = () => setRowHeight(generateHeight());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return rowHeight;
};

export const DashboardProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const adminRights = useAtomValue(isAdminAtom);
  const rowHeight = useGenerateHeight();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const setFeedItemsState = useStoreActions(
    (actions) => actions.data.setFeedItems
  );
  const pagination = useStoreState((state) => state.data.feedItems.pagination);
  const variables = useStoreState((state) => state.data.feedItems.variables);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const [lightBoxOpen, setLightBoxOpen] = useState({ index: 0, open: false });
  const [sortFilter, setSortFilter] = useState(false);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const { initialLayout, isSet, schemeLayouts } = useStoreState(
    (state) => state.dashboard
  );

  const dashboardLayout = useMemo(
    () => (isSet ? (schemeLayouts[schemeId] ?? initialLayout) : initialLayout),
    [isSet, schemeLayouts, schemeId, initialLayout]
  );

  const [saving, setSaving] = useState(false);
  const [marqueeString, setMarqueeString] = useState<null | string>(
    dashboardLayout.marquee
  );

  useEffect(() => {
    setMarqueeString(dashboardLayout?.marquee);
  }, [dashboardLayout]);

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
        createdAt: undefined,
        gallery: [],
        groups: [],
        order: SortOrder.Desc,
        search: '',
        types: [],
      },
    });
  }, [setFeedItemsState, pagination]);

  const openLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (elements.length === 0) {
      setLightBoxOpen({ index, open: false });
    } else {
      setLightBoxOpen({ index, open: true });
    }
  };

  const { groups, groupsLoading } = useGroupsContext();

  const getWidth = useCallback(
    (itemId: AvailableDashboardElements) =>
      dashboardLayout.layout.find(({ i }) => i === itemId)?.w ?? 0,
    [dashboardLayout]
  );
  const getHeight = useCallback(
    (itemId: AvailableDashboardElements) =>
      (dashboardLayout.layout.find(({ i }) => i === itemId)?.h ?? 0) *
      rowHeight,
    [dashboardLayout, rowHeight]
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
      adminRights,
      clearFilters,
      getHeight,
      getWidth,
      groups,
      groupsLoading,
      intl,
      layout: dashboardLayout.layout as DashboardLayout[],
      lightBoxOpen,
      lightboxElements,
      marqueeString,
      openLightbox,
      rowOrCol,
      saving,
      schemeId,
      setCreatedAtFilter,
      setGallery,
      setGroupsFilter,
      setOrder,
      setSaving,
      setSearch,
      setTypesFilter,
      sortFilter,
      toggleSortFilter,
      userId,
      variables,
    }),
    [
      schemeId,
      adminRights,
      setOrder,
      setSearch,
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
