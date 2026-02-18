import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCursorPaginationProps {
  currentCursor?: null | string;
  hasNextPage?: boolean;
  pageSize: number;
  totalCount?: number;
}

export interface UseCursorPaginationReturn {
  currentPage: number;
  fetchVariables: { after?: string; first: number };
  getCursorForPage: (page: number) => string | undefined;
  handlePageChange: (newPage: number, newPageSize?: number) => void;
  resetPagination: () => void;
  totalPages: number;
  updateCursorCache: (page: number, cursor: string) => void;
}

/**
 * Hook to manage cursor-based pagination with page number UI.
 *
 * This hook bridges the gap between Relay cursor-based pagination (backend)
 * and Ant Design's page-number-based pagination (UI).
 *
 * Key features:
 * - Maintains cursor cache for visited pages
 * - Calculates total pages from totalCount
 * - Handles page size changes (resets to page 1, clears cache)
 * - Handles page jumps (resets to page 1 for non-sequential jumps)
 * - Returns variables for GraphQL query (first, after)
 *
 * @param pageSize - Number of items per page
 * @param totalCount - Total number of items (from GraphQL response)
 * @param currentCursor - Current page's endCursor (from GraphQL response)
 * @param hasNextPage - Whether there are more pages (from GraphQL response)
 */
export const useCursorPagination = ({
  currentCursor,
  hasNextPage: _hasNextPage = false,
  pageSize,
  totalCount = 0,
}: UseCursorPaginationProps): UseCursorPaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPageSize, setPreviousPageSize] = useState(pageSize);

  // Cache to store endCursor for each page
  // Key: page number, Value: endCursor for that page
  const cursorCache = useRef<Map<number, string>>(new Map());

  // Calculate total pages based on totalCount and pageSize
  const totalPages = Math.ceil(totalCount / pageSize);

  // Update cursor cache when currentCursor changes
  useEffect(() => {
    if (currentCursor && currentPage > 0) {
      cursorCache.current.set(currentPage, currentCursor);
    }
  }, [currentCursor, currentPage]);

  // Reset pagination when page size changes
  useEffect(() => {
    if (pageSize !== previousPageSize) {
      setCurrentPage(1);
      cursorCache.current.clear();
      setPreviousPageSize(pageSize);
    }
  }, [pageSize, previousPageSize]);

  /**
   * Get the cursor for a specific page from the cache
   */
  const getCursorForPage = useCallback((page: number): string | undefined => {
    // Page 1 has no cursor (start from beginning)
    if (page === 1) {
      return undefined;
    }

    // For page N, we need the cursor from page N-1
    return cursorCache.current.get(page - 1);
  }, []);

  /**
   * Update the cursor cache for a specific page
   */
  const updateCursorCache = useCallback((page: number, cursor: string) => {
    cursorCache.current.set(page, cursor);
  }, []);

  /**
   * Reset pagination to initial state
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    cursorCache.current.clear();
  }, []);

  /**
   * Handle page change
   * - For page 1: Reset cursor
   * - For sequential navigation (page + 1 or page - 1): Use cached cursor
   * - For non-sequential jumps: Reset to page 1 if cursor not available
   * - Validates page boundaries to prevent navigation beyond available pages
   */
  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      // Handle page size change
      if (newPageSize && newPageSize !== pageSize) {
        setCurrentPage(1);
        cursorCache.current.clear();
        return;
      }

      // Validate page boundaries - prevent navigation beyond total pages
      if (newPage > totalPages) {
        console.warn(
          `Cannot navigate to page ${newPage}. Only ${totalPages} pages available.`
        );
        return; // Stay on current page
      }

      // Navigate to page 1
      if (newPage === 1) {
        setCurrentPage(1);
        return;
      }

      // Check if we can navigate to the requested page
      const cursorForNewPage = getCursorForPage(newPage);

      // If cursor is unavailable for a valid page beyond page 1
      if (cursorForNewPage === undefined && newPage > 1) {
        console.warn(
          `Cursor not available for page ${newPage}. Cannot navigate to non-sequential page without cached cursor.`
        );
        return; // Stay on current page instead of silently resetting
      }

      setCurrentPage(newPage);
    },
    [pageSize, getCursorForPage, totalPages]
  );

  // Get fetch variables for GraphQL query
  const fetchVariables = {
    after: getCursorForPage(currentPage),
    first: pageSize,
  };

  return {
    currentPage,
    fetchVariables,
    getCursorForPage,
    handlePageChange,
    resetPagination,
    totalPages,
    updateCursorCache,
  };
};
