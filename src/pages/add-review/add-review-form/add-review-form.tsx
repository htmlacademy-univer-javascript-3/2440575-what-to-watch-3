import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ReviewFormLimitations, ReviewFormValues } from '../../../types/review.ts';
import { addReview } from '../../../store/api-actions.ts';
import { useAppDispatch } from '../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../../types/routes.ts';

const RATING_OPTIONS = Array.from({ length: ReviewFormLimitations.MaxRating }, (_, i) => i + 1).reverse();

const INITIAL_FORM_STATE: ReviewFormValues = {
  rating: 0,
  'review-text': '',
};

export default function AddReviewForm() {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm<ReviewFormValues>({
    defaultValues: INITIAL_FORM_STATE,
    mode: 'all',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id = '' } = useParams();

  function handleAddReview(data: ReviewFormValues) {
    setIsSubmitting(true);
    dispatch(addReview({ rating: Number(data.rating), comment: data['review-text'], filmId: id })).unwrap()
      .then(() => navigate(AppRoutes.Film.replace(':id', id)))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={(event) => void handleSubmit(handleAddReview)(event)} className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          <Controller
            name="rating"
            control={control}
            rules={{
              required: true,
              min: ReviewFormLimitations.MinRating,
              max: ReviewFormLimitations.MaxRating,
            }}
            disabled={isSubmitting}
            render={({ field }) => (
              <>
                {RATING_OPTIONS.map((value) => (
                  <React.Fragment key={value}>
                    <input
                      className="rating__input"
                      id={`star-${value}`}
                      type="radio"
                      {...field}
                      value={value}
                    />
                    <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
                  </React.Fragment>
                ))}
              </>
            )}
          />
        </div>
      </div>

      <div className="add-review__text">
        <Controller
          name="review-text"
          control={control}
          disabled={isSubmitting}
          rules={{
            required: true,
            minLength: ReviewFormLimitations.CommentMinLength,
            maxLength: ReviewFormLimitations.CommentMaxLength,
          }}
          render={({ field }) => (
            <textarea
              className="add-review__textarea"
              id="review-text"
              placeholder="Review text"
              {...field}
            />
          )}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isValid || isSubmitting}>Post</button>
        </div>
      </div>
    </form>
  );
}
