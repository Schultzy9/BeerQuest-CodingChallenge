import BreweryDetails from '../../../components/BreweryDetails/BreweryDetails';

export default async function BreweryDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  return (
    <div>
      <BreweryDetails id={resolvedParams.id} />
    </div>
  );
}
