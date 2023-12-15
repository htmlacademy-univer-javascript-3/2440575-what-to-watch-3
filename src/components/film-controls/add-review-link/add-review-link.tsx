import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../types/routes.ts';
import { useAppSelector } from '../../../hooks';
import { AuthorizationStatus } from '../../../types/user.ts';

interface AddReviewLinkProps {
  id: string;
}

export default function AddReviewLink({ id }: AddReviewLinkProps) {
  const { authorizationStatus } = useAppSelector((state) => state.user);

  return authorizationStatus === AuthorizationStatus.Authorized ? (
    <Link
      to={AppRoutes.AddReview.replace(':id', id)}
      className="btn film-card__button"
    >
      Add review
    </Link>
  ) : null;
}
