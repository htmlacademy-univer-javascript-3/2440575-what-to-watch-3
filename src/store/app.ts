import { createSlice } from '@reduxjs/toolkit';
import {
  clearRequestCount,
  loadFavouriteFilms,
  loadFilmDetails,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSuggestions, setIsFavorite,
  signIn,
  signOut,
  verifyToken
} from './api-actions.ts';

interface AppSliceState {
  pendingRequestsCount: number;
}

const initialState: AppSliceState = {
  pendingRequestsCount: 0,
};

function increaseCount(state: AppSliceState) {
  state.pendingRequestsCount++;
}

function decreaseCount(state: AppSliceState) {
  state.pendingRequestsCount--;
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers:
    (builder) => {
      builder.addCase(loadFilms.pending, increaseCount);
      builder.addCase(loadFilms.fulfilled, decreaseCount);
      builder.addCase(loadPromoFilm.pending, increaseCount);
      builder.addCase(loadPromoFilm.fulfilled, decreaseCount);
      builder.addCase(loadFilmDetails.pending, increaseCount);
      builder.addCase(loadFilmDetails.fulfilled, decreaseCount);
      builder.addCase(loadSuggestions.pending, increaseCount);
      builder.addCase(loadSuggestions.fulfilled, decreaseCount);
      builder.addCase(loadReviews.pending, increaseCount);
      builder.addCase(loadReviews.fulfilled, decreaseCount);
      builder.addCase(verifyToken.pending, increaseCount);
      builder.addCase(verifyToken.fulfilled, decreaseCount);
      builder.addCase(verifyToken.rejected, decreaseCount);
      builder.addCase(signOut.pending, increaseCount);
      builder.addCase(signOut.fulfilled, decreaseCount);
      builder.addCase(signIn.pending, increaseCount);
      builder.addCase(signIn.fulfilled, decreaseCount);
      builder.addCase(signIn.rejected, decreaseCount);
      builder.addCase(setIsFavorite.pending, increaseCount);
      builder.addCase(setIsFavorite.fulfilled, decreaseCount);
      builder.addCase(setIsFavorite.rejected, decreaseCount);
      builder.addCase(loadFavouriteFilms.pending, increaseCount);
      builder.addCase(loadFavouriteFilms.fulfilled, decreaseCount);
      builder.addCase(clearRequestCount.fulfilled, (state) => {
        state.pendingRequestsCount = 0;
      });
    },
});

export default appSlice.reducer;
