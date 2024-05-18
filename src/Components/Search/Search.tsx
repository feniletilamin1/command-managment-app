import { FormEvent } from 'react';
import './Search.css';

type SearchProps = {
    searchFormHandler: (e: FormEvent<HTMLFormElement>) => void,
    searchInput:  React.MutableRefObject<HTMLInputElement | null>
}

export default function Search(props: SearchProps) {
    const { searchInput, searchFormHandler } = props;
    
    return (
        <form onSubmit={(e) => searchFormHandler(e)} className="search-form">
            <input ref={searchInput} className="search-form__input" type="search" placeholder="Поиск..."/>
            <button className="search-form__button" type="submit">Найти</button>
        </form>
    )
}