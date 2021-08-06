import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { CreateBan } from 'graphql-src/bans/mutations';
import { OffenderFeed } from 'graphql-src/offenders/queries';
import { PopOver, PopOverContainer } from '../../../global/layout';
import { FullWidthButton, BackButton } from '../../../global/actions';
import { ExclusionForm } from '../../../forms';
import { useStoreState } from '../../../../state';

let querySize = 10;
if (window.innerWidth > 1239 && window.innerWidth < 1800) {
  querySize = 12;
} else if (window.innerWidth > 1799) {
  querySize = 16;
}

const AddExclusionPopover = ({
  userId,
  role,
  onSubmit,
  offenderId,
  visible,
  close
}) => {
  const createdById = useStoreState(state => state.user.id);
  const schemeId = useStoreState(state => state.scheme.id);

  // state
  const [ban, setBan] = useState({
    location: '',
    locationError: null,
    description: '',
    startDate: new moment(),
    startDateError: null,
    endDate: new moment(),
    endDateError: null
  });
  const [submitting, setSubmitting] = useState(false);

  const variables = {
    schemeId: schemeId,
    search: '',
    first: querySize,
    order: { createdAt: 'desc' },
    userId,
    role
  };

  // mutations
  const [addBan] = useMutation(CreateBan, {
    update: (store, { data: { createBan } }) => {
      let data = store.readQuery({
        OffenderFeed,
        variables
      });
      let index = data.offenderFeed.map(({ id }) => id).indexOf(offenderId);
      data.offenderFeed[index].bans = [
        ...data.offenderFeed[index].bans,
        createBan
      ];
      store.writeQuery({
        OffenderFeed,
        data,
        variables
      });
    }
  });

  // functions
  const handleChange = (value, field) => {
    console.log(value, field);
    setBan({
      ...ban,
      [field]: value
    });
  };
  const handleClose = () => {
    setBan({
      location: '',
      locationError: null,
      description: '',
      startDate: new Date(),
      startDateError: null,
      endDate: new Date(),
      endDateError: null
    });
    setSubmitting(false);
    close();
  };
  const validate = () =>
    new Promise((resolve, reject) => {
      const locationValid = !!ban.location;
      const startDateValid = !!ban.startDate;
      const endDateValid = !!ban.endDate;
      setBan({
        ...ban,
        locationError: locationValid ? '' : 'This is a required field.',
        startDateError: startDateValid ? '' : 'This is a required field',
        endDateError: endDateValid ? '' : 'This is a required field'
      });
      locationValid && startDateValid && endDateValid ? resolve() : reject();
    });
  const handleSubmit = () => {
    validate()
      .then(() => {
        if (onSubmit !== undefined) {
          onSubmit({
            location: ban.location,
            description: ban.description,
            startDate: ban.startDate,
            endDate: ban.endDate
          });
        } else {
          addBan({
            variables: {
              data: {
                location: ban.location,
                description: ban.description,
                startDate: ban.startDate,
                endDate: ban.endDate,
                offender: { connect: { id: offenderId } },
                scheme: { connect: { id: schemeId } },
                createdby: { connect: { id: createdById } }
              }
            },
            optimisticResponse: {
              createBan: {
                active: true,
                createdBy: {
                  id: 'cjhc60xdr955a01762blztukg',
                  __typename: 'User'
                },
                id: Math.random(),
                description: ban.description,
                endDate: ban.endDate,
                startDate: ban.startDate,
                location: ban.location,
                offender: {
                  id: offenderId,
                  __typename: 'Offender'
                },
                __typename: 'Ban'
              }
            }
          });
        }
        handleClose();
      })
      .catch(() => {});
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches => (
        <PopOver
          noPadding
          open={visible}
          width={matches ? 500 : window.innerWidth - 15}
          handleClose={handleClose}
          title={'Add Ban'}
          actions={[
            <BackButton
              key={Math.random()}
              disabled={submitting}
              onClick={handleClose}
            >
              Cancel
            </BackButton>,
            <Button
              key={Math.random()}
              disabled={submitting}
              color="primary"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              Add Ban
            </Button>
          ]}
          mobileAction={[
            <FullWidthButton
              key={Math.random()}
              text="Submit"
              onClick={handleSubmit}
              position="ABSOLUTE"
              disabled={submitting}
            />
          ]}
        >
          <PopOverContainer>
            <ExclusionForm
              handleChange={handleChange}
              data={{
                startDate: ban.startDate,
                startDateError: ban.startDateError,
                endDate: ban.endDate,
                endDateError: ban.endDateError,
                location: ban.location,
                locationError: ban.locationError,
                description: ban.description
              }}
            />
          </PopOverContainer>
        </PopOver>
      )}
    </MediaQuery>
  );
};

export default AddExclusionPopover;
