import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import update from "immutability-helper";
import { isEqual } from "lodash-es";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { Incident as Query } from "../../../../graphql-src/incidents/queries";
import { UploadImage } from "../../../../graphql-src/images/mutations";
import { UpdateIncident } from "../../../../graphql-src/incidents/mutations";
import EditDesktop from "../desktop/EditDesktop/EditDesktop";
import { useStoreState } from "../../../../state";
import { useNavigate, useParams } from "react-router-dom";

const EditIncident = () => {
  const navigate = useNavigate()
  const params = useParams()
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  // const setNavBarActionDisabled = useStoreActions(
  //   (actions) => actions.theme.setNavBarActionDisabled
  // );
  // state
  const [description, setDescription] = useState({
    subject: "",
    subjectError: "",
    description: "",
    descriptionError: "",
    date: null,
    dateError: "",
    time: null,
    timeError: "",
  });
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [crimeTypeError, setCrimeTypeError] = useState(false);
  const [location, setLocation] = useState({
    id: "",
    building: "",
    street: "",
    streetError: "",
    townCity: "",
    townError: "",
    county: "",
    postcode: "",
    postcodeError: "",
  });
  const [offenders, setOffenders] = useState([]);
  const [images, setImages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupsError, setGroupsError] = useState(false);

  // queries
  const { data, loading } = useQuery(Query, {
    variables: { where: { id: params.id } },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ incident }) => {
      updateState(incident);
    },
  });

  // mutations
  const [updateIncident, { loading: updating }] = useMutation(UpdateIncident, {
    onCompleted: ({ updateIncident }) => {
      updateState(updateIncident);
    },
  });
  const [createImage, { loading: uploading }] = useMutation(UploadImage, {});

  // functions
  const updateState = (incident) => {
    setDescription({
      ...description,
      subject: incident.subject,
      description: incident.description,
      date: incident.date,
      time: incident.time,
    });
    setCrimeTypes(incident.crimeTypes);
    setLocation({
      ...location,
      ...incident.location,
    });
    setOffenders(incident.offenders);
    setImages(incident.images);
    setGroups(incident.groups);
  };
  const handleDesChange = (value, field) =>
    setDescription({
      ...description,
      [field]: value,
    });
  const handleLocChange = (value, field) =>
    setLocation({
      ...location,
      [field]: value,
    });
  const removeCrimeType = (crimeType) =>
    setCrimeTypes(crimeTypes.filter(({ id }) => id !== crimeType));
  const removeOffender = (offender) =>
    setOffenders(offenders.filter(({ id }) => id !== offender));
  const addOffender = (offender, type) =>
    setOffenders((prev) => {
      return [
        ...prev,
        {
          ...offender,
          type,
          id: type === "NEW" ? offenders.length : offender.id,
          images: type === "NEW" ? [] : offender.images,
          name: !!offender.name ? offender.name : "Unidentified Offender",
        },
      ];
    });
  const removeImage = (image) =>
    setImages(images.filter(({ id }) => id !== image));
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
      setImages([...images, { ...uploadImage, offenders: [] }]);
      const updatedImages = [...images, uploadImage];
      const connectImages = updatedImages
        .filter(
          ({ id }) => !data.incident.images.map(({ id }) => id).includes(id)
        )
        .map(({ id }) => ({ id }));
      updateIncident({
        variables: {
          where: { id: params.id },
          data: {
            images: {
              connect: connectImages.length > 0 ? connectImages : undefined,
            },
          },
        },
      });
    });
  };
  const assignOffendersToImage = (image, assignOffenders, removeOffenders) => {
    let newOffenders = [...offenders];
    assignOffenders.forEach((offender) => {
      if (
        !offenders
          .find(({ id }) => id === offender)
          .images.map(({ id }) => id)
          .includes(image.id)
      )
        newOffenders = update(newOffenders, {
          [offenders.map(({ id }) => id).indexOf(offender)]: {
            images: {
              $set: [
                ...offenders.find(({ id }) => id === offender).images,
                {
                  id: image.id,
                  url: image.url,
                },
              ],
            },
          },
        });
    });
    removeOffenders.forEach((offender) => {
      newOffenders = update(offenders, {
        [offenders.map(({ id }) => id).indexOf(offender)]: {
          images: {
            $set: offenders
              .find(({ id }) => id === offender)
              .images.filter(({ id }) => id !== image.id),
          },
        },
      });
    });
    setOffenders(newOffenders);
    const existingTaggedOffenders = image.offenders
      ? [
          ...image?.offenders?.filter(
            ({ id }) => !removeOffenders?.includes(id)
          ),
        ]
      : [];

    setImages(
      update(images, {
        [images.map(({ id }) => id).indexOf(image.id)]: {
          offenders: {
            $set: [
              ...existingTaggedOffenders,
              ...assignOffenders
                .filter((id) => !images.includes(id))
                .map((id) => ({ id, added: true })),
            ],
          },
        },
      })
    );
  };
  const addGroups = (newGroups) => setGroups([...groups, ...newGroups]);
  const removeGroup = (remove) =>
    setGroups(groups.filter(({ id }) => id !== remove));
  const validateDescription = () => {
    return new Promise((resolve, reject) => {
      const subjectValid = !!description.subject;
      const descriptionValid = !!description.description;
      const dateValid = !!description.date;
      const timeValid = !!description.time;
      setDescription({
        ...description,
        subjectError: subjectValid ? "" : "This is a required field.",
        descriptionError: descriptionValid ? "" : "This is a required field.",
        dateError: dateValid ? "" : "This is a required field.",
        timeError: timeValid ? "" : "This is a required field.",
      });
      subjectValid && descriptionValid && dateValid && timeValid
        ? resolve(true)
        : resolve(false);
    });
  };
  const validateCrimeTypes = () => {
    return new Promise((resolve, reject) => {
      const crimeTypesValid = crimeTypes.length !== 0;
      setCrimeTypeError(crimeTypesValid ? false : true);
      crimeTypesValid ? resolve(true) : resolve(false);
    });
  };

  const validateLocation = () => {
    return new Promise((resolve, reject) => {
      const streetValid = !!location.street;
      const townValid = !!location.townCity;
      const postcodeValid = !!location.postcode;
      setLocation({
        ...location,
        streetError: streetValid ? "" : "This is a required field",
        townError: townValid ? "" : "This is a required field",
        postcodeError: postcodeValid ? "" : "This is a required field",
      });
      streetValid && townValid && postcodeValid
        ? resolve(true)
        : resolve(false);
    });
  };

  const validateGroups = () => {
    return new Promise((resolve, reject) => {
      const groupsValid = groups.length > 0;
      groupsValid ? setGroupsError(false) : setGroupsError(true);
      groupsValid ? resolve(true) : resolve(false);
    });
  };

  const handleSave = () => {
    const connectCrimeTypes = crimeTypes.filter(
      ({ id }) => !data.incident.crimeTypes.map(({ id }) => id).includes(id)
    );
    const disconnectCrimeTypes = data.incident.crimeTypes.filter(
      ({ id }) => !crimeTypes.map(({ id }) => id).includes(id)
    );
    const connectOffenders = offenders
      .filter(({ type }) => type !== "NEW")
      .map(({ id }) => ({ id }));
    const createOffenders = offenders
      .filter(({ type }) => {
        return type === "NEW";
      })
      .map(
        ({
          age,
          build,
          dateOfBirth,
          dateSource,
          gender,
          hair,
          name,
          peculiarities,
          race,
          id,
        }) => {
          return {
            age,
            build,
            dateOfBirth: dateOfBirth !== "" ? dateOfBirth : undefined,
            dateSource: dateSource !== "" ? dateSource : undefined,
            gender,
            hair,
            name,
            peculiarities,
            race,
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
            localId: `${id}`,
          };
        }
      );
    const disconnectOffenders = data.incident.offenders
      .filter(({ id }) => !offenders.map(({ id }) => id).includes(id))
      .map(({ id }) => ({ id }));
    // const createImages = images
    //   .filter(({ create }) => create)
    //   .map(({ url }) => ({
    //     url,
    //     scheme: {
    //       connect: {
    //         id: schemeId,
    //       },
    //     },
    //   }));
    const connectImages = images
      .filter(
        ({ id }) => !data.incident.images.map(({ id }) => id).includes(id)
      )
      .map(({ id }) => ({ id }));
    const disconnectImages = data.incident.images
      .filter(({ id }) => !images.map(({ id }) => id).includes(id))
      .map(({ id }) => ({ id }));

    const updateImages = images
      .filter(
        ({ id, offenders }) =>
          !isEqual(
            offenders,
            data.incident.images.find((image) => id === image.id).offenders
          )
      )
      .map(({ id, offenders }) => {
        const connect =
          offenders?.filter(({ added }) => added)?.map(({ id }) => ({ id })) ||
          [];
        const disconnect =
          data.incident.images
            ?.find((image) => id === image.id)
            ?.offenders.filter(
              ({ id }) => !offenders.find((el) => el.id === id)
            )
            ?.map(({ id }) => ({ id })) || [];
        return {
          where: { id },
          data: {
            offenders: {
              connect: connect.length > 0 ? connect : undefined,
              disconnect: disconnect.length > 0 ? disconnect : undefined,
            },
          },
        };
      });

    const connectGroups = groups
      .filter(
        ({ id }) => !data.incident.groups.map(({ id }) => id).includes(id)
      )
      .map(({ id }) => ({ id }));
    const disconnectGroups = data.incident.groups
      .filter(({ id }) => !groups.map(({ id }) => id).includes(id))
      .map(({ id }) => ({ id }));

    updateIncident({
      variables: {
        where: { id: params.id },
        data: {
          subject: { set: description.subject },
          description: { set: description.description },
          date: { set: description.date },
          time: { set: description.time },
          location: {
            update: {
              premises: { set: location.premises },
              building: { set: location.building },
              street: { set: location.street },
              townCity: { set: location.townCity },
              county: { set: location.county },
              postcode: { set: location.postcode },
            },
          },
          crimeTypes: {
            connect:
              connectCrimeTypes.length > 0
                ? connectCrimeTypes.map(({ id }) => ({ id }))
                : undefined,
            disconnect:
              disconnectCrimeTypes.length > 0
                ? disconnectCrimeTypes.map(({ id }) => ({ id }))
                : undefined,
          },
          offenders: {
            connect: connectOffenders.length > 0 ? connectOffenders : undefined,
            create: createOffenders.length > 0 ? createOffenders : undefined,
            disconnect:
              disconnectOffenders.length > 0 ? disconnectOffenders : undefined,
          },
          images: {
            // create: createImages.length > 0 ? createImages : undefined,
            connect: connectImages.length > 0 ? connectImages : undefined,
            disconnect:
              disconnectImages.length > 0 ? disconnectImages : undefined,
            update: updateImages.length > 0 ? updateImages : undefined,
          },
          groups: {
            connect: connectGroups.length > 0 ? connectGroups : undefined,
            disconnect:
              disconnectGroups.length > 0 ? disconnectGroups : undefined,
          },
        },
      },
    });
    navigate(`${APP_PREFIX_PATH}/incidents`);
  };

  return (
    <EditDesktop
      loading={loading}
      // state values
      description={description}
      crimeTypes={crimeTypes}
      location={location}
      offenders={offenders}
      images={images}
      groups={groups}
      uploadingImage={uploading || updating}
      groupsError={groupsError}
      crimeTypeError={crimeTypeError}
      // functions
      handleDesChange={handleDesChange}
      handleLocChange={handleLocChange}
      setCrimeTypes={setCrimeTypes}
      removeCrimeType={removeCrimeType}
      removeOffender={removeOffender}
      addOffender={addOffender}
      removeImage={removeImage}
      uploadImage={uploadImage}
      assignOffendersToImage={assignOffendersToImage}
      addGroups={addGroups}
      removeGroup={removeGroup}
      validateDescription={validateDescription}
      validateCrimeTypes={validateCrimeTypes}
      validateLocation={validateLocation}
      validateGroups={validateGroups}
      handleSave={handleSave}
    />
  );
};

export default EditIncident;
