import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';
import { Mutation } from 'react-apollo';

import { PopOver, PopOverContainer } from '../../../global/layout';
import { FullWidthButton, BackButton } from '../../../global/actions';
import { ExtendExclusionForm } from '../../../forms';
import CreateHistory from '../../../../graphql/history/mutations/CreateHistory';
import ExclusionQuery from '../../../../graphql/exclusions/queries/Exclusion';
import EditMutation from '../../../../graphql/exclusions/mutations/EditExclusion';

class ExtendExclusionPopOver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
      reasonError: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(prevProps.exclusion).length === 0 &&
      this.props.exclusion !== {}
    ) {
      this.setState({
        startDate: this.props.exclusion.startDate,
        endDate: this.props.exclusion.endDate
      });
    }
  }

  handleChange = (value, field) => {
    this.setState({ [field]: value });
  };

  handleClose = () => {
    this.setState({
      startDate: '',
      endDate: '',
      reason: '',
      reasonError: ''
    });
    this.props.close();
  };

  render() {
    const {
      visible,
      close,
      exclusion,
      setStatusBar,
      currentUserId
    } = this.props;
    const { submitting, startDate, endDate, reason, reasonError } = this.state;

    return (
      <Mutation
        mutation={CreateHistory}
        refetchQueries={[
          {
            query: ExclusionQuery,
            variables: {
              id: exclusion.id
            }
          }
        ]}
      >
        {createHistory => (
          <Mutation mutation={EditMutation}>
            {editExclusion => {
              const handleSubmit = async () => {
                if (this.state.reason !== '') {
                  setStatusBar(true, 'Extending Ban...');
                  this.setState({ submitting: true });
                  editExclusion({
                    variables: {
                      id: exclusion.id,
                      startDate,
                      endDate
                    }
                  });
                  createHistory({
                    variables: {
                      type: 'EXTENDED',
                      model: 'EXCLUSION',
                      notes: reason,
                      byUserId: currentUserId,
                      schemeId: window.localStorage.getItem('currentScheme'),
                      exclusionId: exclusion.id
                    }
                  });
                  setStatusBar(false, '');
                  this.setState({ submitting: false });
                  this.handleClose();
                } else {
                  this.setState({
                    reasonError: 'This field is required.'
                  });
                }
              };
              return (
                <MediaQuery minDeviceWidth={1024}>
                  {matches => (
                    <PopOver
                      noPadding
                      open={visible}
                      width={matches ? 500 : window.innerWidth - 15}
                      handleClose={() => close()}
                      title={'Extend Ban'}
                      actions={[
                        <BackButton
                          key={Math.random()}
                          disabled={submitting}
                          onClick={() => close()}
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
                          Extend Ban
                        </Button>
                      ]}
                      mobileAction={[
                        <FullWidthButton
                          key={Math.random()}
                          text="Save"
                          onClick={handleSubmit}
                          position="ABSOLUTE"
                          disabled={submitting}
                        />
                      ]}
                    >
                      <PopOverContainer>
                        <ExtendExclusionForm
                          data={{
                            startDate,
                            endDate,
                            reason,
                            reasonError
                          }}
                          handleChange={this.handleChange}
                        />
                      </PopOverContainer>
                    </PopOver>
                  )}
                </MediaQuery>
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default ExtendExclusionPopOver;
