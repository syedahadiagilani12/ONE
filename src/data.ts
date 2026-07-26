import { Report, Alert, TimelineEvent } from './types';

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'SURV-2024-0012',
    diseaseName: 'Avian Influenza (H5N1)',
    species: 'poultry',
    affectedCount: 14,
    severity: 'critical',
    symptoms: ['Fever', 'Respiratory Distress', 'Sudden Death'],
    location: 'Geneva Wetlands, Switzerland',
    gps: { lat: 46.2044, lng: 6.1432 },
    envMetrics: { temp: 24, rainfall: 12, waterQuality: 5 },
    labStatus: 'confirmed',
    reporter: 'Dr. Sarah Chen',
    orgId: 'WHO-AFRO-2024-X',
    notes: 'Localized outbreak reported in the wetlands. Active surveillance team mobilized.',
    timeAgo: '2h ago',
    status: 'Active'
  },
  {
    id: 'SURV-2024-0013',
    diseaseName: 'West Nile Virus',
    species: 'wildlife',
    affectedCount: 3,
    severity: 'moderate',
    symptoms: ['Fever', 'Loss of Appetite'],
    location: 'Region G Vector Survey',
    gps: { lat: 46.22, lng: 6.16 },
    envMetrics: { temp: 22, rainfall: 8, waterQuality: 7 },
    labStatus: 'transit',
    reporter: 'Dr. Sarah Chen',
    orgId: 'WHO-AFRO-2024-X',
    notes: 'Vector traps collected and in transit to reference laboratory.',
    timeAgo: '5h ago',
    status: 'Stable'
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'ALERT-001',
    category: 'Outbreak',
    severity: 'critical',
    title: 'Avian Influenza A (H5N1) Cluster Detected',
    description: 'Localized outbreak reported in the North-East province. 14 suspected cases in poultry workers. Immediate quarantine protocols recommended.',
    timeAgo: '2 mins ago',
    isRead: false,
    actionLabel: 'View Analysis',
    actionScreen: 'dashboard'
  },
  {
    id: 'ALERT-002',
    category: 'Environmental',
    severity: 'high',
    title: 'Environmental: Toxic Runoff detected in Basin 4',
    description: 'Sensor network reports chemical levels 400% above threshold. Impact on local wildlife water sources is imminent.',
    timeAgo: '45 mins ago',
    isRead: false,
    actionLabel: 'Open Map',
    actionScreen: 'map'
  },
  {
    id: 'ALERT-003',
    category: 'Laboratory',
    severity: 'medium',
    title: 'Laboratory: Sequenced Variant Identified',
    description: 'Lab #902 confirmed a new genomic variation of the seasonal respiratory virus. Not classified as a threat yet.',
    timeAgo: '3 hours ago',
    isRead: false,
    actionLabel: 'Read Lab Report',
    actionScreen: 'dashboard'
  },
  {
    id: 'ALERT-004',
    category: 'System',
    severity: 'low',
    title: 'System: Scheduled Maintenance',
    description: 'Surveillance database synchronization will occur tonight at 02:00 UTC. Expect 10-minute read-only state.',
    timeAgo: '6 hours ago',
    isRead: false
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'EV-001',
    date: 'Oct 12, 2023',
    title: 'Vector Control Complete',
    description: 'Region 7 mosquito population mitigated by 85%.',
    type: 'success'
  },
  {
    id: 'EV-002',
    date: 'Oct 10, 2023',
    title: 'Annual Surveillance Report',
    description: 'Global OneHealth summary released to WHO.',
    type: 'info'
  },
  {
    id: 'EV-003',
    date: 'Oct 05, 2023',
    title: 'Lassa Fever Warning',
    description: 'Spike in rodent-to-human transmission in Central Area.',
    type: 'error'
  }
];
