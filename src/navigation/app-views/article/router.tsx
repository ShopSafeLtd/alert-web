import React from 'react';
import { Route, Routes } from 'react-router';
import CreateArticle from 'views/article/CreateArticle/CreateArticle.container';
import ViewGrid from 'views/article/Grids/Grids.container';
import ViewArticle from 'views/article/ViewArticle/ViewArticle.container';

const Article = (): JSX.Element => (
  <Routes>
    <Route index element={<CreateArticle />} />
    <Route path="view/:id" element={<ViewArticle />} />
    <Route path="grid" element={<ViewGrid />} />
  </Routes>
);

export default Article;
