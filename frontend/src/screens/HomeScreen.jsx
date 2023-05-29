import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1>Featured Events</h1>
      <div className="events">
        {data.events.map((event) => (
          <div className="event" key={event.slug}>
            <Link to={`/event/${event.slug}`}>
              <p>{event.name}</p>
            </Link>
            <p>{event.where}</p>
            <p>{event.owner}</p>
            <img src={event.image} alt={event.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
