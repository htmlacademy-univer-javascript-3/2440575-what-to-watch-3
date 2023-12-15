import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadReviews } from './api-actions.ts';
import { Review } from '../types/review.ts';

interface ReviewSliceState {
  reviews: Review[];
}

const initialState: ReviewSliceState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadReviews.fulfilled, (state, action: PayloadAction<Review[]>) => (
      {
        ...state,
        reviews: action.payload,
      }
    ));
  },
});

export default reviewSlice.reducer;
