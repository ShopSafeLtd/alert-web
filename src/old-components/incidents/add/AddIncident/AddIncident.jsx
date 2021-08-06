import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import { useMutation, useQuery } from '@apollo/react-hooks';

import IncidentWizard from '../desktop/IncidentWizard/IncidentWizard';
import MobileForm from '../mobile/MobileForm/MobileForm';
import { CreateIncident } from '../../../../graphql/incidents/mutations';
import UserAddresses from '../../../../graphql/address/queries/PreviousAddresses';
import AllGroups from '../../../../graphql/groups/AllGroupsQuery';
import { IncidentFeed } from '../../../../graphql/incidents/queries';
import { OffenderFeed } from '../../../../graphql/offenders/queries';
import { Tags } from '../../../../graphql/tags/queries';
import { useStoreActions, useStoreState } from '../../../../state';

let querySize = 10;
if (window.innerWidth > 1239 && window.innerWidth < 1800) {
  querySize = 12;
} else if (window.innerWidth > 1799) {
  querySize = 16;
}

const AddIncident = ({ history }) => {
  const setTitle = useStoreActions(actions => actions.setTitle);
  const setBottomNav = useStoreActions(actions => actions.setBottomNav);
  const setNavbarAction = useStoreActions(actions => actions.setNavbarAction);
  const setBackLinkTo = useStoreActions(actions => actions.setBackLinkTo);
  const toggleFetchIncidents = useStoreActions(
    actions => actions.toggleFetchIncidents
  );
  const currentUser = useStoreState(state => state.user.id);
  const role = useStoreState(state => state.user.role);
  const schemeAdmin = role === 'SCHEME_ADMIN';
  const admin = role === 'USER' ? false : true;

  // state
  const [description, setDescription] = useState({
    subject: '',
    subjectError: null,
    description: '',
    descriptionError: null,
    date: new Date(),
    dateError: null,
    time: new Date(),
    timeError: null
  });
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [crimeTypeError, setCrimeTypeError] = useState([]);
  const [location, setLocation] = useState('ACCOUNT');
  const [locationPristine, setLocationPristine] = useState('ACCOUNT');
  const [newLocation, setNewLocation] = useState({
    premises: '',
    building: '',
    street: '',
    streetError: null,
    townCity: '',
    townCityError: null,
    county: '',
    postcode: '',
    postcodeError: null
  });
  const [previousLocation, setPreviousLocation] = useState('');
  const [offenders, setOffenders] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesAssigned, setImagesAssigned] = useState(false);
  const [groups, setGroups] = useState([]);

  // queries
  const { data: userData, loading: userLoading } = useQuery(UserAddresses, {
    variables: {
      userId: currentUser
    },
    fetchPolicy: 'cache-and-network'
  });
  const { data: groupsData, loading: groupsLoading } = useQuery(AllGroups, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      user: schemeAdmin ? undefined : { some: { id: { equals: currentUser } } }
    },
    fetchPolicy: 'cache-and-network'
  });
  const { data: crimeTypesData, loading: crimeTypesLoading } = useQuery(Tags, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      dataType: 'INCIDENT'
    }
  });

  // mutations
  const [createIncident] = useMutation(CreateIncident, {
    update: (store, { data: { createIncident } }) => {
      let data = store.readQuery({
        query: IncidentFeed,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme'),
          search: '',
          order: { createdAt: 'desc' },
          first: querySize
        }
      });
      store.writeQuery({
        query: IncidentFeed,
        data: {
          incidentFeed: [createIncident, ...data.incidentFeed]
        },
        variables: {
          schemeId: window.localStorage.getItem('currentScheme'),
          search: '',
          order: { createdAt: 'desc' },
          first: querySize
        }
      });
      if (createIncident.offenders.length > 0) {
        let offenders = store.readQuery({
          query: OffenderFeed,
          variables: {
            first: querySize,
            order: { createdAt: 'desc' },
            role,
            schemeId: window.localStorage.getItem('currentScheme'),
            search: '',
            userId: currentUser
          }
        });
        offenders.offenderFeed = [
          ...createIncident.offenders,
          ...offenders.offenderFeed
        ];
        store.writeQuery({
          query: OffenderFeed,
          data: offenders,
          variables: {
            userId: currentUser,
            schemeId: window.localStorage.getItem('currentScheme'),
            role,
            search: '',
            order: { createdAt: 'desc' },
            first: querySize
          }
        });
      }
    }
  });

  // functions
  const handleDescChange = (value, name) =>
    setDescription({
      ...description,
      [name]: value
    });

  const toggleCrimeTypes = type =>
    crimeTypes.includes(type)
      ? setCrimeTypes(crimeTypes.filter(crimeType => type !== crimeType))
      : setCrimeTypes([...crimeTypes, type]);

  const handleLocationChange = (value, name) =>
    setNewLocation({
      ...newLocation,
      [name]: value
    });

  const addExistingOffenders = existing =>
    setOffenders([
      ...offenders,
      ...existing.map(offender => ({
        ...offender,
        existing: true
      }))
    ]);
  const addNewOffender = offender =>
    setOffenders([
      ...offenders,
      {
        ...offender,
        id: offenders.length,
        create: true,
        name: offender.name === '' ? 'Unidentified Offender' : offender.name,
        gender: offender.gender === '' ? 'UNKNOWN' : offender.gender,
        race: offender.race === '' ? 'UNKNOWN' : offender.race,
        build: offender.build === '' ? 'UNKNOWN' : offender.build,
        age:
          offender.age === '' && offender.dateOfBirth === ''
            ? 'UNKNOWN'
            : offender.age,
        dateOfBirth: !!offender.dateOfBirth ? offender.dateOfBirth : undefined,
        imagesIds: [],
        images: []
      }
    ]);
  const editNewOffender = offender =>
    setOffenders(
      update(offenders, {
        [offenders.map(({ id }) => id).indexOf(offender.id)]: {
          $set: {
            ...offender,
            name:
              offender.name === '' ? 'Unidentified Offender' : offender.name,
            gender: offender.gender === '' ? 'UNKNOWN' : offender.gender,
            race: offender.race === '' ? 'UNKNOWN' : offender.race,
            build: offender.build === '' ? 'UNKNOWN' : offender.build,
            age:
              offender.age === '' && offender.dateOfBirth === ''
                ? 'UNKNOWN'
                : offender.age
          }
        }
      })
    );
  const removeOffender = offender =>
    setOffenders(offenders.filter(({ id }) => offender !== id));

  const addImage = ({ target: { files } }) => {
    const filesArray = [...files];

    setImages([
      ...images,
      ...filesArray.map(file => ({
        id: images.length,
        url: URL.createObjectURL(file),
        offendersIds: [],
        file: file
      }))
    ]);
  };

  const addImageMobile = data => {
    // @ts-expect-error
    window.resolveLocalFileSystemURL(data, fileEntry => {
      fileEntry.file(function(file) {
        const reader = new FileReader();
        reader.onloadend = async function(e) {
          setImages([
            ...images,
            {
              id: images.length,
              url: window.URL.createObjectURL(
                // @ts-expect-error
                new Blob([new Uint8Array(this.result)], { type: 'image/jpeg' })
              ),
              offendersIds: [],
              // @ts-expect-error
              file: new Blob([this.result], { type: 'image/jpeg' })
            }
          ]);
        };
        reader.readAsArrayBuffer(file);
      });
    });
  };

  const removeImage = (image, removeOffenders) => {
    removeOffenders.forEach(offender =>
      setOffenders(
        update(offenders, {
          [offenders.map(({ id }) => id).indexOf(offender)]: {
            // @ts-expect-error
            [images]: {
              $set: offenders
                .find(({ id }) => id === offender)
                .images.filter(({ id }) => id !== image)
            }
          }
        })
      )
    );
    setImages(images.filter(({ id }) => id !== image));
  };
  const assignImageToOffenders = (image, assignOffenders, removeOffenders) => {
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
          offendersIds: {
            $set: [
              ...image.offendersIds.filter(id => !removeOffenders.includes(id)),
              ...assignOffenders.filter(id => !images.includes(id))
            ]
          }
        }
      })
    );
    setImagesAssigned(true);
  };
  const removeOffendersFromImage = (image, removeOffenders) => {
    removeOffenders.forEach(offender =>
      setOffenders(
        update(offenders, {
          [offenders.map(({ id }) => id).indexOf(offender)]: {
            [images]: {
              $set: offenders
                .find(({ id }) => id === offender)
                .images.filter(({ id }) => id !== image)
            }
          }
        })
      )
    );
    setImages(
      update(images, {
        [images.map(({ id }) => id).indexOf(image)]: {
          offendersIds: {
            $set: images
              .find(({ id }) => id === image)
              .offenderIds.filter(id => !removeOffenders.includes(id))
          }
        }
      })
    );
  };
  const toggleGroups = group =>
    groups.includes(group)
      ? setGroups(groups.filter(id => id !== group))
      : setGroups([...groups, group]);
  const validateDescription = () =>
    new Promise((resolve, reject) => {
      const subjectValid = !!description.subject;
      const descriptionValid = !!description.description;
      const dateValid = !!description.date;
      const timeValid = !!description.time;
      setDescription({
        ...description,
        subjectError: subjectValid ? '' : 'This is a required Field.',
        descriptionError: descriptionValid ? '' : 'This is a required Field.',
        dateError: dateValid ? '' : 'This is a required Field.',
        timeError: timeValid ? '' : 'This is a required Field.'
      });
      subjectValid && descriptionValid && dateValid && timeValid
        ? resolve()
        : reject();
    });
  const validateCrimeTypes = () =>
    new Promise((resolve, reject) => {
      const crimeTypesValid = crimeTypes.length > 0;
      crimeTypesValid
        ? setCrimeTypeError('')
        : setCrimeTypeError('Please select at least one crime type.');
      crimeTypesValid ? resolve() : reject();
    });
  const validateNewLocation = () =>
    new Promise((resolve, reject) => {
      const streetValid = location === 'NEW' && !!newLocation.street;
      const townCityValid = location === 'NEW' && !!newLocation.townCity;
      const postcodeValid = location === 'NEW' && !!newLocation.postcode;
      setNewLocation({
        ...newLocation,
        streetError: streetValid ? '' : 'This is a required Field.',
        townCityError: townCityValid ? '' : 'This is a required Field.',
        postcodeError: postcodeValid ? '' : 'This is a required Field.'
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
      location === 'NEW'
        ? validateNewLocation()
            .then(() => resolve())
            .catch(() => reject('NEW'))
        : location === 'PREVIOUS'
          ? !!previousLocation
            ? resolve()
            : reject('PREVIOUS')
          : resolve();
    });
  const validateGroups = () =>
    new Promise(
      (resolve, reject) => (groups.length > 0 ? resolve() : reject())
    );
  const handleSubmit = () => {
    toggleFetchIncidents(false);
    console.log(images);
    console.log('runs', images.map(({ file }) => ({ file })));
    console.log('runs2');
    createIncident({
      variables: {
        subject: description.subject,
        date: description.date,
        time: description.time,
        description: description.description,
        crimeTypes: crimeTypes.map(id => ({ id })),
        location:
          location === 'NEW'
            ? {
                premises: newLocation.premises,
                building: newLocation.building,
                street: newLocation.street,
                townCity: newLocation.townCity,
                county: newLocation.county,
                postcode: newLocation.postcode
              }
            : location === 'PREVIOUS'
              ? {
                  premises: userData.addresses.find(
                    ({ id }) => id === previousLocation
                  ).premises,
                  building: userData.addresses.find(
                    ({ id }) => id === previousLocation
                  ).building,
                  street: userData.addresses.find(
                    ({ id }) => id === previousLocation
                  ).street,
                  townCity: userData.addresses.find(
                    ({ id }) => id === previousLocation
                  ).townCity,
                  county: userData.addresses.find(
                    ({ id }) => id === previousLocation
                  ).county,
                  postcode: userData.addresses.find(
                    ({ id }) => id === previousLocation
                  ).postcode
                }
              : {
                  premises: userData.addresses.find(({ primary }) => primary)
                    .premises,
                  building: userData.addresses.find(({ primary }) => primary)
                    .building,
                  street: userData.addresses.find(({ primary }) => primary)
                    .street,
                  townCity: userData.addresses.find(({ primary }) => primary)
                    .townCity,
                  county: userData.addresses.find(({ primary }) => primary)
                    .county,
                  postcode: userData.addresses.find(({ primary }) => primary)
                    .postcode
                },
        newLocation: location === 'NEW' ? true : false,
        userId: currentUser,
        schemeId: window.localStorage.getItem('currentScheme'),
        offenders:
          offenders.filter(({ create }) => create).length === 0
            ? undefined
            : offenders
                .filter(({ create }) => create)
                .map(
                  ({
                    id,
                    age,
                    build,
                    dateOfBirth,
                    dateSource,
                    gender,
                    hair,
                    name,
                    peculiarities,
                    race,
                    images
                  }) => ({
                    age: !!age ? age : undefined,
                    build,
                    dateOfBirth,
                    dateSource,
                    gender,
                    hair,
                    name,
                    peculiarities,
                    race,
                    localId: `${id}`
                  })
                ),
        existingOffenders: offenders
          .filter(({ existing }) => existing)
          .map(({ id }) => ({ id })),
        images: {
          upload:
            images.length > 0
              ? images.map(({ file, offendersIds }) => ({
                  file,
                  offenders: offendersIds.map(id => ({
                    id: `${id}`,
                    new: Number.isInteger(id)
                  }))
                }))
              : undefined
        },
        groups:
          groups.length > 0
            ? groups.map(id => ({ id }))
            : groupsData.groups.map(({ id }) => ({ id }))
      }
    });
    history.push('/incidents/');
  };
  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches =>
        matches ? (
          <IncidentWizard
            // global values
            handleSubmit={handleSubmit}
            userId={currentUser}
            admin={admin}
            // description values
            description={description}
            handleDescChange={handleDescChange}
            crimeTypes={crimeTypes}
            crimeTypeError={crimeTypeError}
            setCrimeTypes={setCrimeTypes}
            validateDescription={validateDescription}
            // location values
            location={location}
            newLocation={newLocation}
            previousLocation={previousLocation}
            primaryLocation={
              !!userData
                ? userData.addresses.find(({ primary }) => primary)
                : []
            }
            previousLocations={
              !!userData
                ? userData.addresses.filter(({ primary }) => !primary)
                : []
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
        ) : (
          <MobileForm
            // global values
            setBottomNav={setBottomNav}
            setNavbarAction={setNavbarAction}
            setBackLinkTo={setBackLinkTo}
            setTitle={setTitle}
            userId={currentUser}
            handleSubmit={handleSubmit}
            history={history}
            admin={admin}
            schemeAdmin={schemeAdmin}
            // description values
            description={description}
            handleDescChange={handleDescChange}
            validateDescription={validateDescription}
            // crime type values
            crimeTypesList={!!crimeTypesData ? crimeTypesData.tags : []}
            crimeTypesLoading={crimeTypesLoading}
            crimeTypes={crimeTypes}
            crimeTypeError={crimeTypeError}
            toggleCrimeTypes={toggleCrimeTypes}
            validateCrimeTypes={validateCrimeTypes}
            // location values
            locationOption={location}
            newLocation={newLocation}
            previousLocation={previousLocation}
            primaryLocation={
              !!userData
                ? userData.addresses.find(({ primary }) => primary)
                : []
            }
            previousLocations={
              !!userData
                ? userData.addresses.filter(({ primary }) => !primary)
                : []
            }
            loadingAddresses={userLoading}
            handleLocationChange={handleLocationChange}
            setLocationOption={setLocation}
            setPreviousLocation={setPreviousLocation}
            validateLocation={validateLocation}
            locationPristine={locationPristine}
            setLocationPristine={setLocationPristine}
            // offender values
            offenders={offenders}
            addExistingOffenders={addExistingOffenders}
            addNewOffender={addNewOffender}
            editNewOffender={editNewOffender}
            removeOffender={removeOffender}
            // images values
            images={images}
            uploadImage={addImage}
            uploadMobileImage={addImageMobile}
            removeImage={removeImage}
            assignImageToOffenders={assignImageToOffenders}
            removeOffendersFromImage={removeOffendersFromImage}
            validateImages={validateImages}
            // groups value
            groups={groups}
            groupsList={!!groupsData ? groupsData.groups : []}
            toggleGroups={toggleGroups}
            groupsLoading={groupsLoading}
            validateGroups={validateGroups}
          />
        )
      }
    </MediaQuery>
  );
};

export default withRouter(AddIncident);
