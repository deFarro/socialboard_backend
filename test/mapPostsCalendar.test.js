import { mapPostsCalendar } from '../src/js/ajax';

describe('mapPostsCalendar function', () => {
  const mockCalendar = ["2017-02-22T11:08:11.003Z", "2017-04-28T16:32:10.464Z", "2017-06-22T11:08:11.003Z", "2017-04-18T16:32:10.464Z"];
  const size = 12;

  test('should return array', () => {
    expect(mapPostsCalendar(mockCalendar)).toBeInstanceOf(Array);
  });

  test('returned array should have proper size', () => {
    expect(mapPostsCalendar(mockCalendar, size)).toHaveLength(size);
  });

  test('should spread posts correctly', () => {
    const calendar = mapPostsCalendar(mockCalendar);
    expect(calendar[11]).toEqual(0);
    expect(calendar[8]).toEqual(1);
    expect(calendar[6]).toEqual(2);
    expect(calendar[4]).toEqual(1);
  });
});
