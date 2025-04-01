import React from 'react';
import DeployForm from './DeployForm'; // Adjust path based on your structure

const DeploySection = () => {
  return (
    <section id="deploy" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Start Deploying Now</h2>
        <DeployForm />
      </div>
    </section>
  );
};

export default DeploySection;