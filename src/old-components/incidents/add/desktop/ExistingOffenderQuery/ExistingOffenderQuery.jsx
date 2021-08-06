import React, { Component } from 'react';
import { Query } from 'react-apollo';

import AllOffendersFiltered from '../../../../../graphql/offenders/queries/AllOffendersFiltered';
import loadQuery from '../../../../../graphql/offenders/queries/MoreFilteredOffenders';
import ExistingOffenders from '../ExistingOffenders/ExistingOffenders';

class ExistingOffenderQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      fetching: false,
      allLoaded: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({
        allLoaded: false
      });
    }
  }

  handleSearch = search =>
    this.setState({
      search: search
    });

  render() {
    const { search, allLoaded, fetching } = this.state;
    const {
      refetch,
      selected,
      toggleSelected,
      setCurrentOffender,
      current,
      setStatusBar,
      addExistingOffenders,
      existingOffenders,
      userId,
      close
    } = this.props;
    return (
      <Query
        query={AllOffendersFiltered}
        variables={{
          schemeId: window.localStorage.getItem('currentScheme'),
          search,
          offendersIds: existingOffenders.map(({ id }) => id),
          userId: userId
        }}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, fetchMore }) => {
          // Set pagination cursor
          let cursor;
          if (!loading && data !== undefined && data.offenders.length > 0) {
            cursor = data.offenders.slice(-1)[0].id;
          }

          const loadMore = async () => {
            if (!allLoaded && !fetching) {
              this.setState({
                fetching: true
              });
              setStatusBar(true, 'Loading more offenders...');

              await fetchMore({
                query: loadQuery,
                variables: {
                  cursor,
                  schemeId: window.localStorage.getItem('currentScheme'),
                  search,
                  userId: userId
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (fetchMoreResult.offenders.length === 0) {
                    this.setState({
                      allLoaded: true
                    });
                  }
                  return {
                    offenders: [
                      ...previousResult.offenders,
                      ...fetchMoreResult.offenders
                    ]
                  };
                }
              });
              this.setState({
                fetching: false
              });
              setStatusBar(false, '');
            }
          };

          return (
            <ExistingOffenders
              loading={loading}
              refetch={refetch}
              offenders={data.offenders || []}
              selected={selected}
              toggleSelected={toggleSelected}
              setCurrentOffender={setCurrentOffender}
              current={current}
              search={search}
              handleSearch={this.handleSearch}
              loadMore={loadMore}
              addExistingOffenders={addExistingOffenders}
              close={close}
            />
          );
        }}
      </Query>
    );
  }
}

export default ExistingOffenderQuery;
