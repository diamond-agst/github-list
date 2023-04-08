import React from "react"
import EmptyPage from "./containers/EmptyPage";
import Content from "./containers/Content";
import { Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EmptyPage/>} exact />
        <Route path="/:id" element={<Content/>} exact />
      </Routes>
    </div>
  );
}
 

export default App;
