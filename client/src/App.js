import logo from "./logo.svg";
import "./App.css";
import Poll from "./Poll/Poll"
import Hero from "./Hero/Hero"
import React, { Component, useEffect, useState } from 'react';
import PageTransition from "./PageTransition"
import { w3cwebsocket as W3CWebSocket } from "websocket";


function App() {
  const [show, setShow] = useState(true);
  const client = new W3CWebSocket("ws://www.wheelordoor.com:8001/ws/socket-test");

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
      <Poll client={client} />
    </PageTransition>);
  }

  // If show is true this will be returned
  return (
    <div style={{ minWidth: "380px" }} className="container mx-auto px-4">
      <PageTransition>
        <Hero />
      </PageTransition>
    </div>
  )
}

export default App;
