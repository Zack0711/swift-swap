import { RuleSet, RuleSetType, TransformationRule, TransformResult } from '../types/rulesets';

export class RuleSetManager {
  private ruleSets: Map<RuleSetType, RuleSet> = new Map();

  constructor() {
    this.initializeRuleSets();
  }

  private initializeRuleSets(): void {
    // React/JSX Rules (Default - extends v1.0.0)
    const reactRules: TransformationRule[] = [
      {
        pattern: /class="/g,
        replacement: 'className="',
        type: 'attribute',
        description: 'Convert class to className for React'
      },
      {
        pattern: /for="/g,
        replacement: 'htmlFor="',
        type: 'attribute',
        description: 'Convert for to htmlFor for React'
      },
      {
        pattern: /<!--\s*(.+?)\s*-->/g,
        replacement: '{/* $1 */}',
        type: 'comment',
        description: 'Convert HTML comments to JSX comments'
      },
      {
        pattern: /<br>/g,
        replacement: '<br />',
        type: 'tag',
        description: 'Convert br tags to self-closing'
      },
      {
        pattern: /<hr>/g,
        replacement: '<hr />',
        type: 'tag',
        description: 'Convert hr tags to self-closing'
      },
      {
        pattern: /<img([^>]+)>/g,
        replacement: '<img$1 />',
        type: 'tag',
        description: 'Convert img tags to self-closing'
      },
      {
        pattern: /(\w+)-(\w+)="/g,
        replacement: (_match, first, second) => {
          const camelCase = first + second.charAt(0).toUpperCase() + second.slice(1);
          return `${camelCase}="`;
        },
        type: 'case',
        description: 'Convert kebab-case attributes to camelCase'
      }
    ];

    // Vue.js Rules
    const vueRules: TransformationRule[] = [
      {
        pattern: /class="/g,
        replacement: ':class="',
        type: 'attribute',
        description: 'Convert class to Vue dynamic class binding'
      },
      {
        pattern: /onclick="/g,
        replacement: '@click="',
        type: 'attribute',
        description: 'Convert onclick to Vue click event'
      },
      {
        pattern: /onchange="/g,
        replacement: '@change="',
        type: 'attribute',
        description: 'Convert onchange to Vue change event'
      },
      {
        pattern: /oninput="/g,
        replacement: '@input="',
        type: 'attribute',
        description: 'Convert oninput to Vue input event'
      },
      {
        pattern: /style="/g,
        replacement: ':style="',
        type: 'attribute',
        description: 'Convert style to Vue dynamic style binding'
      },
      {
        pattern: /v-bind:(\w+)="/g,
        replacement: ':$1="',
        type: 'attribute',
        description: 'Shorthand v-bind syntax'
      },
      {
        pattern: /v-on:(\w+)="/g,
        replacement: '@$1="',
        type: 'attribute',
        description: 'Shorthand v-on syntax'
      }
    ];

    // Angular Rules
    const angularRules: TransformationRule[] = [
      {
        pattern: /class="/g,
        replacement: '[class]="',
        type: 'attribute',
        description: 'Convert class to Angular property binding'
      },
      {
        pattern: /onclick="/g,
        replacement: '(click)="',
        type: 'attribute',
        description: 'Convert onclick to Angular click event'
      },
      {
        pattern: /onchange="/g,
        replacement: '(change)="',
        type: 'attribute',
        description: 'Convert onchange to Angular change event'
      },
      {
        pattern: /oninput="/g,
        replacement: '(input)="',
        type: 'attribute',
        description: 'Convert oninput to Angular input event'
      },
      {
        pattern: /value="/g,
        replacement: '[value]="',
        type: 'attribute',
        description: 'Convert value to Angular property binding'
      },
      {
        pattern: /disabled="/g,
        replacement: '[disabled]="',
        type: 'attribute',
        description: 'Convert disabled to Angular property binding'
      },
      {
        pattern: /hidden="/g,
        replacement: '[hidden]="',
        type: 'attribute',
        description: 'Convert hidden to Angular property binding'
      }
    ];

    // Web Components Rules
    const webComponentRules: TransformationRule[] = [
      {
        pattern: /onclick="/g,
        replacement: '@click="',
        type: 'attribute',
        description: 'Convert onclick to custom element event'
      },
      {
        pattern: /onchange="/g,
        replacement: '@change="',
        type: 'attribute',
        description: 'Convert onchange to custom element event'
      },
      {
        pattern: /class="/g,
        replacement: 'class="',
        type: 'attribute',
        description: 'Maintain standard class attribute'
      },
      {
        pattern: /<(\w+-\w+)([^>]*)>/g,
        replacement: '<$1$2>',
        type: 'tag',
        description: 'Custom element tags (no changes needed)'
      }
    ];

    // Initialize rule sets
    this.ruleSets.set('react', {
      id: 'react',
      name: 'react',
      displayName: 'React/JSX',
      description: 'Convert HTML to React JSX syntax',
      icon: '⚛️',
      rules: reactRules
    });

    this.ruleSets.set('vue', {
      id: 'vue',
      name: 'vue',
      displayName: 'Vue.js',
      description: 'Convert HTML to Vue.js template syntax',
      icon: '🟢',
      rules: vueRules
    });

    this.ruleSets.set('angular', {
      id: 'angular',
      name: 'angular',
      displayName: 'Angular',
      description: 'Convert HTML to Angular template syntax',
      icon: '🅰️',
      rules: angularRules
    });

    this.ruleSets.set('webcomponents', {
      id: 'webcomponents',
      name: 'webcomponents',
      displayName: 'Web Components',
      description: 'Convert HTML for Web Components',
      icon: '🧩',
      rules: webComponentRules
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

      // Apply each rule in the rule set
      for (const rule of ruleSet.rules) {
        const beforeTransform = transformed;
        
        if (typeof rule.replacement === 'string') {
          transformed = transformed.replace(rule.pattern, rule.replacement);
        } else {
          transformed = transformed.replace(rule.pattern, rule.replacement);
        }
        
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