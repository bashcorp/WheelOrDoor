import React, { Component, useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import "./Poll.css";
import PollResult from "./PollResult";
import Modal from "../Modal/Modal";
import { motion, useSpring, useAnimation } from "framer-motion";
import BottomBar from "../BottomBar/BottomBar";

function Poll(props) {
  const client = props.client;
  const [voted, setVoted] = useState(props.voted);
  const [wheelVotes, setWheelVotes] = useState(1);
  const [doorVotes, setDoorVotes] = useState(1);
  const [numConnected, setNumConnected] = useState(1);

  useEffect(() => {
    client.onmessage = (message) => {
      let parsedMessage = message.data;
      let jsonMessage = JSON.parse(parsedMessage);

      if (jsonMessage.hasOwnProperty("connections")) {
        setNumConnected(jsonMessage.connections);
      } else {
        setWheelVotes(jsonMessage.wheels);
        setDoorVotes(jsonMessage.doors);
      }
    };

    if (voted) {
      logo.start((i) => ({
        scale: 0.34,
        top: -120,
        left: -120,
      }));
    }
  });

  const controls = useAnimation();
  const logo = useAnimation();

  const sendMessage = (message) => {
    if (!voted) {
      try {
        client.send(
          JSON.stringify({
            vote: message,
          })
        );
        setVoted(!voted);
      } catch (err) {
        alert("Sorry! We were unable to submit your vote.");
      }
    }

    controls.start((i) => ({
      opacity: 0,
      y: 50,
      scale: 0,
      transition: { delay: i * 0.3 },
      transitionEnd: {
        display: "none",
      },
    }));
  };

  return (
    <>
      <Modal />

      <motion.div animate={logo} className="inset-center">
        <Logo />
      </motion.div>

      <div className="background-container">
        <div
          className="wheel relative"
          style={{
            width: (wheelVotes / (wheelVotes + doorVotes)) * 100 + "%",
            minWidth: "215px",
            maxWidth: "calc(100vw - 215px)",
          }}
        >
          {voted ? (
            <PollResult
              percent={(wheelVotes / (wheelVotes + doorVotes)) * 100}
              value={wheelVotes}
              direction={"left"}
            />
          ) : (
            <motion.button
              animate={controls}
              tabIndex={0}
              className="absolute bottom-10 cursor-pointer right-0 z-10 w-full p-2 rounded-lg mx-auto max-w-sm"
              onClick={() => {
                window.localStorage.setItem("voted", true);
                setVoted(true);
                sendMessage("wheel");
              }}
            >
              <div
                className="block"
                id="static-example"
                role="alert"
                aria-atomic="true"
              >
                <div className="gray-theme p-1 md:p-3 bg-clip-padding border-b border-gray-200 rounded-lg">
                  <p className="font-bold text-center text-gray-50 text-lg md:text-2xl">
                    Vote for<span className="text-blue-200"> #TeamWheel</span>
                  </p>
                </div>
              </div>
            </motion.button>
          )}
        </div>
        <div
          className="door relative right-0"
          style={{
            width: (doorVotes / (wheelVotes + doorVotes)) * 100 + "%",
            minWidth: "215px",
            maxWidth: "calc(100vw - 215px)",
          }}
        >
          {voted ? (
            <PollResult
              percent={(doorVotes / (wheelVotes + doorVotes)) * 100}
              value={doorVotes}
              direction={"right"}
              style={{ right: "0px" }}
            />
          ) : (
            <motion.button
              animate={controls}
              tabIndex={0}
              transitionEnd={{
                display: "none",
              }}
              className="absolute cursor-pointer bottom-10 left-0 p-2 z-10 rounded-lg mx-auto w-full max-w-sm"
              onClick={() => {
                window.localStorage.setItem("voted", true);
                setVoted(true);
                sendMessage("door");
              }}
            >
              <div
                className="block"
                id="static-example"
                role="alert"
                aria-atomic="true"
              >
                <div className="gray-theme p-1 md:p-3 bg-clip-padding border-b border-gray-200 rounded-lg">
                  <p className="font-bold text-center text-gray-50 text-lg md:text-2xl">
                    Vote for <span className="text-red-200">#TeamDoor</span>
                  </p>
                </div>
              </div>
            </motion.button>
          )}
          {voted ? <BottomBar currentlyVoting={numConnected} /> : null}
        </div>
      </div>
    </>
  );
}
export default Poll;
