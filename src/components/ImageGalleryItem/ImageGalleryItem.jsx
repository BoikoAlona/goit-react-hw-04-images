import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsLoadOpen] = useState(false);

  const toggleModal = () => {
    setIsLoadOpen(prevState => !prevState);
  };

  return (
    <li key={id} className={css.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
};
