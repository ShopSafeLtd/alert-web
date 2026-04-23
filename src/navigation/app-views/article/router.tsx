import RouteWrapper from '#/navigation/utils/route-wrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import ArticleFeed from 'views/article/ArticleFeed';
import CreateArticle from 'views/article/CreateEditArticle/CreateEditArticle.container';
import ViewArticle from 'views/article/ViewArticle/ViewArticle.container';

import CustomErrorBoundary from '../../../components/CustomErrorBoundary';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';

const RedirectOffenders = () => {
  const { id } = useParams();
  return <Navigate to={`/app/offenders/view/${id}`} />;
};

const Article = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Bulletins',
      })}
    >
      <Routes>
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Articles,
              }}
            >
              <CustomErrorBoundary>
                <ArticleFeed />
              </CustomErrorBoundary>
            </PermissionCheckWrapper>
          }
          index
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.Articles,
              }}
            >
              <CreateArticle />
            </PermissionCheckWrapper>
          }
          path="add"
        />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Read,
                model: PermissionModel.Articles,
              }}
            >
              <ViewArticle />
            </PermissionCheckWrapper>
          }
          path="view/:id"
        />
        <Route element={<RedirectOffenders />} path="offenders/view/:id" />
        <Route
          element={
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Edit,
                model: PermissionModel.Articles,
              }}
            >
              <CreateArticle />
            </PermissionCheckWrapper>
          }
          path="edit/:id"
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Article;
