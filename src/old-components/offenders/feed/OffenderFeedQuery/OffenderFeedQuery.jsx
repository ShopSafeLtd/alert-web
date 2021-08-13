import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import OffenderFeed from "../OffenderFeed/OffenderFeed";
import { RecycleOffender } from "graphql-src/offenders/mutations";
import { ApproveOffender } from "graphql-src/offenders/mutations";
import { MarkOffenderActive } from "graphql-src/offenders/mutations";
import Offline from "../../../global/Offline/Offline";
import { OffenderFeed as query } from "graphql-src/offenders/queries";
import { useStoreActions, useStoreState } from "../../../../state";

const ALL = "ALL";
const BANNED = "BANNED";
const UNIDENTIFIED = "UNIDENTIFIED";
const ACTIVE = "ACTIVE";

let querySize = 10;
if (window.innerWidth > 1239 && window.innerWidth < 1800) {
  querySize = 12;
} else if (window.innerWidth > 1799) {
  querySize = 16;
}

const OffenderFeedQuery = ({ retryLoad, setActions }) => {
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
  const fetchOffenders = useStoreState((state) => state.theme.fetchOffenders);
  const role = useStoreState((state) => state.user.role);
  const admin = role !== "USER" ? true : false;

  // state
  const [fetching, setFetching] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filter, setFilter] = useState(ALL);
  const [networkError, setNetworkError] = useState(false);
  const [order, setOrder] = useState("desc");
  const [filterPristine, setFilterPristine] = useState(true);

  const variables = {
    schemeId: schemeId || window.localStorage.getItem("currentScheme"),
    userId,
    search: filter === UNIDENTIFIED ? "Unidentified Offender" : "",
    order: { createdAt: order },
    first: querySize,
    active: filter === ACTIVE ? true : undefined,
    role,
    banned: filter === BANNED ? true : undefined,
  };

  // effects
  useEffect(() => {
    setBottomNav(true);
    setTitle("Offenders");
    setAppBar(true);
    setSearch(true);
    setSearchText("Search for offenders...");
    return () => {
      setSearch(false);
      setSearchText("");
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
    fetchPolicy: "cache-and-network",
    onError: (err) => console.log(err),
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

  // functions
  const changeFilter = (filter) => {
    setFilter(filter);
    setFilterPristine(false);
  };
  const changeOrder = (order) => {
    setOrder(order);
    setFilterPristine(false);
  };
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
          __typename: "Offender",
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
      setFilter={changeFilter}
      filter={filter}
      search={search}
      markOffenderActive={markOffenderAsActive}
      admin={admin}
      refetch={refetch}
      loadingMore={fetching}
      networkError={networkError}
      retryLoad={retryLoad}
      setActions={setActions}
      order={order}
      setOrder={changeOrder}
      filterPristine={filterPristine}
      toggleFetchOffenders={toggleFetchOffenders}
      role={role}
    />
  );
};

export default OffenderFeedQuery;
