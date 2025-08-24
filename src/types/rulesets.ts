export type RuleSetType = 'table';

export interface TransformationRule {
  id: string;
  name: string;
  description: string;
  type: 'attribute' | 'tag' | 'comment' | 'case';
  transform: (input: string) => string;
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