import React from "react";
import { Routes, Route } from "react-router";
import Feed from "old-components/incidents/feed/AlertFeedQuery/AlertFeedQuery";
import Add from "old-components/incidents/add/AddIncident/AddIncident";
import Edit from "old-components/incidents/edit/EditIncident/EditIncident";

const Incidents = () => {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="add" element={<Add />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default Incidents;
