import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner, FaCloudUploadAlt } from "react-icons/fa";

export function ImageCarousel() {
  const images = [
    "https://source.unsplash.com/800x600/?technology",
    "https://source.unsplash.com/800x600/?coding",
    "https://source.unsplash.com/800x600/?development"
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-64 relative overflow-hidden rounded-lg mb-8 shadow-xl">
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`carousel-${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
}

function DeployForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [platform, setPlatform] = useState("AWS");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeploy = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/deploy", { repoUrl });
      alert(response.data.message);
    } catch (error) {
      console.error("Deployment failed:", error);
      alert("Deployment failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl"
      initial={{ y: 50, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FaCloudUploadAlt className="inline-block text-blue-500 mr-2" />
        Deploy Your App
      </motion.h2>
      <div className="mb-6">
        <label htmlFor="repoUrl" className="block text-gray-700 font-medium mb-2">
          GitHub Repository URL
        </label>
        <input
          id="repoUrl"
          type="text"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="platform" className="block text-gray-700 font-medium mb-2">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="AWS">AWS</option>
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDeploy}
        disabled={isLoading || !repoUrl.trim()}
        className={`w-full p-3 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-md ${
          isLoading || !repoUrl.trim() ? "bg-blue-300 opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" /> Deploying...
          </>
        ) : (
          "Deploy Now"
        )}
      </motion.button>
    </motion.div>
  );
}

export default DeployForm;