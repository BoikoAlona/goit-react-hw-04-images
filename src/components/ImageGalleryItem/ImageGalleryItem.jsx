import css from './ImageGalleryItem.module.css';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    return (
      <li key={this.props.id} className={css.ImageGalleryItem}>
        <img
          onClick={this.toggleModal}
          className={css.imageGalleryItemImage}
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
        {this.state.isModalOpen && (
          <Modal
            isModalOpen={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            largeImageURL={this.props.largeImageURL}
            tags={this.props.tags}
          />
        )}
      </li>
    );
  }
}
