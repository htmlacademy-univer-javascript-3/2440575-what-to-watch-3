import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Player from './index.tsx';
import { withProviders } from '../../utils/mock-component.tsx';
import { mockFilmDetails } from '../../utils/mock-data.ts';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '../../types/routes.ts';
import { afterAll, afterEach, beforeAll, beforeEach, expect, SpyInstance } from 'vitest';
import { extractActionsTypes } from '../../utils/mock-reducer.ts';
import { loadFilmDetails } from '../../store/api-actions.ts';
import { StatusCodes } from 'http-status-codes';

describe('Component: Player', () => {
  const mockSelectedFilm = mockFilmDetails();
  let pauseStub: SpyInstance<[], void>;
  let playStub: SpyInstance<[], Promise<void>>;

  beforeAll(() => {
    pauseStub = vi
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => undefined);

    playStub = vi
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => new Promise(() => undefined));
  });

  beforeEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: undefined,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should render correctly and load data', async () => {
    const { component, mockAxiosAdapter, mockStore } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    mockAxiosAdapter.onGet(/\/films/).reply(StatusCodes.OK, mockSelectedFilm);
    render(component);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByText(mockSelectedFilm.name)).toBeInTheDocument();
    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      loadFilmDetails.pending.type,
      loadFilmDetails.fulfilled.type,
    ]));
  });

  it('should redirect to the film page on exit button click', async () => {
    const { component, mockHistory, mockAxiosAdapter } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    mockAxiosAdapter.onGet(/\/film/).reply(StatusCodes.OK, mockSelectedFilm);
    render(component);
    await userEvent.click(screen.getByRole('button', { name: /exit/i }));
    expect(mockHistory.location.pathname).toBe(AppRoutes.Film.replace(':id', mockSelectedFilm.id));
  });

  it('should display play and pause buttons', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    render(component);
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(playStub).toHaveBeenCalled();
    fireEvent.timeUpdate(screen.getByTestId('video-player'));
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(pauseStub).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('should toggle fullscreen', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    render(component);
    expect(screen.getByRole('button', { name: /full screen/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: undefined,
    });
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
  });

  it('should exit fullscreen', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    render(component);
    Object.defineProperty(document, 'exitFullscreen', {
      writable: true,
      value: vi.fn(),
    });
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
    Object.defineProperty(document, 'exitFullscreen', {
      writable: true,
      value: undefined,
    });
  });

  it('should exit fullscreen in mozilla', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    render(component);
    Object.defineProperty(document, 'mozCancelFullScreen', {
      writable: true,
      value: vi.fn(),
    });
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
    Object.defineProperty(document, 'mozCancelFullScreen', {
      writable: true,
      value: undefined,
    });
  });

  it('should exit fullscreen in safari', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    render(component);
    Object.defineProperty(document, 'webkitExitFullscreen', {
      writable: true,
      value: vi.fn(),
    });
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
    Object.defineProperty(document, 'webkitExitFullscreen', {
      writable: true,
      value: undefined,
    });
  });

  it('should exit fullscreen in explorer ', async () => {
    const { component } = withProviders(<Player />, {
      film: {
        selectedFilm: mockSelectedFilm,
      }
    });
    render(component);
    Object.defineProperty(document, 'msExitFullscreen', {
      writable: true,
      value: vi.fn(),
    });
    await userEvent.click(screen.getByRole('button', { name: /full screen/i }));
    Object.defineProperty(document, 'msExitFullscreen', {
      writable: true,
      value: undefined,
    });
  });
});
