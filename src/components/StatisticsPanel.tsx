import React, { useState } from 'react';
import StatisticsCard from './StatisticsCard';
import { ConversionStats } from '../types/statistics';

interface StatisticsPanelProps {
  stats: ConversionStats | null;
  visible: boolean;
  onToggleVisibility: () => void;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  stats,
  visible,
  onToggleVisibility
}) => {
  const [expandedSection, setExpandedSection] = useState<'overview' | 'transformations' | 'details' | null>('overview');

  if (!stats) {
    return null;
  }

  const handleSectionToggle = (section: 'overview' | 'transformations' | 'details') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              Conversion Statistics
            </h3>
          </div>
          <button
            onClick={onToggleVisibility}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label={visible ? "Hide statistics" : "Show statistics"}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${visible ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {visible && (
        <div className="p-6 space-y-6">
          {/* Overview Section */}
          <div>
            <button
              onClick={() => handleSectionToggle('overview')}
              className="flex items-center justify-between w-full text-left mb-4 focus:outline-none group"
            >
              <h4 className="text-md font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                📊 Overview
              </h4>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSection === 'overview' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSection === 'overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                <StatisticsCard
                  title="Modified"
                  value={stats.modifiedLines}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                  color="blue"
                  subtitle="lines"
                  tooltip="Number of lines that were changed during conversion"
                />
                
                <StatisticsCard
                  title="Unchanged"
                  value={stats.unchangedLines}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  color="gray"
                  subtitle="lines"
                  tooltip="Number of lines that remained unchanged"
                />
                
                <StatisticsCard
                  title="Added"
                  value={stats.linesAdded}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                  color="green"
                  subtitle="lines"
                  tooltip="Number of lines added during conversion"
                />
                
                <StatisticsCard
                  title="Removed"
                  value={stats.linesRemoved}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  }
                  color="red"
                  subtitle="lines"
                  tooltip="Number of lines removed during conversion"
                />
              </div>
            )}
          </div>

          {/* Transformations Section */}
          <div>
            <button
              onClick={() => handleSectionToggle('transformations')}
              className="flex items-center justify-between w-full text-left mb-4 focus:outline-none group"
            >
              <h4 className="text-md font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                🔄 Transformations
              </h4>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSection === 'transformations' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSection === 'transformations' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                <StatisticsCard
                  title="Attributes"
                  value={stats.attributeChanges}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  }
                  color="blue"
                  tooltip="Number of attribute transformations (class, for, style, etc.)"
                />
                
                <StatisticsCard
                  title="Tags"
                  value={stats.tagModifications}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  }
                  color="green"
                  tooltip="Number of tag modifications (self-closing, structure changes)"
                />
                
                <StatisticsCard
                  title="Comments"
                  value={stats.commentConversions}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  color="yellow"
                  tooltip="Number of comment conversions (HTML to JSX, etc.)"
                />
                
                <StatisticsCard
                  title="Case Changes"
                  value={stats.caseConversions}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  }
                  color="blue"
                  tooltip="Number of case conversions (kebab-case to camelCase)"
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <button
              onClick={() => handleSectionToggle('details')}
              className="flex items-center justify-between w-full text-left mb-4 focus:outline-none group"
            >
              <h4 className="text-md font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                📋 Details
              </h4>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSection === 'details' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSection === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Rule Set Applied</div>
                  <div className="text-lg font-semibold text-gray-900">{stats.ruleSetApplied}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Processing Time</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {stats.processingTime.toFixed(2)}ms
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {stats.conversionAccuracy.toFixed(1)}%
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Characters Before</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {stats.characterCount.before.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Characters After</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {stats.characterCount.after.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-sm text-gray-600 mb-1">Total Lines</div>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalLines}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;