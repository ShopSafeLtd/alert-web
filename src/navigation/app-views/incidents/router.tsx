import React from 'react';
import { Route, Routes } from 'react-router';
import IncidentFeed from 'views/incidents/IncidentFeed';
import ViewIncident from 'views/incidents/ViewIncident';
import AddIncident from 'views/incidents/AddIncident';
import EditIncident from 'views/incidents/EditIncident';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
// import ReviewIncident from 'views/incidents/ReviewIncident ';

const Incidents = (): JSX.Element => (
  <Routes>
    <Route index element={<IncidentFeed />} />
    <Route
      path="view/:id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Read,
          }}
        >
          <ViewIncident />
        </PermissionCheckWrapper>
      }
    />

    <Route
      path="add/:investigationId"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Write,
          }}
        >
          <AddIncident />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="add"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Write,
          }}
        >
          <AddIncident />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="edit/:id"
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Edit,
          }}
        >
          <EditIncident reviewed={false} />
        </PermissionCheckWrapper>
      }
    />
    {/* <Route path="review/:id" element={<ReviewIncident />} /> */}
    <Route
      path="review/:id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Edit,
          }}
        >
          <EditIncident reviewed />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default Incidents;
