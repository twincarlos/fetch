import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParametersContext } from '../../context/Parameters';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import Match from './Match';

function Home() {
    const { match, loggedIn } = useContext(ParametersContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn === false) {
            return navigate('/login');
        };
    }, [loggedIn, navigate]);


    if (match) {
        return <Match />;
    };

    return (
        <div style={{ display: 'flex' }}>
            <LeftColumn />
            <RightColumn />
        </div>
    );
};

export default Home;