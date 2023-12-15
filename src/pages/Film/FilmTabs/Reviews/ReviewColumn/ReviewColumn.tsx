import { ReviewsData } from '../../../../../types';
import Review from '../Review/Review.tsx';

type ReviewColumnProps = {
  reviews: ReviewsData;
}
const ReviewColumn = ({reviews}: ReviewColumnProps):JSX.Element => (
  <div className="film-card__reviews-col">
    {
      reviews
        .map((item): JSX.Element => <Review key={item.id} review={item}/>)
    }
  </div>
);

export default ReviewColumn;
