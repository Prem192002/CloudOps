import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { quote: "CloudOps has revolutionized our deployment process. It's so easy to use!", author: "John Doe, CTO at TechCorp" },
  { quote: "Multi-platform deployments are seamless with CloudOps.", author: "Jane Smith, DevOps Engineer" },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-gray-800">- {testimonial.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;