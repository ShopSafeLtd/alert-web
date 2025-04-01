import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import VisionCentre from '#/views/vision/vision-centre/VisionCentre.view';
import VisionMatches from '#/views/vision/vision-matches/VisionMatches.view';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const Suggestions = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Vision',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <VisionCentre />
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <VisionMatches />
            </PermissionCheckWrapper>
          }
          path="all-matches"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Suggestions;
