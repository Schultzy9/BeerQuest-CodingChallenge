import { renderHook, act } from '@testing-library/react';
import { useBreweryById } from './useBreweryById';

const mockBrewery = {
  id: '1',
  name: 'XXXX Brewery',
  website_url: 'https://xxxxbeer.com',
  street: 'Milton Road',
  city: 'Brisvegas',
  state: 'QLDer',
  postal_code: '4000',
  country: 'Straya',
  longitude: '-105.0',
  latitude: '40.0',
  brewery_type: 'micro',
  phone: '1234567890',
};

describe('useBreweryById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns brewery data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBrewery),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useBreweryById('1'));

    await act(async () => {});

    expect(result.current.brewery).toEqual(mockBrewery);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useBreweryById('bad-id'));

    await act(async () => {});

    expect(result.current.brewery).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch brewery');
  });

  it('returns null if id is null', async () => {
    const { result } = renderHook(() => useBreweryById(null));
    expect(result.current.brewery).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
