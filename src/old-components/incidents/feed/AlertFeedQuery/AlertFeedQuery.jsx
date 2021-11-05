import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { IncidentFeed } from 'graphql-src/incidents/queries';
import AlertFeed from '../AlertFeed/AlertFeed';
import {
  AddIncidentToGroup,
  ApproveIncident,
  RecycleIncident,
} from 'graphql-src/incidents/mutations';
import {
  AddOffenderToGroup,
  ApproveOffender,
} from 'graphql-src/offenders/mutations';
import Offline from '../../../global/Offline/Offline';
import { useStoreActions, useStoreState } from '../../../../state';
import { Tags } from 'graphql-src/tags/queries';
import { Groups } from 'graphql-src/groups/queries';

const AlertFeedQuery = () => {
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setAppBar = useStoreActions((actions) => actions.theme.setAppBar);
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setStatusBar = useStoreActions((actions) => actions.theme.setStatusBar);
  const setSearch = useStoreActions((actions) => actions.theme.setBottomNav);
  const setSearchText = useStoreActions(
    (actions) => actions.theme.setBottomNav
  );
  const toggleFetchIncidents = useStoreActions(
    (actions) => actions.theme.setBottomNav
  );
  const scheme = useStoreState((state) => state.scheme.id);
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const search = useStoreState((state) => state.theme.search);
  const fetchIncidents = useStoreState((state) => state.theme.fetchIncidents);
  const admin = role === 'USER' ? true : false;

  const [allLoaded, setAllLoaded] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [networkError, setNetworkError] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [order, setOrder] = useState();
  const [filter, setFilter] = useState({
    groups: [],
    crimeTypes: [],
    approved: {
      approved: undefined,
      awaitingApproval: undefined,
    },
  });

  const [queryVariables, setQueryVariables] = useState({
    order: { createdAt: 'desc' },
    crimeTypes: undefined,
    groups: undefined,
    approved: undefined,
  });

  useEffect(() => {
    setBottomNav(true);
    setTitle('Incidents');
    setAppBar(true);
    setSearch(true);
    setSearchText('Search for incidents...');
    return () => {
      setSearch(false);
      setSearchText('');
      toggleFetchIncidents(true);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allLoaded) setAllLoaded(false);
    // eslint-disable-next-line
  }, [search]);

  // Set queries based on users role
  let querySize = 10;
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    querySize = 12;
  } else if (window.innerWidth > 1799) {
    querySize = 32;
  }

  const variables = {
    userId,
    schemeId: scheme,
    search: searchInput,
    first: querySize,
    ...queryVariables,
  };

  const { data, loading, fetchMore, refetch, error } = useQuery(IncidentFeed, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const { data: crimeTypes } = useQuery(Tags, {
    variables: {
      where: {
        scheme: {
          id: {
            equals: scheme,
          },
        },
        dataType: {
          equals: 'INCIDENT',
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
            equals: scheme,
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

  const [addIncidentToGroup] = useMutation(AddIncidentToGroup);
  const [approveIncident] = useMutation(ApproveIncident);
  const [addOffenderToGroup] = useMutation(AddOffenderToGroup);
  const [approveOffender] = useMutation(ApproveOffender);
  const [deleteIncident] = useMutation(RecycleIncident, {
    // update: async (store, { data: { recycleIncident } }) => {
    //   const data = store.readQuery({
    //     query: IncidentFeed,
    //     variables,
    //   });

    //   store.writeQuery({
    //     query: IncidentFeed,
    //     data: {
    //       ...data,
    //       incidentFeed: data.incidentFeed.filter(
    //         (alert) => alert.id !== recycleIncident.id
    //       ),
    //     },
    //     variables,
    //   });
    // },
    update: (cache, { data: { recycleIncident } }) => {
      const prevData = cache.readQuery({
        query: IncidentFeed,
        variables: {
          userId: userId,
          schemeId: scheme,
          first: 30,
          order: {
            createdAt: 'desc',
            date: undefined,
            subject: undefined,
            updatedAt: undefined,
          },
          search: '',
          crimeTypes: undefined,
          groups: undefined,
          approved: undefined,
          recycled: false,
        },
      });

      const targetIncident = prevData?.incidentFeed.find(
        (el) => el.id === recycleIncident.id
      );
      const newData =
        prevData &&
        prevData.incidentFeed.filter((el) => el.id !== targetIncident?.id);

      newData &&
        cache.writeQuery({
          query: IncidentFeed,
          data: {
            incidentFeed: [{ ...targetIncident, recycled: true }, ...newData],
          },
          variables: {
            userId: userId,
            schemeId: scheme,
            first: 30,
            order: {
              createdAt: 'desc',
              date: undefined,
              subject: undefined,
              updatedAt: undefined,
            },
            search: '',
            crimeTypes: undefined,
            groups: undefined,
            approved: undefined,
            recycled: false,
          },
        });
    },
  });

  let cursor;
  if (
    loading &&
    !!data &&
    !!data.incidentFeed &&
    data.incidentFeed.length > 0
  ) {
    cursor = data.incidentFeed.slice(-1)[0].id;
  }

  const loadMore = async () => {
    if (!allLoaded && !fetching) {
      // Set fetching state
      setFetching(true);
      // Do not fetch more if currently fetching or all records have been fetched
      await fetchMore({
        query: IncidentFeed,
        variables: {
          cursor,
          ...variables,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          let newAlerts = [];
          fetchMoreResult.incidentFeed.length === 1 &&
            fetchMoreResult.incidentFeed[0].id === cursor &&
            setAllLoaded(true);

          fetchMoreResult.incidentFeed.forEach((alert) => {
            !previousResult.incidentFeed
              .map(({ id }) => id)
              .includes(alert.id) && newAlerts.push(alert);
          });

          return {
            incidentFeed: [...previousResult.incidentFeed, ...newAlerts],
          };
        },
      })
        .then(() => {
          setFetching(false);
        })
        .catch((error) => {
          setFetching(false);
          if (error.networkError !== undefined) {
            setNetworkError(true);
          }
        });
    }
  };

  const retryLoad = () => {
    setNetworkError(false);
    loadMore();
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return error !== undefined && error.networkError !== undefined ? (
    <Offline type="incidents" />
  ) : (
    <AlertFeed
      // search and filter
      searchInput={searchInput}
      handleSearchChange={handleSearchChange}
      order={order}
      setOrder={setOrder}
      filter={filter}
      setFilter={setFilter}
      setQueryVariables={setQueryVariables}
      // crime types and groups
      crimeTypes={crimeTypes?.tags}
      groups={groups?.groups}
      //
      loading={loading}
      alerts={!!data ? data.incidentFeed : []}
      refetch={refetch}
      search={search}
      loadMore={loadMore}
      addIncidentToGroup={addIncidentToGroup}
      approveIncident={approveIncident}
      setStatusBar={setStatusBar}
      addOffenderToGroup={addOffenderToGroup}
      approveOffender={approveOffender}
      deleteIncident={deleteIncident}
      admin={admin}
      userId={userId}
      loadingMore={fetching}
      networkError={networkError}
      retryLoad={retryLoad}
      fetchIncidents={fetchIncidents}
      toggleFetchIncidents={toggleFetchIncidents}
    />
  );
};

export default AlertFeedQuery;
