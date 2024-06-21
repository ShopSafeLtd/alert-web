import React from 'react';
import { Route, Routes } from 'react-router';
import CreateChecklist from 'views/checklist/create-edit-checklist/CreateChecklist.container';
import ChecklistFeed from 'views/checklist/list-checklists/ListChecklists.container';
import ActiveChecklistContainer from 'views/checklist/active-checklist/ActiveChecklist.container';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

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
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Checklist,
                method: PermissionMethod.Read,
              }}
            >
              <ChecklistFeed />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="add"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Checklist,
                method: PermissionMethod.Write,
              }}
            >
              <CreateChecklist />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="edit/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Checklist,
                method: PermissionMethod.Edit,
              }}
            >
              <CreateChecklist />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="active/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Checklist,
                method: PermissionMethod.Edit,
              }}
            >
              <ActiveChecklistContainer />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Checklist;
