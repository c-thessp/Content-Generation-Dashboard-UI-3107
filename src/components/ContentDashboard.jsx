import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiFacebook, FiMail, FiInstagram, FiLoader } = FiIcons;

const ContentDashboard = ({ uploadedFile, onGenerate, loadingStates, generatedContent }) => {
  const contentTypes = [
    {
      id: 'bookChapter',
      title: 'Generate Book Chapter',
      description: 'Transform content into a structured book chapter',
      icon: FiBook,
      color: 'bg-purple-500 hover:bg-purple-600',
      lightColor: 'bg-purple-100'
    },
    {
      id: 'facebook',
      title: 'Generate Facebook Content',
      description: 'Create engaging Facebook posts and content',
      icon: FiFacebook,
      color: 'bg-blue-500 hover:bg-blue-600',
      lightColor: 'bg-blue-100'
    },
    {
      id: 'substack',
      title: 'Generate Substack Content',
      description: 'Craft newsletter-style content for Substack',
      icon: FiMail,
      color: 'bg-orange-500 hover:bg-orange-600',
      lightColor: 'bg-orange-100'
    },
    {
      id: 'instagram',
      title: 'Generate Instagram Content',
      description: 'Create visual-friendly Instagram posts',
      icon: FiInstagram,
      color: 'bg-pink-500 hover:bg-pink-600',
      lightColor: 'bg-pink-100'
    }
  ];

  const handleGenerate = (type) => {
    if (!loadingStates[type] && !generatedContent[type]) {
      onGenerate(type);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Generation</h2>
        <div className="bg-gray-50 rounded-lg p-3 inline-block">
          <p className="text-gray-700">
            <span className="font-medium">Source File:</span> {uploadedFile.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <motion.button
              onClick={() => handleGenerate(type.id)}
              disabled={loadingStates[type.id] || generatedContent[type.id]}
              className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                generatedContent[type.id]
                  ? 'bg-green-50 border-2 border-green-200 cursor-default'
                  : loadingStates[type.id]
                  ? 'bg-gray-50 border-2 border-gray-200 cursor-not-allowed'
                  : `${type.color} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`
              }`}
              whileHover={!loadingStates[type.id] && !generatedContent[type.id] ? { scale: 1.02 } : {}}
              whileTap={!loadingStates[type.id] && !generatedContent[type.id] ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    generatedContent[type.id]
                      ? 'bg-green-100'
                      : loadingStates[type.id]
                      ? 'bg-gray-100'
                      : 'bg-white bg-opacity-20'
                  }`}>
                    {loadingStates[type.id] ? (
                      <SafeIcon icon={FiLoader} className={`text-2xl animate-spin ${
                        generatedContent[type.id] ? 'text-green-500' : 'text-gray-500'
                      }`} />
                    ) : (
                      <SafeIcon icon={type.icon} className={`text-2xl ${
                        generatedContent[type.id] 
                          ? 'text-green-500' 
                          : loadingStates[type.id] 
                          ? 'text-gray-500' 
                          : 'text-white'
                      }`} />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${
                      generatedContent[type.id] 
                        ? 'text-green-700' 
                        : loadingStates[type.id] 
                        ? 'text-gray-500' 
                        : 'text-white'
                    }`}>
                      {type.title}
                    </h3>
                    <p className={`text-sm ${
                      generatedContent[type.id] 
                        ? 'text-green-600' 
                        : loadingStates[type.id] 
                        ? 'text-gray-400' 
                        : 'text-white text-opacity-90'
                    }`}>
                      {loadingStates[type.id] 
                        ? 'Generating content...' 
                        : generatedContent[type.id]
                        ? 'Content generated successfully!'
                        : type.description
                      }
                    </p>
                  </div>
                </div>
                
                {generatedContent[type.id] && (
                  <div className="bg-green-100 rounded-full p-2">
                    <SafeIcon icon={FiIcons.FiCheck} className="text-green-500 text-xl" />
                  </div>
                )}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-blue-50 rounded-lg p-4 inline-block">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Tip:</span> Click on any button to start generating content. 
            Each generation takes a few seconds to complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;