import React, { useState } from "react";
import update from "immutability-helper";
import { useMutation, useQuery } from "@apollo/client";

import IncidentWizard from "../desktop/IncidentWizard/IncidentWizard";
import { CreateIncident } from "graphql-src/incidents/mutations";
import { PreviousAddresses } from "graphql-src/address/queries";
import { Tags } from "graphql-src/tags/queries";
import { Groups } from "graphql-src/groups/queries";
import { IncidentFeed } from "graphql-src/incidents/queries";
import { UploadImage } from "graphql-src/images/mutations";
import { useStoreState } from "../../../../state";
import { useNavigate } from "react-router-dom";

let querySize = 10;
if (window.innerWidth > 1239 && window.innerWidth < 1800) {
  querySize = 12;
} else if (window.innerWidth > 1799) {
  querySize = 16;
}

const AddIncident = () => {
  const navigate = useNavigate()
  const schemeId = useStoreState((state) => state.scheme.id);
  const currentUser = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);
  const schemeAdmin = role === "SCHEME_ADMIN";
  const admin = role === "USER" ? false : true;

  // state
  const [description, setDescription] = useState({
    subject: "",
    subjectError: null,
    description: "",
    descriptionError: null,
    date: new Date(),
    dateError: null,
    time: new Date(),
    timeError: null,
  });
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [location, setLocation] = useState("ACCOUNT");
  const [newLocation, setNewLocation] = useState({
    premises: "",
    building: "",
    street: "",
    streetError: null,
    townCity: "",
    townCityError: null,
    county: "",
    postcode: "",
    postcodeError: null,
  });
  const [previousLocation, setPreviousLocation] = useState("");
  const [offenders, setOffenders] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesAssigned, setImagesAssigned] = useState(false);
  const [groups, setGroups] = useState([]);

  // queries
  const { data: userData, loading: userLoading } = useQuery(PreviousAddresses, {
    variables: {
      where: {
        userId: {
          equals: currentUser,
        },
      },
    },
    fetchPolicy: "cache-and-network",
  });
  const { data: crimeTypesList } = useQuery(Tags, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        dataType: { equals: "INCIDENT" },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: groupsData, loading: groupsLoading } = useQuery(Groups, {
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
  const [createImage] = useMutation(UploadImage);
  const [createIncident] = useMutation(CreateIncident, {
    onError: (err) => {
      console.log(err);
    },

    update: (store, { data: { createIncident } }) => {
      let data = store.readQuery({
        query: IncidentFeed,
        variables: {
          schemeId,
          search: "",
          order: { createdAt: "desc" },
          first: querySize,
        },
      });
      store.writeQuery({
        query: IncidentFeed,
        data: {
          incidentFeed: [createIncident, ...data?.incidentFeed],
        },
        variables: {
          schemeId,
          search: "",
          order: { createdAt: "desc" },
          first: querySize,
        },
      });
      // if (createIncident?.offenders?.length > 0) {
      //   let offenders = store.readQuery({
      //     query: OffenderFeed,
      //     variables: {
      //       schemeId,
      //       userId: currentUser,
      //       order: { createdAt: "desc" },
      //       search: "",
      //       first: querySize,
      //     },
      //   });
      //   offenders.offenderFeed = [
      //     ...createIncident.offenders,
      //     ...offenders.offenderFeed,
      //   ];
      //   store.writeQuery({
      //     query: OffenderFeed,
      //     data: offenders,
      //     variables: {
      //       userId: currentUser,
      //       schemeId,
      //       role,
      //       search: "",
      //       order: { createdAt: "desc" },
      //       first: querySize,
      //     },
      //   });
      // }
    },
  });

  // functions
  const handleDescChange = (value, name) =>
    setDescription({
      ...description,
      [name]: value,
    });

  const handleLocationChange = (value, name) =>
    setNewLocation({
      ...newLocation,
      [name]: value,
    });

  const addExistingOffenders = (existing) => {
    setOffenders((prev) => {
      const prevIds = prev.map(({ id }) => id);
      const newExisting = existing.filter(
        (el) => el?.id && !prevIds.includes(el.id)
      );
      return [
        ...prev,
        ...newExisting.map((offender) => {
          return { ...offender, existing: true };
        }),
      ];
    });
  };

  const addNewOffender = (offender) =>
    setOffenders([
      ...offenders,
      {
        ...offender,
        id: offenders.length,
        create: true,
        name: offender.name === "" ? "Unidentified Offender" : offender.name,
        gender: offender.gender === "" ? "UNKNOWN" : offender.gender,
        race: offender.race === "" ? "UNKNOWN" : offender.race,
        build: offender.build === "" ? "UNKNOWN" : offender.build,
        age:
          offender.age === "" && offender.dateOfBirth === ""
            ? "UNKNOWN"
            : offender.age,
        dateOfBirth: !!offender.dateOfBirth ? offender.dateOfBirth : undefined,
        imagesIds: [],
        images: [],
      },
    ]);
  const editNewOffender = (offender) =>
    setOffenders(
      update(offenders, {
        [offenders.map(({ id }) => id).indexOf(offender.id)]: {
          $set: {
            ...offender,
            name:
              offender.name === "" ? "Unidentified Offender" : offender.name,
            gender: offender.gender === "" ? "UNKNOWN" : offender.gender,
            race: offender.race === "" ? "UNKNOWN" : offender.race,
            build: offender.build === "" ? "UNKNOWN" : offender.build,
            age:
              offender.age === "" && offender.dateOfBirth === ""
                ? "UNKNOWN"
                : offender.age,
          },
        },
      })
    );
  const removeOffender = (offender) =>
    setOffenders(offenders.filter(({ id }) => offender !== id));

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
      setImages([...images, { ...uploadImage, offenders: [] }]);
    });
  };

  const removeImage = (image, removeOffenders) => {
    removeOffenders.forEach((offender) =>
      setOffenders(
        update(offenders, {
          [offenders.map(({ id }) => id).indexOf(offender)]: {
            // @ts-expect-error
            [images]: {
              $set: offenders
                .find(({ id }) => id === offender)
                .images.filter(({ id }) => id !== image),
            },
          },
        })
      )
    );
    setImages(images.filter(({ id }) => id !== image));
  };
  const assignImageToOffenders = (image, assignOffenders, removeOffenders) => {
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
    const existingOffenders = image?.offenderIds
      ? [...image?.offendersIds?.filter((id) => !removeOffenders?.includes(id))]
      : [];
    setImages(
      update(images, {
        [images.map(({ id }) => id).indexOf(image.id)]: {
          offendersIds: {
            $set: [
              ...existingOffenders,
              ...assignOffenders.filter((id) => !images.includes(id)),
            ],
          },
        },
      })
    );
    setImagesAssigned(true);
  };
  const removeOffendersFromImage = (image, removeOffenders) => {
    removeOffenders.forEach((offender) =>
      setOffenders(
        update(offenders, {
          [offenders.map(({ id }) => id).indexOf(offender)]: {
            [images]: {
              $set: offenders
                .find(({ id }) => id === offender)
                .images.filter(({ id }) => id !== image),
            },
          },
        })
      )
    );
    setImages(
      update(images, {
        [images.map(({ id }) => id).indexOf(image)]: {
          offendersIds: {
            $set: images
              .find(({ id }) => id === image)
              .offenderIds.filter((id) => !removeOffenders.includes(id)),
          },
        },
      })
    );
  };
  const toggleGroups = (group) =>
    groups.includes(group)
      ? setGroups(groups.filter((id) => id !== group))
      : setGroups([...groups, group]);
  const validateDescription = () =>
    new Promise((resolve, reject) => {
      const subjectValid = !!description.subject;
      const descriptionValid = !!description.description;
      const dateValid = !!description.date;
      const timeValid = !!description.time;
      setDescription({
        ...description,
        subjectError: subjectValid ? "" : "This is a required Field.",
        descriptionError: descriptionValid ? "" : "This is a required Field.",
        dateError: dateValid ? "" : "This is a required Field.",
        timeError: timeValid ? "" : "This is a required Field.",
      });
      subjectValid && descriptionValid && dateValid && timeValid
        ? resolve()
        : reject();
    });
  const validateNewLocation = () =>
    new Promise((resolve, reject) => {
      const streetValid = location === "NEW" && !!newLocation.street;
      const townCityValid = location === "NEW" && !!newLocation.townCity;
      const postcodeValid = location === "NEW" && !!newLocation.postcode;
      setNewLocation({
        ...newLocation,
        streetError: streetValid ? "" : "This is a required Field.",
        townCityError: townCityValid ? "" : "This is a required Field.",
        postcodeError: postcodeValid ? "" : "This is a required Field.",
      });
      streetValid && townCityValid && postcodeValid ? resolve() : reject();
    });
  const validateImages = () =>
    new Promise((resolve, reject) => {
      if (images.length > 0 && offenders.length > 0) {
        imagesAssigned ? resolve() : reject();
      } else {
        resolve();
      }
    });
  const validateLocation = () =>
    new Promise((resolve, reject) => {
      location === "NEW"
        ? validateNewLocation()
            .then(() => resolve())
            .catch(() => reject("NEW"))
        : location === "PREVIOUS"
        ? !!previousLocation
          ? resolve()
          : reject("PREVIOUS")
        : resolve();
    });
  const validateGroups = () =>
    new Promise((resolve, reject) =>
      groups.length > 0 ? resolve() : reject()
    );
  const handleSubmit = () => {
    //toggleFetchIncidents(false);

    createIncident({
      variables: {
        data: {
          subject: description.subject,
          date: description.date,
          time: description.time,
          description: description.description,
          crimeTypes: crimeTypes.map(({ id }) => ({ id })),
          location: {
            create:
              location === "NEW"
                ? {
                    premises: newLocation.premises,
                    building: newLocation.building,
                    street: newLocation.street,
                    townCity: newLocation.townCity,
                    county: newLocation.county,
                    postcode: newLocation.postcode,
                  }
                : undefined,

            previous:
              location === "PREVIOUS"
                ? { id: previousLocation }
                : location === "ACCOUNT"
                ? { id: userData.addresses.find((el) => el.primary).id }
                : undefined,
          },
          scheme: schemeId,
          offenders: {
            connect:
              offenders.length > 0
                ? offenders.filter((el) => !el.create).map(({ id }) => ({ id }))
                : undefined,
            create: undefined,
          },
          images: {
            connect:
              images.length > 0
                ? images?.map((el) => {
                    return {
                      id: el?.id,
                      offenders: el?.offendersIds
                        ? el.offendersIds.map((e) => {
                            return { id: e, localId: e.localId };
                          })
                        : undefined,
                    };
                  })
                : undefined,
          },
          groups:
            groups.length > 0
              ? groups.map((id) => ({ id }))
              : groupsData.groups.map(({ id }) => ({ id })),
        },
      },
    });

    navigate("/");
  };

  return (
    <IncidentWizard
      // global values
      handleSubmit={handleSubmit}
      userId={currentUser}
      admin={admin}
      // description values
      description={description}
      handleDescChange={handleDescChange}
      crimeTypesList={crimeTypesList ? crimeTypesList.tags : []}
      crimeTypes={crimeTypes}
      setCrimeTypes={setCrimeTypes}
      validateDescription={validateDescription}
      // location values
      location={location}
      newLocation={newLocation}
      previousLocation={previousLocation}
      primaryLocation={
        !!userData ? userData.addresses.find(({ primary }) => primary) : []
      }
      previousLocations={
        !!userData ? userData.addresses.filter(({ primary }) => !primary) : []
      }
      handleLocationChange={handleLocationChange}
      setLocationOption={setLocation}
      setPreviousLocation={setPreviousLocation}
      validateLocation={validateLocation}
      locationLoading={userLoading}
      // offender values
      offenders={offenders}
      addExistingOffenders={addExistingOffenders}
      addNewOffender={addNewOffender}
      editNewOffender={editNewOffender}
      removeOffender={removeOffender}
      // image values
      images={images}
      uploadImage={addImage}
      removeImage={removeImage}
      assignImageToOffenders={assignImageToOffenders}
      removeOffendersFromImage={removeOffendersFromImage}
      validateImages={validateImages}
      // groups values
      groups={groups}
      groupsList={!!groupsData ? groupsData.groups : []}
      toggleGroups={toggleGroups}
      groupsLoading={groupsLoading}
      validateGroups={validateGroups}
    />
  );
};

export default AddIncident;
