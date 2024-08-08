import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import ActiveChecklistContainer from 'views/checklist/active-checklist/ActiveChecklist.container';
import CreateChecklist from 'views/checklist/create-edit-checklist/CreateChecklist.container';
import ChecklistFeed from 'views/checklist/list-checklists/ListChecklists.container';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const Checklist = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Checklists',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Checklist,
              }}
            >
              <ChecklistFeed />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.Checklist,
              }}
            >
              <CreateChecklist />
            </PermissionCheckWrapper>
          }
          path="add"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Edit,
                model: PermissionModel.Checklist,
              }}
            >
              <CreateChecklist />
            </PermissionCheckWrapper>
          }
          path="edit/:id"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Edit,
                model: PermissionModel.Checklist,
              }}
            >
              <ActiveChecklistContainer />
            </PermissionCheckWrapper>
          }
          path="active/:id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Checklist;
