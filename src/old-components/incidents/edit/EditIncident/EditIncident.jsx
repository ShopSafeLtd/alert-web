import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { useQuery, useMutation } from '@apollo/react-hooks';
import update from 'immutability-helper';
import { isEqual } from 'lodash-es';

import { EditAlertQuery } from '../../../../graphql/incidents/queries';
import UploadImage from '../../../../graphql/images/mutations/uploadImages';
import { EditAlertMutation } from '../../../../graphql/incidents/mutations';
import EditDesktop from '../desktop/EditDesktop/EditDesktop';
import EditMobile from '../mobile/EditMobile/EditMobile';
import { useStoreActions, useStoreState } from '../../../../state';

const EditIncident = ({
  match: {
    params: { id }
  }
}) => {
  const userId = useStoreState(state => state.user.id);
  const role = useStoreState(state => state.user.role);
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setNavbarActionDisabled = useStoreActions(
    actions => actions.theme.setNavbarActionDisabled
  );
  const schemeAdmin = role === 'SCHEME_ADMIN' ? true : false;

  // state
  const [description, setDescription] = useState({
    subject: '',
    subjectError: '',
    description: '',
    descriptionError: '',
    date: null,
    dateError: '',
    time: null,
    timeError: ''
  });
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [crimeTypeError, setCrimeTypeError] = useState(false);
  const [location, setLocation] = useState({
    id: '',
    building: '',
    street: '',
    streetError: '',
    townCity: '',
    townError: '',
    county: '',
    postcode: '',
    postcodeError: ''
  });
  const [offenders, setOffenders] = useState([]);
  const [images, setImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupsError, setGroupsError] = useState(false);

  // queries
  const { data, loading } = useQuery(EditAlertQuery, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ incident }) => updateState(incident)
  });

  // mutations
  const [updateIncident] = useMutation(EditAlertMutation, {
    onCompleted: ({ updateIncident }) => updateState(updateIncident)
  });
  const [createImage] = useMutation(UploadImage, {
    onCompleted: data =>
      updateIncident({
        variables: {
          id,
          images: {
            connect: [{ id: data.uploadImage.id }]
          }
        }
      })
  });

  // functions
  const updateState = incident => {
    setDescription({
      ...description,
      subject: incident.subject,
      description: incident.description,
      date: incident.date,
      time: incident.time
    });
    setCrimeTypes(incident.crimeTypes);
    setLocation({
      ...location,
      ...incident.location
    });
    setOffenders(incident.offenders);
    setImages(incident.images);
    setGroups(incident.groups);
  };
  const handleDesChange = (value, field) =>
    setDescription({
      ...description,
      [field]: value
    });
  const handleLocChange = (value, field) =>
    setLocation({
      ...location,
      [field]: value
    });
  const removeCrimeType = crimeType =>
    setCrimeTypes(crimeTypes.filter(({ id }) => id !== crimeType));
  const removeOffender = offender =>
    setOffenders(offenders.filter(({ id }) => id !== offender));
  const addOffender = (offender, type) =>
    setOffenders([
      ...offenders,
      {
        ...offender,
        type,
        id: type === 'NEW' ? offenders.length : offender.id,
        images: type === 'NEW' ? [] : offender.images,
        name: !!offender.name ? offender.name : 'Unidentified Offender'
      }
    ]);
  const removeImage = image =>
    setImages(images.filter(({ id }) => id !== image));
  const uploadImage = async ({ target: { files } }) => {
    setUploadingImage(true);
    setNavbarActionDisabled(true);
    setImages([
      ...images,
      {
        id: 'UPLOADING',
        offendersIds: []
      }
    ]);
    // create request for every files
    [...files].forEach(async file => {
      await createImage({
        variables: {
          file,
          scheme: localStorage.getItem('currentScheme')
        }
      });
      setUploadingImage(false);
      setNavbarActionDisabled(false);
    });
  };
  const uploadMobileImage = async data => {
    setUploadingImage(true);
    setNavbarActionDisabled(true);
    setImages([
      ...images,
      {
        id: 'UPLOADING',
        offendersIds: []
      }
    ]);
    window.resolveLocalFileSystemURL(data, fileEntry => {
      fileEntry.file(function(file) {
        const reader = new FileReader();
        reader.onloadend = async function(e) {
          await createImage({
            variables: {
              file: new Blob([this.result], { type: 'image/jpeg' }),
              scheme: localStorage.getItem('currentScheme')
            }
          });
          setUploadingImage(false);
          setNavbarActionDisabled(false);
        };
        reader.readAsArrayBuffer(file);
      });
    });
  };
  const assignOffendersToImage = (image, assignOffenders, removeOffenders) => {
    let newOffenders = [...offenders];
    assignOffenders.forEach(offender => {
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
                  url: image.url
                }
              ]
            }
          }
        });
    });
    removeOffenders.forEach(offender => {
      newOffenders = update(offenders, {
        [offenders.map(({ id }) => id).indexOf(offender)]: {
          images: {
            $set: offenders
              .find(({ id }) => id === offender)
              .images.filter(({ id }) => id !== image.id)
          }
        }
      });
    });
    setOffenders(newOffenders);
    setImages(
      update(images, {
        [images.map(({ id }) => id).indexOf(image.id)]: {
          offenders: {
            $set: [
              ...image.offenders.filter(
                ({ id }) => !removeOffenders.includes(id)
              ),
              ...assignOffenders
                .filter(id => !images.includes(id))
                .map(id => ({ id, added: true }))
            ]
          }
        }
      })
    );
  };
  const addGroups = newGroups => setGroups([...groups, ...newGroups]);
  const removeGroup = remove =>
    setGroups(groups.filter(({ id }) => id !== remove));
  const validateDescription = () =>
    new Promise((resolve, reject) => {
      const subjectValid = !!description.subject;
      const descriptionValid = !!description.description;
      const dateValid = !!description.date;
      const timeValid = !!description.time;
      setDescription({
        ...description,
        subjectError: subjectValid ? '' : 'This is a required field.',
        descriptionError: descriptionValid ? '' : 'This is a required field.',
        dateError: dateValid ? '' : 'This is a required field.',
        timeError: timeValid ? '' : 'This is a required field.'
      });
      subjectValid && descriptionValid && dateValid && timeValid
        ? resolve()
        : reject();
    });
  const validateCrimeTypes = () =>
    new Promise((resolve, reject) => {
      const crimeTypesValid = crimeTypes.length !== 0;
      setCrimeTypeError(crimeTypesValid ? false : true);
      crimeTypesValid ? resolve() : reject();
    });
  const validateLocation = () =>
    new Promise((resolve, reject) => {
      const streetValid = !!location.street;
      const townValid = !!location.townCity;
      const postcodeValid = !!location.postcode;
      setLocation({
        ...location,
        streetError: streetValid ? '' : 'This is a required field',
        townError: townValid ? '' : 'This is a required field',
        postcodeError: postcodeValid ? '' : 'This is a required field'
      });
      streetValid && townValid && postcodeValid ? resolve() : reject();
    });
  const validateGroups = () =>
    new Promise((resolve, reject) => {
      const groupsValid = groups.length > 0;
      groupsValid ? setGroupsError(false) : setGroupsError(true);
      groupsValid ? resolve() : reject();
    });
  const handleSave = () => {
    const connectCrimeTypes = crimeTypes.filter(
      ({ id }) => !data.incident.crimeTypes.map(({ id }) => id).includes(id)
    );
    const disconnectCrimeTypes = data.incident.crimeTypes.filter(
      ({ id }) => !crimeTypes.map(({ id }) => id).includes(id)
    );
    const connectOffenders = offenders
      .filter(({ type }) => type === 'EXISTING')
      .map(({ id }) => ({ id }));
    const createOffenders = offenders
      .filter(({ type }) => type === 'NEW')
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
          race
        }) => ({
          age,
          build,
          dateOfBirth,
          dateSource,
          gender,
          hair,
          name,
          peculiarities,
          race,
          createdBy: {
            connect: {
              id: userId
            }
          },
          scheme: {
            connect: {
              id: window.localStorage.getItem('currentScheme')
            }
          }
        })
      );
    const disconnectOffenders = data.incident.offenders
      .filter(({ id }) => !offenders.map(({ id }) => id).includes(id))
      .map(({ id }) => ({ id }));
    const createImages = images
      .filter(({ create }) => create)
      .map(({ url }) => ({
        url,
        scheme: {
          connect: {
            id: window.localStorage.getItem('currentScheme')
          }
        }
      }));
    const disconnectImages = data.incident.images
      .filter(({ id }) => !images.map(({ id }) => id).includes(id))
      .map(({ id }) => ({ id }));
    const updatedImages = images
      .filter(
        ({ id, offenders }) =>
          !isEqual(
            offenders,
            data.incident.images.find(image => id === image.id).offenders
          )
      )
      .map(({ id, offenders }) => {
        const connect = offenders
          .filter(({ added }) => added)
          .map(({ id }) => ({ id }));
        const disconnect = data.incident.images
          .find(image => id === image.id)
          .offenders.filter(({ id }) => !offenders.includes(id))
          .map(({ id }) => ({ id }));
        return {
          where: { id },
          data: {
            offenders: {
              connect: connect.length > 0 ? connect : undefined,
              disconnect: disconnect.length > 0 ? disconnect : undefined
            }
          }
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
        id,
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
            postcode: { set: location.postcode }
          }
        },
        crimeTypes: {
          connect:
            connectCrimeTypes.length > 0
              ? connectCrimeTypes.map(({ id }) => ({ id }))
              : undefined,
          disconnect:
            disconnectCrimeTypes.length > 0
              ? disconnectCrimeTypes.map(({ id }) => ({ id }))
              : undefined
        },
        offenders: {
          connect: connectOffenders.length > 0 ? connectOffenders : undefined,
          create: createOffenders.length > 0 ? createOffenders : undefined,
          disconnect:
            disconnectOffenders.length > 0 ? disconnectOffenders : undefined
        },
        images: {
          create: createImages.length > 0 ? createImages : undefined,
          disconnect:
            disconnectImages.length > 0 ? disconnectImages : undefined,
          update: updatedImages.length > 0 ? updatedImages : undefined
        },
        groups: {
          connect: connectGroups.length > 0 ? connectGroups : undefined,
          disconnect: disconnectGroups.length > 0 ? disconnectGroups : undefined
        }
      }
    });
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches =>
        matches ? (
          <EditDesktop
            loading={loading}
            // state values
            description={description}
            crimeTypes={crimeTypes}
            location={location}
            offenders={offenders}
            images={images}
            groups={groups}
            uploadingImage={uploadingImage}
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
        ) : (
          <EditMobile
            incidentId={id}
            setBottomNav={setBottomNav}
            setBackLinkTo={setBackLinkTo}
            setTitle={setTitle}
            setNavbarAction={setNavbarAction}
            setNavbarActionDisabled={setNavbarActionDisabled}
            loading={loading}
            userId={userId}
            schemeAdmin={schemeAdmin}
            // state values
            description={description}
            crimeTypes={crimeTypes}
            crimeTypeError={crimeTypeError}
            location={location}
            offenders={offenders}
            images={images}
            groups={groups}
            uploadingImage={uploadingImage}
            // functions
            handleDesChange={handleDesChange}
            handleLocChange={handleLocChange}
            setCrimeTypes={setCrimeTypes}
            removeOffender={removeOffender}
            addOffender={addOffender}
            removeImage={removeImage}
            uploadImage={uploadImage}
            uploadMobileImage={uploadMobileImage}
            assignOffendersToImage={assignOffendersToImage}
            setGroups={setGroups}
            validateDescription={validateDescription}
            validateCrimeTypes={validateCrimeTypes}
            validateLocation={validateLocation}
            validateGroups={validateGroups}
            handleSave={handleSave}
            updateIncident={updateIncident}
          />
        )
      }
    </MediaQuery>
  );
};

export default EditIncident;
