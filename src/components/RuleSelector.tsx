import React, { useState, useRef, useEffect } from 'react';
import { RuleSetType } from '../types/rulesets';
import { ruleSetManager } from '../utils/ruleSetManager';

interface RuleSelectorProps {
  selectedRuleSet: RuleSetType;
  onRuleSetChange: (ruleSet: RuleSetType) => void;
  disabled?: boolean;
}

const RuleSelector: React.FC<RuleSelectorProps> = ({
  selectedRuleSet,
  onRuleSetChange,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const allRuleSets = ruleSetManager.getAllRuleSets();
  const currentRuleSet = ruleSetManager.getRuleSet(selectedRuleSet);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleRuleSetSelect = (ruleSetType: RuleSetType) => {
    onRuleSetChange(ruleSetType);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  if (!currentRuleSet) {
    return null;
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          inline-flex items-center justify-between w-full md:w-48 px-4 py-2 text-sm font-medium rounded-lg border
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${disabled
            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
            : isOpen
            ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select syntax rule set"
      >
        <div className="flex items-center space-x-2">
          <span className="text-base">{currentRuleSet.icon}</span>
          <span className="hidden sm:inline">{currentRuleSet.displayName}</span>
          <span className="sm:hidden">{currentRuleSet.name}</span>
        </div>
        
        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute right-0 md:left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50
            animate-fadeIn origin-top-right md:origin-top-left
          `}
          role="listbox"
          aria-label="Rule set options"
        >
          <div className="py-1">
            {allRuleSets.map((ruleSet) => (
              <button
                key={ruleSet.id}
                onClick={() => handleRuleSetSelect(ruleSet.id)}
                className={`
                  w-full text-left px-4 py-3 text-sm transition-colors duration-150
                  hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                  ${selectedRuleSet === ruleSet.id 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700'
                  }
                `}
                role="option"
                aria-selected={selectedRuleSet === ruleSet.id}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg mt-0.5">{ruleSet.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{ruleSet.displayName}</span>
                      {selectedRuleSet === ruleSet.id && (
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{ruleSet.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Dropdown Footer */}
          <div className="border-t border-gray-100 px-4 py-2">
            <p className="text-xs text-gray-500">
              Select a framework to apply specific syntax transformations
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleSelector;