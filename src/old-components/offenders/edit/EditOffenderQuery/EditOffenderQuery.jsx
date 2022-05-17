import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import EditOffender from '../EditOffender/EditOffender';
import { OffenderQuery } from '../../../../graphql/offenders/queries';
import CreateImage from '../../../../graphql/images/mutations/uploadImages';
import EditOffenderMutation from '../../../../graphql/offenders/mutations/EditOffenderMutation';
import AllOffenderLabels from '../../../../graphql/offenderLabels/queries/AllOffenderLabels';
import { useStoreActions, useStoreState } from '../../../../state';
import { useParams } from 'react-router-dom';

const EditOffenderQuery = () => {
  const params = useParams()
  const userId = useStoreState(state => state.user.id);
  const setStatusBar = useStoreActions(actions => actions.theme.setStatusBar);
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setNavbarActionDisabled = useStoreActions(
    actions => actions.theme.setNavbarActionDisabled
  );
  const toggleNotificationBar = useStoreActions(
    actions => actions.theme.toggleNotificationBar
  );

  // queries
  const { data: offenderData, loading: offenderLoading } = useQuery(
    OffenderQuery,
    {
      variables: {
        id: params.id,
        active: true
      },
      fetchPolicy: 'cache-and-network'
    }
  );
  const { data: warningsData, loading: warningsLoading } = useQuery(
    AllOffenderLabels,
    {
      variables: {
        schemeId: window.localStorage.getItem('currentScheme')
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  // mutations
  const [createImage, { data }] = useMutation(CreateImage, {
    update: (store, { data: { uploadImage } }) => {
      let data = store.readQuery({
        query: OffenderQuery,
        variables: {
          id: params.id,
          active: true
        }
      });
      data.offender.images.push(uploadImage);
      store.writeQuery({
        query: OffenderQuery,
        data,
        variables: {
          id: params.id,
          active: true
        }
      });
    }
  });
  const [editOffender] = useMutation(EditOffenderMutation, {
    update: (store, { data: { updateOffender } }) => {
      let data = store.readQuery({
        query: AllOffenderLabels,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
      if (warningsData.tags.length < updateOffender.tags.length) {
        data.tags = [
          ...data.tags,
          updateOffender.tags.find(
            ({ id }) => !warningsData.tags.map(({ id }) => id).includes(id)
          )
        ];
      }
      store.writeQuery({
        query: AllOffenderLabels,
        data,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
    }
  });

  return (
    <EditOffender
      offenderId={params.id}
      offender={
        !!offenderData && !!offenderData.offender ? offenderData.offender : {}
      }
      loading={offenderLoading}
      setStatusBar={setStatusBar}
      createImage={createImage}
      returnData={data}
      editOffender={editOffender}
      setTitle={setTitle}
      setBottomNav={setBottomNav}
      setNavbarAction={setNavbarAction}
      allOffenderWarnings={
        !!warningsData && !!warningsData.tags ? warningsData.tags : {}
      }
      userId={userId}
      setBackLinkTo={setBackLinkTo}
      labelsLoading={warningsLoading}
      setNavbarActionDisabled={setNavbarActionDisabled}
      toggleNotificationBar={toggleNotificationBar}
    />
  );
};

export default EditOffenderQuery;
