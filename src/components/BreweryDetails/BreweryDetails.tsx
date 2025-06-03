import styles from './BreweryDetails.module.css';
import { Brewery } from '../../types/brewery';

export default function BreweryDetails({ brewery }: { brewery: Brewery }) {
  return (
    <div className={styles.details}>
      <h2>{brewery.name}</h2>
      {brewery.website_url && (
        <div className={styles.infoRow}>
          <a
            href={brewery.website_url}
            className={styles.link}
          >
            {brewery.website_url}
          </a>
        </div>
      )}
      <div className={styles.infoRow}>
        <strong>Street:</strong> {brewery.street || 'N/A'}
      </div>
      <div className={styles.infoRow}>
        <strong>City:</strong> {brewery.city || 'N/A'}
      </div>
      <div className={styles.infoRow}>
        <strong>State/Province:</strong> {brewery.state || 'N/A'}
      </div>
      <div className={styles.infoRow}>
        <strong>Postal Code:</strong> {brewery.postal_code || 'N/A'}
      </div>
      <div className={styles.infoRow}>
        <strong>Country:</strong> {brewery.country || 'N/A'}
      </div>
      {brewery.latitude && brewery.longitude && (
        <iframe
          title="Google Map"
          loading="lazy"
          className={styles.map}
          src={`https://maps.google.com/maps?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
        />
      )}
    </div>
  );
}
