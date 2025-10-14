import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import Evidence from '#/views/evidence/Evidence';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

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
          // element={<EvidenceList />}
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Evidence,
              }}
            >
              <Evidence />
            </PermissionCheckWrapper>
          }
          index
        />
        {/* <Route index element={<Evidence />} /> */}
      </Routes>
    </RouteWrapper>
  );
};

export default Article;
