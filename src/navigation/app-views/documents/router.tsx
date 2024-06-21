import React from 'react';
import { Route, Routes } from 'react-router';
import ListDocuments from '../../../views/resources/documents/ListDocuments/Documents.container';
import ListVideos from '../../../views/resources/training/ListVideos/ListVideos.view';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';

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
    </RouteWrapper>
  );
};

export default Documents;
