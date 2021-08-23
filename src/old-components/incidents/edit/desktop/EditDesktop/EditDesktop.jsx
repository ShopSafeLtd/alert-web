import React, { useState } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Row, Section } from "../../../../global/layout";
import CrimeTypePopOver from "../../../global/CrimeTypePopOver/CrimeTypePopOver";
import NewOffenderPopOver from "../NewOffenderPopOver/NewOffenderPopOver";
import ExistingOffenderPopOver from "../ExistingOffenderPopOver/ExistingOffenderPopOver";
import EditDescription from "../EditDescription/EditDescription";
import EditLocation from "../EditLocation/EditLocation";
import EditOffenders from "../EditOffenders/EditOffenders";
import EditImages from "../../../../global/edit/EditImages/EditImages";
import AssignOffenderPopOver from "../AssignOffendersPopOver/AssignOffendersPopOver";
import { BackButton } from "../../../../global/actions";
import { PageHeader } from "../../../../global/typography";
import EditOffenderPopOver from "../EditOffenderPopOver/EditOffenderPopOver";
import EditGroups from "../../../../global/edit/EditGroups/EditGroups";
import AddGroups from "../../../../global/edit/AddGroups/AddGroups";
import ConfirmDialog from "../../../../global/ConfirmDialog/ConfirmDialog";
import { useStoreState } from "../../../../../state";
import { Tags } from "../../../../../graphql-src/tags/queries";
import LightBox from "old-components/global/LightBox/LightBox";

const Page = styled.div`
  width: 100%;
  padding: 0px 10px 70px;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    padding-bottom: 20px;
  }
`;
const Actions = styled(Row)`
  padding: 5px 0px;
`;

const EditDesktop = ({
  loading,
  description,
  crimeTypes,
  location,
  offenders,
  images,
  groups,
  uploadingImage,
  groupsError,
  crimeTypeError,
  handleDesChange,
  handleLocChange,
  setCrimeTypes,
  removeCrimeType,
  removeOffender,
  addOffender,
  removeImage,
  uploadImage,
  assignOffendersToImage,
  addGroups,
  removeGroup,
  validateDescription,
  validateCrimeTypes,
  validateLocation,
  validateGroups,
  handleSave,
}) => {
  // state
  const [crimeTypesOpen, setCrimeTypesOpen] = useState(false);
  const [newOffendersOpen, setNewOffendersOpen] = useState(false);
  const [existingOffendersOpen, setExistingOffendersOpen] = useState(false);
  const [editOffenderOpen, setEditOffender] = useState("");
  const [assignOffenders, setAssignOffenders] = useState("");
  const [addGroupsOpen, setAddGroupsOpen] = useState(false);
  const [error, setError] = useState("");

  const schemeId = useStoreState((state) => state.scheme.id);

  const { data: crimeTypesList, loading: crimeTypesLoading } = useQuery(Tags, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        dataType: { equals: "INCIDENT" },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // functions
  const save = async () => {
    try {
      if (!(await validateDescription())) {
        return setError("There are some missing fields in the description");
      }
      if (!(await validateCrimeTypes())) {
        return setError("Please select at least one crime type.");
      }
      if (!(await validateLocation())) {
        return setError("There are some missing fields in the location.");
      }
      if (!(await validateGroups())) {
        return setError("Please select at least one group for the incident.");
      }
      handleSave();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <>
          <Page>
            {matches && (
              <Section width="100%" elevation={1}>
                <PageHeader>Edit Incident</PageHeader>
              </Section>
            )}
            <Row>
              <EditDescription
                description={description}
                crimeTypes={
                  crimeTypesList &&
                  crimeTypes.map((el) => {
                    return crimeTypesList.tags.find(
                      (e) => el.id === e.id || el === el.id
                    );
                  })
                }
                handleChange={handleDesChange}
                removeCrimeType={removeCrimeType}
                openCrimeTypes={() => setCrimeTypesOpen(true)}
                loading={loading}
              />
              <EditLocation
                location={location}
                handleChange={handleLocChange}
                loading={loading}
              />
            </Row>
            <Row>
              <EditOffenders
                openNewOffenders={() => setNewOffendersOpen(true)}
                openExistingOffenders={() => setExistingOffendersOpen(true)}
                offenders={offenders}
                loading={loading}
                openEditOffender={setEditOffender}
              />
              <EditImages
                images={images}
                removeImage={removeImage}
                addImage={uploadImage}
                uploading={uploadingImage}
                openAssignOffenders={setAssignOffenders}
                offenders={offenders}
                loading={loading}
              />
            </Row>
            <Row>
              <EditGroups
                groups={groups}
                addGroups={() => setAddGroupsOpen(true)}
                removeGroup={removeGroup}
                loading={loading}
              />
            </Row>
            <Section>
              <Actions right row>
                <div>
                  <BackButton component={Link} to="/incidents">
                    Cancel
                  </BackButton>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={save}
                    disabled={uploadingImage}
                  >
                    Save Incident
                  </Button>
                </div>
              </Actions>
            </Section>
            <CrimeTypePopOver
              crimeTypes={crimeTypes.map(({ id }) => id)}
              open={crimeTypesOpen}
              close={() => setCrimeTypesOpen(false)}
              setCrimeTypes={setCrimeTypes}
              crimeTypesList={crimeTypesList ? crimeTypesList.tags : []}
            />
            <NewOffenderPopOver
              open={newOffendersOpen}
              close={() => setNewOffendersOpen(false)}
              addOffender={addOffender}
            />
            <ExistingOffenderPopOver
              open={existingOffendersOpen}
              close={() => setExistingOffendersOpen(false)}
              addExistingOffenders={addOffender}
              existingsOffenders={offenders
                .filter((el) => el.type !== "NEW")
                .map(({ id }) => id)}
            />
            <AssignOffenderPopOver
              open={assignOffenders !== ""}
              close={() => setAssignOffenders("")}
              offenders={offenders}
              image={images.find(({ id }) => id === assignOffenders)}
              assign={assignOffendersToImage}
            />
            <EditOffenderPopOver
              removeOffender={removeOffender}
              open={editOffenderOpen !== ""}
              close={() => setEditOffender("")}
              offender={offenders.find(({ id }) => id === editOffenderOpen)}
            />
            <AddGroups
              open={addGroupsOpen}
              close={() => setAddGroupsOpen(false)}
              groups={groups}
              addGroups={addGroups}
            />
            <ConfirmDialog
              open={error !== ""}
              handleClose={() => setError("")}
              title="Something is missing!"
              description={error}
              actions={[
                <Button
                  key={Math.random()}
                  onClick={() => setError("")}
                  color="primary"
                >
                  Close
                </Button>,
              ]}
            />
          </Page>
          <LightBox />
        </>
      )}
    </MediaQuery>
  );
};

export default EditDesktop;
