import type { UpdatesFragment } from '#/graphql/fragments/__generated__/updates.generated';
import type {
  StockRemovalRequestQuery,
  StockRemovalRequestQueryVariables,
} from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import type {
  StockRemovalReturnQuery,
  StockRemovalReturnQueryVariables,
} from '#/views/stock-removal-requests/components/ViewStockRemovalReturn/graphql/__generated__/stock-removal-return.generated';
import type { ApolloCache } from '@apollo/client';

import { useDeleteUpdateMutation } from '#/graphql/mutations/__generated__/delete-update.generated';
import { useCreateUpdateOnStockRemovalRequestMutation } from '#/graphql/updates/mutations/__generated__/create-update-on-stock-removal-request.generated';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { StockRemovalRequestDocument } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { StockRemovalReturnDocument } from '#/views/stock-removal-requests/components/ViewStockRemovalReturn/graphql/__generated__/stock-removal-return.generated';
import { message } from 'antd';
import { UpdateIcon, UpdateType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  requestId: string;
}

const useStockRemovalComments = ({ requestId }: Props) => {
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);
  const [commentText, setCommentText] = useState('');
  const [saving, setSaving] = useState(false);

  const [createUpdate] = useCreateUpdateOnStockRemovalRequestMutation();
  const [deleteUpdate] = useDeleteUpdateMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addUpdateToCache = (
    store: ApolloCache<any>,
    newUpdate: UpdatesFragment
  ) => {
    const requestData = store.readQuery<
      StockRemovalRequestQuery,
      StockRemovalRequestQueryVariables
    >({
      query: StockRemovalRequestDocument,
      variables: { where: { id: requestId } },
    });

    if (requestData?.stockRemovalRequest) {
      store.writeQuery<
        StockRemovalRequestQuery,
        StockRemovalRequestQueryVariables
      >({
        data: {
          stockRemovalRequest: {
            ...requestData.stockRemovalRequest,
            updates: [newUpdate, ...requestData.stockRemovalRequest.updates],
          },
        },
        query: StockRemovalRequestDocument,
        variables: { where: { id: requestId } },
      });
    }

    const returnData = store.readQuery<
      StockRemovalReturnQuery,
      StockRemovalReturnQueryVariables
    >({
      query: StockRemovalReturnDocument,
      variables: { where: { id: requestId } },
    });

    if (returnData?.stockRemovalRequest) {
      store.writeQuery<
        StockRemovalReturnQuery,
        StockRemovalReturnQueryVariables
      >({
        data: {
          stockRemovalRequest: {
            ...returnData.stockRemovalRequest,
            updates: [newUpdate, ...returnData.stockRemovalRequest.updates],
          },
        },
        query: StockRemovalReturnDocument,
        variables: { where: { id: requestId } },
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeUpdateFromCache = (store: ApolloCache<any>, updateId: string) => {
    const requestData = store.readQuery<
      StockRemovalRequestQuery,
      StockRemovalRequestQueryVariables
    >({
      query: StockRemovalRequestDocument,
      variables: { where: { id: requestId } },
    });

    if (requestData?.stockRemovalRequest) {
      store.writeQuery<
        StockRemovalRequestQuery,
        StockRemovalRequestQueryVariables
      >({
        data: {
          stockRemovalRequest: {
            ...requestData.stockRemovalRequest,
            updates: requestData.stockRemovalRequest.updates.filter(
              (u) => u.id !== updateId
            ),
          },
        },
        query: StockRemovalRequestDocument,
        variables: { where: { id: requestId } },
      });
    }

    const returnData = store.readQuery<
      StockRemovalReturnQuery,
      StockRemovalReturnQueryVariables
    >({
      query: StockRemovalReturnDocument,
      variables: { where: { id: requestId } },
    });

    if (returnData?.stockRemovalRequest) {
      store.writeQuery<
        StockRemovalReturnQuery,
        StockRemovalReturnQueryVariables
      >({
        data: {
          stockRemovalRequest: {
            ...returnData.stockRemovalRequest,
            updates: returnData.stockRemovalRequest.updates.filter(
              (u) => u.id !== updateId
            ),
          },
        },
        query: StockRemovalReturnDocument,
        variables: { where: { id: requestId } },
      });
    }
  };

  const onSubmit = () => {
    if (!commentText.trim()) {
      void message.info(
        intl.formatMessage({
          defaultMessage: 'The comment cannot be empty.',
        })
      );
      return;
    }

    const text = commentText.trim();
    setSaving(true);
    setCommentText('');

    void createUpdate({
      onCompleted: () => {
        setSaving(false);
      },
      onError: () => {
        setSaving(false);
        setCommentText(text);
        void message.error(
          intl.formatMessage({
            defaultMessage: 'Failed to add comment.',
          })
        );
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createUpdateOnStockRemovalRequest: {
          __typename: 'Update',
          createdAt: new Date(),
          createdBy: {
            __typename: 'User',
            businesses: [],
            fullName: currentUser?.fullName ?? '',
            id: currentUser?.id ?? '',
            origName: currentUser?.fullName ?? '',
          },
          id: `optimistic-${Date.now()}`,
          images: [],
          linkedArticles: [],
          linkedCrimeGroups: [],
          linkedIncidents: [],
          linkedOffenders: [],
          linkedVehicles: [],
          replies: [],
          text,
          type: UpdateType.Text,
        },
      },
      update: (store, { data }) => {
        if (data?.createUpdateOnStockRemovalRequest) {
          addUpdateToCache(store, data.createUpdateOnStockRemovalRequest);
        }
      },
      variables: {
        data: {
          icon: UpdateIcon.Comment,
          text,
          type: UpdateType.Text,
        },
        stockRemovalRequest: {
          id: requestId,
        },
      },
    });
  };

  const onDelete = (updateId: string) => {
    void deleteUpdate({
      onError: () => {
        void message.error(
          intl.formatMessage({
            defaultMessage: 'Failed to delete comment.',
          })
        );
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          __typename: 'Update',
          id: updateId,
          replyToId: null,
        },
      },
      update: (store) => {
        removeUpdateFromCache(store, updateId);
      },
      variables: {
        where: {
          id: updateId,
        },
      },
    });
  };

  return {
    commentText,
    onDelete,
    onSubmit,
    saving,
    setCommentText,
  };
};

export default useStockRemovalComments;
