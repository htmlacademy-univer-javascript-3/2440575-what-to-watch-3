import { formatDate, formatPlayerTime, formatRunTime } from './format.ts';
import { SHORT_DATE_FORMAT, STANDARD_DATE_FORMAT } from '../constants/date.ts';

describe('Utils: Formats', () => {
  it('should format player time', () => {
    const mockSeconds = 5000;
    expect(formatPlayerTime(mockSeconds)).toEqual('01:23:20');
  });

  it('should format dates', () => {
    const mockDate = new Date('Sat Nov 16 1996');
    expect(formatDate(new Date(mockDate), STANDARD_DATE_FORMAT)).toEqual('Nov 16, 1996');
    expect(formatDate(new Date(mockDate), SHORT_DATE_FORMAT)).toEqual('11/16/1996');
  });

  it('should format run time', () => {
    const mockMinutes = 100;
    expect(formatRunTime(mockMinutes)).toEqual('1h 40m');
  });
});
