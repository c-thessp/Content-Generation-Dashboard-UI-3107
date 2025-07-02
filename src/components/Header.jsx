import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiZap } = FiIcons;

const Header = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <SafeIcon icon={FiEdit3} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Content Generation Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Transform your content into multiple formats with AI
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
            <SafeIcon icon={FiZap} className="text-orange-500" />
            <span className="text-orange-700 font-medium">AI Powered</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;