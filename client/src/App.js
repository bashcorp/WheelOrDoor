import logo from "./logo.svg";
import "./App.css";
import Poll from "./Poll/Poll";
import Hero from "./Hero/Hero";
import React, { Component, useEffect, useState } from "react";
import PageTransition from "./PageTransition";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function App() {
  const [show, setShow] = useState(true);
  const [voted, setVoted] = useState(false);
  let client;

  useEffect(() => {
    client = new W3CWebSocket("wss://www.wheelordoor.com/ws/socket-test");
    if (localStorage.getItem("voted") === null) {
      const timeId = setTimeout(() => {
        setShow(false);
      }, 10000);
      return () => {
        clearTimeout(timeId);
      };
    } else {
      setVoted(true);
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return (
      <PageTransition>
        <Poll client={client} />
      </PageTransition>
    );
  }

  // If show is true this will be returned
  return (
    <div>
      {voted ? (
        <PageTransition>
          <Poll client={client} voted={voted} />
        </PageTransition>
      ) : (
        <PageTransition>
          <Hero />
        </PageTransition>
      )}
    </div>
  );
}

export default App;
