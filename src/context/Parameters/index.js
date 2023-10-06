import { createContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ParametersContext = createContext();

export function ParametersProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const [dogsList, setDogsList] = useState([]);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [total, setTotal] = useState(0);
    const [match, setMatch] = useState(null);

    const [dogBreeds, setDogBreeds] = useState([]);
    const [sortedBreeds, setSortedBreeds] = useState([]);
    const [minAgeInput, setMinAgeInput] = useState('0');
    const [maxAgeInput, setMaxAgeInput] = useState('20');
    const [zipCodeInput, setZipCodeInput] = useState('');
    const [zipCodes, setZipCodes] = useState([]);
    const [sortingCategory, setSortingCategory] = useState('breed');
    const [sortingType, setSortingType] = useState('asc');
    const [size, setSize] = useState('25');

    return (
        <ParametersContext.Provider
            value={{
                loggedIn, setLoggedIn,
                name, setName,
                email, setEmail,

                searchParams, setSearchParams,
                dogsList, setDogsList,
                prev, setPrev,
                next, setNext,
                total, setTotal,
                match, setMatch,

                dogBreeds, setDogBreeds,
                sortedBreeds, setSortedBreeds,
                minAgeInput, setMinAgeInput,
                maxAgeInput, setMaxAgeInput,
                zipCodeInput, setZipCodeInput,
                zipCodes, setZipCodes,
                sortingCategory, setSortingCategory,
                sortingType, setSortingType,
                size, setSize
            }}
        >
            {children}
        </ParametersContext.Provider>
    );
};