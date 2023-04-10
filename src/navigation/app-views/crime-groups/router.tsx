import React from 'react';
import { Routes, Route } from 'react-router';
import ListCrimeGroups from 'views/Profiles/crime-groups/list-crime-groups';
import CreateCrimeGroup from 'views/Profiles/crime-groups/create-crime-group';
import ViewCrimeGroup from 'views/Profiles/crime-groups/view-crime-group';

const CrimeGroups = (): JSX.Element => (
  <Routes>
    <Route index element={<ListCrimeGroups />} />
    <Route path="create" element={<CreateCrimeGroup />} />
    <Route path="view/:id" element={<ViewCrimeGroup />} />
  </Routes>
);

export default CrimeGroups;
