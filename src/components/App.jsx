import React, { Component } from 'react';
import css from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { requestImagesByQuery } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { STATUSES } from './Utils/Constants';

export class App extends Component {
  state = {
    hits: [],
    status: STATUSES.idle,
    error: null,
    q: '',
    page: 1,
    isLoadMore: false,
  };

  onSubmit = q => {
    this.setState({ q, page: 1, hits: [], isLoadMore: false });
  };

  async componentDidUpdate(_, prevState) {
    const { q, page } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      try {
        this.setState({ status: STATUSES.pending });
        const { hits, totalHits } = await requestImagesByQuery(q, page);
        
        this.setState(prevState => ({
          status: STATUSES.success,
          hits: [...prevState.hits, ...hits],
          isLoadMore: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.success });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { hits, isLoadMore } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.status === STATUSES.error && <p>ERROR{this.state.error}</p>}
        {hits.length > 0 && (
          <ImageGallery hits={hits} />
        )}
        {isLoadMore && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}

