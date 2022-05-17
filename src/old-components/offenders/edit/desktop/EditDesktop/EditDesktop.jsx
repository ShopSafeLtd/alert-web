import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { useQuery, useMutation } from "@apollo/client";

import { Row, Section } from "../../../../global/layout";
import { PageHeader } from "../../../../global/typography";
import EditImages from "../../../../global/edit/EditImages/EditImages";
import { BackButton } from "../../../../global/actions";
import EditDescription from "../EditDescription/EditDescription";
import EditExclusions from "../EditExclusions/EditExclusion";
import AddExclusionPopOver from "../../../global/AddExclusionPopOver/AddExclusionPopOver";
import EditExclusionPopOver from "../../../global/EditExclusionPopOver/EditExclusionPopOver";
import AddLabelPopOver from "../../../global/AddLabelPopOver/AddLablPopOver";
import AddGroups from "../../../../global/edit/AddGroups/AddGroups";
import EditGroups from "../../../../global/edit/EditGroups/EditGroups";
import { Offender } from "../../../../../graphql-src/offenders/queries";
import { UpdateOffender } from "../../../../../graphql-src/offenders/mutations";
import { useStoreState } from "../../../../../state";
import { UploadImage } from "graphql-src/images/mutations";
import LightBox from "old-components/global/LightBox/LightBox";
// import { OffenderQuery } from "../../../../../graphql/offenders/queries";
// import CreateImage from '../../../../../graphql/images/mutations/uploadImages';
// import EditOffenderMutation from "../../../../../graphql/offenders/mutations/EditOffenderMutation";

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 0 80px;
  background-color: #fff;
  @media (min-width: 1024px) {
    background-color: none;
    padding: 0px 10px 20px;
  }
`;

const EditDesktop = ({ id }) => {
  const navigate = useNavigate()
  // state
  const [details, setDetails] = useState({
    name: "",
    age: "",
    gender: "",
    race: "",
    dateOfBirth: new Date(),
    dateSource: "",
    build: "",
    hair: "",
    peculiarities: "",
    ageSection: 0,
  });
  const [tags, setTags] = useState([]);
  const [editTags, setEditTags] = useState(false);
  const [images, setImages] = useState([]);
  const [bans, setBans] = useState([]);
  const [addBan, setAddBan] = useState(false);
  const [editBan, setEditBan] = useState("");
  const [groups, setGroups] = useState([]);
  const [addGroups, setAddGroups] = useState(false);

  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  // queries
  const { data: offenderData, loading: offenderLoading } = useQuery(Offender, {
    variables: {
      where: {
        id,
      },
    },
    fetchPolicy: "cache-and-network",
    onError: (err) => console.log(err),
    onCompleted: ({ offender }) => {
      setDetails({
        ...details,
        name: offender.name || "",
        age: offender.age || "",
        gender: offender.gender || "",
        race: offender.race || "",
        dateOfBirth: offender.dateOfBirth || "",
        dateSource: offender.dateSource || "",
        build: offender.build || "",
        hair: offender.hair || "",
        peculiarities: offender.peculiarities || "",
        ageSection: !!offender.dateOfBirth ? 1 : !!offender.age ? 2 : 0,
      });
      setTags(offender.tags);
      setImages(offender.images);
      setBans(offender.bans);
      setGroups(offender.groups);
    },
  });

  //mutations
  const [createImage, { loading: uploading }] = useMutation(UploadImage);
  const [updateOffender, { loading: saving }] = useMutation(UpdateOffender, {
    onCompleted: (res) => console.log(res),
  });

  // functions
  const detailsChange = (value, field) => {
    if (field === "age") {
      setDetails({
        ...details,
        [field]: value,
        dateOfBirth: null,
        dateSource: "",
      });
    } else if (field === "dateOfBirth") {
      setDetails({
        ...details,
        [field]: value,
        age: "UNKNOWN",
      });
    } else {
      setDetails({
        ...details,
        [field]: value,
      });
    }
  };
  const addBanToOffender = (ban) =>
    setBans([
      ...bans,
      {
        ...ban,
        newBan: true,
        id: bans.length,
      },
    ]);
  const updateBan = (ban) =>
    setBans(
      update(bans, {
        [bans.map(({ id }) => id).indexOf(ban.id)]: {
          $set: {
            ...ban,
            updated: true,
          },
        },
      })
    );
  const removeBan = (ban) => setBans(bans.filter(({ id }) => ban !== id));
  const removeTag = (tag) => setTags(tags.filter(({ id }) => tag !== id));
  const uploadImage = async ({ target: { files } }) => {
    [...files].forEach(async (file) => {
      setImages([
        ...images,
        {
          id: "UPLOADING",
        },
      ]);
      const {
        data: { uploadImage },
      } = await createImage({
        variables: {
          file,
          scheme: schemeId,
          incident: { id: undefined },
        },
      });
      setImages([...images, uploadImage]);
    });
  };
  const removeImage = (image) =>
    setImages(images.filter(({ id }) => id !== image));
  const addGroupsToOffender = (newGroups) =>
    setGroups([...groups, ...newGroups]);
  const removeGroup = (group) =>
    setGroups(groups.filter(({ id }) => id !== group));
  const handleSave = async () => {
    const flatOffender = {
      tags: offenderData.offender.tags.map(({ id }) => id),
      images: offenderData.offender.images.map(({ id }) => id),
      bans: offenderData.offender.bans.map(({ id }) => id),
      groups: offenderData.offender.groups.map(({ id }) => id),
    };
    const flatState = {
      tags: tags.map(({ id }) => id),
      images: images.map(({ id }) => id),
      bans: bans.map(({ id }) => id),
      groups: groups.map(({ id }) => id),
    };

    console.log("flatstate:", flatState);
    console.log("flatOffender:", flatOffender);

    const newTags = tags.filter(({ id }) => !flatOffender.tags.includes(id));
    const connectTags = newTags
      .filter(({ newTag }) => !newTag)
      .map(({ id }) => ({ id }));
    const createTags = newTags
      .filter(({ newTag }) => newTag)
      .map(({ name, description }) => ({
        description,
        name,
        dataType: "OFFENDER",
        createdBy: {
          connect: {
            id: userId,
          },
        },
        scheme: {
          connect: {
            id: schemeId,
          },
        },
      }));
    const disconnectTags = flatOffender.tags
      .filter((id) => !flatState.tags.includes(id))
      .map((id) => ({ id }));
    const connectImages = flatState.images
      .filter((id) => !flatOffender.images.includes(id))
      .map((id) => ({ id }));
    const disconnectImages = flatOffender.images
      .filter((id) => !flatState.images.includes(id))
      .map((id) => ({ id }));
    const createBans = bans
      .filter(({ newBan }) => newBan)
      .map(({ description, startDate, endDate, location }) => ({
        description,
        startDate,
        endDate,
        location,
        scheme: {
          connect: {
            id: schemeId,
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
      }));
    const updateBans = bans
      .filter(({ updated }) => updated)
      .map(({ id, description, startDate, endDate, location }) => ({
        where: { id },
        data: {
          description: { set: description },
          startDate: { set: startDate },
          endDate: { set: endDate },
          location: { set: location },
        },
      }));
    const deleteBans = flatOffender.bans
      .filter((id) => !flatState.bans.includes(id))
      .map((id) => ({ id }));
    const connectGroups = flatState.groups
      .filter((id) => !flatOffender.groups.includes(id))
      .map((id) => ({ id }));
    const disconnectGroups = flatOffender.groups
      .filter((id) => !flatState.groups.includes(id))
      .map((id) => ({ id }));

    console.log(connectImages, disconnectImages);

    await updateOffender({
      variables: {
        where: {
          id,
        },
        data: {
          age: details.age ? { set: details.age } : undefined,
          build: details.build ? { set: details.build } : undefined,
          dateOfBirth: details.dateOfBirth
            ? { set: details.dateOfBirth }
            : undefined,
          dateSource: details.dateSource
            ? { set: details.dateSource }
            : undefined,
          gender: details.gender ? { set: details.gender } : undefined,
          hair: details.hair ? { set: details.hair } : undefined,
          name: details.name ? { set: details.name } : undefined,
          peculiarities: details.peculiarities
            ? { set: details.peculiarities }
            : undefined,
          race: details.race ? { set: details.race } : undefined,
          bans: {
            create: createBans,
            update: updateBans,
            delete: deleteBans,
          },
          tags: {
            connect: connectTags,
            disconnect: disconnectTags,
            create: createTags,
          },
          groups: {
            connect: connectGroups,
            disconnect: disconnectGroups,
          },
          images: {
            connect: connectImages,
            disconnect: disconnectImages,
          },
        },
      },
    });
    navigate("/app/offenders");
  };

  return (
    <>
      <Page>
        <Section width="100%" elevation={1}>
          <PageHeader>Edit Offender</PageHeader>
        </Section>
        <Row>
          <EditDescription
            data={{
              name: details.name,
              age: details.age,
              gender: details.gender,
              race: details.race,
              dateOfBirth: details.dateOfBirth,
              dateSource: details.dateSource,
              build: details.build,
              hair: details.hair,
              peculiarities: details.peculiarities,
              labels: tags,
            }}
            ageSection={details.ageSection}
            loading={offenderLoading}
            handleChange={detailsChange}
            openAddLabel={() => setEditTags(true)}
            removeLabel={removeTag}
          />
        </Row>
        <Row>
          <EditImages
            images={images}
            removeImage={removeImage}
            addImage={uploadImage}
            uploading={uploading}
            loading={offenderLoading}
          />
          <EditExclusions
            exclusions={bans}
            openAddExclusion={() => setAddBan(true)}
            openEditExclusion={setEditBan}
            removeExclusion={removeBan}
            loading={offenderLoading}
          />
        </Row>
        <Row>
          <EditGroups
            loading={offenderLoading}
            groups={groups}
            addGroups={() => setAddGroups(true)}
            setGroups={setGroups}
            removeGroup={removeGroup}
          />
        </Row>
        <Section width="100%" elevation={1}>
          <Row row right>
            <BackButton
              component={Link}
              to="/app/offenders"
              disabled={saving || uploading}
            >
              Cancel
            </BackButton>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving || uploading}
            >
              Save Offender
            </Button>
          </Row>
        </Section>
        <AddExclusionPopOver
          visible={addBan}
          close={() => setAddBan(false)}
          onSubmit={addBanToOffender}
        />
        <EditExclusionPopOver
          visible={!!editBan}
          close={() => setEditBan("")}
          exclusion={!!editBan ? bans.find(({ id }) => id === editBan.id) : {}}
          onSubmit={updateBan}
        />
        <AddLabelPopOver
          visible={editTags}
          close={() => setEditTags(false)}
          submitLabels={setTags}
          tags={tags}
        />
        <AddGroups
          open={addGroups}
          close={() => setAddGroups(false)}
          groups={groups}
          addGroups={addGroupsToOffender}
        />
      </Page>
      <LightBox />
    </>
  );
};

export default EditDesktop;
