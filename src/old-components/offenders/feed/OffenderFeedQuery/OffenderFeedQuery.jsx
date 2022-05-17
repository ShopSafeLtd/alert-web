import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import OffenderFeed from '../OffenderFeed/OffenderFeed';
import { RecycleOffender } from 'graphql-src/offenders/mutations';
import { ApproveOffender } from 'graphql-src/offenders/mutations';
import { MarkOffenderActive } from 'graphql-src/offenders/mutations';
import Offline from '../../../global/Offline/Offline';
import { OffenderFeed as query } from 'graphql-src/offenders/queries';
import { useStoreActions, useStoreState } from '../../../../state';
import { LocalStorageKeys } from 'types';

import { Tags } from 'graphql-src/tags/queries';
import { Groups } from 'graphql-src/groups/queries';

let querySize = 10;
if (window.innerWidth > 1239 && window.innerWidth < 1800) {
  querySize = 12;
} else if (window.innerWidth > 1799) {
  querySize = 16;
}

const OffenderFeedQuery = () => {
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setAppBar = useStoreActions((actions) => actions.theme.setAppBar);
  const setSearch = useStoreActions((actions) => actions.theme.setSearch);
  const setSearchText = useStoreActions(
    (actions) => actions.theme.setSearchText
  );
  const setStatusBar = useStoreActions((actions) => actions.theme.setStatusBar);
  const toggleFetchOffenders = useStoreActions(
    (actions) => actions.theme.toggleFetchOffenders
  );
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const search = useStoreState((state) => state.theme.search);
  const role = useStoreState((state) => state.user.role);
  const admin = role !== 'USER' ? true : false;

  // state
  const [fetching, setFetching] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [filterPristine, setFilterPristine] = useState(true);

  const [order, setOrder] = useState();
  const [filter, setFilter] = useState({
    groups: [],
    sex: [],
    ethnicity: [],
    tags: [],
    approved: {
      approved: undefined,
      awaitingApproval: undefined,
    },
  });
  const [queryVariables, setQueryVariables] = useState({
    order: { createdAt: 'desc' },
    groups: undefined,
    sex: undefined,
    ethnicity: undefined,
    tags: undefined,
    approved: undefined,
  });

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const json = window.localStorage.getItem(LocalStorageKeys.OFFENDER_FILTER);
    const filters = json && JSON.parse(json);
    if (!filters) return;
    setQueryVariables(filters);
  }, []);

  const variables = {
    schemeId: schemeId || window.localStorage.getItem('currentScheme'),
    userId,
    search: searchInput,
    first: querySize,
    ...queryVariables,
  };

  // effects
  useEffect(() => {
    setBottomNav(true);
    setTitle('Offenders');
    setAppBar(true);
    setSearch(true);
    setSearchText('Search for offenders...');
    return () => {
      setSearch(false);
      setSearchText('');
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setAllLoaded(false);
    !!search && setFilterPristine(false);
  }, [filter, search]);

  // queries
  const { data, loading, fetchMore, refetch, error } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
  });
  const { data: tags } = useQuery(Tags, {
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: 'OFFENDER',
        },
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
    },
  });
  const { data: groups } = useQuery(Groups, {
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
    },
  });

  // mutations
  const [deleteOffender] = useMutation(RecycleOffender, {
    update: (store, { data: { recycleOffender } }) => {
      const data = store.readQuery({
        query,
        variables,
      });

      store.writeQuery({
        query,
        data: {
          ...data,
          offenderFeed: data.offenderFeed.filter(
            (offender) => offender.id !== recycleOffender.id
          ),
        },
        variables,
      });
    },
  });
  const [approveOffender] = useMutation(ApproveOffender);
  const [markOffenderActive] = useMutation(MarkOffenderActive, {
    update: (store, { data: { updateOffender } }) => {
      const data = store.readQuery({
        query,
        variables,
      });

      const index = data.offenderFeed
        .map(({ id }) => id)
        .indexOf(updateOffender.id);
      let offender = data.offenderFeed.find(
        ({ id }) => id === updateOffender.id
      );
      data.offenderFeed = data.offenderFeed.filter(
        (offender) => offender.id !== updateOffender.id
      );
      offender.active = updateOffender.active;
      data.offenderFeed = [
        ...data.offenderFeed.slice(0, index),
        offender,
        ...data.offenderFeed.slice(index),
      ];
      store.writeQuery({
        query,
        data,
        variables,
      });
    },
  });

  // set the pagination cursor
  let cursor;
  if (
    !loading &&
    !!data &&
    !!data.offenderFeed &&
    data.offenderFeed.length > 0
  ) {
    cursor = data.offenderFeed.slice(-1)[0].id;
  }
  const loadMore = async () => {
    if (!allLoaded && !fetching) {
      setFetching(true);
      fetchMore({
        query,
        variables: {
          ...variables,
          cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          fetchMoreResult.offenderFeed.length === 1 &&
            fetchMoreResult.offenderFeed[0].id === cursor &&
            setAllLoaded(true);

          return {
            offenderFeed: [
              ...previousResult.offenderFeed,
              ...fetchMoreResult.offenderFeed.filter(
                ({ id }) =>
                  !previousResult.offenderFeed.map(({ id }) => id).includes(id)
              ),
            ],
          };
        },
      })
        .then(() => {
          setFetching(false);
        })
        .catch((error) => {
          setFetching(false);
          error.networkError !== undefined && setNetworkError(true);
        });
    }
  };
  const markOffenderAsActive = async (offender, active) => {
    await markOffenderActive({
      variables: {
        id: offender,
        active: { set: active },
      },
      optimisticResponse: {
        updateOffender: {
          id: offender,
          active: active,
          __typename: 'Offender',
        },
      },
    });
  };

  return error !== undefined && error.networkError !== undefined ? (
    <Offline type="incidents" />
  ) : (
    <OffenderFeed
      offenders={!!data ? data.offenderFeed : []}
      loading={loading}
      deleteOffender={deleteOffender}
      approveOffender={approveOffender}
      setStatusBar={setStatusBar}
      userId={userId}
      loadMore={loadMore}
      search={search}
      markOffenderActive={markOffenderAsActive}
      admin={admin}
      refetch={refetch}
      loadingMore={fetching}
      networkError={networkError}
      filterPristine={filterPristine}
      toggleFetchOffenders={toggleFetchOffenders}
      role={role}
      //
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      order={order}
      setOrder={setOrder}
      filter={filter}
      setFilter={setFilter}
      queryVariables={queryVariables}
      setQueryVariables={setQueryVariables}
      tags={tags?.tags}
      groups={groups?.groups}
    />
  );
};

export default OffenderFeedQuery;
