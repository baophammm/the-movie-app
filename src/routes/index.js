import React, { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainLayout from '../layouts/MainLayout';

import AuthRequire from './AuthRequire';
import BlankLayout from '../layouts/BlankLayout';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import MovieCastPage from '../pages/movieDetailsPages/MovieCastPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import MovieOverviewPage from '../pages/movieDetailsPages/MovieOverviewPage';
import FavoriteListPage from '../pages/FavoriteListPage';
import WatchedListPage from '../pages/WatchedListPage';

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetailPage />}>
          <Route index element={<MovieOverviewPage />} />
          <Route path="cast" element={<MovieCastPage />} />
        </Route>
        <Route path="favorite" element={<FavoriteListPage />} />
        <Route path="watched" element={<WatchedListPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
