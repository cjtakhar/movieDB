import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Navbar from './components/navbar';
import Account from './components/account';
import Login from './components/login';
import About from './components/about';
import Lounge from './components/lounge';
import './App.css';

function App() {
  return (
    <div className="App">
      < BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/wga" element={<Dashboard />} />
          <Route path="/about" element={ <About />} />
          <Route path="/account" element={ <Account />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/lounge" element={ < Lounge /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
