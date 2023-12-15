import { ReactElement } from 'react';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner';

interface RequestSuspenseProps {
  children: ReactElement;
}

export default function RequestSuspense({ children }: RequestSuspenseProps) {
  const { pendingRequestsCount } = useAppSelector((state) => state.app);

  return (
    pendingRequestsCount > 0
      ? <Spinner />
      : children
  );
}
