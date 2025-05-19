import { render, screen, waitFor } from '@testing-library/react';
import PaginatedTable from './PaginatedTable';

jest.mock('../types/brewery', () => ({}));

describe('PaginatedTable', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          {
            id: 'tennents-glasgow',
            name: "Tennent's Brewery",
            brewery_type: 'large',
            city: 'Glasgow',
            country: 'Scotland',
            website_url: 'https://www.tennents.co.uk/',
            phone: '+44 141 202 7145',
          },
        ]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers', async () => {
	render(<PaginatedTable filters={{ name: '', city: '' }} />);
	await waitFor(() => {
		expect(screen.getByText(/Brewery Name/i)).toBeInTheDocument();
		expect(screen.getByText(/Type/i)).toBeInTheDocument();
		expect(screen.getByText(/City/i)).toBeInTheDocument();
		expect(screen.getByText(/Country/i)).toBeInTheDocument();
		expect(screen.getByText(/Website/i)).toBeInTheDocument();
		expect(screen.getByText(/Phone/i)).toBeInTheDocument();
	});
});

  it('renders brewery data', async () => {
    render(<PaginatedTable filters={{ name: '', city: '' }} />);
    await waitFor(() => {
      expect(screen.getByText("Tennent's Brewery")).toBeInTheDocument();
      expect(screen.getByText('large')).toBeInTheDocument();
      expect(screen.getByText('Glasgow')).toBeInTheDocument();
      expect(screen.getByText('Scotland')).toBeInTheDocument();
      expect(screen.getByText('+44 141 202 7145')).toBeInTheDocument();
    });
  });

  it('calls fetch with correct params when filters change', async () => {
    render(<PaginatedTable filters={{ name: 'Lager', city: 'Glasgow' }} />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('by_name=Lager')
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('by_city=Glasgow')
      );
    });
  });
});
