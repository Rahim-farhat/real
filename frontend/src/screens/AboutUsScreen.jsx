import LoadingBox from '../../components/loadingBox';
import MessageBox from '../../components/messageBox';

function AboutUsScreen() {
  const loading = false;
  const error = null;

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>hello there</h1>
        </div>
      )}
    </div>
  );
}

export default AboutUsScreen;
