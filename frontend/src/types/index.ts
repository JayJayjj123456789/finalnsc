// API Request/Response Types

export interface PlanRequest {
  query: string;
}

export interface RouteStop {
  name: string; lat: number; lng: number; type: string;
  duration_min: number; cost_baht: number;
}

export interface RouteDay {
  day: number; activities: RouteStop[]; day_cost: number;
}

export interface RouteResult {
  name: string; score: number; days: number; total_cost: number;
  co2_kg: number; community_percentage: number; carbon_saved_pct: number;
  days_detail: RouteDay[]; highlights: string[];
}

export interface PlanResponse {
  query: string; routes: RouteResult[]; generated_at: string;
}

// UI State Types

export type PageView = 'home' | 'loading' | 'results' | 'error';

export interface AppState {
  view: PageView; query: string;
  result: PlanResponse | null; error: string | null;
}