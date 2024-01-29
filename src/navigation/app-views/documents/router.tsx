import React from 'react';
import { Route, Routes } from 'react-router';
import ListDocuments from '../../../views/resources/documents/ListDocuments/Documents.container';
import ListVideos from '../../../views/resources/training/ListVideos/ListVideos.view';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const Documents = (): JSX.Element => (
  <Routes>
    <Route
      path="documents/*"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Documents,
            method: PermissionMethod.Read,
          }}
        >
          <ListDocuments />
        </PermissionCheckWrapper>
      }
    />
    <Route path="training/*" element={<ListVideos />} />
  </Routes>
);

export default Documents;
