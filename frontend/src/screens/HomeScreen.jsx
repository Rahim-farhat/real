import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import data from '../data';
import axios from 'axios';

function HomeScreen() {
  /*
  const [joke, setJoke] = useState('');
  const getJoke = () => {
    axios.get('http://localhost:5000/api/events').then((response) => {
      console.log(response);
      setJoke(response.data.setup);
    });
  };
  */

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Events</h1>
      <div className="events">
        {events.map((event) => (
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
