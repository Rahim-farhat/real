import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <div>
      <h3>Wait a minute please...</h3>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
