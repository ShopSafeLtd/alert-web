import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '#/graphql/generated';
import Evidence from '#/views/evidence/Evidence';
import React from 'react';
import { Route, Routes } from 'react-router';

const Article = (): JSX.Element => (
  <Routes>
    <Route
      index
      // element={<EvidenceList />}
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Evidence,
            method: PermissionMethod.Read,
          }}
        >
          <Evidence />
        </PermissionCheckWrapper>
      }
    />
    {/* <Route index element={<Evidence />} /> */}
  </Routes>
);

export default Article;
