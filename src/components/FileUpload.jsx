import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiFile, FiCheck, FiX, FiAlertCircle } = FiIcons;

const FileUpload = ({ onFileUpload, uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setError(null);
    
    // Validate file type
    const allowedTypes = ['.txt', '.md'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setError(`Invalid file type. Please upload ${allowedTypes.join(' or ')} files only.`);
      return;
    }

    // Simulate upload process
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Content</h2>
        <p className="text-gray-600">Upload a .txt or .md file to get started with content generation</p>
      </div>

      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : uploadedFile 
            ? 'border-green-400 bg-green-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md"
          onChange={handleChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <SafeIcon icon={FiUpload} className="text-blue-500 text-2xl animate-bounce" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">Uploading...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm text-gray-500">{uploadProgress}%</p>
              </div>
            </motion.div>
          ) : uploadedFile ? (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <SafeIcon icon={FiCheck} className="text-green-500 text-2xl" />
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-center space-x-3">
                  <SafeIcon icon={FiFile} className="text-green-500 text-xl" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
              </div>
              <p className="text-green-600 font-medium">File uploaded successfully!</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <SafeIcon icon={FiUpload} className="text-gray-400 text-2xl" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-700">
                  Drag and drop your file here
                </p>
                <p className="text-gray-500">or</p>
                <motion.button
                  onClick={onButtonClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose File
                </motion.button>
              </div>
              <p className="text-sm text-gray-500">
                Supports .txt and .md files only
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
          >
            <SafeIcon icon={FiAlertCircle} className="text-red-500 text-xl flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <SafeIcon icon={FiX} className="text-lg" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;