import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FilmsData } from '../../types/filmData';
import { GenresData } from '../../types/genresData';
import { ReviewsData } from '../../types/reviewsData';
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

type AppProps = {
  filmsData: FilmsData;
  genresData: GenresData;
  reviewsData: ReviewsData;
}

function App ({filmsData, genresData, reviewsData}: AppProps) {
  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              filmsData={filmsData}
              genresData={genresData}
            />
          }
        >
          <Route
            path={AppRoute.Genre}
            element={
              <MainPage filmsData={filmsData} genresData={genresData}/>
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
