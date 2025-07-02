import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { mockContent } from '../data/mockContent';

const { FiEye, FiBook, FiFacebook, FiMail, FiInstagram } = FiIcons;

const ContentReview = ({ generatedContent }) => {
  const [activeTab, setActiveTab] = useState('insights');

  const tabs = [
    {
      id: 'insights',
      title: 'Extracted Insights',
      icon: FiEye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      available: true
    },
    {
      id: 'bookChapter',
      title: 'Book Chapter',
      icon: FiBook,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      available: generatedContent.bookChapter
    },
    {
      id: 'facebook',
      title: 'Facebook Content',
      icon: FiFacebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      available: generatedContent.facebook
    },
    {
      id: 'substack',
      title: 'Substack Content',
      icon: FiMail,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      available: generatedContent.substack
    },
    {
      id: 'instagram',
      title: 'Instagram Content',
      icon: FiInstagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      available: generatedContent.instagram
    }
  ];

  const availableTabs = tabs.filter(tab => tab.available);

  // Set first available tab as active if current active tab is not available
  React.useEffect(() => {
    if (!availableTabs.find(tab => tab.id === activeTab)) {
      setActiveTab(availableTabs[0]?.id || 'insights');
    }
  }, [generatedContent, activeTab, availableTabs]);

  const renderContent = (contentType) => {
    const content = mockContent[contentType];
    if (!content) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="prose prose-lg max-w-none"
      >
        {content.sections ? (
          <div className="space-y-6">
            {content.sections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content.content}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Review</h2>
        <p className="text-gray-600">Review and refine your generated content</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex overflow-x-auto scrollbar-hide">
          {availableTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? `${tab.color} border-current bg-gray-50`
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <div className={`p-1 rounded ${activeTab === tab.id ? tab.bgColor : 'bg-gray-100'}`}>
                <SafeIcon icon={tab.icon} className="text-sm" />
              </div>
              <span>{tab.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <AnimatePresence mode="wait">
            {renderContent(activeTab)}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Stats */}
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Content Type: {availableTabs.find(tab => tab.id === activeTab)?.title}</span>
          <span>Generated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentReview;