export interface ConversionStats {
  totalLines: number;
  modifiedLines: number;
  unchangedLines: number;
  linesAdded: number;
  linesRemoved: number;
  attributeChanges: number;
  tagModifications: number;
  commentConversions: number;
  caseConversions: number;
  conversionAccuracy: number;
  processingTime: number;
  ruleSetApplied: string;
  characterCount: {
    before: number;
    after: number;
  };
}

export interface LineComparison {
  originalIndex: number;
  convertedIndex: number;
  status: 'unchanged' | 'modified' | 'added' | 'removed';
  changes: ChangeDetail[];
}

export interface ChangeDetail {
  type: 'attribute' | 'tag' | 'comment' | 'case' | 'content';
  description: string;
  beforeText: string;
  afterText: string;
}