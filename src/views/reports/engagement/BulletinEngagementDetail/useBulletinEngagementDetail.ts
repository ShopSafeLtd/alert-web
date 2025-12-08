import type { BulletinEngagementQuery } from '#/graphql/engagement/queries/__generated__/bulletin-engagement.generated';

import { useBulletinEngagementQuery } from '#/graphql/engagement/queries/__generated__/bulletin-engagement.generated';
import { useMemo, useState } from 'react';

type UserEngagement = NonNullable<
  BulletinEngagementQuery['bulletinEngagement']['users'][0]
>;

interface UseBulletinEngagementDetailProps {
  bulletinId: string;
}

interface UseBulletinEngagementDetailReturn {
  engagementData: BulletinEngagementQuery['bulletinEngagement'] | null;
  filterStatus: 'all' | 'not-viewed' | 'viewed';
  filteredUsers: UserEngagement[];
  loading: boolean;
  searchText: string;
  setFilterStatus: (status: 'all' | 'not-viewed' | 'viewed') => void;
  setSearchText: (text: string) => void;
  setSortConfig: (config: { direction: 'asc' | 'desc'; key: string }) => void;
  sortConfig: { direction: 'asc' | 'desc'; key: string };
}

const useBulletinEngagementDetail = ({
  bulletinId,
}: UseBulletinEngagementDetailProps): UseBulletinEngagementDetailReturn => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'not-viewed' | 'viewed'
  >('all');
  const [sortConfig, setSortConfig] = useState<{
    direction: 'asc' | 'desc';
    key: string;
  }>({
    direction: 'desc',
    key: 'lastViewedAt',
  });

  const { data, loading } = useBulletinEngagementQuery({
    variables: {
      articleId: bulletinId,
    },
  });

  const filteredAndSortedUsers = useMemo(() => {
    if (!data?.bulletinEngagement.users) return [];

    let filtered = data.bulletinEngagement.users;

    // Apply status filter
    if (filterStatus === 'viewed') {
      filtered = filtered.filter((user) => user.hasViewed);
    } else if (filterStatus === 'not-viewed') {
      filtered = filtered.filter((user) => !user.hasViewed);
    }

    // Apply search filter
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.userFullName.toLowerCase().includes(lowerSearch) ||
          user.userEmail?.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      let aValue: null | number | string | undefined;
      let bValue: null | number | string | undefined;

      switch (sortConfig.key) {
        case 'userFullName': {
          aValue = a.userFullName;
          bValue = b.userFullName;
          break;
        }
        case 'viewCount': {
          aValue = a.viewCount || 0;
          bValue = b.viewCount || 0;
          break;
        }
        case 'lastViewedAt': {
          aValue = a.lastViewedAt ? new Date(a.lastViewedAt).getTime() : 0;
          bValue = b.lastViewedAt ? new Date(b.lastViewedAt).getTime() : 0;
          break;
        }
        default: {
          return 0;
        }
      }

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, searchText, filterStatus, sortConfig]);

  return {
    engagementData: data?.bulletinEngagement || null,
    filterStatus,
    filteredUsers: filteredAndSortedUsers,
    loading,
    searchText,
    setFilterStatus,
    setSearchText,
    setSortConfig,
    sortConfig,
  };
};

export default useBulletinEngagementDetail;
