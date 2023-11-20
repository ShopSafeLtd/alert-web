import React from 'react';
import { Route, Routes } from 'react-router';
import EvidenceList from 'views/evidence/ListEvidence';

const Article = (): JSX.Element => (
  <Routes>
    <Route index element={<EvidenceList />} />
  </Routes>
);

export default Article;
