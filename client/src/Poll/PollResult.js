import React, { useState } from "react";
import { motion, useSpring } from "framer-motion";

function PollResults(props) {
  return (
    <>
      <motion.div
        animate={{
          y: 40,
          scale: [0.8, 1.2, 1],
        }}
        className={props.direction + "-0 absolute px-3 top-1/4"}
      >
        <span
          style={{
            marginBottom: "-14px",
          }}
          className="text-6xl md:text-9xl block text-gray-50"
        >
          {Math.floor(parseInt(props.percent))}%
        </span>
        <span className="text-2xl text-center block text-gray-100">
          {props.value} votes
        </span>
      </motion.div>
    </>
  );
}

export default PollResults;
