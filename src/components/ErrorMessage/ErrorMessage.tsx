import { useAppSelector } from '../../hooks';
import './ErrorMessage.css';
export const ErrorMessage = (): JSX.Element | null => {
  const error = useAppSelector((state) => state.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

};

export default ErrorMessage;
