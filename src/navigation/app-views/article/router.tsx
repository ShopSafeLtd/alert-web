import React from 'react';
import { Route, Routes } from 'react-router';
import CreateArticle from 'views/article/CreateArticle/CreateArticle.container';
import ViewArticle from 'views/article/ViewArticle/ViewArticle.container';
import EditArticle from 'views/article/EditArticle/EditArticle.container';
import ArticleFeed from 'views/article/ArticleFeed';

const Article = (): JSX.Element => (
  <Routes>
    <Route index element={<ArticleFeed />} />
    <Route path="add" element={<CreateArticle />} />
    <Route path="view/:id" element={<ViewArticle />} />
    <Route path="edit/:id" element={<EditArticle />} />
  </Routes>
);

export default Article;
