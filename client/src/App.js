import logo from "./logo.svg";
import "./App.css";
import Poll from "./Poll/Poll"
import Hero from "./Hero/Hero"
import React, { Component } from 'react';

function App() {
  return (
    <>
      <h1 class="text-7xl font-bold">
        Hello world!
      </h1>
      <Poll />
    </>
  );
}

export default App;
