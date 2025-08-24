import React, { useState } from 'react';
import TextAreaPanel from './TextAreaPanel';
import ConvertButton from './ConvertButton';
import TabView from './TabView';
import StatisticsPanel from './StatisticsPanel';
import { transformSyntaxWithRuleSet } from '../utils/syntaxTransform';
import { statisticsCalculator } from '../utils/statisticsCalculator';
import { RuleSetType } from '../types/rulesets';
import { ConversionStats } from '../types/statistics';

interface SyntaxConverterProps {
  selectedRuleSet: RuleSetType;
}

const SyntaxConverter: React.FC<SyntaxConverterProps> = ({ selectedRuleSet }) => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ConversionStats | null>(null);
  const [showStatistics, setShowStatistics] = useState(true);

  const handleConvert = async () => {
    if (!inputValue.trim()) {
      setError('Please enter some HTML syntax to convert');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate async operation for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const startTime = performance.now();
    const result = transformSyntaxWithRuleSet(inputValue, selectedRuleSet);
    const processingTime = performance.now() - startTime;

    if (result.success) {
      setOutputValue(result.result);
      
      // Calculate statistics
      const conversionStats = statisticsCalculator.calculateStats(
        inputValue,
        result.result,
        selectedRuleSet,
        processingTime
      );
      setStats(conversionStats);
    } else {
      setError(result.error || 'Conversion failed');
      setOutputValue('');
      setStats(null);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setInputValue('');
    setOutputValue('');
    setError(null);
    setStats(null);
  };

  const handleToggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  return (
    <div className="w-full">
      {/* Error display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Input Panel */}
          <TextAreaPanel
            title="Input HTML"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter your original HTML syntax here..."
          />

          {/* Output Panel */}
          <TextAreaPanel
            title="Converted HTML"
            value={outputValue}
            readOnly
          />
        </div>

        {/* Convert Button - Desktop */}
        <div className="flex justify-center mt-6 space-x-4">
          <ConvertButton
            onClick={handleConvert}
            loading={loading}
            disabled={!inputValue.trim()}
          />
          <button
            onClick={handleClear}
            className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Mobile Layout - Tab View */}
      <div className="md:hidden">
        <TabView
          inputValue={inputValue}
          outputValue={outputValue}
          onInputChange={setInputValue}
          onConvert={handleConvert}
          loading={loading}
          disabled={!inputValue.trim()}
        />
      </div>

      {/* Statistics Panel */}
      {stats && (
        <StatisticsPanel
          stats={stats}
          visible={showStatistics}
          onToggleVisibility={handleToggleStatistics}
        />
      )}
    </div>
  );
};

export default SyntaxConverter;