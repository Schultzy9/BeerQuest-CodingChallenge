import { notFound } from 'next/navigation';
import BreweryDetails from '../../components/BreweryDetails';

async function getBrewery(id: string) {
  const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function BreweryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brewery = await getBrewery(id);
  if (!brewery) return notFound();

  return (
    <div>
      <BreweryDetails brewery={brewery} />
    </div>
  );
}
