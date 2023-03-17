import logo from './logo.svg';
import './App.css';
import News from './components/News' 
import NavBar from './components/NavBar';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react'



import {
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom";

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact  path='/' element={<News pageSize={10} key="general"   country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="general"/>}></Route>
          <Route exact path='/business' element={<News pageSize={10} key="business" country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="business"/>}></Route>
          <Route exact path='/entertainment' element={<News pageSize={10} key="entertainment" country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="entertainment"/>}></Route>
          <Route exact path='/health' element={<News pageSize={10 } key="health" country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="health"/>}></Route>
          <Route exact path='/sports' element={<News pageSize={10} key="sports" country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="sports"/>}></Route>
          <Route exact path='/science' element={<News pageSize={10} key="science" country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="science"/>}></Route>
          <Route exact path='/technology' element={<News pageSize={10} key="technology" country="in" access_token="c671e9ffbff744e9835de3a3970e09bc" category="technology"/>}></Route>
          <Route exact path='/About' element={<About/>}></Route>
        </Routes>
      </Router>
      
      <button onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button onClick={() => setProgress(progress + 20)}>Add 20%</button>            

    </div>
  );
}

export default App;
