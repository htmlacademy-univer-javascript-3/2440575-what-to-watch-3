import { render, screen } from '@testing-library/react';
import VideoPlayer from './index.tsx';
import { mockPlayerDetails } from '../../utils/mock-data.ts';

describe('Component: VideoPlayer', () => {
  const mockPlayerData = mockPlayerDetails();

  it('should render correctly', () => {
    render(<VideoPlayer {...mockPlayerData} />);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
