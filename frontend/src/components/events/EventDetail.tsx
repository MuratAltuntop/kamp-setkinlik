import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay detay-grid">
      {event.image && (
        <figure className="detay-afis">
          <img src={event.image} alt={`${event.title} afişi`} />
          <figcaption>
            <i>{event.title} afişi</i>
          </figcaption>
        </figure>
      )}
      <div className="detay-kunye">
        <h2>{event.title}</h2>
        <dl>
          <dt>
            <strong>Tarih</strong>
          </dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>
          <dt>
            <strong>Yer</strong>
          </dt>
          <dd>{event.location}</dd>
          <dt>
            <strong>Kategori</strong>
          </dt>
          <dd>{event.category}</dd>
          <dt>
            <strong>Kontenjan</strong>
          </dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>
      <div className="detay-aciklama">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
        <Link className="buton" to="/events">
          &larr; Listeye dön
        </Link>
        <Link className="buton" to={`/admin/${event.id}/edit`}>
          Güncelle
        </Link>
      </div>
    </article>
  );
}

export default EventDetail;
