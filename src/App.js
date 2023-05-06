import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Navbar from './components/navbar';
import Login from './components/login';
import About from './components/about';
import './App.css';

function App() {
  return (
    <div className="App">
      < BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/wga" element={<Dashboard />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/about" element={ <About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
