import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

function Counter({ to, isPercent, isFirstRender }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    let from = 0;

    if (!isFirstRender) {
      from = to - 1;
    }

    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        if (isPercent) {
          node.textContent = value.toFixed(0) + "%";
        } else {
          node.textContent = value.toFixed(0);
        }
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <span
      style={{
        marginBottom: "-14px",
      }}
      className="text-4xl md:text-9xl block text-gray-50"
      ref={nodeRef}
    />
  );
}

export default Counter;
