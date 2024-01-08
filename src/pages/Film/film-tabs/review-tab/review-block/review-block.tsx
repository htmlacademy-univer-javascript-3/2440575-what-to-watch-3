import { Review } from '../../../../../types/review.ts';
import { formatDate } from '../../../../../utils/format.ts';
import { SHORT_DATE_FORMAT, STANDARD_DATE_FORMAT } from '../../../../../constants/date.ts';

export default function ReviewBlock({ rating, user, comment, date }: Review) {
  const commentDate = new Date(date);

  return (
    <div className="review" data-testid="review-block">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={formatDate(commentDate, SHORT_DATE_FORMAT, 'fr-CA')}>
            {formatDate(commentDate, STANDARD_DATE_FORMAT)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}
