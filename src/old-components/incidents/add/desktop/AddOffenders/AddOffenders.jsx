import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Add from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

import OffendersImage from "../../../../../images/Offenders";
import OffenderPreview from "../ExistingOffenders/OffenderPreview";
import ExistingOffenders from "../ExistingOffenders/ExistingOffenders";
import NewOffenderPopover from "../NewOffenderPopover/NewOffenderPopover";
import EditOffenderPopover from "../EditOffenderPopover/EditOffenderPopover";
import { Header, HeaderSubText } from "../../../../global/forms";
import { EmptyText } from "../../../../global/typography";
import ConfirmDialog from "../../../../global/ConfirmDialog/ConfirmDialog";

const PageContainer = styled.div`
  height: 100%;
  overflow: auto;
`;
const Offenders = styled.div`
  height: calc(100% - 67px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
`;
const MarginButton = styled(Button)`
  margin: 0 10px;
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
`;
const PageRow = styled.div`
  display: flex;
  height: 100%;
`;
const OffenderList = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eeeeee;
  height: 100%;
  min-width: 250px;
  max-width: 250px;
  overflow: auto;
  height: 100%;
`;
const OffenderItem = styled.div`
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  min-height: 60px;
  cursor: pointer;
  ${({ current }) => current && "background: rgba(0,0,0,0.04);"} &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`;
const ItemText = styled(Typography)`
  margin: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 85px);
  margin-left: 20px;
`;
const ItemImage = styled.div`
  height: 60px;
  width: 60px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ url }) => url});
`;
const ItemAvatar = styled.div`
  height: 60px;
  width: 60px;
  background: #f5f5f5;
`;
const UserIcon = styled.svg`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
`;
const Toolbar = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  padding-bottom: 5px;
`;
const Grow = styled.div`
  flex: 1;
`;
const AddIcon = styled(Add)`
  margin-right: 5px;
  font-size: 20px;
`;
const SearchIcon = styled(Search)`
  margin-right: 5px;
  font-size: 20px;
`;
const EditIcon = styled(Edit)`
  margin-right: 5px;
  font-size: 18px;
`;
const DeleteIcon = styled(Delete)`
  margin-right: 5px;
  font-size: 20px;
`;

const AddOffenders = ({
  offenders,
  addExistingOffenders,
  addNewOffender,
  editNewOffender,
  removeOffender,
  userId,
}) => {
  // state
  const [current, setCurrent] = useState("");
  const [existingOffender, setExistingOffender] = useState(false);
  const [newOffender, setNewOffender] = useState(false);
  const [editOffender, setEditOffender] = useState("");
  const [remove, setRemove] = useState("");

  // effects
  useEffect(() => {
    offenders.length > 0 && setCurrent(offenders[0].id);
  }, [offenders]);

  return (
    <PageContainer>
      <Header>
        <HeaderSubText>
          Assign any relevant offenders, you can either add a new offender or
          search for existing offenders.
        </HeaderSubText>
      </Header>
      {offenders.length > 0 ? (
        <Page>
          <Toolbar>
            <Button onClick={() => setNewOffender(true)}>
              <AddIcon /> New Offender
            </Button>
            <Button onClick={() => setExistingOffender(true)}>
              <SearchIcon /> Find Offender
            </Button>
            <Grow />
            {Number.isInteger(current) && (
              <Button onClick={() => setEditOffender(current)}>
                <EditIcon /> Edit
              </Button>
            )}
            <Button onClick={() => setRemove(true)} color="primary">
              <DeleteIcon /> Remove
            </Button>
          </Toolbar>
          <PageRow>
            <OffenderList>
              {offenders.map(({ id, name, images }) => (
                <OffenderItem
                  key={id}
                  current={current === id}
                  onClick={() => setCurrent(id)}
                >
                  {images?.length > 0 ? (
                    <ItemImage url={images[0].url} />
                  ) : (
                    <ItemAvatar>
                      <UserIcon viewBox="0 0 24 24">
                        <path
                          fill="#E0E0E0"
                          d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                        />
                      </UserIcon>
                    </ItemAvatar>
                  )}
                  <ItemText>{name}</ItemText>
                </OffenderItem>
              ))}
            </OffenderList>
            <Container>
              <OffenderPreview
                offender={
                  current !== ""
                    ? offenders?.find(({ id }) => id === current)
                    : {}
                }
                noPadding
                fullHeight
              />
            </Container>
          </PageRow>
        </Page>
      ) : (
        <Offenders>
          <OffendersImage width="100px" height="100px" />
          <EmptyText>You have not added any offenders yet</EmptyText>
          <EmptyActions>
            <MarginButton
              variant="contained"
              color="primary"
              onClick={() => setNewOffender(true)}
            >
              Add New Offender
            </MarginButton>
            <MarginButton
              variant="contained"
              color="primary"
              onClick={() => setExistingOffender(true)}
            >
              Find Existing Offenders
            </MarginButton>
          </EmptyActions>
        </Offenders>
      )}
      <ExistingOffenders
        open={existingOffender}
        close={() => setExistingOffender(false)}
        addExistingOffenders={addExistingOffenders}
        existingOffenders={offenders
          .filter(({ existing }) => existing)
          .map(({ id }) => id)}
        userId={userId}
        addNew={() => setNewOffender(true)}
      />
      <NewOffenderPopover
        open={newOffender}
        close={() => setNewOffender(false)}
        addNewOffender={addNewOffender}
      />
      <EditOffenderPopover
        open={editOffender !== ""}
        close={() => setEditOffender("")}
        editNewOffender={editNewOffender}
        offender={
          editOffender !== ""
            ? offenders.find(({ id }) => id === editOffender)
            : {}
        }
      />
      <ConfirmDialog
        open={remove}
        handleClose={() => setRemove(false)}
        title="Are you sure?"
        description="This will remove this offender from the incident."
        actions={[
          <Button key={Math.random()} onClick={() => setRemove(false)}>
            Cancel
          </Button>,
          <Button
            key={Math.random()}
            onClick={() => {
              setCurrent("");
              removeOffender(current);
              setRemove(false);
            }}
            color="primary"
          >
            Remove Offender
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default AddOffenders;
