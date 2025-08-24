import { ruleSetManager } from './ruleSetManager';
import { RuleSetType, TransformResult as RuleSetTransformResult } from '../types/rulesets';

// Legacy interface for backward compatibility
export interface TransformResult {
  success: boolean;
  result: string;
  error?: string;
}

// Legacy function for backward compatibility (defaults to Table rules)
export function transformSyntax(input: string): TransformResult {
  return transformSyntaxWithRuleSet(input, 'table');
}

// New function that uses rule sets
export function transformSyntaxWithRuleSet(input: string, ruleSetType: RuleSetType): TransformResult {
  try {
    const result: RuleSetTransformResult = ruleSetManager.applyRuleSet(input, ruleSetType);
    
    return {
      success: result.success,
      result: result.result,
      error: result.error
    };
  } catch (error) {
    return {
      success: false,
      result: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}