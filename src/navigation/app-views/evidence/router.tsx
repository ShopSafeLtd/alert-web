import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import Evidence from '#/views/evidence/Evidence';
import React from 'react';
import { Route, Routes } from 'react-router';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

const Article = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Evidence',
      })}
    >
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
    </RouteWrapper>
  );
};

export default Article;
