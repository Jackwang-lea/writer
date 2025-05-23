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
  type: 'draft' | 'final';
  scripts?: Script[];
}

export interface Work {
  id: string;
  name: string;
  lastVisitedView?: string;
  characters?: Character[];
  views: {
    outline: boolean;
    characters: boolean;
    hostManual: boolean;
    materials: boolean;
  };
} 