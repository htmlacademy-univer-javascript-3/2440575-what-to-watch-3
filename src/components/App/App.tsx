import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage.tsx';
import SignIn from '../../pages/SignIn/SignIn.tsx';
import MyList from '../../pages/MyList/MyList.tsx';
import Film from '../../pages/Film/Film.tsx';
import AddReview from '../../pages/AddReview/AddReview.tsx';
import Player from '../../pages/Player/Player.tsx';
import NotFound404 from '../../pages/NotFoundPage/NotFoundPage.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import Scroll from '../Scroll/Scroll.tsx';
import { FilmsData, ReviewsData } from '../../types';
import { AppRoute, AuthStatus } from '../../config/config.ts';
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen.tsx';
import HistoryRouter from '../HistoryRouter/HistoryRouter.tsx';
import browserHistory from '../../browserHistory.ts';

type AppProps = {
  filmsData: FilmsData;
  reviewsData: ReviewsData;
}

function App({filmsData, reviewsData}: AppProps) {
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const authStatus = useAppSelector((state) => state.authStatus);

  if (authStatus === AuthStatus.Unknown || isFilmsDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Scroll/>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage/>
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
            <PrivateRoute authStatus={authStatus}>
              <MyList></MyList>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path={AppRoute.Film}
          element={
            <Film
              filmsData={filmsData}
              reviewsData={reviewsData}
            />
          }
        >
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authStatus={authStatus}>
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
          element={<NotFound404></NotFound404>}
        >
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
