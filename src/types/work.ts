export interface ExpandedItems {
  [key: string]: boolean;
}

export interface Script {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  type?: 'draft' | 'final';
  scripts?: Script[];
}

export interface Work {
  id: string;
  name: string;
  views?: Record<string, boolean>;
  characters?: Character[];
  lastVisitedView?: string;
} 