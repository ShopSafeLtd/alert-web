import React from 'react';
import { Route, Routes } from 'react-router';
import CreateArticle from 'views/article/CreateArticle/CreateArticle.container';
import EditArticle from 'views/article/EditArticle/EditArticle.container';
import ArticleFeed from 'views/article/ArticleFeed';
import PermissionCheckWrapper from '../../../components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from '../../../graphql/generated';

const Article = (): JSX.Element => (
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
          <ArticleFeed />
        </PermissionCheckWrapper>
      }
    />
    <Route
      path="edit/:id"
      element={
        <PermissionCheckWrapper
          permission={{
            model: PermissionModel.Articles,
            method: PermissionMethod.Edit,
          }}
        >
          <EditArticle />
        </PermissionCheckWrapper>
      }
    />
  </Routes>
);

export default Article;
