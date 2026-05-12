import Loading from 'components/shared-components/AntD/Loading';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const PttEvidencePage = lazy(
  () => import('../../../views/ptt/ptt-evidence/PttEvidence.container')
);

const PttRouter = () => (
  <Suspense fallback={<Loading cover="content" />}>
    <Routes>
      <Route element={<PttEvidencePage />} path="evidence" />
      <Route element={<Navigate replace to="evidence" />} path="*" />
    </Routes>
  </Suspense>
);

export default PttRouter;
