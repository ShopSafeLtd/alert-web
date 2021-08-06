import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import OffendersList from '../OffendersList/OffendersList';
import AddOffender from '../AddOffender/AddOffender';
import FindOffender from '../FindOffender/FindOffender';
import ViewFindOffender from '../ViewFindOffender/ViiewFindOffender';
import ViewOffender from '../ViewOffender/ViewOffender';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

class EditOffenders extends PureComponent {
  removeOffender = offender => {
    this.props.updateIncident({
      variables: {
        id: this.props.incidentId,
        offenders: {
          disconnect: [{ id: offender }]
        }
      }
    });
  };

  addNewOffender = ({
    age,
    build,
    dateOfBirth,
    dateSource,
    gender,
    hair,
    name,
    peculiarities,
    race
  }) => {
    this.props.updateIncident({
      variables: {
        id: this.props.incidentId,
        offenders: {
          create: [
            {
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
                  id: this.props.userId
                }
              },
              scheme: {
                connect: {
                  id: window.localStorage.getItem('currentScheme')
                }
              },
              approved: true,
              groups: {
                connect: this.props.groups.map(({ id }) => ({ id }))
              }
            }
          ]
        }
      }
    });
  };

  addExistingOffender = id =>
    this.props.updateIncident({
      variables: {
        id: this.props.incidentId,
        offenders: {
          connect: [{ id }]
        }
      }
    });

  render() {
    const {
      incidentId,
      loading,
      setBackLinkTo,
      basePath,
      offenders,
      userId,
      schemeAdmin
    } = this.props;
    return (
      <Page>
        <Route
          exact
          path="/incidents/edit/:id/offenders"
          render={({ history }) => (
            <OffendersList
              history={history}
              offenders={offenders}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              removeOffender={this.removeOffender}
              loading={loading}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/offenders/add"
          render={({ history }) => (
            <AddOffender
              history={history}
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              addNewOffender={this.addNewOffender}
            />
          )}
        />
        <Route
          exact
          path="/incidents/edit/:id/offenders/find"
          render={({ history }) => (
            <FindOffender
              history={history}
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              existingOffenders={offenders}
              userId={userId}
              incidentId={incidentId}
              schemeAdmin={schemeAdmin}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/offenders/find/:offender"
          render={({ history, match }) => (
            <ViewFindOffender
              history={history}
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              match={match}
              addExistingOffender={this.addExistingOffender}
              incidentId={incidentId}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/offenders/view/:offenderId"
          render={({ history, match }) => (
            <ViewOffender
              history={history}
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              match={match}
            />
          )}
        />
      </Page>
    );
  }
}

export default withRouter(EditOffenders);
