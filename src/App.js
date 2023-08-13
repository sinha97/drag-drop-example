
import React from 'react';
import DragAndDrop from './components/DragAndDrop';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css';

function App() {
  return (
    <div className="App">
      <DragAndDrop />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
