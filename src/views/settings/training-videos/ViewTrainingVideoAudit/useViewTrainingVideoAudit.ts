import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TrainingVideoAuditQuery } from '../graphql/queries/__generated__/training-video-audit.generated';

import { useTrainingVideoAuditLazyQuery } from '../graphql/queries/__generated__/training-video-audit.generated';

type UserCompletion = NonNullable<
  TrainingVideoAuditQuery['trainingVideoAudit']['users'][0]
>;

export type SortField = 'completedAt' | 'email' | 'name' | 'status';
export type SortOrder = 'ascend' | 'descend' | null;
export type CompletionFilter = 'all' | 'completed' | 'notCompleted';

interface UseViewTrainingVideoAuditReturn {
  auditData: TrainingVideoAuditQuery['trainingVideoAudit'] | null;
  completionFilter: CompletionFilter;
  filteredUsers: UserCompletion[];
  handleCompletionFilterChange: (value: CompletionFilter) => void;
  handleSearch: (value: string) => void;
  handleTableChange: (sorter: { field?: SortField; order?: SortOrder }) => void;
  loading: boolean;
  searchQuery: string;
  sortField: SortField | null;
  sortOrder: SortOrder;
}

const useViewTrainingVideoAudit = (): UseViewTrainingVideoAuditReturn => {
  const { videoId } = useParams<{ videoId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [completionFilter, setCompletionFilter] =
    useState<CompletionFilter>('all');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const [fetchAudit, { data, loading }] = useTrainingVideoAuditLazyQuery({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (videoId) {
      void fetchAudit({
        variables: {
          trainingVideoId: videoId,
        },
      });
    }
  }, [videoId, fetchAudit]);

  const handleSearch = (value: string): void => {
    setSearchQuery(value);
  };

  const handleCompletionFilterChange = (value: CompletionFilter): void => {
    setCompletionFilter(value);
  };

  const handleTableChange = (sorter: {
    field?: SortField;
    order?: SortOrder;
  }): void => {
    setSortField(sorter.field || null);
    setSortOrder(sorter.order || null);
  };

  const filteredUsers = useMemo(() => {
    if (!data?.trainingVideoAudit?.users) {
      return [];
    }

    let users = [...data.trainingVideoAudit.users];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      users = users.filter(
        (user) =>
          user.userFullName.toLowerCase().includes(query) ||
          user.userEmail?.toLowerCase().includes(query)
      );
    }

    // Apply completion filter
    if (completionFilter !== 'all') {
      users = users.filter((user) =>
        completionFilter === 'completed'
          ? user.hasCompleted
          : !user.hasCompleted
      );
    }

    // Apply sorting
    if (sortField && sortOrder) {
      users.sort((a, b) => {
        let aValue: Date | boolean | null | string;
        let bValue: Date | boolean | null | string;

        switch (sortField) {
          case 'name': {
            aValue = a.userFullName;
            bValue = b.userFullName;
            break;
          }
          case 'email': {
            aValue = a.userEmail || '';
            bValue = b.userEmail || '';
            break;
          }
          case 'status': {
            aValue = a.hasCompleted;
            bValue = b.hasCompleted;
            break;
          }
          case 'completedAt': {
            aValue = a.completedAt || null;
            bValue = b.completedAt || null;
            break;
          }
          default: {
            return 0;
          }
        }

        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return sortOrder === 'ascend'
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return sortOrder === 'ascend'
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'ascend'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return users;
  }, [data, searchQuery, completionFilter, sortField, sortOrder]);

  return {
    auditData: data?.trainingVideoAudit || null,
    completionFilter,
    filteredUsers,
    handleCompletionFilterChange,
    handleSearch,
    handleTableChange,
    loading,
    searchQuery,
    sortField,
    sortOrder,
  };
};

export default useViewTrainingVideoAudit;
