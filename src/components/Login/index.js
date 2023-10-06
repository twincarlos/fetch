import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParametersContext } from '../../context/Parameters';
import './Login.css';

function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setLoggedIn, name, setName, email, setEmail, loggedIn } = useContext(ParametersContext);

    function login() {
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
                    setLoggedIn(true);
                    return navigate('/');
                } else {
                    setError('Login failed.');
                };
            });
    };

    useEffect(() => {
        if (loggedIn === true) {
            return navigate('/');
        }
    }, [loggedIn, navigate]);


    return (
        <div className='login'>
            <div className='login-container'>
                <div className='login-header'>
                    <h1 className='puff'>Welcome to Fetch!</h1>
                    <p>Enter your credentials to start searching</p>
                    <p>for your new furry best friend!</p>
                </div>
                <div className='login-body'>
                    {error && <p className='error'>{error}</p>}
                    <div>
                        <label>name:</label>
                        <input
                            className='puff'
                            type='text'
                            placeholder='name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>email address:</label>
                        <input
                            className='puff'
                            type='text'
                            placeholder='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='puff' onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;