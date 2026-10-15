export type ActiveModule = 
  | 'dashboard' 
  | 'roadmap' 
  | 'oral-exam' 
  | 'essay-assistant' 
  | 'community' 
  | 'materials';

export interface StudentProfile {
  name: string;
  department: string;
  studentId: string;
  cohort: string;
  avatarUrl: string;
  targetGpa: string;
  currentStreakDays: number;
}

export interface RoadmapStep {
  id: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'locked';
  score?: string;
  duration: string;
  description: string;
  keyPoints: string[];
  documentsCount: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'slides' | 'notes';
  size: string;
  dateAdded: string;
  stepId: number;
  downloadUrl?: string;
  previewSummary: string;
}

export interface ExaminerPersona {
  id: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  tone: string;
  badge: string;
  weightAcademicAccuracy: number;
  weightLogicalStructure: number;
  weightPracticalExamples: number;
  weightAcademicTone: number;
  description: string;
  favoriteQuestions: string[];
}

export interface OralExamQuestion {
  id: string;
  code: string;
  subject: string;
  question: string;
  hints: string[];
  sampleKeyPoints: string[];
}

export interface RubricScore {
  academicAccuracy: number;
  logicalStructure: number;
  practicalExamples: number;
  academicTone: number;
  totalScore: number;
  examinerComments: string;
  strengths: string[];
  improvements: string[];
}

export interface CommunityQuestion {
  id: string;
  title: string;
  content: string;
  subject: string;
  authorName: string;
  authorDepartment: string;
  authorAvatar: string;
  timeAgo: string;
  status: 'pending' | 'ai-answered' | 'resolved';
  upvotes: number;
  repliesCount: number;
  isBookmarked?: boolean;
  aiComparisonTable?: {
    topic: string;
    columns: string[];
    rows: { label: string; values: string[] }[];
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'exam' | 'ai' | 'community' | 'system';
}
