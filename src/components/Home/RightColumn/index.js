import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { ParametersContext } from '../../../context/Parameters';
import FavoriteDogs from './FavoriteDogs';
import './RightColumn.css';

function MiddleColumn() {
    const [showModal, setShowModal] = useState(false);
    const [favoriteDogsIds, setFavoriteDogsIds] = useState([]);
    const navigate = useNavigate();

    const {
        name, email,
        dogsList, setDogsList,
        prev, setPrev,
        next, setNext,
        total, setTotal,
        setSearchParams, searchParams,
        setLoggedIn
    } = useContext(ParametersContext);

    function logout() {
        fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(() => {
                setLoggedIn(false);
                return navigate('/login');
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
                    let queryURL = '';
                    if (searchParams.get('sort') === null) {
                        searchParams.set('sort', 'breed:asc');
                    };
                    if (searchParams.get('size') === null) {
                        searchParams.set('size', '25');
                    };
                    for (const [parameter, value] of searchParams.entries()) {
                        const firstDelimiter = queryURL.length === 0 ? '?' : '&';
                        queryURL += `${firstDelimiter}${parameter}=${value.replaceAll(',', `&${parameter}=`).replaceAll(' ', '+')}`;
                    };
                    fetch('https://frontend-take-home-service.fetch.com/dogs/search' + queryURL, {
                        method: 'GET',
                        headers: {
                            'Origin': process.env.REACT_APP_URL
                        },
                        credentials: 'include'
                    })
                        .then(res => res.ok && res.json())
                        .then(searchData => {
                            setPrev(searchData.prev);
                            setNext(searchData.next);
                            setTotal(searchData.total);
                            fetch('https://frontend-take-home-service.fetch.com/dogs', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Origin': process.env.REACT_APP_URL
                                },
                                body: JSON.stringify(searchData.resultIds),
                                credentials: 'include'
                            })
                                .then(res => res.ok && res.json())
                                .then(dogsData => setDogsList(dogsData));
                        });
                };
            });
    }, [name, email, searchParams, setDogsList, setPrev, setNext, setTotal]);

    if (dogsList.length === 0) {
        return <p>Loading...</p>;
    };

    return (
        <div className='right-column'>
            {
                showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <FavoriteDogs favoriteDogsIds={favoriteDogsIds} setFavoriteDogsIds={setFavoriteDogsIds} />
                </Modal>
            }
            <div className='header'>
                { prev && <button className='next-back-buttons' onClick={() => setSearchParams('?' + prev.split('?')[1])}><span className="material-symbols-outlined">arrow_back_ios_new</span></button> }
                <button className='puff favorites-button' onClick={() => setShowModal(true)}><span className="material-symbols-outlined">favorite</span> favorites</button>
                <span className='puff'><span className="material-symbols-outlined">pets</span>{total} results</span>
                { next && <button className='next-back-buttons' onClick={() => setSearchParams('?' + next.split('?')[1])}><span className="material-symbols-outlined">arrow_forward_ios</span></button> }
                <button className='logout-button' onClick={logout}><span className="material-symbols-outlined">logout</span>logout</button>
            </div>
            <div className='dogs-list'>
                {
                    dogsList.map(dog => (
                        <div key={dog.id} className={`dog-container ${favoriteDogsIds.includes(dog.id) && 'favorite'}`}>
                            <img onClick={() => {
                                const indexOfFavoriteDog = favoriteDogsIds.indexOf(dog.id);
                                if (indexOfFavoriteDog === -1) {
                                    setFavoriteDogsIds([...favoriteDogsIds, dog.id]);
                                } else {
                                    setFavoriteDogsIds([...favoriteDogsIds.slice(0, indexOfFavoriteDog), ...favoriteDogsIds.slice(indexOfFavoriteDog + 1)]);
                                };
                            }} width={100} src={dog.img} alt='' />
                            <span>
                                <p>age:</p>
                                <p className='puff'>{dog.age}</p>
                            </span>
                            <span>
                                <p>name:</p>
                                <p className='puff'>{dog.name}</p>
                            </span>
                            <span>
                                <p>breed:</p>
                                <p className='puff'>{dog.breed}</p>
                            </span>
                            <span>
                                <p>zip code:</p>
                                <p className='puff'>{dog.zip_code}</p>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MiddleColumn;