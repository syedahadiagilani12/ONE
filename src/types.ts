export type Screen = 'login' | 'dashboard' | 'report' | 'map' | 'alerts';

export type TransitionDirection = 'forward' | 'backward' | 'up' | 'none';

export interface Report {
  id: string;
  diseaseName: string;
  species: 'human' | 'livestock' | 'wildlife' | 'poultry' | 'other';
  affectedCount: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  symptoms: string[];
  location: string;
  gps: { lat: number; lng: number };
  envMetrics: {
    temp: number;
    rainfall: number;
    waterQuality: number;
  };
  labStatus: 'pending' | 'transit' | 'confirmed';
  reporter: string;
  orgId: string;
  notes: string;
  timeAgo: string;
  status: 'Active' | 'Stable';
}

export interface Alert {
  id: string;
  category: 'Outbreak' | 'Laboratory' | 'Environmental' | 'System';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
  actionLabel?: string;
  actionScreen?: Screen;
}

export interface SubscriptionPreferences {
  email: boolean;
  sms: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'error';
}
