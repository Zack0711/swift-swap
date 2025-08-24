import { useState, useEffect } from 'react';
import SyntaxConverter from './components/SyntaxConverter';
import RuleSelector from './components/RuleSelector';
import { RuleSetType } from './types/rulesets';

function App() {
  const [selectedRuleSet, setSelectedRuleSet] = useState<RuleSetType>('table');

  // Load saved rule set preference on mount
  useEffect(() => {
    const savedRuleSet = localStorage.getItem('swiftswap-ruleset') as RuleSetType;
    if (savedRuleSet && ['table'].includes(savedRuleSet)) {
      setSelectedRuleSet(savedRuleSet);
    }
  }, []);

  // Save rule set preference when changed
  const handleRuleSetChange = (ruleSet: RuleSetType) => {
    setSelectedRuleSet(ruleSet);
    localStorage.setItem('swiftswap-ruleset', ruleSet);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                SwiftSwap - HTML Syntax Converter
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Convert HTML syntax for travel websites in real-time
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <RuleSelector
                selectedRuleSet={selectedRuleSet}
                onRuleSetChange={handleRuleSetChange}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SyntaxConverter selectedRuleSet={selectedRuleSet} />
      </main>
    </div>
  );
}

export default App