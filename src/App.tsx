import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./pages/Home";
import History from "./pages/History";
import {CacheProvider} from "./providers/ChacheProvider";

function App() {
  console.log('App rendered');
  return (
    <CacheProvider>
      <Router>
        <div>
            <nav>
            <ul className="ul">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/history">History</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/history" element={<History/>}/>
          </Routes>
        </div>
      </Router>
    </CacheProvider>
  );
}

export default App;
