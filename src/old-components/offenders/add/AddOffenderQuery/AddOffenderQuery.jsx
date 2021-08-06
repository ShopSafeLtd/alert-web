import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import AddOffender from '../AddOffender/AddOffender';
import AddOffenderMutation from '../../../../graphql/offenders/mutations/AddOffenderMutation';
import AddExclusion from '../../../../graphql/exclusions/mutations/AddExclusion';
import AllGroups from '../../../../graphql/groups/AllGroupsQuery';
import AllOffenderLabels from '../../../../graphql/offenderLabels/queries/AllOffenderLabels';
import Upload from '../../../../graphql/images/mutations/uploadImages';
import { OffenderFeed } from '../../../../graphql/offenders/queries';
import { StatusContext } from '../../../../providers/StatusProvider';
import { useStoreState, useStoreActions } from '../../../../state';

let querySize = 10;
if (window.innerWidth > 1239 && window.innerWidth < 1800) {
  querySize = 12;
} else if (window.innerWidth > 1799) {
  querySize = 16;
}

const AddOffenderQuery = () => {
  const createdById = useStoreState(state => state.user.id);
  const autoApprove = useStoreState(state => state.scheme.autoApproveOffenders);
  const role = useStoreState(state => state.user.role);
  const admin = role === 'SCHEME_ADMIN' ? true : false;
  const setStatusBar = useStoreActions(actions => actions.theme.setStatusBar);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setNavbarActionDisabled = useStoreActions(
    actions => actions.theme.setNavbarActionDisabled
  );
  const toggleNotificationBar = useStoreActions(
    actions => actions.theme.toggleNotificationBar
  );
  const toggleFetchOffenders = useStoreActions(
    actions => actions.theme.setNavbarActionDisabled
  );

  const { setStatus } = useContext(StatusContext);
  // queries
  const { data: groupsData, loading: groupsLoading } = useQuery(AllGroups, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      user: admin ? undefined : { some: { id: { equals: createdById } } }
    },
    fetchPolicy: 'cache-and-network'
  });
  const { data: offenderLabelsData, offenderLabelsLoading } = useQuery(
    AllOffenderLabels,
    {
      variables: {
        schemeId: window.localStorage.getItem('currentScheme')
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  // mutations
  const [createExclusion] = useMutation(AddExclusion);
  const [uploadImage, { data }] = useMutation(Upload);
  const [createOffender] = useMutation(AddOffenderMutation, {
    onCompleted: () =>
      setStatus({
        status: 'success',
        text: 'Your offender has been uploaded!',
        clearable: true,
        timed: true
      }),
    update: (store, { data: { createOffender } }) => {
      let data = store.readQuery({
        query: OffenderFeed,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme'),
          search: '',
          first: querySize,
          order: { createdAt: 'desc' },
          userId: createdById,
          excluded: false,
          role
        }
      });
      data.offenderFeed.unshift({
        ...createOffender
      });
      store.writeQuery({
        query: OffenderFeed,
        data,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme'),
          search: '',
          first: querySize,
          order: { createdAt: 'desc' },
          userId: createdById,
          excluded: false,
          role
        }
      });
    }
  });

  return (
    <AddOffender
      setStatusBar={setStatusBar}
      setBottomNav={setBottomNav}
      setNavbarAction={setNavbarAction}
      setTitle={setTitle}
      setBackLinkTo={setBackLinkTo}
      setNavbarActionDisabled={setNavbarActionDisabled}
      createImage={uploadImage}
      returnData={data}
      createOffender={createOffender}
      createdById={createdById}
      createExclusion={createExclusion}
      groups={!!groupsData && !!groupsData.groups ? groupsData.groups : []}
      groupsLoading={groupsLoading}
      labelsLoading={offenderLabelsLoading}
      admin={admin}
      autoApprove={autoApprove}
      allOffenderLabels={
        !!offenderLabelsData && !!offenderLabelsData.tags
          ? offenderLabelsData.tags
          : []
      }
      toggleNotificationBar={toggleNotificationBar}
      toggleFetchOffenders={toggleFetchOffenders}
      role={role}
      setStatus={setStatus}
    />
  );
};

export default AddOffenderQuery;
