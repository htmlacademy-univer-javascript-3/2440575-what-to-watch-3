import { render, screen } from '@testing-library/react';
import TimeControls from './index.tsx';
import * as faker from 'faker';
import { formatPlayerTime } from '../../../utils/format.ts';

describe('Component: TimeControls', () => {
  const time = faker.time.recent();

  it('should render correctly', () => {
    render(<TimeControls time={time} duration={time}/>);
    expect(screen.getByText(formatPlayerTime(time))).toBeInTheDocument();
  });
});
