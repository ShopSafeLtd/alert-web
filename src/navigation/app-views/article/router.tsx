import React from 'react';
import { Route, Routes } from 'react-router';
import CreateArticle from 'views/article/CreateArticle/CreateArticle.container';

const Article = (): JSX.Element => (
  <Routes>
    <Route index element={<CreateArticle />} />
  </Routes>
);

export default Article;
