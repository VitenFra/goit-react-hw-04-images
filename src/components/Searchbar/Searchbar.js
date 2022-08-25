import { useState }  from 'react';
import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im'
import Notiflix from 'notiflix';
import PropTypes from 'prop-types'


export default function Searchbar({onSubmit}) {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        if (searchQuery.trim() === '') {
            Notiflix.Notify.warning('Будь ласка, введіть щось!');
            return;
        }

        onSubmit(searchQuery);
        
        
    };

    const handleChange = event => {
        setSearchQuery(event.currentTarget.value.toLowerCase());
    }

   
        return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={s.SearchButton}>
            <span>
            <ImSearch style={{marginRight: 8}} />
            </span>
            </button>

            <input
            className={s.SearchFormInput}
            type="text"
            value={searchQuery}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Пошук зображень і фотографій"
            />
            </form>
        </header>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}