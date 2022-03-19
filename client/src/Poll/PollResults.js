import React, { useState } from "react";
import { motion, useSpring } from "framer-motion";

function PollResults(props) {
  return (
    <>
      <div className="absolute">
        <span>{props.percent}</span>
        <span>{props.value}</span>
      </div>
    </>
  );
}

export default PollResults;
