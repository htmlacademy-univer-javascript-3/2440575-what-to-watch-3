import { render, screen, waitFor } from '@testing-library/react';
import Player from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';
import { mockFilmDetails } from '../../utils/mock-data.ts';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../types/routes.ts';
import { afterAll, beforeAll, expect, SpyInstance, vitest } from 'vitest';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFilmDetails } from '../../store/api-actions.ts';

describe('Component: Player', () => {
  const mockedSelectedFilm = mockFilmDetails();
  let pauseStub: SpyInstance<[], void>;
  let playStub: SpyInstance<[], Promise<void>>;

  beforeAll(() => {
    pauseStub = vitest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => undefined);

    playStub = vitest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => new Promise(() => undefined));
  });

  afterAll(() => {
    vitest.clearAllMocks();
  });

  it('should render correctly and load data', async () => {
    const { component, mockAxiosAdapter, mockStore } = withProviders(<Player />, {
      film: {
        selectedFilm: mockedSelectedFilm,
      }
    });
    mockAxiosAdapter.onGet(/\/films/).reply(200, mockedSelectedFilm);
    render(component);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByText(mockedSelectedFilm.name)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
    ]));
  });

  it('should redirect to the film page on exit button click', async () => {
    const { component, history } = withProviders(<Player />, {
      film: {
        selectedFilm: mockedSelectedFilm,
      }
    });
    render(component);
    await userEvent.click(screen.getByRole('button', { name: /exit/i }));
    expect(history.location.pathname).toBe(AppRoutes.Film.replace(':id', mockedSelectedFilm.id));
  });

  it('should display play and pause buttons', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockedSelectedFilm,
      }
    });
    render(component);
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(playStub).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(pauseStub).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('should display fullscreen button', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockedSelectedFilm,
      }
    });
    render(component);
    expect(screen.getByRole('button', { name: /full screen/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
  });
});
