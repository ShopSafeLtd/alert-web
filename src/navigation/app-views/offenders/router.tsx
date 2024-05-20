import React from 'react';
import { Route, Routes } from 'react-router';
import OffenderFeed from 'views/profiles/offenders/OffenderFeed';
import ViewOffender from 'views/profiles/offenders/ViewOffender';
import AddOffender from 'views/profiles/offenders/AddOffender';
// import EditOffender from 'views/profiles/offenders/EditOffender';
import CompareOffender from 'views/profiles/offenders/CompareOffender';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

const Offenders = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Offenders',
        id: 'xb54TN',
      })}
    >
      <Routes>
        <Route
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Offenders,
                method: PermissionMethod.Read,
              }}
            >
              <OffenderFeed />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Offenders,
                method: PermissionMethod.Read,
              }}
            >
              <ViewOffender />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="add"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Offenders,
                method: PermissionMethod.Write,
              }}
            >
              <AddOffender />
            </PermissionCheckWrapper>
          }
        />
        {/* <Route
        path="edit/:id"
        element={
          <PermissionCheckWrapper
            permission={{
              model: PermissionModel.Offenders,
              method: PermissionMethod.Edit,
            }}
          >
            <EditOffender reviewed={false} />
          </PermissionCheckWrapper>
        }
      /> */}
        {/* <Route
        path="review/:id"
        element={
          <PermissionCheckWrapper
            permission={{
              model: PermissionModel.Offenders,
              method: PermissionMethod.Edit,
            }}
            unauthorizedElement={<div />}
          >
            <EditOffender reviewed />
          </PermissionCheckWrapper>
        }
      /> */}
        <Route
          path="compare/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Offenders,
                method: PermissionMethod.Edit,
              }}
            >
              <CompareOffender />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Offenders;
