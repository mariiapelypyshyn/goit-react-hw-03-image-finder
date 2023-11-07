import React, { Component } from 'react'
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

export default class Searchbar extends Component {

    state = {
        inputData: '',
    }

    onInputChange = e => {
        this.setState({ inputData: e.currentTarget.value.toLowerCase() });
    }
  
    handleSubmit = e => {
        e.preventDefault();

        if (this.state.inputData.trim() === '') {
            Notiflix.Notify.info('You cannot search by empty field, try again.');
            return;
        }
        this.props.onSubmit(this.state.inputData);
        this.setState({ inputData: ''})
    }
    
    render() {
        const { inputData } = this.state.inputData;
        
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        name="inputData"
                        value={inputData}
                        onChange={this.onInputChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos" />
                </form>
            </header>
        );
    }
}





