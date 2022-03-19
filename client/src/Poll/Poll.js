import React, { Component, useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import "./Poll.css";
import PollResult from "./PollResult";
import { motion, useSpring, useAnimation } from "framer-motion";

function Poll(props) {
  const client = props.client;
  const [voted, setVoted] = useState(false);
  const [wheelVotes, setWheelVotes] = useState(1);
  const [doorVotes, setDoorVotes] = useState(1);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      let parsedMessage = message.data;
      let parsedMessageArray = parsedMessage.split(", ");
      if (voted) {
        let numWheels = parsedMessageArray[1];
        let numDoors = parsedMessageArray[2].replace("}", "");

        numDoors = numDoors.match(/: (.*)/)[1];
        numWheels = numWheels.match(/: (.*)/)[1];

        console.log(numDoors);
        console.log(numWheels);

        setWheelVotes(parseInt(numWheels));
        setDoorVotes(parseInt(numDoors));
      } else {
        let numConnections = parsedMessageArray[1].replace("}", "");
        numConnections = numConnections.match(/: (.*)/)[1];
        console.log(numConnections);
      }
    };
  });

  const controls = useAnimation();
  const sendMessage = (message) => {
    if (!voted) {
      client.send(
        JSON.stringify({
          vote: message,
        })
      );
    }
    setVoted(!voted);

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
      <motion.div
        transitionEnd={{
          display: "none",
        }}
        animate={controls}
        className="inset-center"
      >
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
          ) : null}

          <motion.button
            animate={controls}
            tabIndex={0}
            className="absolute bottom-10 cursor-pointer right-0 z-10 w-full p-2 rounded-lg mx-auto max-w-sm"
            onClick={() => sendMessage("wheel")}
          >
            <div
              className="block"
              id="static-example"
              role="alert"
              aria-atomic="true"
            >
              <div className="gray-theme p-3 bg-clip-padding border-b border-gray-200 rounded-lg">
                <p className="font-bold text-center text-gray-50 text-2xl">
                  Vote for<span className="text-blue-200"> #TeamWheel</span>
                </p>
              </div>
            </div>
          </motion.button>
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
            />
          ) : null}
          <motion.button
            animate={controls}
            tabIndex={0}
            transitionEnd={{
              display: "none",
            }}
            className="absolute cursor-pointer bottom-10 left-0 p-2 z-10 rounded-lg mx-auto w-full max-w-sm"
            onClick={() => sendMessage("door")}
          >
            <div
              className="block"
              id="static-example"
              role="alert"
              aria-atomic="true"
            >
              <div className="gray-theme p-3 bg-clip-padding border-b border-gray-200 rounded-lg">
                <p className="font-bold text-center text-gray-50 text-2xl">
                  Vote for<span className="text-red-200"> #TeamDoor </span>
                </p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </>
  );
}
export default Poll;
