import { ReviewsData } from '../../../../types/reviewsData.ts';
import ReviewColumn from './ReviewColumn/ReviewColumn.tsx';

const REVIEWS_PER_COLUMN = 3;
const MAX_REVIEWS = 6;

type ReviewsProps = {
  reviews: ReviewsData;
};
const Reviews = ({reviews}: ReviewsProps): JSX.Element => (
  <div className="film-card__reviews film-card__row">
    <ReviewColumn reviews={reviews.slice(0, REVIEWS_PER_COLUMN)}/>
    <ReviewColumn reviews={reviews.slice(3, MAX_REVIEWS)}/>
  </div>
);

export default Reviews;
