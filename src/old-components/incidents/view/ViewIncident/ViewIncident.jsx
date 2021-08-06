import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import MediaQuery from 'react-responsive';

import { IncidentQuery } from '../../../../graphql/incidents/queries';
import { useStoreActions } from '../../../../state';
import ViewIncidentMobile from '../mobile/ViewIncidentMobile/ViewIncidentMobile';

const ViewIncident = ({
  match: {
    params: { id }
  }
}) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );

  useEffect(() => {
    setTitle('View Incident');
    setNavbarAction('back');
    return () => {
      setTitle('');
      setNavbarAction('default');
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Query
      query={IncidentQuery}
      variables={{
        id
      }}
      errorPolicy="ignore"
      fetchPolicy="cache-and-network"
    >
      {({ data: { Alert } }) => {
        return (
          <MediaQuery minDeviceWidth={1024}>
            {matches =>
              matches ? <div /> : <ViewIncidentMobile incident={Alert} />
            }
          </MediaQuery>
        );
      }}
    </Query>
  );
};

export default ViewIncident;
