import React from 'react';
import { motion } from 'motion/react';

export const Admission: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen"
    >
      <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfnfGskVIOJKKZNGIQS83-piJNso-4FCNWVW1-1hjb5tSXSrA/viewform?embedded=true" 
          className="w-full h-[7000px] md:h-[5500px] border-none"
          title="Admission Form"
          scrolling="no"
      >
          Loading…
      </iframe>
    </motion.div>
  );
};
