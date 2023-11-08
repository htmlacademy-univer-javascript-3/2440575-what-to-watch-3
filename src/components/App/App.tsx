import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FilmDataProps } from '../../types/filmDataTypes.ts';
import { AppRoute, AuthStatus } from '../../config/config.ts';
import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import SignIn from '../../pages/SignIn/SignIn.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import MyList from '../../pages/MyList/MyList.tsx';
import Film from '../../pages/Film/Film.tsx';
import AddReview from '../../pages/AddReview/AddReview.tsx';
import Player from '../../pages/Player/Player.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx';

const App = ({name, genre, promoDate}: FilmDataProps) =>
  (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              name={name}
              genre={genre}
              promoDate={promoDate}
            />
          }
        >
        </Route>
        <Route
          path={AppRoute.SignIn}
          element={<SignIn></SignIn>}
        >
        </Route>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <MyList></MyList>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Film}
          element={<Film></Film>}
        >
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <AddReview></AddReview>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Player}
          element={<Player></Player>}
        >
        </Route>
        <Route
          path="*"
          element={<NotFoundPage></NotFoundPage>}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );

export default App;
