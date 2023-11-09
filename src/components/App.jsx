import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from './FetchImages/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import css from './App.module.css';

class App extends Component {
  state = {
    inputData: '',
    items: [],
    page: 1,
    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = inputData => {
    this.setState({ inputData, page: 1 });
  }

  getImgs = async () => {
    try {
      this.setState({ status: 'pending' });
      const result = await fetchImages(this.state.inputData, this.state.page)
     
      if (result.hits.length < 1) {
        this.setState({ status: 'idle' });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        this.setState(prevState => ({
          items: [...prevState.items, ...result.hits],
          totalHits: result.totalHits,
        status: 'resolved',
      }));
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.inputData !== this.state.inputData || prevState.page !== this.state.page) {
      this.getImgs();
    }
  };
  
  onNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

 
  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery  items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery  items={this.state.items} />
          {totalHits > 12 && totalHits > items.length &&
            <Button onClick={this.onNextPage} />}
        </div>
      );
    }
  }
};

export default App;