export type RuleSetType = 'react' | 'vue' | 'angular' | 'webcomponents';

export interface TransformationRule {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
  type: 'attribute' | 'tag' | 'comment' | 'case';
  description: string;
}

export interface RuleSet {
  id: RuleSetType;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  rules: TransformationRule[];
}

export interface TransformResult {
  success: boolean;
  result: string;
  error?: string;
  appliedRules: number;
  ruleSetUsed: RuleSetType;
}