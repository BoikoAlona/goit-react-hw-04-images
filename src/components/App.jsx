import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { requestImagesByQuery } from './services/api';
import { Loader } from './Loader/Loader';
import { STATUSES } from './Utils/Constants';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState(STATUSES.idle);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const onSubmit = q => {
    setQ(q);
    setPage(1);
    setHits([]);
    setIsLoadMore(false);
  };

  useEffect(() => {
    if (q === '' && page === 1) {
      return;
    }
    const fetchImagesbyQuery = async () => {
      try {
        setStatus(STATUSES.pending);
        const { hits, totalHits } = await requestImagesByQuery(q, page);
        setStatus(STATUSES.success);
        setHits(prevState => [...prevState, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
        setStatus(STATUSES.error);
      }
    };
    fetchImagesbyQuery();
  }, [q, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {status === STATUSES.pending && <Loader />}
      {status === STATUSES.error && <p>ERROR{error}</p>}
      {hits.length > 0 && <ImageGallery hits={hits} />}
      {isLoadMore && <Button onLoadMore={onLoadMore} />}
    </div>
  );
};
