import { ConversionStats, LineComparison, ChangeDetail } from '../types/statistics';
import { RuleSetType } from '../types/rulesets';

export class StatisticsCalculator {
  calculateStats(
    originalText: string, 
    convertedText: string, 
    ruleSet: RuleSetType,
    processingTime?: number
  ): ConversionStats {
    const startTime = performance.now();
    
    // Split text into lines for comparison
    const originalLines = originalText.split('\n');
    const convertedLines = convertedText.split('\n');
    
    // Perform line-by-line comparison
    const lineComparisons = this.compareLines(originalLines, convertedLines);
    
    // Calculate basic line statistics
    const totalLines = Math.max(originalLines.length, convertedLines.length);
    const modifiedLines = lineComparisons.filter(comp => comp.status === 'modified').length;
    const unchangedLines = lineComparisons.filter(comp => comp.status === 'unchanged').length;
    const linesAdded = lineComparisons.filter(comp => comp.status === 'added').length;
    const linesRemoved = lineComparisons.filter(comp => comp.status === 'removed').length;
    
    // Calculate transformation-specific statistics
    const transformationStats = this.calculateTransformationStats(lineComparisons);
    
    // Calculate conversion accuracy
    const totalChanges = modifiedLines + linesAdded + linesRemoved;
    const conversionAccuracy = totalLines > 0 ? ((totalLines - totalChanges) / totalLines) * 100 : 100;
    
    // Character count statistics
    const characterCount = {
      before: originalText.length,
      after: convertedText.length
    };
    
    const calculationTime = performance.now() - startTime;
    
    return {
      totalLines,
      modifiedLines,
      unchangedLines,
      linesAdded,
      linesRemoved,
      attributeChanges: transformationStats.attributeChanges,
      tagModifications: transformationStats.tagModifications,
      commentConversions: transformationStats.commentConversions,
      caseConversions: transformationStats.caseConversions,
      conversionAccuracy: Math.round(conversionAccuracy * 100) / 100,
      processingTime: processingTime || calculationTime,
      ruleSetApplied: this.getRuleSetDisplayName(ruleSet),
      characterCount
    };
  }
  
  private compareLines(originalLines: string[], convertedLines: string[]): LineComparison[] {
    const comparisons: LineComparison[] = [];
    const maxLength = Math.max(originalLines.length, convertedLines.length);
    
    for (let i = 0; i < maxLength; i++) {
      const originalLine = originalLines[i] || '';
      const convertedLine = convertedLines[i] || '';
      
      if (i >= originalLines.length) {
        // Line was added
        comparisons.push({
          originalIndex: -1,
          convertedIndex: i,
          status: 'added',
          changes: [{
            type: 'content',
            description: 'Line added during conversion',
            beforeText: '',
            afterText: convertedLine
          }]
        });
      } else if (i >= convertedLines.length) {
        // Line was removed
        comparisons.push({
          originalIndex: i,
          convertedIndex: -1,
          status: 'removed',
          changes: [{
            type: 'content',
            description: 'Line removed during conversion',
            beforeText: originalLine,
            afterText: ''
          }]
        });
      } else if (originalLine === convertedLine) {
        // Line unchanged
        comparisons.push({
          originalIndex: i,
          convertedIndex: i,
          status: 'unchanged',
          changes: []
        });
      } else {
        // Line modified
        const changes = this.detectLineChanges(originalLine, convertedLine);
        comparisons.push({
          originalIndex: i,
          convertedIndex: i,
          status: 'modified',
          changes
        });
      }
    }
    
    return comparisons;
  }
  
  private detectLineChanges(originalLine: string, convertedLine: string): ChangeDetail[] {
    const changes: ChangeDetail[] = [];
    
    // Detect attribute changes (class -> className, etc.)
    const attributePatterns = [
      { pattern: /class="/g, type: 'attribute', description: 'Changed class attribute' },
      { pattern: /for="/g, type: 'attribute', description: 'Changed for attribute' },
      { pattern: /onclick="/g, type: 'attribute', description: 'Changed click event' },
      { pattern: /onchange="/g, type: 'attribute', description: 'Changed change event' },
      { pattern: /style="/g, type: 'attribute', description: 'Changed style attribute' }
    ];
    
    attributePatterns.forEach(({ pattern, type, description }) => {
      const originalMatches = (originalLine.match(pattern) || []).length;
      const convertedMatches = (convertedLine.match(pattern) || []).length;
      
      if (originalMatches !== convertedMatches) {
        changes.push({
          type: type as 'attribute',
          description,
          beforeText: originalLine,
          afterText: convertedLine
        });
      }
    });
    
    // Detect tag modifications (self-closing tags)
    if (originalLine.includes('<br>') && convertedLine.includes('<br />')) {
      changes.push({
        type: 'tag',
        description: 'Converted to self-closing tag',
        beforeText: originalLine,
        afterText: convertedLine
      });
    }
    
    if (originalLine.includes('<hr>') && convertedLine.includes('<hr />')) {
      changes.push({
        type: 'tag',
        description: 'Converted to self-closing tag',
        beforeText: originalLine,
        afterText: convertedLine
      });
    }
    
    if (originalLine.includes('<img') && !originalLine.includes('/>') && convertedLine.includes('/>')) {
      changes.push({
        type: 'tag',
        description: 'Converted img to self-closing',
        beforeText: originalLine,
        afterText: convertedLine
      });
    }
    
    // Detect comment conversions
    if (originalLine.includes('<!--') && convertedLine.includes('{/*')) {
      changes.push({
        type: 'comment',
        description: 'Converted HTML comment to JSX',
        beforeText: originalLine,
        afterText: convertedLine
      });
    }
    
    // Detect case conversions (kebab-case to camelCase)
    const kebabCasePattern = /\w+-\w+="/g;
    if (kebabCasePattern.test(originalLine) && !kebabCasePattern.test(convertedLine)) {
      changes.push({
        type: 'case',
        description: 'Converted kebab-case to camelCase',
        beforeText: originalLine,
        afterText: convertedLine
      });
    }
    
    // If no specific changes detected but lines are different, mark as content change
    if (changes.length === 0 && originalLine !== convertedLine) {
      changes.push({
        type: 'content',
        description: 'Line content modified',
        beforeText: originalLine,
        afterText: convertedLine
      });
    }
    
    return changes;
  }
  
  private calculateTransformationStats(lineComparisons: LineComparison[]): {
    attributeChanges: number;
    tagModifications: number;
    commentConversions: number;
    caseConversions: number;
  } {
    let attributeChanges = 0;
    let tagModifications = 0;
    let commentConversions = 0;
    let caseConversions = 0;
    
    lineComparisons.forEach(comparison => {
      comparison.changes.forEach(change => {
        switch (change.type) {
          case 'attribute':
            attributeChanges++;
            break;
          case 'tag':
            tagModifications++;
            break;
          case 'comment':
            commentConversions++;
            break;
          case 'case':
            caseConversions++;
            break;
        }
      });
    });
    
    return {
      attributeChanges,
      tagModifications,
      commentConversions,
      caseConversions
    };
  }
  
  private getRuleSetDisplayName(ruleSet: RuleSetType): string {
    switch (ruleSet) {
      case 'table':
        return 'Table Transfer';
      default:
        return 'Unknown';
    }
  }
}

// Singleton instance
export const statisticsCalculator = new StatisticsCalculator();