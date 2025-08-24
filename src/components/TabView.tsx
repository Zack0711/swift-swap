import React, { useState } from 'react';
import TextAreaPanel from './TextAreaPanel';
import ConvertButton from './ConvertButton';

interface TabViewProps {
  inputValue: string;
  outputValue: string;
  onInputChange: (value: string) => void;
  onConvert: () => void;
  loading: boolean;
  disabled: boolean;
}

const TabView: React.FC<TabViewProps> = ({
  inputValue,
  outputValue,
  onInputChange,
  onConvert,
  loading,
  disabled,
}) => {
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');

  const handleTabChange = (tab: 'input' | 'output') => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => handleTabChange('input')}
          className={`
            flex-1 py-3 px-4 text-center font-medium transition-colors duration-200
            ${activeTab === 'input'
              ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Input HTML
          </div>
        </button>
        <button
          onClick={() => handleTabChange('output')}
          className={`
            flex-1 py-3 px-4 text-center font-medium transition-colors duration-200
            ${activeTab === 'output'
              ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Converted HTML
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="h-[500px]">
        {activeTab === 'input' && (
          <div className="h-full animate-fadeIn">
            <TextAreaPanel
              title="Input HTML"
              value={inputValue}
              onChange={onInputChange}
              placeholder="Enter your original HTML syntax here..."
              className="h-full"
            />
          </div>
        )}

        {activeTab === 'output' && (
          <div className="h-full animate-fadeIn">
            <TextAreaPanel
              title="Converted HTML"
              value={outputValue}
              readOnly
              className="h-full"
            />
          </div>
        )}
      </div>

      {/* Convert Button - Always visible on mobile */}
      <div className="flex justify-center mt-6">
        <ConvertButton
          onClick={() => {
            onConvert();
            // Auto-switch to output tab after conversion
            setTimeout(() => setActiveTab('output'), 600);
          }}
          loading={loading}
          disabled={disabled}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
};

export default TabView;