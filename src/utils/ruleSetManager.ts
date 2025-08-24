import { RuleSet, RuleSetType, TransformationRule, TransformResult } from '../types/rulesets';
import { transformTables } from './rules/transformTables';

export class RuleSetManager {
  private ruleSets: Map<RuleSetType, RuleSet> = new Map();

  constructor() {
    this.initializeRuleSets();
  }

  private initializeRuleSets(): void {
    // Table Transfer Rules
    const tableRules: TransformationRule[] = [
      {
        id: 'transform-tables',
        name: 'Complete Table Transformation',
        description: 'Wrap tables, style elements, and format cells',
        type: 'tag',
        transform: (input: string): string => {
          return transformTables(input);
        }
      }
    ];

    // Initialize rule sets
    this.ruleSets.set('table', {
      id: 'table',
      name: 'table',
      displayName: 'Table Transfer',
      description: 'Wrap tables with scrollable containers and format cells',
      icon: '📊',
      rules: tableRules
    });
  }

  public applyRuleSet(input: string, ruleSetType: RuleSetType): TransformResult {
    try {
      if (!input.trim()) {
        return {
          success: true,
          result: '',
          appliedRules: 0,
          ruleSetUsed: ruleSetType
        };
      }

      const ruleSet = this.ruleSets.get(ruleSetType);
      if (!ruleSet) {
        return {
          success: false,
          result: '',
          error: `Rule set '${ruleSetType}' not found`,
          appliedRules: 0,
          ruleSetUsed: ruleSetType
        };
      }

      let transformed = input;
      let appliedRules = 0;

      // Apply each transformation function in the rule set
      for (const rule of ruleSet.rules) {
        const beforeTransform = transformed;
        
        // Apply the transformation function
        transformed = rule.transform(transformed);
        
        // Count if this rule made changes
        if (beforeTransform !== transformed) {
          appliedRules++;
        }
      }

      return {
        success: true,
        result: transformed,
        appliedRules,
        ruleSetUsed: ruleSetType
      };
    } catch (error) {
      return {
        success: false,
        result: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        appliedRules: 0,
        ruleSetUsed: ruleSetType
      };
    }
  }

  public getRuleSet(ruleSetType: RuleSetType): RuleSet | undefined {
    return this.ruleSets.get(ruleSetType);
  }

  public getAllRuleSets(): RuleSet[] {
    return Array.from(this.ruleSets.values());
  }

  public getRuleSetTypes(): RuleSetType[] {
    return Array.from(this.ruleSets.keys());
  }
}

// Singleton instance
export const ruleSetManager = new RuleSetManager();