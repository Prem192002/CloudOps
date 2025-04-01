import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center">
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Deploy Your Applications with Ease
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg md:text-xl mb-8 max-w-2xl"
      >
        Streamline your deployment process to AWS, Azure, and more with CloudOps.
      </motion.p>
      <motion.a
        href="#deploy"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
      >
        Get Started
      </motion.a>
    </section>
  );
};

export default Hero;