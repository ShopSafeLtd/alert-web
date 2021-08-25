import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import LogRocket from "logrocket";
import * as Sentry from "@sentry/react";

import { CurrentUser } from "../../../graphql/users/queries";
import Loading from "../../global/Loading/Loading";
import { useStoreActions } from "../../../state";

const UserProvider = ({ children }) => {
  const setUser = useStoreActions((actions) => actions.user.setUser);

  // state
  const [loaded, setLoaded] = useState(false);
  // queries
  useQuery(CurrentUser, {
    fetchPolicy: "network-only",
    onCompleted: ({ currentUser: user }) => {
      if (!!user) {
        setUser({
          email: user.email,
          fullName: user.fullName,
          id: user.id,
          onboarded: !user.newUser,
          organisation: user.organisation,
          onboardSteps: user.onboardSteps,
        });
        if (!!window.localStorage.getItem("currentScheme")) {
          if (
            !!user.schemes.find(
              (obj) =>
                obj.scheme.id === window.localStorage.getItem("currentScheme")
            )
          ) {
            setUser({
              role: user.schemes.find(
                (obj) =>
                  obj.scheme.id === window.localStorage.getItem("currentScheme")
              ).role,
            });
            LogRocket.identify(user.id, {
              name: user.fullName,
              email: user.email,
              role: user.schemes.find(
                (obj) => obj.scheme.id === user.schemes[0].scheme.id
              ).role,
            });
            Sentry.configureScope(function (scope) {
              scope.setUser({
                name: user.fullName,
                email: user.email,
                id: user.id,
              });
            });
          } else {
            window.localStorage.setItem(
              "currentScheme",
              user.schemes[0].scheme.id
            );
            setUser({
              role: user.schemes.find(
                (obj) => obj.scheme.id === user.schemes[0].scheme.id
              ).role,
            });
            LogRocket.identify(user.id, {
              name: user.fullName,
              email: user.email,
              role: user.schemes.find(
                (obj) => obj.scheme.id === user.schemes[0].scheme.id
              ).role,
            });
            Sentry.configureScope(function (scope) {
              scope.setUser({
                name: user.fullName,
                email: user.email,
                id: user.id,
              });
            });
          }
          setLoaded(true);
        } else {
          window.localStorage.setItem(
            "currentScheme",
            user.schemes[0].scheme.id
          );
          setUser({
            role: user.schemes.find(
              (obj) => obj.scheme.id === user.schemes[0].scheme.id
            ).role,
          });
          setLoaded(true);
        }
      } else {
        setLoaded(true);
      }
    },
    onError: (e) => {
      setLoaded(true);
    },
  });

  return !loaded ? <Loading /> : children;
};

export default UserProvider;
