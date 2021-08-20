import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import OffenderWizard from "../desktop/OffenderWizard/OffenderWizard";
import { Tags } from "../../../../graphql-src/tags/queries";
import { Groups } from "../../../../graphql-src/groups/queries";
import { useStoreActions, useStoreState } from "../../../../state";
import { CreateOffender } from "../../../../graphql-src/offenders/mutations/create-offender";
import { OffenderFeed } from "../../../../graphql-src/offenders/queries/offender-feed";
import { UploadImage } from "graphql-src/images/mutations";

const AddOffender = ({ history }) => {
  const [pristine, setPristine] = useState(true);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [build, setBuild] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateSource, setDateSource] = useState("");
  const [hair, setHair] = useState("");
  const [peculiarities, setPeculiarities] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [editingExclusion, setEditingExclusion] = useState({});
  const [selectedGroups, setSelectedGroups] = useState([]);

  // user id and role from state
  const schemeId = useStoreState((state) => state.scheme.id);
  const currentUser = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);
  const schemeAdmin = role === "SCHEME_ADMIN";
  const admin = role === "USER" ? false : true;

  // queries
  const { data: labelsList, loading: labelsLoading } = useQuery(Tags, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        dataType: { equals: "OFFENDER" },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: groups, loading: groupsLoading } = useQuery(Groups, {
    variables: {
      where: {
        schemeId: { equals: schemeId },
        users: schemeAdmin
          ? undefined
          : { some: { id: { equals: currentUser } } },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // mutations
  const [createImage, { loading: uploading }] = useMutation(UploadImage);

  const [createOffender] = useMutation(CreateOffender, {
    onError: (err) => {
      console.log(err);
    },

    update: (store, { data: { createOffender } }) => {
      let data = store.readQuery({
        query: OffenderFeed,
        variables: {
          schemeId: schemeId || window.localStorage.getItem("currentScheme"),
          userId: currentUser,
          search: "",
          order: { createdAt: "desc" },
          first: 16,
          active: undefined,
          role,
          banned: undefined,
        },
      });
      store.writeQuery({
        query: OffenderFeed,
        data: {
          OffenderFeed: [createOffender, ...data?.offenderFeed],
        },
        variables: {
          schemeId: schemeId || window.localStorage.getItem("currentScheme"),
          userId: currentUser,
          search: "",
          order: { createdAt: "desc" },
          first: 16,
          active: undefined,
          role,
          banned: undefined,
        },
      });
    },
  });

  const handleChange = (value, field) => {
    if (field === "age") {
      setAge(value);
      setDateOfBirth("");
      setDateSource("");
      setPristine(false);
    } else if (field === "dateOfBirth") {
      setAge("");
      setDateOfBirth(value);
      setPristine(false);
    } else if (field === "dateSource") {
      setDateSource(value);
      setPristine(false);
    } else if (field === "name") {
      setName(value);
      setPristine(false);
    } else if (field === "gender") {
      setGender(value);
      setPristine(false);
    } else if (field === "race") {
      setRace(value);
      setPristine(false);
    } else if (field === "build") {
      setBuild(value);
      setPristine(false);
    } else if (field === "hair") {
      setHair(value);
      setPristine(false);
    } else if (field === "peculiarities") {
      setPeculiarities(value);
      setPristine(false);
    }
  };

  // const addImage = ({ target: { files } }) => {
  //   const filesArray = [...files];
  //   setImages((prev) => {
  //     if (!Array.isArray(prev))
  //       return [
  //         ...filesArray.map((file) => ({
  //           id: this.state.images.length,
  //           url: URL.createObjectURL(file),
  //           file: file,
  //         })),
  //       ];
  //     return [
  //       ...prev,
  //       ...filesArray.map((file) => ({
  //         id: this.state.images.length,
  //         url: URL.createObjectURL(file),
  //         file: file,
  //       })),
  //     ];
  //   });
  // };

  const addImage = async ({ target: { files } }) => {
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

  const removeImage = (image) => {
    setImages((prev) => {
      return prev.filter(({ id }) => image !== id);
    });
    setPristine(false);
  };

  const toggleSelectedLabels = (label) => {
    const flatLabels = selectedLabels.map(({ id }) => id);
    if (flatLabels.indexOf(label.id) === -1) {
      setSelectedLabels((prev) => {
        if (!Array.isArray(prev)) return [label];
        return [...prev, label];
      });
    } else {
      setSelectedLabels((prev) => {
        if (!Array.isArray(prev)) return [];
        return prev.filter((el) => el.id !== label.id);
      });
    }
  };

  const addLabel = (label) => {
    setSelectedLabels((prev) => {
      if (!Array.isArray(prev)) return [label];
      return [
        ...prev,
        {
          ...label,
          id: prev.length,
          new: true,
          __typename: "OffenderLabel",
        },
      ];
    });
  };

  const addExclusion = (exclusion) =>
    setExclusions((prev) => {
      if (!Array.isArray(prev)) return [exclusion];
      return [
        ...prev,
        {
          ...exclusion,
          id: prev.length,
        },
      ];
    });

  const removeExclusion = (exclusion) =>
    setExclusions((prev) => {
      if (!Array.isArray(prev)) return [];
      return prev.filter(({ id }) => id !== exclusion);
    });

  const setEditingExclusionFunction = (exclusion) =>
    setEditingExclusion(exclusion);

  const editExclusion = (exclusion) => {
    setExclusions((prev) => {
      const index = prev.findIndex((el) => el.id === exclusion.id);
      const output = prev;
      output[index] = exclusion;
      return output;
    });
  };

  const toggleSelectedGroups = (group) => {
    setSelectedGroups((prev) => {
      const indexResult = prev.indexOf(group);
      if (indexResult === -1) return [...prev, group];
      return prev.filter((el) => el !== group);
    });
  };

  const handlePost = async () => {
    setDisabled(true);

    await createOffender({
      variables: {
        data: {
          age: age ? age : undefined,
          bans:
            exclusions.length > 0
              ? exclusions.map(
                  ({ startDate, endDate, location, description }) => ({
                    startDate,
                    endDate,
                    location,
                    description,
                    scheme: { connect: { id: schemeId } },
                    createdBy: { connect: { id: currentUser } },
                  })
                )
              : undefined,
          build: build ? build : undefined,
          dateOfBirth: dateOfBirth ? dateOfBirth : undefined,
          dateSource: dateSource ? dateSource : undefined,
          gender: gender ? gender : undefined,
          groups:
            selectedGroups.length > 0
              ? {
                  connect: selectedGroups.map((id) => ({ id })),
                }
              : undefined,
          hair: hair ? hair : undefined,
          image: {
            connect: images?.map((el) => {
              return {
                id: el.id,
              };
            }),
          },

          name: name ? name : undefined,
          tags:
            selectedLabels.length > 0
              ? {
                  connect: selectedLabels.map(({ id }) => ({ id })),
                }
              : undefined,
          peculiarities: peculiarities ? peculiarities : undefined,
          race: race ? race : undefined,
          scheme: schemeId,
        },
      },
      optimisticResponse: {
        createOffender: {
          id: `${Math.random()}`,
          age: !!age ? age : null,
          approved: true,
          build: build,
          gender: gender,
          hair: hair,
          name: name,
          peculiarities: peculiarities,
          race: race,
          dateOfBirth: !!dateOfBirth ? dateOfBirth : null,
          dateSource: !!dateSource ? dateSource : null,
          active: true,
          updatedAt: new Date(),
          uploaded: false,
          bans: exclusions.map(
            ({ startDate, endDate, location, description }) => ({
              id: `${Math.random()}`,
              startDate,
              endDate,
              location,
              description,
              active: true,
              current: true,
              expired: false,
              _typename: "Ban",
            })
          ),
          groups: selectedGroups.map((id) => ({
            id,
            __typename: "Group",
          })),
          images: images.map((image) => ({
            optimised: image.uri,
            url: image.uri,
            id: `${Math.random()}`,
          })),
          tags: selectedLabels.map((el) => ({
            id: `${Math.random()}`,
            name: el.name,
            description: el.description,
            __typename: "Tag",
          })),
          __typename: "Offender",
        },
      },
    });
  };

  // const handlePost = async () => {
  //   console.log("fired post function");
  //   return null;
  // this.props.setStatus({
  //   status: "info",
  //   text: "Uploading your new offender...",
  // });
  // this.setState({ disabled: true });
  // const {
  //   name,
  //   gender,
  //   race,
  //   build,
  //   age,
  //   dateOfBirth,
  //   dateSource,
  //   hair,
  //   peculiarities,
  //   images,
  //   selectedLabels,
  //   exclusions,
  //   selectedGroups,
  // } = this.state;
  // const { createdById, role } = this.props;

  // let newExclusions = [];
  // exclusions.forEach(({ description, endDate, location, startDate }) => {
  //   newExclusions = [
  //     ...newExclusions,
  //     {
  //       description,
  //       endDate,
  //       location,
  //       startDate,
  //       schemeId: window.localStorage.getItem("currentScheme"),
  //       createdById,
  //     },
  //   ];
  // });

  // let linkOffenderLabels = selectedLabels
  //   .filter(({ new: newLabel }) => !newLabel)
  //   .map(({ id }) => id);

  // await this.props.createOffender({
  //   variables: {
  //     role,
  //     age: age !== "" ? age : "UNKNOWN",
  //     bans:
  //       newExclusions.length > 0
  //         ? newExclusions.map(
  //             ({
  //               description,
  //               endDate,
  //               location,
  //               startDate,
  //               schemeId,
  //               createdById,
  //             }) => ({
  //               description,
  //               endDate,
  //               location,
  //               startDate,
  //               scheme: {
  //                 connect: { id: schemeId },
  //               },
  //               createdBy: {
  //                 connect: { id: createdById },
  //               },
  //             })
  //           )
  //         : undefined,
  //     build: build !== "" ? build : "UNKNOWN",
  //     dateOfBirth,
  //     dateSource,
  //     gender: gender !== "" ? gender : "UNKNOWN",
  //     groups: {
  //       connect:
  //         this.props.groups.length > 1
  //           ? selectedGroups.map((id) => ({ id }))
  //           : this.props.groups.map(({ id }) => ({ id })),
  //     },
  //     hair,
  //     images: {
  //       upload:
  //         images.length > 0
  //           ? images.map(({ file }) => ({
  //               file,
  //             }))
  //           : undefined,
  //     },
  //     name: name !== "" ? name : "Unidentified Offender",
  //     tags: {
  //       connect:
  //         linkOffenderLabels.length > 0
  //           ? linkOffenderLabels.map((id) => ({ id }))
  //           : undefined,
  //     },
  //     peculiarities,
  //     race: race !== "" ? race : "UNKNOWN",
  //     scheme: window.localStorage.getItem("currentScheme"),
  //     schemeId: window.localStorage.getItem("currentScheme"),
  //     userId: createdById,
  //   },
  // });
  // this.setState({ disabled: false });
  // this.props.setStatusBar(false, "");
  // this.props.toggleFetchOffenders(false);
  // };

  return (
    <OffenderWizard
      handleChange={handleChange}
      name={name}
      gender={gender}
      race={race}
      build={build}
      age={age}
      dateOfBirth={dateOfBirth}
      dateSource={dateSource}
      hair={hair}
      peculiarities={peculiarities}
      images={images}
      disabled={disabled || uploading}
      uploadImage={addImage}
      removeImage={removeImage}
      offenderLabels={labelsList ? labelsList.tags : []}
      selectedLabels={selectedLabels}
      toggleSelectedLabels={toggleSelectedLabels}
      addLabel={addLabel}
      exclusions={exclusions}
      addExclusion={addExclusion}
      removeExclusion={removeExclusion}
      editingExclusion={editingExclusion}
      setEditingExclusion={setEditingExclusionFunction}
      editExclusion={editExclusion}
      handlePost={handlePost}
      groups={groups ? groups.groups : []}
      groupsLoading={groupsLoading}
      toggleSelectedGroups={toggleSelectedGroups}
      selectedGroups={selectedGroups}
      admin={admin}
      createdById={currentUser}
    />
  );
};

export default withRouter(AddOffender);
