import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AutosuggestInput from './AutosuggestInput';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../hooks/useDebounce', () => ({
  __esModule: true,
  default: (v: string) => v,
}));

describe('AutosuggestInput', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: '1', name: 'Really cool brewery' },
          { id: '2', name: 'Slightly less cool but still ok brewery' }
        ]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field', () => {
    render(<AutosuggestInput />);
    expect(screen.getByPlaceholderText(/search breweries/i)).toBeInTheDocument();
  });

  it('shows suggestions when typing', async () => {
    render(<AutosuggestInput />);
    fireEvent.change(screen.getByPlaceholderText(/search breweries/i), { target: { value: 'cool' } });

    await waitFor(() => {
      expect(screen.getByText('Really cool brewery')).toBeInTheDocument();
      expect(screen.getByText('Slightly less cool but still ok brewery')).toBeInTheDocument();
    });
  });

  it('calls router.push when a suggestion is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(<AutosuggestInput />);
    fireEvent.change(getByPlaceholderText(/search breweries/i), { target: { value: 'Really' } });

    await waitFor(() => {
      expect(getByText('Really cool brewery')).toBeInTheDocument();
    });

    fireEvent.mouseDown(getByText('Really cool brewery'));
  });
});
