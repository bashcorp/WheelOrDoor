import logo from "./logo.svg";
import "./App.css";
import Poll from "./Poll/Poll"
import Hero from "./Hero/Hero"
import React, { Component, useEffect, useState } from 'react';

function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 8000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return <Hero />;
  }

  // If show is true this will be returned
  return (
    <div className="container mx-auto px-4">
      <Poll />
    </div>
  )
}

export default App;
