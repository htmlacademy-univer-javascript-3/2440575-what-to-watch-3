import { RatingDescription } from '../types/film.ts';

export function getRatingDescription(rating: number): RatingDescription {
  if (rating >= 0 && rating < 3) {
    return RatingDescription.Bad;
  } else if (rating >= 3 && rating < 5) {
    return RatingDescription.Normal;
  } else if (rating >= 5 && rating < 8) {
    return RatingDescription.Good;
  } else if (rating >= 8 && rating < 10) {
    return RatingDescription.VeryGood;
  } else {
    return RatingDescription.Awesome;
  }
}
