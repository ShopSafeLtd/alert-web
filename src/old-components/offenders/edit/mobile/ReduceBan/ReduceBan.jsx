import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';

import { ReduceExclusionForm } from '../../../../forms';
import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import ExclusionQuery from '../../../../../graphql/exclusions/queries/Exclusion';
import EditMutation from '../../../../../graphql/exclusions/mutations/EditExclusion';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;

class ReduceBan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
      reasonError: '',
      pristine: true
    };
  }

  componentDidMount() {
    this.props.setBackLinkTo(
      `${this.props.basePath}/bans/view/${this.props.match.params.banId}`
    );
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  render() {
    const {
      match: {
        params: { banId, id }
      },
      history
    } = this.props;
    const { startDate, endDate, reason, reasonError, pristine } = this.state;
    return (
      <Query
        query={ExclusionQuery}
        variables={{ id: banId }}
        fetchPolicy="cache-and-network"
        onCompleted={({ ban: { endDate, startDate } }) => {
          pristine &&
            this.setState({
              endDate,
              startDate,
              pristine: false
            });
        }}
      >
        {({ data: { ban }, loading }) => (
          <Mutation mutation={EditMutation}>
            {editBan => {
              const handleSubmit = () => {
                if (reason !== '') {
                  editBan({
                    variables: {
                      id: banId,
                      startDate,
                      endDate
                    },
                    optimisticResponse: {
                      updateExclusion: {
                        ...ban,
                        startDate,
                        endDate
                      }
                    }
                  });
                  history.push(`/offenders/edit/${id}/bans/view/${banId}`);
                } else {
                  this.setState({
                    reasonError: 'This field is required'
                  });
                }
              };
              return (
                <Page>
                  <Header>
                    <HeaderText>Reduce Exclusion</HeaderText>
                    <HeaderSubText>
                      Enter the new start and end date for the exclusion and give a
                      reason for the change.
                    </HeaderSubText>
                  </Header>
                  <Form>
                    <ReduceExclusionForm
                      data={{
                        startDate,
                        endDate,
                        reason,
                        reasonError
                      }}
                      loading={loading}
                      handleChange={this.handleChange}
                    />
                  </Form>
                  <FullWidthButton text="Submit Exclusion" onClick={handleSubmit} />
                </Page>
              );
            }}
          </Mutation>
        )}
      </Query>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo('');
  }
}

export default ReduceBan;
