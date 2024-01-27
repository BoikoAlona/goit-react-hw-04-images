import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = hits => {
  const hitsArr = hits.hits;

  return (
    <ul className={css.imageGallery}>
      {hitsArr.map(el => {
        return (
          <ImageGalleryItem
            key={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            tags={el.tags}
          />
        );
      })}
    </ul>
  );
};