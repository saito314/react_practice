import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function Square() {
  const [value, setValue] = useState<string | null>(null);
  
  function handleClick() {
    setValue("X");
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  )
}

export default function board() {
  return (
    <>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

