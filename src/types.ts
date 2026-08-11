export type ViewMode = 
  // Platform Core
  | 'home' 
  | 'profile' 
  | 'progress'
  | 'auth'
  // Education & Labs
  | 'learning-beginner'
  | 'learning-intermediate'
  | 'learning-advanced'
  | 'labs' 
  | 'terminal-lab'
  | 'challenges' 
  // Tools & AI
  | 'tools-matrix'
  | 'termux-vault'
  | 'tools' 
  | 'qr-generator'
  | 'password-generator'
  | 'hash-generator'
  | 'token-generator'
  | 'crypto-tool'
  | 'ip-lookup'
  | 'dns-lookup'
  | 'whois-lookup'
  | 'reverse-dns'
  | 'ssl-checker'
  | 'ai-coach' 
  // Knowledge
  | 'knowledge-linux'
  | 'knowledge-networking'
  | 'knowledge-termux'
  | 'knowledge-concepts'
  // Governance
  | 'disclaimer'
  | 'certifications'
  // Community & Support
  | 'community-contribute'
  | 'community-eligibility'
  | 'community-core-team'
  | 'core-team-apply'
  | 'community-donate'
  | 'community-sponsorship'
  | 'community-support';

export interface CoreTeamRoleDef {
  id: string;
  title: string;
  totalSeats: number;
  description: string;
  category: 'Specialist' | 'Head';
}

export interface CoreTeamApplicationData {
  applicationId: string;
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  country: string;
  ageConfirmation: boolean;
  cyberEmpireXUsername: string;
  githubUsername?: string;
  portfolio?: string;
  experienceLevel: string;
  availability: string;
  assessmentAnswers: Record<number, string>;
  roleScores: Record<string, number>;
  recommendedRole: string;
  selectedRole: string;
  agreementAccepted: boolean;
  agreementTimestamp: string;
  applicationStatus: 'Pending Review' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  role?: 'Guest' | 'Registered User' | 'Contributor' | 'Core Team' | 'Head of Core Team' | 'Admin' | string;
  country?: string;
  emailVerified?: boolean;
  permissions?: string[];
  accountStatus?: 'Active' | 'Pending Verification' | 'Suspended';
  lastActivity?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string; // Markdown / structured HTML text
  commandsToTry: string[];
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Course {
  id: string;
  title: string;
  category: 'termux-basics' | 'security-tools' | 'bash-scripting' | 'network' | 'web-security' | 'android-advanced' | 'linux' | 'python' | 'cloud' | 'red-team' | 'blue-team';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  iconName: string;
  description: string;
  lessons: Lesson[];
  badgeAwarded: string;
  color: string;
  completionPercent?: number;
}

export interface TermuxCommand {
  id: string;
  name: string;
  command: string;
  category: 'Package Manager' | 'Storage & System' | 'Network & Recon' | 'Web Exploitation' | 'Termux API' | 'Shell Utilities';
  shortDesc: string;
  detailedDesc: string;
  syntax: string;
  examples: { cmd: string; note: string }[];
  safetyWarning?: string;
  tags: string[];
}

export interface UserProgress {
  xp: number;
  level: number;
  completedLessonIds: string[];
  completedChallengeIds: string[];
  earnedBadges: string[];
  terminalHistory: string[];
  bookmarkedCommandIds: string[];
  favoriteToolIds?: string[];
  completedLabIds?: string[];
  ethicalPledgeAgreed?: boolean;
  ethicalPledgeDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  scenario: string;
  objective: string;
  targetHint: string;
  expectedCommandOrAnswer: string;
  explanation: string;
  badge?: string;
}

export interface CyberTool {
  id: string;
  title: string;
  description: string;
  category: 'Recon' | 'Network' | 'Cryptography' | 'Web' | 'DNS' | 'Utility';
  command: string;
  iconName: string;
  isFavorite?: boolean;
}

export interface PracticeLab {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeMinutes: number;
  participants: number;
  description: string;
  objective: string;
  initialCommand?: string;
}

export interface WorkspaceProject {
  id: string;
  title: string;
  lastModified: string;
  status: 'Active' | 'Building' | 'Completed' | 'Draft';
  repository: string;
  description: string;
  language: string;
  stars: number;
}

export interface CommunityActivity {
  id: string;
  author: string;
  avatar: string;
  action: string;
  target: string;
  timeAgo: string;
  type: 'commit' | 'discussion' | 'pr' | 'project';
  stars?: number;
}

export interface CertificationBadge {
  id: string;
  title: string;
  category: string;
  isEarned: boolean;
  earnedDate?: string;
  description: string;
  progressPercent: number;
  badgeIcon: string;
}

