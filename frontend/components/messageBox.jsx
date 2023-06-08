import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
  const { variant, children } = props;

  return <Alert variant={variant || 'info'}>{children}</Alert>;
}

MessageBox.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};
