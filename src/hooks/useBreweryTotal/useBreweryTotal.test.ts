import { renderHook, act } from '@testing-library/react';
import { useBreweryTotal } from './useBreweryTotal';

describe('useBreweryTotal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns the total number of breweries', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ total: 42 }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useBreweryTotal({ name: '', city: '' }));

    await act(async () => {});

    expect(result.current).toBe(42);
  });

  it('returns null on fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down')) as jest.Mock;

    const { result } = renderHook(() => useBreweryTotal({ name: '', city: '' }));

    await act(async () => {});

    expect(result.current).toBeNull();
  });
});
