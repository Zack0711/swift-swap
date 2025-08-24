import React from 'react';

interface TextAreaPanelProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

const TextAreaPanel: React.FC<TextAreaPanelProps> = ({
  title,
  value,
  onChange,
  placeholder,
  readOnly = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {!readOnly && (
          <button
            onClick={() => onChange?.('')}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`
            w-full h-full resize-none border-2 rounded-lg p-4 font-mono text-sm
            transition-colors duration-200 focus:outline-none
            ${readOnly 
              ? 'bg-gray-50 border-gray-200 text-gray-700' 
              : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
          `}
          style={{ minHeight: '400px' }}
        />
        {readOnly && !value && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <span>Converted syntax will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAreaPanel;