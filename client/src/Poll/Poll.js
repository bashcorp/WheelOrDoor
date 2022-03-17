// import * as React from "react";
// import { useState } from "react";
// import { render } from "react-dom";
// import { motion, useSpring } from "framer-motion";
// import "./Poll.css";

// export default Poll;

import React, { useState } from "react";
import { motion, useSpring } from "framer-motion";
import AnimatedCharacters from "./AnimatedCharacters";
import Logo from "../Logo/Logo"
import "./Poll.css";


function Poll() {

  const x = useSpring(-150, { stiffness: 80, damping: 20 });
  const y = useSpring(10, { stiffness: 80, damping: 20 });
  // Placeholder text data, as if from API
  const placeholderText = [
    {
      type: "heading1",
      text: "Do you think there are more wheels or doors in the world?",
    }
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.065,
        delayChildren: 1.5
      },
    },
  };

  return (
    <>
      <motion.div
        className="font-bold"
        animate={{
          x: 0,
          y: 0,
          scale: [1, 1.3, .4],
          rotate: [0, 8, 5, 8, 5, 8, 5, 8, 5, 8, 5],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeatDelay: 1,
        }}

        style={{
          x,
          y,
          width: 100,
          height: 0,
          position: "fixed",
          top: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          left: -150,
          right: 0,
        }}
      ><Logo />
      </motion.div>


      <motion.div
        className="hero-text font-bold"
        initial="hidden"
        animate={"visible"}
        variants={container}
      >
        <div className="container">
          {placeholderText.map((item, index) => {
            return <AnimatedCharacters {...item} key={index} />;
          })}
        </div>
      </motion.div>
      <div id="progressBar" />
    </>
  );
}

export default Poll;
