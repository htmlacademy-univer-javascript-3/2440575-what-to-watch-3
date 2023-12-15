import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FilmsData } from '../../types/filmData';
import { ReviewsData } from '../../types';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import MyList from '../../pages/MyList/MyList';
import AddReview from '../../pages/AddReview/AddReview';
import Player from '../../pages/Player/Player';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Film from '../../pages/Film/Film';
import { AppRoute, AuthStatus } from '../../config/config';
import SignIn from '../../pages/SignIn/SignIn';
import MainPage from '../../pages/MainPage/MainPage';
import Scroll from '../Scroll/Scroll';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { useAppSelector } from '../../hooks';

type AppProps = {
  filmsData: FilmsData;
  reviewsData: ReviewsData;
}

function App ({filmsData, reviewsData}: AppProps) {
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);

  if (isFilmsDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage />
          }
        >
          <Route
            path={AppRoute.Genre}
            element={
              <MainPage />
            }
          />
        </Route>
        <Route
          path={AppRoute.SignIn}
          element={<SignIn></SignIn>}
        >
        </Route>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <MyList filmsData={filmsData}></MyList>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Film}
          element={<Film filmsData={filmsData} reviewsData={reviewsData}></Film>}
        >
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <AddReview filmsData={filmsData}></AddReview>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Player}
          element={<Player filmsData={filmsData}></Player>}
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
}
export default App;
