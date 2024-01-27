import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <div>
      <button
        type="button"
        className={css.loadMore}
        onClick={() => onLoadMore()}
      >
        Load more
      </button>
    </div>
  );
};