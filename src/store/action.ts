import { createAction } from '@reduxjs/toolkit';
import { FilmsPreviewData } from '../types';

export const changeGenre = createAction<{genre: string}>('genre/changeGenre');
export const getFilmsByGenre = createAction<{genre: string}>('films/getFilmsByGenre');
export const loadFilmsData = createAction<FilmsPreviewData>('films/loadFilmsData');
export const setError = createAction<string | null>('films/setError');
export const setFilmsDataLoadingStatus = createAction<boolean>('films/setFilmsDataLoadingStatus');
