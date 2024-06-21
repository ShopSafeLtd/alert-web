import React from 'react';
import { Route, Routes } from 'react-router';
import CreateArticle from 'views/article/CreateEditArticle/CreateEditArticle.container';
import ArticleFeed from 'views/article/ArticleFeed';
import ViewArticle from 'views/article/ViewArticle/ViewArticle.container';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useIntl } from 'react-intl';
import RouteWrapper from '#/navigation/utils/route-wrapper';
import { Navigate, useParams } from 'react-router-dom';

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
          index
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Articles,
                method: PermissionMethod.Read,
              }}
            >
              <ArticleFeed />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="add"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Articles,
                method: PermissionMethod.Write,
              }}
            >
              <CreateArticle />
            </PermissionCheckWrapper>
          }
        />
        <Route
          path="view/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Articles,
                method: PermissionMethod.Read,
              }}
            >
              <ViewArticle />
            </PermissionCheckWrapper>
          }
        />
        <Route path="offenders/view/:id" element={<RedirectOffenders />} />
        <Route
          path="edit/:id"
          element={
            <PermissionCheckWrapper
              permission={{
                model: PermissionModel.Articles,
                method: PermissionMethod.Edit,
              }}
            >
              <CreateArticle />
            </PermissionCheckWrapper>
          }
        />
      </Routes>
    </RouteWrapper>
  );
};

export default Article;
