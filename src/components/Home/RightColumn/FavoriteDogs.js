import { useEffect, useState, useContext } from "react";
import { ParametersContext } from '../../../context/Parameters';

function FavoriteDogs({ setFavoriteDogsIds, favoriteDogsIds }) {
    const [favoriteDogs, setFavoriteDogs] = useState([]);
    const { name, email, setMatch } = useContext(ParametersContext);

    function generateMatch() {
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
                    fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': process.env.REACT_APP_URL
                        },
                        body: JSON.stringify(favoriteDogsIds),
                        credentials: 'include'
                    })
                        .then(res => res.ok && res.json())
                        .then(matchData => setMatch(favoriteDogs.find(dog => dog.id === matchData.match)));
                };
            });
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
                    fetch('https://frontend-take-home-service.fetch.com/dogs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': process.env.REACT_APP_URL
                        },
                        body: JSON.stringify(favoriteDogsIds),
                        credentials: 'include'
                    })
                        .then(res => res.ok && res.json())
                        .then(favoriteDogsData => {
                            setFavoriteDogs(favoriteDogsData)
                        });
                };
            })
    }, [name, email, favoriteDogsIds]);

    return (
        <div className='favorites'>
            {
                favoriteDogsIds.length > 0 ?
                    <>
                        <div className='favorite-dogs-list'>
                            {
                                favoriteDogs.map(favoriteDog => (
                                    <div key={favoriteDog.id} className='dog-container'>
                                        <img src={favoriteDog.img} alt='' onClick={() => {
                                            const indexOfFavoriteDog = favoriteDogsIds.indexOf(favoriteDog.id);
                                            setFavoriteDogsIds([...favoriteDogsIds.slice(0, indexOfFavoriteDog), ...favoriteDogsIds.slice(indexOfFavoriteDog + 1)]);
                                        }} />
                                        <span>
                                            <p>age:</p>
                                            <p className='puff'>{favoriteDog.age}</p>
                                        </span>
                                        <span>
                                            <p>name:</p>
                                            <p className='puff'>{favoriteDog.name}</p>
                                        </span>
                                        <span>
                                            <p>breed:</p>
                                            <p className='puff'>{favoriteDog.breed}</p>
                                        </span>
                                        <span>
                                            <p>zip code:</p>
                                            <p className='puff'>{favoriteDog.zip_code}</p>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='generate-match'>
                            <button className='puff' onClick={generateMatch}>Generate match</button>
                        </div>
                    </> :
                    <>
                        <div className='empty-list-warning'>
                            <p>You currently have no dogs selected as favorites.</p>
                            <p>You can do so by clicking on their photo.</p>
                        </div>
                    </>
            }
        </div>
    );
};

export default FavoriteDogs;