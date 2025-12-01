import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import ListDocuments from '../../../views/resources/folders/ListFolders/ListFolders.container';
import ViewFolder from '../../../views/resources/folders/ViewFolder/ViewFolder.container';
import ListVideos from '../../../views/resources/training/ListVideos';

const Documents = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Documents',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Documents,
              }}
            >
              <ListDocuments />
            </PermissionCheckWrapper>
          }
          path="folders/*"
        />
        <Route element={<ViewFolder />} path="folders/view/:id" />

        <Route element={<ListVideos />} path="training/*" />
      </Routes>
    </RouteWrapper>
  );
};

export default Documents;
