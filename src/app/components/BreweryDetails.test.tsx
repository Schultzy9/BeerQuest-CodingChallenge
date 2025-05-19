import React from 'react';
import { render, screen } from '@testing-library/react';
import BreweryDetails from './BreweryDetails';

const brewery = {
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
  it('renders all brewery details', () => {
    render(<BreweryDetails brewery={brewery} />);
    expect(screen.getByRole('heading', { name: /XXXX Brewery/i })).toBeInTheDocument();
    expect(screen.getByText('Milton Road')).toBeInTheDocument();
    expect(screen.getByText('Brisvegas')).toBeInTheDocument();
    expect(screen.getByText('QLDer')).toBeInTheDocument();
    expect(screen.getByText('4000')).toBeInTheDocument();
    expect(screen.getByText('Straya')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /xxxxbeer.com/i })).toHaveAttribute('href', 'https://xxxxbeer.com');
  });

  it('renders Google Map iframe if coordinates are present', () => {
    render(<BreweryDetails brewery={brewery} />);
    expect(screen.getByTitle(/google map/i)).toBeInTheDocument();
  });

  it('shows N/A for missing fields', () => {
    const partialBrewery = { ...brewery, street: null, city: null, state: null, postal_code: null, country: null };
    render(<BreweryDetails brewery={partialBrewery} />);
    const naElements = screen.getAllByText('N/A');
    expect(naElements).toHaveLength(5);
  });
});
