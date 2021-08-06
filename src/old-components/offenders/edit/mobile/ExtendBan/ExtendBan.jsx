import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';

import { ExtendExclusionForm } from '../../../../forms';
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

class ExtendBan extends PureComponent {
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
        onCompleted={({ ban: { startDate, endDate } }) => {
          pristine &&
            this.setState({
              startDate,
              endDate,
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
                    <HeaderText>Extend Ban</HeaderText>
                    <HeaderSubText>
                      Enter the new start and end date for the ban and give a
                      reason for the change.
                    </HeaderSubText>
                  </Header>
                  <Form>
                    <ExtendExclusionForm
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
                  <FullWidthButton text="Submit Ban" onClick={handleSubmit} />
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

export default ExtendBan;
