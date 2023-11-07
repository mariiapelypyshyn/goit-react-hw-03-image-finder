import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from './FetchImages/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import css from './App.module.css';

let page = 1;

class App extends Component {
  state = {
    inputData: '',
    items: [],

    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = inputData => {
    this.setState({ inputData });
  }

async componentDidUpdate(_, prevState){
  if(this.state.inputData !== prevState.inputData ){
    try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(this.state.inputData);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
    
        }

  
  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
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
          <ImageGallery page={page} items={this.state.items} />
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
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}
export default App;