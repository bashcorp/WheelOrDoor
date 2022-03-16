// import * as React from "react";
// import { useState } from "react";
// import { render } from "react-dom";
// import { motion, useSpring } from "framer-motion";
// import "./Poll.css";

// export default Poll;

import React, { useState } from "react";
import { motion, useSpring } from "framer-motion";
import AnimatedCharacters from "./AnimatedCharacters";
import "./Poll.css";

function Poll() {
  const x = useSpring(-50, { stiffness: 100 });
  const y = useSpring("100%", { damping: 100 });
  // Placeholder text data, as if from API
  const placeholderText = [
    { type: "heading1", text: "Framer Motion" },
    {
      type: "heading2",
      text: "Animating responsive text!",
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.095,
      },
    },
  };

  return (
    <>
      <motion.div
        animate={{
          x: -50,
          y: 0,
          scale: [3, 4, 1, 1, 1],
          rotate: [0, 180, 190, 180],
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
          height: 100,
          position: "fixed",
          top: "40px",
        }}
      >
        ⌛
      </motion.div>
      <motion.div
        className="App"
        initial="hidden"
        // animate="visible"
        animate={"visible"}
        variants={container}
      >
        <div className="container">
          {placeholderText.map((item, index) => {
            return <AnimatedCharacters {...item} key={index} />;
          })}
        </div>
      </motion.div>
    </>
  );
}

export default Poll;
