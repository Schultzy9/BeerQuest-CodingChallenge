import React from 'react';
import { render, screen } from '@testing-library/react';
import BreweryDetails from './BreweryDetails';

jest.mock('../../hooks/useBreweryById/useBreweryById', () => ({
  useBreweryById: jest.fn(),
}));

import { useBreweryById } from '../../hooks/useBreweryById/useBreweryById';

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

describe('BreweryDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all brewery details', () => {
    (useBreweryById as jest.Mock).mockReturnValue({
      brewery: mockBrewery,
      loading: false,
      error: null,
    });
    render(<BreweryDetails id="1" />);
    expect(screen.getByRole('heading', { name: /XXXX Brewery/i })).toBeInTheDocument();
    expect(screen.getByText('Milton Road')).toBeInTheDocument();
    expect(screen.getByText('Brisvegas')).toBeInTheDocument();
    expect(screen.getByText('QLDer')).toBeInTheDocument();
    expect(screen.getByText('4000')).toBeInTheDocument();
    expect(screen.getByText('Straya')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /xxxxbeer.com/i })).toHaveAttribute('href', 'https://xxxxbeer.com');
  });

  it('renders Google Map iframe if coordinates are present', () => {
    (useBreweryById as jest.Mock).mockReturnValue({
      brewery: mockBrewery,
      loading: false,
      error: null,
    });
    render(<BreweryDetails id="1" />);
    expect(screen.getByTitle(/google map/i)).toBeInTheDocument();
  });

  it('shows N/A for missing fields', () => {
    (useBreweryById as jest.Mock).mockReturnValue({
      brewery: { ...mockBrewery, street: null, city: null, state: null, postal_code: null, country: null },
      loading: false,
      error: null,
    });
    render(<BreweryDetails id="1" />);
    const naElements = screen.getAllByText('N/A');
    expect(naElements).toHaveLength(5);
  });

  it('shows loading state', () => {
    (useBreweryById as jest.Mock).mockReturnValue({
      brewery: null,
      loading: true,
      error: null,
    });
    render(<BreweryDetails id="1" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useBreweryById as jest.Mock).mockReturnValue({
      brewery: null,
      loading: false,
      error: 'Something went wrong',
    });
    render(<BreweryDetails id="1" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('shows "No brewery found" if brewery is null and not loading or error', () => {
    (useBreweryById as jest.Mock).mockReturnValue({
      brewery: null,
      loading: false,
      error: null,
    });
    render(<BreweryDetails id="1" />);
    expect(screen.getByText(/no brewery found/i)).toBeInTheDocument();
  });
});
