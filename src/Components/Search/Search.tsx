import { FormEvent, useRef } from 'react';
import { ProjectType } from '../../Types/ModelsType';
import './Search.css';

type SearchProps = {
    items: ProjectType[],
    setItems: Function,
}

export default function Search(props: SearchProps) {
    const { items, setItems } = props;
    const searchInput = useRef<HTMLInputElement | null>(null);

    const searchFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchText: string = searchInput.current?.value!;

        if(searchText !== "") {
            let newItems: ProjectType[] = structuredClone(items);
            newItems = newItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
            console.log(newItems);
            setItems(newItems);
        }
        else {
            setItems(null);
        }
    }
    
    return (
        <form onSubmit={(e) => searchFormHandler(e)} className="search-form">
            <input ref={searchInput} className="search-form__input" type="search" placeholder="Поиск..."/>
            <button className="search-form__button" type="submit">Найти</button>
        </form>
    )
}