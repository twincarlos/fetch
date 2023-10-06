import { useContext, useEffect } from "react";
import { ParametersContext } from "../../../../context/Parameters";
import './Breeds.css';

function Breeds() {
    const {
        name, email,
        searchParams, setSearchParams,
        dogBreeds, setDogBreeds,
        sortedBreeds, setSortedBreeds
    } = useContext(ParametersContext);

    function sortByBreed(breed) {
        if (sortedBreeds.includes(breed) === true) {
            const indexOfSortedBreed = sortedBreeds.indexOf(breed);
            const breedsParams = [...sortedBreeds.slice(0, indexOfSortedBreed), ...sortedBreeds.slice(indexOfSortedBreed + 1)];
            if (breedsParams.length > 0) {
                searchParams.set('breeds', breedsParams);
            } else {
                searchParams.delete('breeds');
            };
            setSortedBreeds(breedsParams);
        } else {
            const breedsQuery = searchParams.get('breeds')?.split(',');
            if (!breedsQuery) {
                searchParams.set('breeds', [breed]);
            } else {
                searchParams.set('breeds', [...breedsQuery, breed]);
            };
            setSortedBreeds([...sortedBreeds, breed]);
        };
        setSearchParams(searchParams);
    };

    function clearAllBreeds() {
        setSortedBreeds([]);
        searchParams.delete('breeds');
        setSearchParams(searchParams);
    };

    useEffect(() => {
        fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email }),
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                        method: 'GET',
                        headers: {
                            'Origin': process.env.REACT_APP_URL
                        },
                        credentials: 'include'
                    })
                        .then(res => res.ok && res.json())
                        .then(breedsData => setDogBreeds(breedsData));
                };
            })
    }, [name, email, setDogBreeds]);

    if (dogBreeds.length === 0) {
        return <p>Loading...</p>;
    };

    return (
        <div className='breeds'>
            <div className='breeds-header'>
                <p>Filter by breed:</p>
                {
                    sortedBreeds.length > 0 && 
                    <button className='puff' onClick={clearAllBreeds}>
                        <span className="material-symbols-outlined">
                            restart_alt
                        </span>
                        Clear all breeds
                    </button>
                }
            </div>
            <div className='breed-list'>
                {
                    dogBreeds.map(breed => (
                        <button className={`breed-button ${sortedBreeds.includes(breed) ? 'puff sorted-breed' : 'unsorted-breed'}`}
                            key={breed}
                            onClick={() => sortByBreed(breed)}>
                            {breed}
                        </button>
                    ))
                }
            </div>

        </div>
    );
};

export default Breeds;