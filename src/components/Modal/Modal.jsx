import css from './Modal.module.css';
import React, { Component } from 'react';


class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
    document.body.style.overflow = "auto";
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
     const { largeImageURL } = this.props.image;
    return (
      <div onClick={this.onOverlayClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="img" />
         </div>
      </div>
    )
  }

}

export default Modal;