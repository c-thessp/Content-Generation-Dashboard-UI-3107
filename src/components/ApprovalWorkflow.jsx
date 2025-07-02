import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiClock, FiDownload, FiCheckCircle, FiXCircle } = FiIcons;

const ApprovalWorkflow = ({ generatedContent, approvalStates, onApprovalChange, onBulkAction }) => {
  const contentTypes = [
    { id: 'insights', title: 'Extracted Insights', available: true },
    { id: 'bookChapter', title: 'Book Chapter', available: generatedContent.bookChapter },
    { id: 'facebook', title: 'Facebook Content', available: generatedContent.facebook },
    { id: 'substack', title: 'Substack Content', available: generatedContent.substack },
    { id: 'instagram', title: 'Instagram Content', available: generatedContent.instagram }
  ];

  const availableContent = contentTypes.filter(type => type.available);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return { icon: FiCheck, color: 'text-green-500', bg: 'bg-green-100' };
      case 'discarded':
        return { icon: FiX, color: 'text-red-500', bg: 'bg-red-100' };
      default:
        return { icon: FiClock, color: 'text-yellow-500', bg: 'bg-yellow-100' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'discarded':
        return 'Discarded';
      default:
        return 'Pending';
    }
  };

  const handleDownload = (contentType) => {
    // Simulate download functionality
    const blob = new Blob([`Downloaded content for ${contentType}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType}-content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const approvedCount = Object.values(approvalStates).filter(status => status === 'approved').length;
  const discardedCount = Object.values(approvalStates).filter(status => status === 'discarded').length;
  const pendingCount = Object.values(approvalStates).filter(status => status === 'pending').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Approval Workflow</h2>
            <p className="text-gray-600">Review and approve your generated content</p>
          </div>
          
          {/* Status Summary */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{discardedCount}</div>
              <div className="text-sm text-gray-500">Discarded</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Bulk Actions */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-900">Bulk Actions</h3>
            <p className="text-sm text-gray-600">Apply actions to all available content</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => onBulkAction('approve')}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiCheckCircle} className="text-lg" />
              <span>Approve All</span>
            </motion.button>
            <motion.button
              onClick={() => onBulkAction('discard')}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiXCircle} className="text-lg" />
              <span>Discard All</span>
            </motion.button>
          </div>
        </div>

        {/* Individual Content Items */}
        <div className="space-y-4">
          {availableContent.map((content, index) => {
            const status = approvalStates[content.id];
            const statusConfig = getStatusIcon(status);

            return (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                  status === 'approved'
                    ? 'border-green-200 bg-green-50'
                    : status === 'discarded'
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${statusConfig.bg}`}>
                      <SafeIcon icon={statusConfig.icon} className={`text-xl ${statusConfig.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                      <p className={`text-sm font-medium ${
                        status === 'approved' ? 'text-green-600' :
                        status === 'discarded' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        Status: {getStatusText(status)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Approval Toggle */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => onApprovalChange(content.id, 'approved')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          status === 'approved'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SafeIcon icon={FiCheck} className="text-lg" />
                      </motion.button>
                      <motion.button
                        onClick={() => onApprovalChange(content.id, 'discarded')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          status === 'discarded'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SafeIcon icon={FiX} className="text-lg" />
                      </motion.button>
                    </div>

                    {/* Download Button */}
                    <motion.button
                      onClick={() => handleDownload(content.id)}
                      disabled={status === 'discarded'}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        status === 'discarded'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                      whileHover={status !== 'discarded' ? { scale: 1.05 } : {}}
                      whileTap={status !== 'discarded' ? { scale: 0.95 } : {}}
                    >
                      <SafeIcon icon={FiDownload} className="text-sm" />
                      <span>Download</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">Workflow Progress</h4>
              <p className="text-blue-700 text-sm">
                {approvedCount} approved, {pendingCount} pending, {discardedCount} discarded
              </p>
            </div>
            <div className="w-32 bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(approvedCount / availableContent.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflow;