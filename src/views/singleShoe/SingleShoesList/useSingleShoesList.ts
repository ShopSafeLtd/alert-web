import type { UpsertShoeMutation } from '#/views/singleShoe/graphql/mutations/__generated__/upsert-shoe.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SingleShoeFragment } from 'graphql/fragments/__generated__/shoe.generated';

import { useDeleteShoeMutation } from '#/views/singleShoe/graphql/mutations/__generated__/delete-shoe.generated';
import { notification } from 'antd';
import { ShoeStatus } from 'graphql/types';
import { useState } from 'react';
import errorNotification from 'types/mutation_notifications/error_notification';

import type {
  ShoesQuery,
  ShoesQueryVariables,
} from '../graphql/queries/__generated__/shoes.generated';

import { useUpdateShoeMutation } from '../graphql/mutations/__generated__/update-shoe.generated';
import {
  ShoesDocument,
  useShoesQuery,
} from '../graphql/queries/__generated__/shoes.generated';

interface Return {
  addShoe: boolean;
  awaitingMatchShoesData: NonNullable<ShoesQuery['shoes']> | null | undefined;
  awaitingMatchShoesLoading: boolean;
  awaitingShippingShoesData:
    | NonNullable<ShoesQuery['shoes']>
    | null
    | undefined;
  awaitingShippingShoesLoading: boolean;
  matchedShoesData: NonNullable<ShoesQuery['shoes']> | null | undefined;
  matchedShoesLoading: boolean;
  onDelete: (value: string) => void;
  onReceivedShoe: (value: string) => void;
  onShippedShoe: (value: string) => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  setShoeId: (value: string) => void;
  setViewData: (value: SingleShoeFragment | undefined) => void;
  shippedShoesData: NonNullable<ShoesQuery['shoes']> | null | undefined;
  shippedShoesLoading: boolean;
  shoeId: string;
  toggleAddShoe: () => void;
  updateNewShoeList: MutationUpdaterFn<UpsertShoeMutation>;
  viewData: SingleShoeFragment | undefined;
}

const useSingleShoesList = (): Return => {
  const [search, setSearch] = useState('');
  const [shoeId, setShoeId] = useState('');
  const [viewData, setViewData] = useState<SingleShoeFragment | undefined>(
    undefined
  );

  const [saving, setSaving] = useState(false);
  const [addShoe, setAddShoe] = useState(false);

  // TODO add pagination for each table
  const variables: ShoesQueryVariables = {
    take: 20,
  };

  const awaitingMatchVars: ShoesQueryVariables = {
    ...variables,
    where: {
      ...variables.where,
      status: {
        equals: ShoeStatus.AwaitingMatch,
      },
    },
  };

  const awaitingShippingVars: ShoesQueryVariables = {
    ...variables,
    where: {
      ...variables.where,
      status: {
        equals: ShoeStatus.AwaitingShipping,
      },
    },
  };

  const shippedVars: ShoesQueryVariables = {
    ...variables,
    where: {
      ...variables.where,
      status: {
        equals: ShoeStatus.Shipped,
      },
    },
  };

  const { data: awaitingMatchShoesData, loading: awaitingMatchShoesLoading } =
    useShoesQuery({
      fetchPolicy: 'cache-and-network',
      variables: awaitingMatchVars,
    });

  const {
    data: awaitingShippingShoesData,
    loading: awaitingShippingShoesLoading,
  } = useShoesQuery({
    fetchPolicy: 'cache-and-network',
    variables: awaitingShippingVars,
  });

  const { data: shippedShoesData, loading: shippedShoesLoading } =
    useShoesQuery({
      fetchPolicy: 'cache-and-network',
      variables: shippedVars,
    });
  const { data: matchedShoesData, loading: matchedShoesLoading } =
    useShoesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        take: 30,
        where: {
          status: {
            not: ShoeStatus.AwaitingMatch,
          },
        },
      },
    });

  // delete
  const [deleteShoe] = useDeleteShoeMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: `The shoe has been removed from the list!`,
        message: 'Successfully Removed',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      if (res.deleteShoe.status === ShoeStatus.AwaitingMatch) {
        const existingData = store.readQuery<ShoesQuery>({
          query: ShoesDocument,
          variables: awaitingMatchVars,
        });

        if (existingData === null) return;
        const count = existingData?.shoes?.totalCount || 1;

        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res?.deleteShoe?.id
              ),
              totalCount: count - 1,
            },
          },
          query: ShoesDocument,
          variables: awaitingMatchVars,
        });
      }
      if (res.deleteShoe.status === ShoeStatus.AwaitingShipping) {
        const existingData = store.readQuery<ShoesQuery>({
          query: ShoesDocument,
          variables: awaitingShippingVars,
        });

        if (existingData === null) return;
        const count = existingData?.shoes?.totalCount || 1;

        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res?.deleteShoe?.id
              ),
              totalCount: count - 1,
            },
          },
          query: ShoesDocument,
          variables: awaitingShippingVars,
        });
      }
      if (res.deleteShoe.status === ShoeStatus.Shipped) {
        const existingData = store.readQuery<ShoesQuery>({
          query: ShoesDocument,
          variables: shippedVars,
        });

        if (existingData === null) return;
        const count = existingData?.shoes?.totalCount || 1;

        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res?.deleteShoe?.id
              ),
              totalCount: count - 1,
            },
          },
          query: ShoesDocument,
          variables: shippedVars,
        });
      }
    },
  });

  const onDelete = (currentId: string) => {
    void deleteShoe({
      variables: {
        id: currentId,
      },
    }).finally(() => setSaving(false));
  };

  // createShoe
  const updateNewShoeList: MutationUpdaterFn<UpsertShoeMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    const existingData = store.readQuery<ShoesQuery, ShoesQueryVariables>({
      query: ShoesDocument,
      variables: awaitingMatchVars,
    });

    if (existingData === null) return;
    const existingDataShip = store.readQuery<ShoesQuery, ShoesQueryVariables>({
      query: ShoesDocument,
      variables: awaitingShippingVars,
    });
    if (existingDataShip === null) return;

    // new shoe has no match
    if (res.upsertShoe.status === ShoeStatus.AwaitingMatch) {
      let count = existingData?.shoes?.totalCount || 0;
      count += 1;
      store.writeQuery<ShoesQuery, ShoesQueryVariables>({
        data: {
          shoes: {
            edges: [...existingData.shoes.edges, { node: res.upsertShoe }],
            totalCount: count,
          },
        },
        query: ShoesDocument,
        variables: awaitingMatchVars,
      });
    }
    // new shoe has match
    if (res.upsertShoe.status === ShoeStatus.AwaitingShipping) {
      if (res.upsertShoe.primaryShoe?.id) {
        // remove matched shoe from awaitingMatchShoes
        let count = existingData?.shoes?.totalCount || 0;
        count -= 1;
        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res.upsertShoe.primaryShoe?.id
              ),
              totalCount: count,
            },
          },
          query: ShoesDocument,
          variables: awaitingMatchVars,
        });
        // add new shoe to awaitingShippingShoes
        let countShip = existingDataShip?.shoes?.totalCount || 0;
        countShip += 1;
        store.writeQuery<ShoesQuery, ShoesQueryVariables>({
          data: {
            shoes: {
              edges: [
                ...existingDataShip.shoes.edges,
                { node: res.upsertShoe },
              ],
              totalCount: countShip,
            },
          },
          query: ShoesDocument,
          variables: awaitingShippingVars,
        });
      }

      if (res.upsertShoe.secondaryShoe?.id) {
        // remove matched shoe from awaitingMatchShoes
        let count = existingData?.shoes?.totalCount || 0;
        count -= 1;
        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) =>
                  shoe?.id !== res.upsertShoe.secondaryShoe?.id
              ),
              totalCount: count,
            },
          },
          query: ShoesDocument,
          variables: awaitingMatchVars,
        });
        // add matched shoe to awaitingShippingShoes
        let countShip = existingDataShip?.shoes?.totalCount || 0;
        countShip += 1;
        const findMatchedDetails = existingData.shoes.edges.find(
          ({ node: shoe }) => shoe?.id === res.upsertShoe.secondaryShoe?.id
        );
        if (
          findMatchedDetails?.node === null ||
          findMatchedDetails?.node === undefined
        )
          return;

        store.writeQuery<ShoesQuery, ShoesQueryVariables>({
          data: {
            shoes: {
              edges: [
                ...existingDataShip.shoes.edges,
                { node: findMatchedDetails?.node },
              ],
              totalCount: countShip,
            },
          },
          query: ShoesDocument,
          variables: awaitingShippingVars,
        });
        // remove matched shoe from awaitingMatchShoes
        let countMa = existingData?.shoes?.totalCount || 1;
        countMa -= 1;
        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res.upsertShoe.primaryShoe?.id
              ),
              totalCount: countMa,
            },
          },
          query: ShoesDocument,
          variables: awaitingMatchVars,
        });
      }
    }
  };

  // update shoe status
  const [updateShoe] = useUpdateShoeMutation({
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onShippedShoe = (currentId: string) => {
    setSaving(true);
    void updateShoe({
      onCompleted: () => {
        notification.success({
          description: `The shoe status has been updated to Shipped!`,
          message: 'Successfully Updated',
          placement: 'bottomRight',
        });
      },
      update: (store, { data: res }) => {
        if (res === null || res === undefined) return;

        const existingData = store.readQuery<ShoesQuery>({
          query: ShoesDocument,
          variables: awaitingShippingVars,
        });

        if (existingData === null) return;
        let count = existingData?.shoes?.totalCount || 1;
        count -= 1;
        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res?.updateShoe.id
              ),
              totalCount: count,
            },
          },
          query: ShoesDocument,
          variables: awaitingShippingVars,
        });

        const existingShipData = store.readQuery<ShoesQuery>({
          query: ShoesDocument,
          variables,
        });

        if (existingShipData === null) return;
        let countShip = existingShipData?.shoes?.totalCount || 0;
        countShip += 1;
        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: [
                ...existingShipData.shoes.edges,
                { node: res.updateShoe },
              ],
              totalCount: countShip,
            },
          },
          query: ShoesDocument,
          variables,
        });
      },
      variables: {
        data: { status: ShoeStatus.Shipped },
        where: { id: currentId },
      },
    }).finally(() => setSaving(false));
  };
  const onReceivedShoe = (currentId: string) => {
    setSaving(true);
    void updateShoe({
      onCompleted: () => {
        notification.success({
          description: `The shoe status has been updated to Received!`,
          message: 'Successfully Updated',
          placement: 'bottomRight',
        });
      },
      update: (store, { data: res }) => {
        if (res === null || res === undefined) return;

        const existingData = store.readQuery<ShoesQuery>({
          query: ShoesDocument,
          variables,
        });

        if (existingData === null) return;
        let count = existingData?.shoes?.totalCount || 1;
        count -= 1;
        store.writeQuery<ShoesQuery>({
          data: {
            shoes: {
              edges: existingData?.shoes?.edges.filter(
                ({ node: shoe }) => shoe?.id !== res?.updateShoe.id
              ),
              totalCount: count,
            },
          },
          query: ShoesDocument,
          variables: shippedVars,
        });
      },
      variables: {
        data: { status: ShoeStatus.Received },
        where: { id: currentId },
      },
    }).finally(() => setSaving(false));
  };
  const toggleAddShoe = () => {
    setAddShoe(!addShoe);
  };

  return {
    addShoe,
    awaitingMatchShoesData: awaitingMatchShoesData?.shoes,
    awaitingMatchShoesLoading,
    awaitingShippingShoesData: awaitingShippingShoesData?.shoes,
    awaitingShippingShoesLoading,
    matchedShoesData: matchedShoesData?.shoes,
    matchedShoesLoading,
    onDelete,
    onReceivedShoe,
    onShippedShoe,
    saving,
    search,
    setSearch,
    setShoeId,
    setViewData,
    shippedShoesData: shippedShoesData?.shoes,
    shippedShoesLoading,
    shoeId,
    toggleAddShoe,
    updateNewShoeList,
    viewData,
  };
};

export default useSingleShoesList;
