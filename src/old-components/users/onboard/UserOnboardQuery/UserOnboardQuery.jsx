import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';

import UserOnboard from '../UserOnboard/UserOnboard';
import query from '../../../../graphql/users/queries/UserOnboard';
import ResetPassword from '../../../../graphql/account/mutations/ResetPasswordMutation';
import EditAddress from '../../../../graphql/account/mutations/EditProfileAddressMutation';
import EditUser from '../../../../graphql/account/mutations/EditProfileMutation';
import AcceptTerms from '../../../../graphql/account/mutations/AcceptTerms';

class UserOnboardQuery extends PureComponent {
  render() {
    const { currentUser, history, setNewUser } = this.props;
    return (
      <Query
        query={query}
        variables={{ id: currentUser }}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
      >
        {({ data: { User }, loading }) => (
          <Mutation mutation={ResetPassword}>
            {setPassword => (
              <Mutation mutation={EditAddress}>
                {editAddress => (
                  <Mutation mutation={EditUser}>
                    {editUser => (
                      <Mutation mutation={AcceptTerms}>
                        {acceptTerms => (
                          <UserOnboard
                            user={User}
                            loading={loading}
                            setPassword={setPassword}
                            editAddress={editAddress}
                            editUser={editUser}
                            acceptTerms={acceptTerms}
                            history={history}
                            setNewUser={setNewUser}
                          />
                        )}
                      </Mutation>
                    )}
                  </Mutation>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default UserOnboardQuery;
