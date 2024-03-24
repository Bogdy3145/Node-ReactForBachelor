import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Items from './components/Items'; // Adjust the path as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Items/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
