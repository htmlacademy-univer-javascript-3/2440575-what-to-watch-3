import { Review } from '../../../../types/review.ts';
import ReviewBlock from './review';

interface ReviewTabProps {
  reviews: Review[];
}

export default function ReviewTab({ reviews }: ReviewTabProps) {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((value) => (
          <ReviewBlock key={value.id} {...value} />
        ))}
      </div>
    </div>
  );
}
