import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Lock, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  FileText,
  Building,
  CheckSquare,
  Square,
  Award
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { UserProfile, CoreTeamApplicationData } from '../types';

interface CoreTeamApplyPageProps {
  userProfile: UserProfile;
  onNavigate: (view: any) => void;
  onOpenAuth: () => void;
}

// 12 specialist roles (Head of Core Team is founder-appointed, not listed here)
export const CORE_TEAM_ROLES = [
  { id: 'learning-curriculum', title: 'Learning & Curriculum', totalSeats: 3, desc: 'Develop, organize, improve, and review cybersecurity learning paths, lessons, explanations, exercises, and assessments.' },
  { id: 'cybersecurity-research', title: 'Cybersecurity Research', totalSeats: 2, desc: 'Research cybersecurity topics, threats, vulnerabilities, technical developments, and reliable security information.' },
  { id: 'labs-ctf', title: 'Labs & CTF', totalSeats: 2, desc: 'Create and maintain safe interactive labs, practical exercises, scenarios, and CTF challenges.' },
  { id: 'tools-generators', title: 'Tools & Generators', totalSeats: 2, desc: 'Build and maintain CyberEmpireX tools, generators, utilities, and educational security functionality.' },
  { id: 'technical-engineering', title: 'Technical Engineering', totalSeats: 3, desc: 'Work on frontend, backend, application functionality, infrastructure, performance, and technical systems.' },
  { id: 'security-review', title: 'Security Review', totalSeats: 2, desc: 'Review code, platform features, security-related content, and potential security risks.' },
  { id: 'documentation-knowledge', title: 'Documentation & Knowledge', totalSeats: 2, desc: 'Maintain documentation, references, command explanations, technical guides, and the knowledge base.' },
  { id: 'qa-testing', title: 'QA & Testing', totalSeats: 2, desc: 'Test platform features, learning content, labs, tools, compatibility, usability, and regressions.' },
  { id: 'ui-ux-design', title: 'UI/UX & Visual Design', totalSeats: 1, desc: 'Improve interface design, usability, accessibility, responsive behavior, and the visual system.' },
  { id: 'ai-interactive-learning', title: 'AI & Interactive Learning', totalSeats: 1, desc: 'Develop AI-assisted learning and interactive educational experiences such as terminal/notebook-style learning systems.' },
  { id: 'content-editorial', title: 'Content & Editorial', totalSeats: 2, desc: 'Review educational content for clarity, consistency, accuracy, structure, and editorial quality.' },
  { id: 'platform-ops-support', title: 'Platform Operations & Support', totalSeats: 1, desc: 'Help maintain platform operations and provide appropriate technical support.' }
];

// 15 Assessment Questions
interface AssessmentQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    weights: Record<string, number>;
  }[];
  isOtherAllowed?: boolean;
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "What type of work would you naturally spend the most time improving?",
    options: [
      { label: "Building software and features", weights: { 'technical-engineering': 3, 'tools-generators': 2, 'ai-interactive-learning': 2 } },
      { label: "Creating cybersecurity learning material", weights: { 'learning-curriculum': 3, 'content-editorial': 2, 'documentation-knowledge': 1 } },
      { label: "Building practical labs and challenges", weights: { 'labs-ctf': 3, 'learning-curriculum': 2 } },
      { label: "Developing security tools and generators", weights: { 'tools-generators': 3, 'technical-engineering': 2 } },
      { label: "Researching cybersecurity topics", weights: { 'cybersecurity-research': 3, 'security-review': 2, 'documentation-knowledge': 1 } },
      { label: "Reviewing work for security and correctness", weights: { 'security-review': 3, 'qa-testing': 2, 'content-editorial': 1 } },
      { label: "Testing software and finding problems", weights: { 'qa-testing': 3, 'security-review': 2, 'technical-engineering': 1 } },
      { label: "Designing interfaces and user experiences", weights: { 'ui-ux-design': 3, 'qa-testing': 1 } },
      { label: "Writing technical documentation", weights: { 'documentation-knowledge': 3, 'content-editorial': 2, 'learning-curriculum': 1 } }
    ]
  },
  {
    id: 2,
    question: "Which area are you currently strongest in?",
    options: [
      { label: "Programming", weights: { 'technical-engineering': 3, 'tools-generators': 3, 'ai-interactive-learning': 2 } },
      { label: "Cybersecurity", weights: { 'cybersecurity-research': 3, 'security-review': 3, 'labs-ctf': 2 } },
      { label: "Linux / Termux", weights: { 'technical-engineering': 2, 'tools-generators': 2, 'documentation-knowledge': 2 } },
      { label: "Research", weights: { 'cybersecurity-research': 3, 'documentation-knowledge': 2 } },
      { label: "Writing / Teaching", weights: { 'learning-curriculum': 3, 'content-editorial': 3 } },
      { label: "Testing / QA", weights: { 'qa-testing': 3, 'security-review': 2 } },
      { label: "UI / UX", weights: { 'ui-ux-design': 3 } },
      { label: "Technical Documentation", weights: { 'documentation-knowledge': 3, 'content-editorial': 2 } },
      { label: "I am still developing my skills", weights: { 'qa-testing': 1, 'documentation-knowledge': 1, 'learning-curriculum': 1 } }
    ]
  },
  {
    id: 3,
    question: "If you discover a technical error in CyberEmpireX, what would you most likely do?",
    options: [
      { label: "Try to reproduce it and identify the cause", weights: { 'qa-testing': 3, 'technical-engineering': 2 } },
      { label: "Research the issue and document it", weights: { 'documentation-knowledge': 3, 'cybersecurity-research': 2 } },
      { label: "Fix the code if I understand the problem", weights: { 'technical-engineering': 3, 'tools-generators': 2 } },
      { label: "Report it clearly with evidence", weights: { 'qa-testing': 2, 'platform-ops-support': 2 } },
      { label: "Review whether it creates a security problem", weights: { 'security-review': 3, 'cybersecurity-research': 2 } }
    ]
  },
  {
    id: 4,
    question: "Which activity interests you most?",
    options: [
      { label: "Building a web feature", weights: { 'technical-engineering': 3, 'ui-ux-design': 1 } },
      { label: "Creating a cybersecurity lesson", weights: { 'learning-curriculum': 3, 'content-editorial': 2 } },
      { label: "Building a safe practical lab", weights: { 'labs-ctf': 3, 'learning-curriculum': 1 } },
      { label: "Creating a security utility", weights: { 'tools-generators': 3, 'technical-engineering': 2 } },
      { label: "Investigating a security topic", weights: { 'cybersecurity-research': 3, 'security-review': 2 } },
      { label: "Reviewing someone else's work", weights: { 'security-review': 3, 'content-editorial': 2 } },
      { label: "Testing a feature", weights: { 'qa-testing': 3 } },
      { label: "Designing the interface", weights: { 'ui-ux-design': 3 } }
    ]
  },
  {
    id: 5,
    question: "How comfortable are you reading source code?",
    options: [
      { label: "Not yet", weights: { 'learning-curriculum': 1, 'documentation-knowledge': 1, 'content-editorial': 1 } },
      { label: "Basic", weights: { 'qa-testing': 1, 'documentation-knowledge': 1, 'learning-curriculum': 1 } },
      { label: "Comfortable", weights: { 'technical-engineering': 2, 'tools-generators': 2, 'labs-ctf': 2 } },
      { label: "Very comfortable", weights: { 'technical-engineering': 3, 'security-review': 3, 'ai-interactive-learning': 2 } },
      { label: "I regularly work with source code", weights: { 'technical-engineering': 3, 'security-review': 3, 'tools-generators': 3 } }
    ]
  },
  {
    id: 6,
    question: "How comfortable are you explaining a difficult technical concept to a beginner?",
    options: [
      { label: "Not comfortable", weights: { 'qa-testing': 1, 'technical-engineering': 1 } },
      { label: "Somewhat comfortable", weights: { 'documentation-knowledge': 1, 'learning-curriculum': 1 } },
      { label: "Comfortable", weights: { 'learning-curriculum': 2, 'content-editorial': 2, 'documentation-knowledge': 2 } },
      { label: "Very comfortable", weights: { 'learning-curriculum': 3, 'content-editorial': 3, 'documentation-knowledge': 3 } }
    ]
  },
  {
    id: 7,
    question: "When researching a cybersecurity topic, what is most important?",
    options: [
      { label: "Finding information quickly", weights: { 'platform-ops-support': 1 } },
      { label: "Using reliable sources and verifying claims", weights: { 'cybersecurity-research': 3, 'security-review': 3, 'content-editorial': 3 } },
      { label: "Finding the most interesting information", weights: { 'learning-curriculum': 1 } },
      { label: "Making the explanation simple", weights: { 'learning-curriculum': 2, 'content-editorial': 2 } },
      { label: "Getting an answer that can be published immediately", weights: { 'platform-ops-support': 1 } }
    ]
  },
  {
    id: 8,
    question: "You are testing a new CyberEmpireX feature and find a small bug that does not always reproduce. What should you do?",
    options: [
      { label: "Ignore it because it is minor", weights: {} },
      { label: "Report it immediately without investigating", weights: { 'platform-ops-support': 1 } },
      { label: "Reproduce it, record the conditions, and document the issue", weights: { 'qa-testing': 3, 'technical-engineering': 2, 'security-review': 2 } },
      { label: "Change unrelated code until it disappears", weights: {} },
      { label: "Tell users not to use the feature", weights: {} }
    ]
  },
  {
    id: 9,
    question: "Which kind of contribution would you enjoy most?",
    options: [
      { label: "Code", weights: { 'technical-engineering': 3, 'tools-generators': 3 } },
      { label: "Learning content", weights: { 'learning-curriculum': 3, 'content-editorial': 2 } },
      { label: "Research", weights: { 'cybersecurity-research': 3 } },
      { label: "Tools / Generators", weights: { 'tools-generators': 3 } },
      { label: "Labs / Challenges", weights: { 'labs-ctf': 3 } },
      { label: "Documentation", weights: { 'documentation-knowledge': 3 } },
      { label: "Testing", weights: { 'qa-testing': 3 } },
      { label: "Security Review", weights: { 'security-review': 3 } },
      { label: "Design", weights: { 'ui-ux-design': 3 } }
    ]
  },
  {
    id: 10,
    question: "A contributor submits content containing an unverified technical claim. What should happen?",
    options: [
      { label: "Publish it because the contributor seems experienced", weights: {} },
      { label: "Delete the contribution", weights: {} },
      { label: "Verify the claim and request corrections if necessary", weights: { 'security-review': 3, 'content-editorial': 3, 'cybersecurity-research': 3 } },
      { label: "Ignore the issue", weights: {} },
      { label: "Rewrite it without checking the source", weights: {} }
    ]
  },
  {
    id: 11,
    question: "How do you usually approach a problem you cannot solve?",
    options: [
      { label: "Search for an answer and stop there", weights: { 'platform-ops-support': 1 } },
      { label: "Experiment until something works", weights: { 'labs-ctf': 1, 'tools-generators': 1 } },
      { label: "Break the problem into smaller parts and research/test each part", weights: { 'technical-engineering': 3, 'qa-testing': 3, 'cybersecurity-research': 3 } },
      { label: "Ask someone else immediately", weights: { 'platform-ops-support': 1 } },
      { label: "Leave the problem", weights: {} }
    ]
  },
  {
    id: 12,
    question: "Which environment interests you most?",
    options: [
      { label: "Code editor / development", weights: { 'technical-engineering': 3, 'tools-generators': 3 } },
      { label: "Terminal / Linux", weights: { 'technical-engineering': 2, 'labs-ctf': 2, 'documentation-knowledge': 2 } },
      { label: "Research / documentation", weights: { 'cybersecurity-research': 3, 'documentation-knowledge': 3 } },
      { label: "Visual design", weights: { 'ui-ux-design': 3 } },
      { label: "Testing / debugging", weights: { 'qa-testing': 3, 'security-review': 2 } },
      { label: "Teaching / content creation", weights: { 'learning-curriculum': 3, 'content-editorial': 3 } }
    ]
  },
  {
    id: 13,
    question: "What matters most when creating a cybersecurity learning resource?",
    options: [
      { label: "Making it look impressive", weights: { 'ui-ux-design': 1 } },
      { label: "Making it technically accurate, understandable, and safe", weights: { 'learning-curriculum': 3, 'cybersecurity-research': 3, 'content-editorial': 3 } },
      { label: "Making it as advanced as possible", weights: { 'labs-ctf': 1 } },
      { label: "Making it very short", weights: {} },
      { label: "Adding as many commands as possible", weights: {} }
    ]
  },
  {
    id: 14,
    question: "If you are responsible for an area of CyberEmpireX, what should happen when you become unavailable?",
    options: [
      { label: "Leave it until I return", weights: {} },
      { label: "Continue making changes whenever possible", weights: {} },
      { label: "Inform the appropriate team member and hand over relevant work", weights: { 'platform-ops-support': 3, 'security-review': 2, 'technical-engineering': 2 } },
      { label: "Give my account to someone else", weights: {} },
      { label: "Stop maintaining the area without informing anyone", weights: {} }
    ]
  },
  {
    id: 15,
    question: "Why do you want to join the CyberEmpireX Core Team?",
    isOtherAllowed: true,
    options: [
      { label: "I want to build and improve the platform", weights: { 'technical-engineering': 3, 'tools-generators': 2 } },
      { label: "I want practical cybersecurity experience", weights: { 'labs-ctf': 3, 'cybersecurity-research': 2 } },
      { label: "I want to contribute knowledge/content", weights: { 'learning-curriculum': 3, 'content-editorial': 2 } },
      { label: "I want to work on tools and technical projects", weights: { 'tools-generators': 3, 'technical-engineering': 2 } },
      { label: "I want to research cybersecurity", weights: { 'cybersecurity-research': 3 } },
      { label: "I want to help maintain quality and security", weights: { 'security-review': 3, 'qa-testing': 3 } },
      { label: "I want to collaborate with other contributors", weights: { 'platform-ops-support': 2, 'learning-curriculum': 2 } }
    ]
  }
];

export function CoreTeamApplyPage({ userProfile, onNavigate, onOpenAuth }: CoreTeamApplyPageProps) {
  // Step State: 1 = Basic Info, 2 = Role Assessment, 3 = Role Selection, 4 = Agreement, 5 = Success
  const [step, setStep] = useState<number>(1);

  // Step 1 Form Data
  const [fullName, setFullName] = useState<string>(userProfile.name || '');
  const [email, setEmail] = useState<string>(userProfile.email || '');
  const [country, setCountry] = useState<string>(userProfile.country || '');
  const [age, setAge] = useState<string>('20');
  const [username, setUsername] = useState<string>(userProfile.username || '');
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [portfolio, setPortfolio] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('Intermediate');
  const [availability, setAvailability] = useState<string>('4–7 hours/week');
  const [step1Error, setStep1Error] = useState<string>('');

  // Step 2 Assessment Answers State
  const [currentQIndex, setCurrentQIndex] = useState<number>(0); // 0..14
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [otherText15, setOtherText15] = useState<string>('');

  // Step 3 Role Scores & Seat Availability
  const [roleScores, setRoleScores] = useState<Record<string, number>>({});
  const [recommendedRoleId, setRecommendedRoleId] = useState<string>('tools-generators');
  const [seatOccupancy, setSeatOccupancy] = useState<Record<string, number>>({});
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [loadingSeats, setLoadingSeats] = useState<boolean>(false);

  // Step 4 Agreement State
  const [agreements, setAgreements] = useState<{
    age14: boolean;
    infoAccurate: boolean;
    noGuarantee: boolean;
    codeOfConduct: boolean;
    lawfulUse: boolean;
    adminReview: boolean;
  }>({
    age14: false,
    infoAccurate: false,
    noGuarantee: false,
    codeOfConduct: false,
    lawfulUse: false,
    adminReview: false
  });

  // Step 5 Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedAppId, setSubmittedAppId] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');

  // Check user authentication status on load
  useEffect(() => {
    if (!userProfile.isLoggedIn) {
      // User is guest, requires login
      onOpenAuth();
    }
  }, [userProfile.isLoggedIn]);

  // Fetch live seat occupancy from Firestore
  useEffect(() => {
    async function fetchSeats() {
      setLoadingSeats(true);
      try {
        const q = query(collection(db, 'coreTeamApplications'), where('applicationStatus', 'in', ['Pending Review', 'Approved']));
        const snapshot = await getDocs(q);
        const counts: Record<string, number> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.selectedRole) {
            counts[data.selectedRole] = (counts[data.selectedRole] || 0) + 1;
          }
        });
        setSeatOccupancy(counts);
      } catch (err) {
        console.warn('Could not fetch applications for seat count:', err);
      } finally {
        setLoadingSeats(false);
      }
    }

    if (step === 3) {
      fetchSeats();
    }
  }, [step]);

  // Calculate weighted assessment scores after Q15
  const calculateScores = (answersMap: Record<number, string>) => {
    const rawScores: Record<string, number> = {};
    CORE_TEAM_ROLES.forEach(r => rawScores[r.id] = 0);

    ASSESSMENT_QUESTIONS.forEach(q => {
      const chosenLabel = answersMap[q.id];
      if (!chosenLabel) return;
      const matchedOpt = q.options.find(o => o.label === chosenLabel);
      if (matchedOpt && matchedOpt.weights) {
        Object.entries(matchedOpt.weights).forEach(([roleId, w]) => {
          rawScores[roleId] = (rawScores[roleId] || 0) + w;
        });
      }
    });

    // Convert raw scores to percentage fits (normalized against max score)
    let maxVal = 0;
    Object.values(rawScores).forEach(val => {
      if (val > maxVal) maxVal = val;
    });

    if (maxVal === 0) maxVal = 1;

    const percentageScores: Record<string, number> = {};
    let topRoleId = CORE_TEAM_ROLES[0].id;
    let topScore = -1;

    CORE_TEAM_ROLES.forEach(r => {
      const score = rawScores[r.id] || 0;
      // Formula maps to a realistic 50% - 95% range
      const pct = Math.min(95, Math.max(52, Math.round(50 + (score / maxVal) * 42)));
      percentageScores[r.id] = pct;

      if (score > topScore) {
        topScore = score;
        topRoleId = r.id;
      }
    });

    setRoleScores(percentageScores);
    setRecommendedRoleId(topRoleId);
    setSelectedRoleId(topRoleId);
  };

  // Handler for Step 1 Continue
  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error('');

    if (!fullName.trim()) {
      setStep1Error('Full Name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setStep1Error('Valid Email Address is required.');
      return;
    }
    if (!country.trim()) {
      setStep1Error('Country selection is required.');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 14) {
      setStep1Error('You must be at least 14 years old to apply for the Core Team.');
      return;
    }
    if (!username.trim()) {
      setStep1Error('CyberEmpireX Username is required.');
      return;
    }

    setStep(2);
  };

  // Handler for Assessment Questions
  const handleSelectOption = (label: string) => {
    const newAnswers = { ...answers, [ASSESSMENT_QUESTIONS[currentQIndex].id]: label };
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!answers[ASSESSMENT_QUESTIONS[currentQIndex].id]) {
      return; // Must select an answer
    }

    if (currentQIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Completed all 15 questions
      calculateScores(answers);
      setStep(3);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    } else {
      setStep(1);
    }
  };

  // Handler for Final Application Submission
  const handleSubmitApplication = async () => {
    setSubmitError('');
    setIsSubmitting(true);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setSubmitError('Real authentication is required. Please sign in to submit.');
      setIsSubmitting(false);
      onOpenAuth();
      return;
    }

    // Verify seat availability before submitting
    const roleDef = CORE_TEAM_ROLES.find(r => r.id === selectedRoleId);
    if (!roleDef) {
      setSubmitError('Invalid role selection.');
      setIsSubmitting(false);
      return;
    }

    const occupied = seatOccupancy[selectedRoleId] || 0;
    const available = roleDef.totalSeats - occupied;
    if (available <= 0) {
      setSubmitError(`The selected role "${roleDef.title}" is no longer available. Please select another role.`);
      setIsSubmitting(false);
      return;
    }

    const generatedAppId = `CEX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const appData: CoreTeamApplicationData = {
      applicationId: generatedAppId,
      userId: currentUser.uid,
      name: fullName.trim(),
      email: currentUser.email || email.trim(),
      emailVerified: currentUser.emailVerified,
      country: country.trim(),
      ageConfirmation: parseInt(age, 10) >= 14,
      cyberEmpireXUsername: username.trim(),
      githubUsername: githubUsername.trim() || '',
      portfolio: portfolio.trim() || '',
      experienceLevel,
      availability,
      assessmentAnswers: answers,
      roleScores,
      recommendedRole: recommendedRoleId,
      selectedRole: selectedRoleId,
      agreementAccepted: true,
      agreementTimestamp: new Date().toISOString(),
      applicationStatus: 'Pending Review',
      submittedAt: new Date().toISOString()
    };

    try {
      // Save directly to Firestore collection 'coreTeamApplications'
      await setDoc(doc(db, 'coreTeamApplications', currentUser.uid), appData);
      setSubmittedAppId(generatedAppId);
      setStep(5); // Success step
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setSubmitError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allAgreementsChecked = Object.values(agreements).every(Boolean);

  // If user is guest
  if (!userProfile.isLoggedIn) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl w-16 h-16 mx-auto flex items-center justify-center text-[#2563EB]">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#111827]">Authentication Required</h1>
          <p className="text-sm text-[#4B5563] leading-relaxed max-w-md mx-auto">
            Applying for the CyberEmpireX Core Team requires an authenticated account. Please sign in or create an account to proceed.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center space-x-3">
          <button
            onClick={() => onNavigate('community-core-team')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#111827] font-semibold text-xs rounded-xl transition-all cursor-pointer"
          >
            ← Back to Core Team Info
          </button>
          <button
            onClick={onOpenAuth}
            className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In / Sign Up</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Navigation */}
      {step < 5 && (
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
          <button 
            onClick={() => {
              if (step === 1) onNavigate('community-core-team');
              else if (step === 2) setStep(1);
              else if (step === 3) setStep(2);
              else if (step === 4) setStep(3);
            }}
            className="hover:text-[#2563EB] flex items-center space-x-1.5 cursor-pointer font-bold text-xs text-[#2563EB] transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{step === 1 ? '← Back to Core Team Info' : 'Back to Previous Step'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-[#6B7280]">
            Step {step} of 4
          </span>
        </div>
      )}

      {/* Progress Indicator */}
      {step < 5 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: '1. Basic Info' },
              { num: 2, label: '2. Assessment' },
              { num: 3, label: '3. Role Match' },
              { num: 4, label: '4. Agreement' }
            ].map(item => (
              <div 
                key={item.num}
                className={`py-2 px-1 text-center border-b-2 transition-all ${
                  step === item.num 
                    ? 'border-[#2563EB] text-[#2563EB] font-bold' 
                    : step > item.num 
                    ? 'border-emerald-500 text-emerald-700 font-semibold' 
                    : 'border-transparent text-[#9CA3AF] font-medium'
                }`}
              >
                <span className="text-[11px] sm:text-xs block truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* STEP 1: BASIC INFORMATION */}
      {/* ───────────────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
              Step 1 of 4
            </span>
            <h1 className="text-2xl font-black text-[#111827] mt-1">CORE TEAM APPLICATION</h1>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Tell us a little about yourself before starting the role assessment.
            </p>
          </div>

          {step1Error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{step1Error}</span>
            </div>
          )}

          <form onSubmit={handleStep1Continue} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">Email Address * (Verified Account)</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-slate-100 border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#6B7280] font-semibold cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">Country *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="e.g. United States, Germany, India"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">Age * (Minimum 14 required)</label>
                <input
                  type="number"
                  min="14"
                  max="100"
                  required
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">CyberEmpireX Username *</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-mono font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">GitHub Username (Optional)</label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={e => setGithubUsername(e.target.value)}
                  placeholder="e.g. alexrivera"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827] block">Portfolio / Website (Optional)</label>
              <input
                type="text"
                value={portfolio}
                onChange={e => setPortfolio(e.target.value)}
                placeholder="https://yourportfolio.org"
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#2563EB] focus:bg-white"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
              <label className="text-xs font-bold text-[#111827] block">Experience Level *</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {['Beginner', 'Developing', 'Intermediate', 'Advanced', 'Professional'].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      experienceLevel === lvl
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-[#F8FAFC] text-[#374151] border-[#E5E7EB] hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
              <label className="text-xs font-bold text-[#111827] block">Realistic Contribution Availability *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['1–3 hours/week', '4–7 hours/week', '8–14 hours/week', '15+ hours/week'].map(avail => (
                  <button
                    key={avail}
                    type="button"
                    onClick={() => setAvailability(avail)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      availability === avail
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-[#F8FAFC] text-[#374151] border-[#E5E7EB] hover:bg-slate-100'
                    }`}
                  >
                    {avail}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue to Assessment →</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* STEP 2: 15-QUESTION ROLE ASSESSMENT */}
      {/* ───────────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                Step 2 of 4 — Role Assessment
              </span>
              <h2 className="text-xl font-black text-[#111827] mt-0.5">
                Question {currentQIndex + 1} of 15
              </h2>
            </div>
            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden border border-[#E5E7EB]">
              <div 
                className="bg-[#2563EB] h-full transition-all duration-300" 
                style={{ width: `${((currentQIndex + 1) / 15) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#111827] leading-snug">
              {ASSESSMENT_QUESTIONS[currentQIndex].question}
            </h3>

            <div className="space-y-2.5 pt-1">
              {ASSESSMENT_QUESTIONS[currentQIndex].options.map((opt, idx) => {
                const isSelected = answers[ASSESSMENT_QUESTIONS[currentQIndex].id] === opt.label;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(opt.label)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#2563EB] text-[#1E3A8A] font-bold shadow-xs'
                        : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#374151] hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className="text-xs sm:text-sm">{opt.label}</span>
                  </div>
                );
              })}

              {ASSESSMENT_QUESTIONS[currentQIndex].isOtherAllowed && (
                <div className="pt-2">
                  <label className="text-xs font-bold text-[#4B5563] block mb-1">Other specifics (Optional):</label>
                  <input
                    type="text"
                    value={otherText15}
                    onChange={e => setOtherText15(e.target.value)}
                    placeholder="Briefly explain your motivation..."
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <button
              onClick={handlePrevQuestion}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#111827] font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!answers[ASSESSMENT_QUESTIONS[currentQIndex].id]}
              className={`px-6 py-2.5 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5 ${
                answers[ASSESSMENT_QUESTIONS[currentQIndex].id]
                  ? 'bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <span>{currentQIndex === 14 ? 'Complete Assessment →' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* STEP 3: ROLE MATCH & SELECTION */}
      {/* ───────────────────────────────────────────────────────── */}
      {step === 3 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
              Step 3 of 4 — Role Matching & Selection
            </span>
            <h2 className="text-2xl font-black text-[#111827] mt-1">YOUR ROLE MATCH</h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Based on your answers, this is where your current skills and interests appear to fit best.
            </p>
          </div>

          {/* Top Recommendation Box */}
          {(() => {
            const recRole = CORE_TEAM_ROLES.find(r => r.id === recommendedRoleId);
            const scorePct = roleScores[recommendedRoleId] || 88;
            return (
              <div className="p-5 bg-blue-50/80 border-2 border-[#2563EB] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Strongest Recommended Match</span>
                  </div>
                  <span className="px-3 py-1 bg-[#2563EB] text-white font-mono text-xs font-bold rounded-full">
                    {scorePct}% Match
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#1E3A8A]">{recRole?.title}</h3>
                <p className="text-xs text-[#1E40AF] leading-relaxed font-medium">{recRole?.desc}</p>
              </div>
            );
          })()}

          <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl text-xs text-[#4B5563] leading-relaxed">
            <span className="font-bold text-[#111827]">Notice: </span>
            This assessment recommends roles based on your answers. Final Core Team selection is subject to application review and available positions.
          </div>

          {/* Select Preferred Role List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wide">
              Select Your Preferred Specialist Role (Pick 1):
            </h3>

            {loadingSeats ? (
              <p className="text-xs text-[#6B7280]">Checking live seat availability...</p>
            ) : (
              <div className="space-y-2.5">
                {CORE_TEAM_ROLES.map(role => {
                  const fitPct = roleScores[role.id] || 60;
                  const occupied = seatOccupancy[role.id] || 0;
                  const available = Math.max(0, role.totalSeats - occupied);
                  const isFull = available <= 0;
                  const isSelected = selectedRoleId === role.id;
                  const isRec = role.id === recommendedRoleId;

                  return (
                    <div
                      key={role.id}
                      onClick={() => {
                        if (!isFull) setSelectedRoleId(role.id);
                      }}
                      className={`p-4 rounded-xl border transition-all ${
                        isFull 
                          ? 'bg-slate-100 border-[#E5E7EB] opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-50/90 border-2 border-[#2563EB] text-[#1E3A8A] cursor-pointer shadow-xs'
                          : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#374151] hover:border-slate-300 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-[#111827]">{role.title}</span>
                            {isRec && (
                              <span className="px-2 py-0.5 bg-blue-100 text-[#2563EB] font-bold text-[10px] rounded-md">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#4B5563] leading-relaxed">{role.desc}</p>
                        </div>

                        <div className="text-right shrink-0 space-y-1">
                          <span className="block text-xs font-mono font-bold text-[#2563EB]">{fitPct}% Fit</span>
                          {isFull ? (
                            <span className="inline-block px-2.5 py-0.5 bg-red-100 text-red-700 font-mono text-[10px] font-bold rounded-full">
                              This role is no longer available
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold rounded-full">
                              {available} {available === 1 ? 'seat' : 'seats'} available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
            <button
              onClick={() => setStep(4)}
              disabled={!selectedRoleId}
              className={`px-6 py-3 text-white font-bold text-xs rounded-xl shadow-xs transition-all ${
                selectedRoleId ? 'bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <span>Continue to Final Agreement →</span>
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* STEP 4: FINAL AGREEMENT */}
      {/* ───────────────────────────────────────────────────────── */}
      {step === 4 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
              Step 4 of 4 — Final Confirmation
            </span>
            <h2 className="text-2xl font-black text-[#111827] mt-1">BEFORE SUBMITTING</h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Please review and accept all required statements before submitting your Core Team application.
            </p>
          </div>

          {submitError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            {[
              { key: 'age14', label: 'I confirm that I am 14 years of age or older.' },
              { key: 'infoAccurate', label: 'I confirm that the information I provided is accurate.' },
              { key: 'noGuarantee', label: 'I understand that applying does not guarantee Core Team membership.' },
              { key: 'codeOfConduct', label: 'I agree to follow the CyberEmpireX Contribution Guidelines and Code of Conduct.' },
              { key: 'lawfulUse', label: 'I agree to use cybersecurity knowledge responsibly and only for lawful and authorized purposes.' },
              { key: 'adminReview', label: 'I understand that my application may be reviewed by CyberEmpireX administrators.' }
            ].map(item => {
              const isChecked = agreements[item.key as keyof typeof agreements];
              return (
                <div
                  key={item.key}
                  onClick={() => setAgreements(prev => ({ ...prev, [item.key]: !isChecked }))}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    isChecked
                      ? 'bg-blue-50/60 border-blue-300 text-[#1E3A8A]'
                      : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#374151] hover:border-slate-300'
                  }`}
                >
                  <button className="mt-0.5 shrink-0 text-[#2563EB]">
                    {isChecked ? <CheckSquare className="w-4 h-4 text-[#2563EB]" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#111827] font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              ← Back
            </button>

            <button
              onClick={handleSubmitApplication}
              disabled={!allAgreementsChecked || isSubmitting}
              className={`px-8 py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center space-x-2 ${
                allAgreementsChecked && !isSubmitting
                  ? 'bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span>Submitting to Database...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Application →</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* STEP 5: SUCCESS PAGE */}
      {/* ───────────────────────────────────────────────────────── */}
      {step === 5 && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-xs text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#111827]">
              CORE TEAM APPLICATION RECEIVED
            </h1>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Thank you for applying to the CyberEmpireX Core Team. Your application has been successfully submitted and is currently under review.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-left space-y-2 text-xs font-mono text-[#374151]">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Application ID:</span>
              <span className="font-bold text-[#2563EB]">{submittedAppId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Selected Role:</span>
              <span className="font-bold text-[#111827]">
                {CORE_TEAM_ROLES.find(r => r.id === selectedRoleId)?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Status:</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pending Review
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('community-contribute')}
              className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Return to Contribute</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
