import Main from '../../pages/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.ts';
import Film from '../../pages/film';
import AddReview from '../../pages/add-review';
import SignIn from '../../pages/sign-in';
import Player from '../../pages/player';
import NotFoundScreen from '../../pages/not-found-screen';
import MyList from '../../pages/my-list';
import PrivateRoute from '../private-route';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { loadFilms, verifyToken } from '../../store/api-actions.ts';
import { getToken } from '../../services/storage.ts';

const token = getToken();

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFilms());
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Main />} />
        <Route path={AppRoutes.SignIn} element={<SignIn />} />
        <Route
          path={AppRoutes.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Film} element={<Film />} />
        <Route
          path={AppRoutes.AddReview}
          element={
            <PrivateRoute>
              <AddReview />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Player} element={<Player />} />
        <Route path={AppRoutes.NotFoundScreen} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
