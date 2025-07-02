import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ContentDashboard from './components/ContentDashboard';
import ContentReview from './components/ContentReview';
import ApprovalWorkflow from './components/ApprovalWorkflow';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [approvalStates, setApprovalStates] = useState({
    insights: 'pending',
    bookChapter: 'pending',
    facebook: 'pending',
    substack: 'pending',
    instagram: 'pending'
  });

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    // Reset states when new file is uploaded
    setGeneratedContent({});
    setLoadingStates({});
    setApprovalStates({
      insights: 'pending',
      bookChapter: 'pending',
      facebook: 'pending',
      substack: 'pending',
      instagram: 'pending'
    });
  };

  const handleContentGeneration = (type) => {
    setLoadingStates(prev => ({ ...prev, [type]: true }));
    
    // Simulate API call delay
    setTimeout(() => {
      setGeneratedContent(prev => ({ ...prev, [type]: true }));
      setLoadingStates(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const handleApprovalChange = (contentType, status) => {
    setApprovalStates(prev => ({ ...prev, [contentType]: status }));
  };

  const handleBulkAction = (action) => {
    const newStatus = action === 'approve' ? 'approved' : 'discarded';
    setApprovalStates({
      insights: newStatus,
      bookChapter: newStatus,
      facebook: newStatus,
      substack: newStatus,
      instagram: newStatus
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileUpload onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
        </motion.div>

        <AnimatePresence>
          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ContentDashboard
                uploadedFile={uploadedFile}
                onGenerate={handleContentGeneration}
                loadingStates={loadingStates}
                generatedContent={generatedContent}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {Object.keys(generatedContent).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContentReview generatedContent={generatedContent} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {Object.keys(generatedContent).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ApprovalWorkflow
                generatedContent={generatedContent}
                approvalStates={approvalStates}
                onApprovalChange={handleApprovalChange}
                onBulkAction={handleBulkAction}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;