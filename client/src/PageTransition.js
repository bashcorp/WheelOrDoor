import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
};

const PageTransition = ({ children }) => (
  <AnimatePresence>
    <motion.div initial="initial" animate="enter" variants={variants}>
      {children}
    </motion.div>
  </AnimatePresence>
);

export default PageTransition;
