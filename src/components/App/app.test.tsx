import { render, screen, waitFor } from '@testing-library/react';
import App from './app';
import { withProviders } from '../../utils/mock-component';
import { AppRoutes } from '../../types/routes.ts';
import { AuthorizationStatus } from '../../types/user.ts';
import { mockFilmDetails, mockUserDetails } from '../../utils/mock-data.ts';
import { initialState as filmSliceState } from '../../store/film.ts';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFilms, verifyToken } from '../../store/api-actions.ts';
import { StatusCodes } from 'http-status-codes';

describe('Application Routing', () => {
  const mockedFilmDetails = mockFilmDetails();
  const mockedUserDetails = mockUserDetails();

  it('should render correctly and load data', async () => {
    const { component, mockHistory, mockStore, mockAxiosAdapter } = withProviders(<App />);
    mockHistory.push(AppRoutes.SignIn);
    mockAxiosAdapter.onGet(/\/login/).reply(StatusCodes.OK, mockedUserDetails);
    mockAxiosAdapter.onGet(/\/films/).reply(StatusCodes.OK, mockedFilmDetails);

    render(component);

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      verifyToken.pending.type,
      verifyToken.fulfilled.type,
      loadFilms.pending.type,
      loadFilms.fulfilled.type,
    ]));
  });

  it('should render main page when user navigate to "/"', () => {
    const { component, mockHistory } = withProviders(<App />);
    mockHistory.push(AppRoutes.Main);

    render(component);

    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
  });

  it('should render sign in page when user navigate to "/login"', () => {
    const { component, mockHistory } = withProviders(<App />);
    mockHistory.push(AppRoutes.SignIn);

    render(component);

    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
  });

  it('should render my list page when user navigate to "/mylist"', () => {
    const { component, mockHistory } = withProviders(<App />,
      {
        user: {
          authorizationStatus: AuthorizationStatus.Authorized,
        }
      });
    mockHistory.push(AppRoutes.MyList);

    render(component);

    expect(screen.getByText(/my list/i)).toBeInTheDocument();
  });

  it('should render film page when user navigate to "/film"', () => {
    const { component, mockHistory } = withProviders(<App />,
      {
        film: {
          ...filmSliceState,
          selectedFilm: mockedFilmDetails,
        },
      });
    mockHistory.push(AppRoutes.Film.replace(':id', mockedFilmDetails.id));

    render(component);

    expect(screen.getByText(/more like this/i)).toBeInTheDocument();
  });

  it('should render add review-block page when user navigate to "/review-block"', () => {
    const { component, mockHistory } = withProviders(<App />,
      {
        film: {
          selectedFilm: mockedFilmDetails,
        },
        user: {
          authorizationStatus: AuthorizationStatus.Authorized,
        }
      });
    mockHistory.push(AppRoutes.AddReview.replace(':id', mockedFilmDetails.id));

    render(component);

    expect(screen.getByRole('button', {name: /post/i})).toBeInTheDocument();
  });

  it('should render player page when user navigate to "/player"', () => {
    const { component, mockHistory } = withProviders(<App />,
      {
        film: {
          selectedFilm: mockedFilmDetails,
        },
      });
    mockHistory.push(AppRoutes.Player.replace(':id', mockedFilmDetails.id));

    render(component);

    expect(screen.getByRole('button', {name: /play/i})).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const unknownRoute = '/unknown-route';
    const { component, mockHistory } = withProviders(<App />);
    mockHistory.push(unknownRoute);

    render(component);

    expect(screen.getByText(/ошибка 404\. страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /вернуться на главную страницу/i})).toBeInTheDocument();
  });
});
