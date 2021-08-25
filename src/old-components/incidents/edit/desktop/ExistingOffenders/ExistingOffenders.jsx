import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import OffendersImage from "../../../../../images/Offenders";
import OffenderPreview from "../../../global/OffenderPreview/OffenderPreview";
import SearchOffenders from "../../../global/SearchOffenders/SearchOffenders";
import { EmptyText } from "../../../../global/typography";
import OffenderItem from "./OffenderItem";
import { Offenders } from "../../../../../graphql-src/offenders/queries";
import OffendersList from "./OffenderList";
import { BackButton } from "../../../../global/actions";
import { PopOver } from "../../../../global/layout";
import { useStoreState } from "../../../../../state";

const Page = styled.div`
  display: flex;
  height: calc(100% - 130px);
  padding: 0 20px;
`;
const Container = styled.div`
  width: 100%;
`;
const EmptyList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ListContainer = styled.div`
  height: 100%;
`;

const ExistingOffender = ({
  userId,
  existingOffenders,
  open,
  close,
  addExistingOffenders,
  addNew,
}) => {
  const scheme = useStoreState((state) => state.scheme.id);

  // state
  const [current, setCurrent] = useState("");
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState("");
  const [fetching, setFetching] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [offenderListScrollPosition, setOffenderListScrollPosition] =
    useState(0);

  // queries
  const { data, loading, fetchMore } = useQuery(Offenders, {
    variables: {
      where: {
        scheme: { id: { equals: scheme } },
        name: { contains: search },
        id: { notIn: existingOffenders },
      },
      orderBy: { createdAt: "desc" },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      data.offenders.length > 0 && setCurrent(data.offenders[0].id);

      setCursor(data.offenders[data.offenders.length - 1].id);
    },
  });

  // functions
  const toggleOffenders = (id) =>
    selected.includes(id)
      ? setSelected(selected.filter((offender) => offender !== id))
      : setSelected([...selected, id]);

  const loadMore = async () => {
    !!cursor && setCursor(data.offenders[0].id);
    if (!allLoaded && !fetching) {
      setFetching(true);
      await fetchMore({
        query: Offenders,
        variables: {
          after: { id: cursor },
          orderBy: { createdAt: "desc" },
          where: {
            scheme: { id: { equals: scheme } },
            name: { contains: search },
            id: { notIn: existingOffenders },
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.offenders.length === 0) return setAllLoaded(true);
          setCursor(
            fetchMoreResult.offenders[fetchMoreResult.offenders.length - 1].id
          );
          return {
            offenders: [
              ...previousResult.offenders,
              ...fetchMoreResult.offenders,
            ],
          };
        },
      });
      setFetching(false);
    }
  };
  let actions = [];
  actions.push(
    <BackButton key={0} onClick={close}>
      Cancel
    </BackButton>
  );

  const addOne = (
    <BackButton
      key={1}
      variant="contained"
      color="primary"
      disabled={(!!data && data.offenders.length === 0) || loading}
      onClick={() => {
        const input = selected.map((offender) =>
          data.offenders.find(({ id }) => {
            return offender === id;
          })
        );

        input.forEach((el) => {
          if (el) addExistingOffenders(el, undefined);
        });

        close();
      }}
    >
      Add Offender
    </BackButton>
  );
  const addMany = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const input = selected.map((offender) =>
          data.offenders.find(({ id }) => {
            return offender === id;
          })
        );
        input.forEach((el) => {
          if (el) addExistingOffenders(el, undefined);
        });
        close();
      }}
    >
      Add Selected Offenders
    </Button>
  );

  actions.push(selected.length > 1 ? addMany : addOne);

  return (
    <PopOver
      noPadding
      open={open}
      width={1000}
      handleClose={close}
      title={"Add Existing Offender"}
      actions={actions}
    >
      <Page>
        <ListContainer>
          <SearchOffenders
            search={search}
            handleSearch={(value) => setSearch(value)}
          />
          <OffendersList
            loadMore={loadMore}
            scrollTop={offenderListScrollPosition}
            setScrollTop={setOffenderListScrollPosition}
            loading={fetching}
          >
            {loading ? (
              <CircularProgress />
            ) : data?.offenders?.length > 0 ? (
              data?.offenders?.map((offender) => {
                return (
                  <OffenderItem
                    key={offender.id}
                    name={offender.name}
                    images={offender.images}
                    setCurrent={() => setCurrent(offender.id)}
                    toggle={() => toggleOffenders(offender.id)}
                    current={!!current && current === offender.id}
                    selected={selected.includes(offender.id)}
                  />
                );
              })
            ) : (
              <EmptyList>
                <OffendersImage width="90px" height="90px" />
                <EmptyText>No offenders found</EmptyText>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    close();
                    addNew();
                  }}
                >
                  Add New Offender
                </Button>
              </EmptyList>
            )}
          </OffendersList>
        </ListContainer>
        <Container>
          <OffenderPreview
            offender={
              !!data && !!current
                ? data.offenders.find(({ id }) => current === id)
                : undefined
            }
          />
        </Container>
      </Page>
    </PopOver>
  );
};

export default ExistingOffender;
