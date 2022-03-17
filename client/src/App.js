import logo from "./logo.svg";
import "./App.css";
import Poll from "./Poll/Poll"
import Hero from "./Hero/Hero"
import React, { Component, useEffect, useState } from 'react';
import PageTransition from "./PageTransition"

function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 10000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return (<PageTransition>
      <Hero />
    </PageTransition>);
  }

  // If show is true this will be returned
  return (
    <div className="container mx-auto px-4">
      <PageTransition>
        <Poll />
      </PageTransition>
    </div>
  )
}

export default App;
