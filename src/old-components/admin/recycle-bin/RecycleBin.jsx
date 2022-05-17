import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MediaQuery from "react-responsive";
import { useQuery, useMutation } from "@apollo/client";
// import { useQuery } from '@apollo/react-hooks';
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Button from "@material-ui/core/Button";

import { PopOver, PopOverContainer } from "../../global/layout";
import { BackButton } from "../../global/actions";

import { UserRowSkeleton } from "../../global/skeletons";
import { RecycledItems } from "graphql-src/recycled/queries";
import {
  RestoreIncident,
  RestoreOffender,
} from "graphql-src/recycled/mutations";
import { DeleteIncident } from "graphql-src/incidents/mutations";
import { DeleteOffender } from "graphql-src/offenders/mutations";
// import query from '../../../../graphql/users/queries/AllUsersQuery';
import { useStoreActions, useStoreState } from "../../../state";
import { Section } from "../../global/layout";
import { genderValues, raceValues } from "graphql-src/offenders/enums";

const Container = styled.div`
  background: #fff;
  flex: 1;
  margin-bottom: 60px;
`;
const Row = styled(TableRow)`
  cursor: pointer;
`;
const Title = styled(Typography)`
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
`;
const Description = styled(Typography)`
  margin: 0;
`;
const Grow = styled.div`
  flex: 1;
`;
const VertCenter = styled.div`
  display: flex;
  align-items: center;
`;
const Header = styled(Typography)`
  font-weight: 500;
  white-space: nowrap;
`;
const Text = styled(Typography)`
  margin: 0;
  max-height: 20px;
  overflow: hidden;
  margin-bottom: 18px;
`;

const RecycleBin = () => {
  const [popover, setPopover] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const schemeId = useStoreState((state) => state.scheme.id);
  const setSearch = useStoreActions((actions) => actions.theme.setSearch);
  const setSearchText = useStoreActions(
    (actions) => actions.theme.setSearchText
  );
  const setTitle = useStoreActions((actions) => actions.theme.setSearchText);

  // effects
  useEffect(() => {
    setSearch(true);
    setSearchText("Search for users...");
    setTitle("User Management");
    setBottomNav(true);
    setBackLinkTo("/admin");
    return () => {
      setSearch(false);
      setSearchText("");
      setTitle("");
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  const recycledItemsVariables = {
    schemeId,
    order: {
      deletedAt: "asc",
    },
  };
  // queries
  const { data, loading } = useQuery(RecycledItems, {
    fetchPolicy: "cache-and-network",
    variables: recycledItemsVariables,
  });

  // mutations
  // restore an item
  const [restoreIncidentMutation] = useMutation(RestoreIncident, {
    update: (cache, { data }) => {
      const prevData = cache.readQuery({
        query: RecycledItems,
        variables: recycledItemsVariables,
      });
      prevData &&
        cache.writeQuery({
          query: RecycledItems,
          data: {
            recycledItems: prevData.recycledItems?.filter(
              (el) => el.incident?.id !== data?.restoreIncident.id
            ),
          },
          variables: {
            schemeId,
          },
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const restoreIncident = (id, recycledId) => {
    restoreIncidentMutation({
      variables: { id, recycledId },
      optimisticResponse: {
        restoreIncident: {
          id,
          recycled: false,
        },
      },
    });
  };

  const [restoreOffenderMutation] = useMutation(RestoreOffender, {
    update: (cache, { data }) => {
      const prevData = cache.readQuery({
        query: RecycledItems,
        variables: recycledItemsVariables,
      });
      prevData &&
        cache.writeQuery({
          query: RecycledItems,
          data: {
            recycledItems: prevData.recycledItems?.filter(
              (el) => el.offender?.id !== data?.restoreOffender.id
            ),
          },
          variables: {
            schemeId,
          },
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const restoreOffender = (id, recycledId) => {
    restoreOffenderMutation({
      variables: { id, recycledId },
      optimisticResponse: {
        restoreOffender: {
          id,
          recycled: false,
        },
      },
    });
  };

  // permanently delete an item
  const [deleteIncidentMutation] = useMutation(DeleteIncident, {
    update: (cache, { data }) => {
      const prevData = cache.readQuery({
        query: RecycledItems,
        variables: recycledItemsVariables,
      });
      prevData &&
        cache.writeQuery({
          query: RecycledItems,
          data: {
            recycledItems: prevData.recycledItems?.filter(
              (el) => el.incident?.id !== data?.deleteIncident.id
            ),
          },
          variables: {
            schemeId,
          },
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deleteIncident = (id) => {
    deleteIncidentMutation({
      variables: { where: { id } },
      optimisticResponse: {
        deleteIncident: {
          id,
        },
      },
    });
  };

  const [deleteOffenderMutation] = useMutation(DeleteOffender, {
    update: (cache, { data }) => {
      const prevData = cache.readQuery({
        query: RecycledItems,
        variables: recycledItemsVariables,
      });
      prevData &&
        cache.writeQuery({
          query: RecycledItems,
          data: {
            recycledItems: prevData.recycledItems?.filter(
              (el) => el.offender?.id !== data?.deleteOffender.id
            ),
          },
          variables: {
            schemeId,
          },
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deleteOffender = (id) => {
    deleteOffenderMutation({
      variables: { where: { id } },
      optimisticResponse: {
        deleteOffender: {
          id,
        },
      },
    });
  };

  // functions
  const handleSelectedItem = (item = undefined) => {
    if (item) {
      setSelectedItem({
        ...item,
      });
    }
    setPopover(true);
  };

  const handlePopOverClose = () => {
    setSelectedItem({});
    setPopover(false);
  };

  const handleRestore = () => {
    if (selectedItem.__typename === "Incident") {
      restoreIncident(selectedItem.id, selectedItem.recycledId);
    }
    if (selectedItem.__typename === "Offender") {
      restoreOffender(selectedItem.id, selectedItem.recycledId);
    }

    setSelectedItem({});
    setPopover(false);
  };

  const handleDelete = () => {
    if (selectedItem.__typename === "Incident") {
      deleteIncident(selectedItem.id);
    }
    if (selectedItem.__typename === "Offender") {
      deleteOffender(selectedItem.id);
    }

    setSelectedItem({});
    setPopover(false);
  };

  const binTypes = ["Incident", "Offender"];

  const IncidentPopOverContent = () => {
    return (
      <>
        <Header>Subject</Header>
        <Text>{selectedItem?.subject}</Text>
        <Header>Location</Header>
        <Text>{selectedItem?.location?.full}</Text>
        <Header>Date</Header>
        <Text>
          {moment(selectedItem?.date || moment()).format(
            `ddd MMM DD YYYY - HH:mm`
          )}
        </Text>
        <Header>Author</Header>
        <Text>{selectedItem?.createdBy?.fullName}</Text>
      </>
    );
  };

  const OffenderPopOverContent = () => {
    const raceValue = raceValues.find(
      (obj) => obj.value === selectedItem?.race
    );
    const genderValue = genderValues.find(
      (obj) => obj.value === selectedItem?.gender
    );
    return (
      <>
        <Header>Name</Header>
        <Text>{selectedItem?.name}</Text>
        <Header>Sex</Header>
        <Text>{genderValue.label}</Text>
        <Header>Ethnicity</Header>
        <Text>{raceValue.label}</Text>
      </>
    );
  };

  return (
    <MediaQuery minDeviceWidth={600}>
      {(matches) => (
        <>
          <Container>
            <Section width="100%" elevation={0}>
              <Row>
                <div>
                  <Title variant="h5">Recycle Bin</Title>
                  <Description variant="subtitle1">
                    Deleted items will be stored here for 30 days, then
                    permanently deleted. Items can be restored at any point
                    before that.
                  </Description>
                </div>

                <Grow />
                <VertCenter></VertCenter>
              </Row>
            </Section>
            <Table id="recycle-table">
              <TableHead>
                <TableRow>
                  <TableCell grow={!matches}>Type</TableCell>
                  <MediaQuery minDeviceWidth={492}>
                    <TableCell>Title</TableCell>
                  </MediaQuery>
                  <MediaQuery minDeviceWidth={642}>
                    <TableCell>Deleted By</TableCell>
                  </MediaQuery>
                  <MediaQuery minDeviceWidth={820}>
                    <TableCell>Deleted At</TableCell>
                  </MediaQuery>
                  <MediaQuery minDeviceWidth={1225}>
                    <TableCell>Scheduled Deletion</TableCell>
                  </MediaQuery>
                </TableRow>
              </TableHead>
              {!!loading && loading && !data ? (
                <TableBody>
                  <UserRowSkeleton />
                  <UserRowSkeleton />
                  <UserRowSkeleton />
                  <UserRowSkeleton />
                  <UserRowSkeleton />
                  <UserRowSkeleton />
                </TableBody>
              ) : (
                <TableBody>
                  {data?.recycledItems?.map((el) => {
                    const type = binTypes.find(
                      (e) => e === el[e.toLowerCase()]?.__typename
                    );
                    const key = type.toLowerCase();
                    return (
                      <Row
                        key={el.id}
                        onClick={() =>
                          handleSelectedItem({ ...el[key], recycledId: el.id })
                        }
                      >
                        <TableCell>{type}</TableCell>
                        <MediaQuery minDeviceWidth={492}>
                          <TableCell>
                            {el[key].subject || el[key].name}
                          </TableCell>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={642}>
                          <TableCell>{`${el.deletedBy.fullName}, ${el.deletedBy.organisation}`}</TableCell>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={820}>
                          <TableCell>
                            {moment(el.deletedAt).format(
                              `ddd MMM DD YYYY - HH:mm`
                            )}
                          </TableCell>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={1225}>
                          <TableCell>
                            {moment(el.expiresAt).format(`ddd MMM DD YYYY`)}
                          </TableCell>
                        </MediaQuery>
                      </Row>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </Container>
          <PopOver
            noPadding
            open={popover}
            width={matches ? 500 : window.innerWidth - 15}
            handleClose={handlePopOverClose}
            title={`Recycled ${selectedItem?.__typename}`}
            actions={[
              <BackButton
                key={Math.random()}
                disabled={false}
                onClick={handleDelete}
              >
                Delete Now
              </BackButton>,
              <Button
                key={Math.random()}
                disabled={false}
                color="primary"
                variant="contained"
                onClick={handleRestore}
              >
                Restore Item
              </Button>,
            ]}
          >
            <PopOverContainer>
              {selectedItem?.__typename === "Incident" && (
                <IncidentPopOverContent />
              )}
              {selectedItem?.__typename === "Offender" && (
                <OffenderPopOverContent />
              )}
            </PopOverContainer>
          </PopOver>
        </>
      )}
    </MediaQuery>
  );
};

export default RecycleBin;
