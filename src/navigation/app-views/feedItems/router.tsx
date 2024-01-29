import React from 'react';
import { Route, Routes } from 'react-router';
import FeedItem from '../../../views/dashboard';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

// import ReviewIncident from 'views/incidents/ReviewIncident ';

const FeedItems = (): JSX.Element => (
  <Routes>
    <Route
      index
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Incidents,
            method: PermissionMethod.Read,
          }}
          unauthorizedElement={<div />}
        >
          <FeedItem />
        </PermissionCheckWrapper>
      }
    />
    {/* <Route path="view/:id" element={<ViewIncident />} />
    <Route path="add" element={<AddIncident />} />
    <Route path="edit/:id" element={<EditIncident reviewed={false} />} /> */}
    {/* <Route path="review/:id" element={<ReviewIncident />} /> */}
    {/* <Route path="review/:id" element={<EditIncident reviewed />} /> */}
  </Routes>
);

export default FeedItems;
