import type { StockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import type { StockRemovalRequestsQuery } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { useStockRemovalRequestsQuery } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import {
  SortOrder,
  StockRemovalRequestApprovalStatus,
  StockRemovalRequestStatus,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useMemo, useState } from 'react';

const PAP_GROUP_ID = 'cmg9ni6h70018ityamnewhbvq'; // PAP group ID
const DC_GROUP_ID = 'cmgfd4l4r0000it3n4u2eckmf'; // DC group ID

interface Return {
  data: StockRemovalRequestsQuery | undefined;
  isStoreUser: boolean;
  isUserInDCGroup: boolean;
  isUserInPAPGroup: boolean;
  loading: boolean;
  markAsPickedData: StockRemovalRequestQuery | undefined;
  markAsPickedOpen: null | string;
  setMarkAsPickedOpen: (id: null | string) => void;
  setViewOpen: (id: null | string) => void;
  userBusinessIds: string[];
  viewOpen: null | string;
}

const useMyStockRequests = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const [viewOpen, setViewOpen] = useState<null | string>(null);
  const [markAsPickedOpen, setMarkAsPickedOpen] = useState<null | string>(null);

  // Check if current user is in PAP group
  const isUserInPAPGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === PAP_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check if current user is in DC group
  const isUserInDCGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === DC_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check if current user is a store user (has businesses, not in PAP or DC groups)
  const isStoreUser = useMemo(() => {
    const hasBusinesses = (currentUser?.businesses?.length ?? 0) > 0;
    const notInPAP = !isUserInPAPGroup;
    const notInDC = !isUserInDCGroup;
    return hasBusinesses && notInPAP && notInDC;
  }, [currentUser, isUserInPAPGroup, isUserInDCGroup]);

  // Get list of business IDs the user is assigned to
  const userBusinessIds = useMemo(
    () =>
      currentUser?.businesses?.map((business: { id: string }) => business.id) ??
      [],
    [currentUser]
  );

  const queryWhere = useMemo(
    () => ({
      schemeId,
    }),
    [schemeId]
  );

  const { data, loading } = useStockRemovalRequestsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      take: 15, // Limit for dashboard display
      where: queryWhere,
    },
  });

  // Fetch data for mark as picked modal
  const { data: markAsPickedData } = useStockRemovalRequestQuery({
    skip: !markAsPickedOpen,
    variables: {
      where: {
        id: markAsPickedOpen ?? '',
      },
    },
  });

  // Filter data for "My Requests"
  const filteredData = useMemo(() => {
    if (!data?.stockRemovalRequests.edges) return undefined;

    // Filter to only show:
    // 1. Requests created by the current user
    // 2. Requests where the current user is an approver
    // 3. Requests requiring picking by DC users or store users
    if (currentUser?.id) {
      const filteredEdges = data.stockRemovalRequests.edges.filter(
        ({ node }) => {
          const isCreator = node.createdBy.id === currentUser.id;
          const isApprover = node.approvers.some(
            (approver) => approver.user.id === currentUser.id
          );

          // Check if this request requires action from the current user
          const requiresApproval =
            (node.status === StockRemovalRequestStatus.PendingApproval &&
              node.approvers.some(
                (approver) =>
                  approver.user.id === currentUser.id &&
                  approver.status === StockRemovalRequestApprovalStatus.Open
              )) ||
            (node.status === StockRemovalRequestStatus.AwaitingPapApproval &&
              isUserInPAPGroup);

          const requiresPicking =
            node.status === StockRemovalRequestStatus.Picking &&
            (isUserInDCGroup ||
              (isStoreUser &&
                node.business &&
                userBusinessIds.includes(node.business.id)));

          return isCreator || isApprover || requiresApproval || requiresPicking;
        }
      );

      return {
        stockRemovalRequests: {
          ...data.stockRemovalRequests,
          edges: filteredEdges,
          totalCount: filteredEdges.length,
        },
      };
    }

    return data;
  }, [
    data,
    currentUser,
    isUserInPAPGroup,
    isUserInDCGroup,
    isStoreUser,
    userBusinessIds,
  ]);

  return {
    data: filteredData,
    isStoreUser,
    isUserInDCGroup,
    isUserInPAPGroup,
    loading: (data === null || data === undefined) && loading,
    markAsPickedData,
    markAsPickedOpen,
    setMarkAsPickedOpen,
    setViewOpen,
    userBusinessIds,
    viewOpen,
  };
};

export default useMyStockRequests;
