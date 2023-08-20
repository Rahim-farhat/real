import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ModalComponent = ({ imageUrl, altText }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleImageClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {/* Trigger Image */}
      <img
        id="myImg"
        src={imageUrl}
        alt={altText}
        style={{ width: '100%', maxWidth: '300px' }}
        onClick={handleImageClick}
      />

      {/* Modal */}
      {modalVisible && (
        <div id="myModal" className="modal">
          <Button className="close" onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faXmark} className="bigicon" />
          </Button>
          <img
            className="modal-content"
            id="img01"
            src={imageUrl}
            alt={altText}
          />
          <div id="caption">{altText}</div>
        </div>
      )}
    </div>
  );
};

ModalComponent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default ModalComponent;
