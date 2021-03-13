import { useEffect, useState } from "react";
import Main from "./components/Main/main";
import Navbar from "./components/Navbar/navbar";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route path='/' >
          <Main />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;