import { RuleSet, RuleSetType, TransformationRule, TransformResult } from '../types/rulesets';

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
          return this.transformTables(input);
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

  // Complete table transformation function using HTML object parsing
  private transformTables(input: string): string {
    try {
      // Create a DOM parser to work with HTML objects
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/html');
      
      // Step 1: Find all <table> elements
      const allTables = Array.from(doc.querySelectorAll('table'));
      
      // Step 2: Filter out tables whose parent element is a <div> with class "table-scroll sticky-top"
      const tablesToTransform = allTables.filter(table => {
        const parent = table.parentElement;
        if (parent && parent.tagName.toLowerCase() === 'div') {
          const parentClasses = parent.className.split(' ');
          const hasTableScroll = parentClasses.includes('table-scroll');
          const hasStickyTop = parentClasses.includes('sticky-top');
          return !(hasTableScroll && hasStickyTop);
        }
        return true; // Transform if no parent div or not the right class
      });

      // Step 3: Process remaining tables
      tablesToTransform.forEach(table => {
        // Step 3a: Set table style to "min-width:600px; width:100%"
        table.setAttribute('style', 'min-width:600px; width:100%');

        // Step 3b: Set class of all <td> elements to "text-nowrap text-mono"
        const tdElements = table.querySelectorAll('td');
        tdElements.forEach(td => {
          td.className = 'text-nowrap text-mono';
        });

        // Step 3c: Wrap table in <div> with class "table-scroll sticky-top" and style "max-height:300px"
        const wrapper = doc.createElement('div');
        wrapper.className = 'table-scroll sticky-top';
        wrapper.setAttribute('style', 'max-height:300px');
        
        // Insert wrapper before table and move table into wrapper
        const parent = table.parentNode;
        if (parent) {
          parent.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });

      // Return the transformed HTML
      // Extract only the body content to avoid html/head tags
      const bodyContent = doc.body.innerHTML;
      return bodyContent || input; // Fallback to original input if parsing fails
      
    } catch (error) {
      // Fallback to original input if DOM parsing fails
      console.warn('DOM parsing failed, returning original input:', error);
      return input;
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