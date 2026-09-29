export type Role = 'parent' | 'tutor' | 'operator';

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  university: string;
  achievement: string;
  matchScore: number;
  distance: number;
  subjects: string[];
  grades: string[];
  rate: number;
  bio: string;
  rating: number;
  reviewsCount: number;
  verified: {
    cccd: boolean;
    diploma: boolean;
    studentCard: boolean;
  };
  availability: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  structuredData?: {
    subjectAndGrade?: string;
    location?: string;
    goal?: string;
    frequency?: string;
  };
  options?: {
    label: string;
    value: string;
    recommended?: boolean;
  }[];
}

export interface DemandProfile {
  subject: string;
  grade: string;
  location: string;
  goal: string;
  frequency: string;
  schedule: string;
  budget: string;
  progress: number; // percentage, e.g. 75
}

export interface TrialRequest {
  id: string;
  parentName: string;
  studentGrade: string;
  subject: string;
  schedule: string;
  location: string;
  budget: string;
  status: 'pending' | 'accepted' | 'negotiating' | 'declined';
  dateRequested: string;
}

export interface EscalationCase {
  id: string;
  title: string;
  parentName: string;
  tutorName: string;
  reason: string;
  status: 'open' | 'resolving' | 'resolved';
  dateCreated: string;
  logs: string[];
}
