import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import LoadingBox from '../../components/loadingBox';
import MessageBox from '../../components/messageBox';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, event: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SpecificScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, event }, dispatch] = useReducer(reducer, {
    event: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/slug/${slug}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, [slug]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{event.name}</title>
      </Helmet>
      <div>{event.name}</div>
      <div>{event.where}</div>
      <div>{event.owner}</div>
      <img src={event.image} alt={event.name} />
    </div>
  );
}
export default SpecificScreen;
