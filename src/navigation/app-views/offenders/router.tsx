import React from "react";
import { Routes, Route } from "react-router";
import Feed from "old-components/offenders/feed/OffenderFeedQuery/OffenderFeedQuery";
import Add from "../../../old-components/offenders/add/AddOffender/AddOffender";
import Edit from "../../../old-components/offenders/edit/EditOffender/EditOffender";

const Offenders = () => {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="add" element={<Add />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default Offenders;
