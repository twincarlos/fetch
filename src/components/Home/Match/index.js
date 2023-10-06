import { useContext } from 'react';
import { ParametersContext } from '../../../context/Parameters';
import './Match.css';

function Match() {
    const {
        searchParams, setSearchParams,
        setMinAgeInput, setMaxAgeInput,
        setZipCodeInput, setZipCodes,
        setSortingCategory, setSortingType,
        setSortedBreeds, setSize,
        match, setMatch
    } = useContext(ParametersContext);

    function clearAllFilters() {
        setSortingCategory('breed');
        setSortingType('asc');
        setSize('25');
        setMinAgeInput('0');
        setMaxAgeInput('20');
        setZipCodeInput('');
        setZipCodes([]);
        setSortedBreeds([]);
        setMatch(null);

        searchParams.set('sort', 'breed:asc');
        searchParams.set('size', '25');
        searchParams.delete('ageMin');
        searchParams.delete('ageMax');
        searchParams.delete('zipCodes');
        searchParams.delete('breeds');
        setSearchParams(searchParams);
    };

    return (
        <div className='match'>
            <h1 className='puff'>You've found a match!</h1>
            <img src={match.img} alt='' />
            <div className='match-details'>
                <span>
                    <p>name:</p>
                    <p className='puff'>{match.name}</p>
                </span>
                <span>
                    <p>age:</p>
                    <p className='puff'>{match.age} years old</p>
                </span>
                <span>
                    <p>zipcode:</p>
                    <p className='puff'>{match.zip_code}</p>
                </span>
                <span>
                    <p>breed:</p>
                    <p className='puff'>{match.breed}</p>
                </span>
            </div>
            <button onClick={clearAllFilters}>Start again</button>
        </div>
    );
};

export default Match;