export interface Brewery {
  id: string;
  name: string;
  website_url: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
  brewery_type: string;
  phone: string;
}