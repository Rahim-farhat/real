import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import data from '../data';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, events: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, events }, dispatch] = useReducer(reducer, {
    events: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Events</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
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
      )}
    </div>
  );
}
export default HomeScreen;
