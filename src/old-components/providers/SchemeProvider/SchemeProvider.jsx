import React from 'react';
import { Query } from 'react-apollo';

import { CurrentScheme } from '../../../graphql/scheme/queries';
import { useStoreActions, useStoreState } from '../../../state';
import Loading from '../../global/Loading/Loading';

const SchemeProvider = ({ children, ...rest }) => {
  const setCurrentScheme = useStoreActions(actions => actions.scheme.setScheme);
  const schemeId = useStoreState(state => state.scheme.id);

  return (
    <Query
      query={CurrentScheme}
      variables={{
        id: schemeId
      }}
      fetchPolicy="cache-and-network"
      skip={!!schemeId === false}
    >
      {({ data, loading }) => {
        if (!loading && !!data && !!data.scheme) {
          setCurrentScheme({
            id: data.scheme.id,
            name: data.scheme.name,
            autoApproveIncidents: data.scheme.autoApproveIncidents,
            autoApproveOffenders: data.scheme.autoApproveOffenders,
            crimeTypes: data.scheme.tags
          });
          !!data.scheme.logo
            ? window.localStorage.setItem(
                'currentSchemeLogo',
                data.scheme.logo.url
              )
            : window.localStorage.setItem('currentSchemeLogo', '');
        }
        const childrenArray = React.Children.map(children, child => {
          return React.cloneElement(child, {
            ...rest
          });
        });
        return loading ? <Loading /> : childrenArray;
      }}
    </Query>
  );
};

export default SchemeProvider;
