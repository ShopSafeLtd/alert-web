import React, { Component } from 'react';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';

import Loading from '../../global/Loading/Loading';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggingIn: false
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user !== undefined && user !== null) {
      this.props.setCurrentUser(user);
      if (window.localStorage.getItem('currentScheme') !== null) {
        if (
          !!user.schemes.find(
            obj =>
              obj.scheme.id === window.localStorage.getItem('currentScheme')
          )
        ) {
          this.props.setUserRole(
            user.schemes.find(
              obj =>
                obj.scheme.id === window.localStorage.getItem('currentScheme')
            ).role
          );
          LogRocket.identify(user.id, {
            name: user.fullName,
            email: user.email,
            role: user.schemes.find(
              obj => obj.scheme.id === user.schemes[0].scheme.id
            ).role
          });
          Sentry.configureScope(function(scope) {
            scope.setUser({
              name: user.fullName,
              email: user.email,
              id: user.id
            });
          });
        } else {
          window.localStorage.setItem(
            'currentScheme',
            user.schemes[0].scheme.id
          );
          this.props.setUserRole(
            user.schemes.find(
              obj => obj.scheme.id === user.schemes[0].scheme.id
            ).role
          );
          LogRocket.identify(user.id, {
            name: user.fullName,
            email: user.email,
            role: user.schemes.find(
              obj => obj.scheme.id === user.schemes[0].scheme.id
            ).role
          });
          Sentry.configureScope(function(scope) {
            scope.setUser({
              name: user.fullName,
              email: user.email,
              id: user.id
            });
          });
        }
        this.setState({
          loaded: true,
          loggingIn: false
        });
      } else {
        window.localStorage.setItem('currentScheme', user.schemes[0].scheme.id);
        this.props.setUserRole(
          user.schemes.find(obj => obj.scheme.id === user.schemes[0].scheme.id)
            .role
        );
        this.setState({
          loaded: true,
          loggingIn: false
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    if (!!user && this.state.loaded === false) {
      this.props.setCurrentUser(user);
      if (window.localStorage.getItem('currentScheme') !== null) {
        if (
          !!user.schemes.find(
            obj =>
              obj.scheme.id === window.localStorage.getItem('currentScheme')
          )
        ) {
          this.props.setUserRole(
            user.schemes.find(
              obj =>
                obj.scheme.id === window.localStorage.getItem('currentScheme')
            ).role
          );
        } else {
          window.localStorage.setItem(
            'currentScheme',
            user.schemes[0].scheme.id
          );
          this.props.setUserRole(
            user.schemes.find(
              obj => obj.scheme.id === user.schemes[0].scheme.id
            ).role
          );
        }
        this.setState({
          loaded: true,
          loggingIn: false
        });
      } else {
        window.localStorage.setItem('currentScheme', user.schemes[0].scheme.id);
        this.props.setUserRole(
          user.schemes.find(obj => obj.scheme.id === user.schemes[0].scheme.id)
            .role
        );
        this.setState({
          loaded: true,
          loggingIn: false
        });
      }
    } else if (prevState.loaded !== true) {
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    const { loaded } = this.state;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        refetch: () => this.setState({ loaded: false, loggingIn: true })
      });
    });
    return !loaded ? <Loading /> : children;
  }
}

export default Provider;
