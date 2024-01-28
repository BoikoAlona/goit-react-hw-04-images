import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ tags, largeImageURL, toggleModal }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleModal]);

  return (
    <div>
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    </div>
  );
};
