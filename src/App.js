import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
