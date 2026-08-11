import React, { useState } from 'react';
import { Award, Trophy, CheckCircle, AlertCircle, HelpCircle, Terminal, Sparkles, Shield, Play } from 'lucide-react';
import { CHALLENGES_DATA } from '../data/quizzes';
import { Challenge, UserProgress } from '../types';

interface QuizSectionProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenTerminal: (cmdStr?: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  userProgress,
  setUserProgress,
  onOpenTerminal
}) => {
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [showHints, setShowHints] = useState<{ [id: string]: boolean }>({});
  const [feedback, setFeedback] = useState<{ [id: string]: { success: boolean; msg: string } }>({});

  const handleAnswerSubmit = (challenge: Challenge) => {
    const userAns = (answers[challenge.id] || '').trim().toLowerCase();
    const expected = challenge.expectedCommandOrAnswer.trim().toLowerCase();

    if (!userAns) return;

    // Check match or partial command match
    const isCorrect = userAns === expected || userAns.includes(expected) || expected.includes(userAns);

    if (isCorrect) {
      const isAlreadyDone = userProgress.completedChallengeIds.includes(challenge.id);
      
      setFeedback(prev => ({
        ...prev,
        [challenge.id]: {
          success: true,
          msg: `[+] Correct! Flag captured: ${challenge.points} XP Awarded.`
        }
      }));

      if (!isAlreadyDone) {
        setUserProgress(prev => {
          const newBadges = [...prev.earnedBadges];
          if (challenge.badge && !newBadges.includes(challenge.badge)) {
            newBadges.push(challenge.badge);
          }
          return {
            ...prev,
            xp: prev.xp + challenge.points,
            completedChallengeIds: [...prev.completedChallengeIds, challenge.id],
            earnedBadges: newBadges
          };
        });
      }
    } else {
      setFeedback(prev => ({
        ...prev,
        [challenge.id]: {
          success: false,
          msg: `[-] Incorrect command or flag. Check the target hint.`
        }
      }));
    }
  };

  const toggleHint = (id: string) => {
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Termux CTF & Skill Verification Challenges</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Solve terminal scenarios, execute correct commands, capture flags, and earn XP badges.
          </p>
        </div>

        {/* User Badges Summary */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
          <Trophy className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400 font-mono">Badges Unlocked: </span>
            <span className="font-bold text-amber-300">{(userProgress.earnedBadges || []).length} / 5</span>
          </div>
        </div>
      </div>

      {/* Earned Badges Showcase */}
      {(userProgress.earnedBadges || []).length > 0 && (
        <div className="p-4 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border border-amber-900/40 rounded-2xl space-y-2">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center space-x-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Unlocked CyberEmpireX Badges:</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {(userProgress.earnedBadges || []).map((b, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold font-mono flex items-center space-x-1"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{b}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Challenges List */}
      <div className="space-y-4">
        {CHALLENGES_DATA.map((challenge) => {
          const isSolved = userProgress.completedChallengeIds.includes(challenge.id);
          const fb = feedback[challenge.id];

          return (
            <div
              key={challenge.id}
              className={`p-5 rounded-2xl border transition-all shadow-lg space-y-4 ${
                isSolved
                  ? 'bg-emerald-950/20 border-emerald-900/50'
                  : 'bg-slate-900/90 border-slate-800 hover:border-cyan-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-cyan-900/40">
                      {challenge.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      challenge.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      +{challenge.points} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {challenge.title}
                  </h3>
                </div>

                {isSolved && (
                  <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Solved</span>
                  </span>
                )}
              </div>

              {/* Scenario */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
                <p><strong className="text-cyan-300">Scenario:</strong> {challenge.scenario}</p>
                <p><strong className="text-amber-300">Objective:</strong> {challenge.objective}</p>
              </div>

              {/* Hint Drawer */}
              {showHints[challenge.id] && (
                <div className="p-3 bg-purple-950/30 border border-purple-900/40 rounded-xl text-xs text-purple-300 font-mono">
                  💡 <strong>Target Hint:</strong> {challenge.targetHint}
                </div>
              )}

              {/* Answer Input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={answers[challenge.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [challenge.id]: e.target.value })}
                    placeholder="Enter expected command (e.g. chmod +x check_ports.sh)..."
                    disabled={isSolved}
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 text-white font-mono text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                  />
                  <button
                    onClick={() => handleAnswerSubmit(challenge)}
                    disabled={isSolved}
                    className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                  >
                    Submit Flag
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => toggleHint(challenge.id)}
                    className="text-purple-400 hover:underline flex items-center space-x-1 text-[11px]"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[challenge.id] ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>

                  <button
                    onClick={() => onOpenTerminal(challenge.expectedCommandOrAnswer)}
                    className="text-emerald-400 hover:underline flex items-center space-x-1 text-[11px]"
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Test in Interactive Terminal</span>
                  </button>
                </div>
              </div>

              {/* Feedback Display */}
              {fb && (
                <div className={`p-3 rounded-xl border text-xs font-mono ${
                  fb.success ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-red-950/40 border-red-800/60 text-red-300'
                }`}>
                  {fb.msg}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
