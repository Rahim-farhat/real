//import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data';
import axios from 'axios';

function HomeScreen() {
  /*
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/events');
      setEvents(result.data);
    };
    fetchData();
  }, []);
  */

  const getJoke = () => {
    axios.get('https://random-data-api.com/api/v2/users').then((response) => {
      console.log(response);
    });
  };
  console.log('hey');

  const getapi = () => {
    axios.get('/api/events').then((response1) => {
      console.log(response1);
    });
  };
  console.log('yo');

  return (
    <div>
      <button onClick={getJoke}>get the joke</button>
      <button onClick={getapi}>get the api</button>
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
