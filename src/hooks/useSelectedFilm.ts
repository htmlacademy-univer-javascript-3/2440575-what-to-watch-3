import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';
import { loadFilmDetails, loadSuggestions, loadReviews } from '../store/api-actions.ts';
import { NOT_FOUND_URL } from '../constants/route.ts';
import { RequestError } from '../types/api.ts';
import { NOT_FOUND_MESSAGE } from '../constants/api.ts';

interface UseSelectedFilmParams {
  shouldLoadSuggestions?: boolean;
  shouldLoadReviews?: boolean;
}

export function useSelectedFilm({ shouldLoadSuggestions = false, shouldLoadReviews = false }: UseSelectedFilmParams) {
  const { id = '' } = useParams();
  const { selectedFilm, suggestionPortion } = useAppSelector((state) => state.film);
  const { reviews } = useAppSelector((state) => state.review);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadFilmDetails(id))
      .unwrap()
      .catch((error: RequestError) => {
        if (error?.message === NOT_FOUND_MESSAGE) {
          navigate(NOT_FOUND_URL);
        }
      });
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (shouldLoadSuggestions) {
      dispatch(loadSuggestions(id));
    }
  }, [dispatch, id, shouldLoadSuggestions]);

  useEffect(() => {
    if (shouldLoadReviews) {
      dispatch(loadReviews(id));
    }
  }, [dispatch, id, shouldLoadReviews]);

  return { selectedFilm, suggestionPortion, reviews };
}
