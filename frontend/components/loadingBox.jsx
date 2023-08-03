import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <div className="dot mt-100 loader">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h4 className="mb-200">: One Moment please</h4>
    </div>
  );
}
