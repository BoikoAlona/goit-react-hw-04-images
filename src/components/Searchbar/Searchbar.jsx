import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    q: '',
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.q);
  };

  onChange = event => {
    this.setState({ q: event.target.value });
  };

  render() {
    return (
      <div>
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleSubmitForm}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.onChange}
            />
          </form>
        </header>
      </div>
    );
  }
}
