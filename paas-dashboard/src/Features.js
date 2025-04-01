import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCloud, FaChartLine } from 'react-icons/fa';

const features = [
  { icon: <FaRocket className="text-4xl text-blue-500 mb-4 mx-auto" />, title: 'One-Click Deployment', description: 'Deploy your applications effortlessly with a single click.' },
  { icon: <FaCloud className="text-4xl text-blue-500 mb-4 mx-auto" />, title: 'Multi-Platform Support', description: 'Supports AWS, Azure, Google Cloud, and more.' },
  { icon: <FaChartLine className="text-4xl text-blue-500 mb-4 mx-auto" />, title: 'Real-Time Monitoring', description: 'Track your deployments with detailed real-time logs.' },
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;