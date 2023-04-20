import React from 'react';
import { Route, Routes } from 'react-router';
import ListDocuments from '../../../views/resources/documents/ListDocuments/Documents.container';
import ListVideos from '../../../views/resources/training/ListVideos/ListVideos.view';

const Documents = (): JSX.Element => (
  <Routes>
    <Route path="documents/*" element={<ListDocuments />} />
    <Route path="training/*" element={<ListVideos />} />
  </Routes>
);

export default Documents;
