import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{genre: string}>('genre/changeGenre');
export const getFilmsByGenre = createAction<{genre: string}>('films/getFilmsByGenre');
