import React from 'react';
import { Route, Routes } from 'react-router';
import ListDocuments from '../../../views/documents/ListDocuments/Documents.container';

const Documents = (): JSX.Element => (
  <Routes>
    <Route index element={<ListDocuments />} />
  </Routes>
);

export default Documents;
