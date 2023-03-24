import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Movies from './pages/Movies'
import MenuBar from './pages/MenuBar';
import Movie from './pages/Movie';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MenuBar />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}>
          <Route path=":movieId" element={<Movie />}></Route>
        </Route>
        <Route path="*" element={<div>There is nothing here!</div>}></Route>
      </Route>
    </Routes>
  );
};

export default App;