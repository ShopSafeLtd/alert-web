import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { useStoreState } from "state";
import Loading from "./auth-views/authentication/loading";
import { useAuth } from "hooks";
import { useQuery } from "@apollo/client";
import { UserNew, UserNewArgs, UserNewRes } from "graphql-src/users/queries";

import PrimaryOnboarding from "../old-components/users/onboard/Primary/PrimaryOnboarding";

export const Views = () => {
  const [newUserId, setNewUserId] = useState<string>("");

  const locale = useStoreState((state) => state.theme.locale);
  const isSet = useStoreState((state) => state.auth.isSet);

  const location = useLocation();

  // @ts-expect-error
  const currentAppLocale = AppLocale[locale];

  const { rehydrateAuth } = useAuth();

  useEffect(() => {
    rehydrateAuth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newUserId = location?.pathname?.split("/onboarding/")[1] || "";
    if (newUserId !== "password") {
      setNewUserId(newUserId);
    }
  }, [location]);

  const { data } = useQuery<UserNewRes, UserNewArgs>(UserNew, {
    fetchPolicy: "network-only",
    variables: {
      id: newUserId,
    },
  });

  console.log("test 1");

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd}>
        {isSet && data ? (
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="app" />} />
              <Route path="auth/*" element={<AuthLayout />} />
              <Route path="app/*" element={<AppLayout location={location} />} />
              <Route
                path="onboarding"
                element={
                  <PrimaryOnboarding
                    user={{ id: newUserId, email: data.userNew?.email }}
                  />
                }
              />
            </Route>
          </Routes>
        ) : (
          <Loading />
        )}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default Views;
