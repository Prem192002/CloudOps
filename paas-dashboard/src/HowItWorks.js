import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCloud, FaRocket } from 'react-icons/fa';

const steps = [
  { icon: <FaGithub className="text-5xl text-gray-700 mb-4 mx-auto" />, title: '1. Enter Repo URL', description: 'Provide your GitHub repository URL.' },
  { icon: <FaCloud className="text-5xl text-gray-700 mb-4 mx-auto" />, title: '2. Choose Platform', description: 'Select your deployment platform, like AWS.' },
  { icon: <FaRocket className="text-5xl text-gray-700 mb-4 mx-auto" />, title: '3. Deploy', description: 'Click deploy and let the magic happen.' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <motion.div
          className="flex flex-col md:flex-row justify-around items-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center mb-8 md:mb-0 md:w-1/3"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {step.icon}
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;