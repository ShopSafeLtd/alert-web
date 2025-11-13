import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import ListCamerasContainer from '#/views/vision/cameras/ListCameras/ListCameras.container';
import UpsertCamerasContainer from '#/views/vision/cameras/UpsertCameras/UpsertCameras.container';
import ListDetectionConfigsContainer from '#/views/vision/detection-configs/ListDetectionConfigs/ListDetectionConfigs.container';
import DetectionConfigEditContainer from '#/views/vision/detection-configs/ViewConfig/DetectionConfig.container';
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
              <VisionCentre />
            </PermissionCheckWrapper>
          }
          path="view/:id"
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
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <ListDetectionConfigsContainer />
            </PermissionCheckWrapper>
          }
          path="detection-configs"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <ListCamerasContainer />
            </PermissionCheckWrapper>
          }
          path="cameras"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <UpsertCamerasContainer />
            </PermissionCheckWrapper>
          }
          path="cameras/edit/:id"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <UpsertCamerasContainer />
            </PermissionCheckWrapper>
          }
          path="cameras/add"
        />

        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <DetectionConfigEditContainer />
            </PermissionCheckWrapper>
          }
          path="detection-configs/edit/:id"
        />

        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.VisionAi,
              }}
            >
              <DetectionConfigEditContainer />
            </PermissionCheckWrapper>
          }
          path="detection-configs/add"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Suggestions;
