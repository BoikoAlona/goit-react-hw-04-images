import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(q);
    setQ('');
  };

  const onChange = event => {
    setQ(event.target.value);
  };

  return (
    <div>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmitForm}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
          />
        </form>
      </header>
    </div>
  );
};
