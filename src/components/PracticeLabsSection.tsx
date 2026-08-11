import React from 'react';
import { 
  Play, 
  Clock, 
  Users, 
  ShieldAlert, 
  Terminal, 
  ChevronRight, 
  CheckCircle2, 
  Zap,
  Lock
} from 'lucide-react';
import { PracticeLab, ViewMode } from '../types';
import { FirewallTopologyDiagram } from './CexTechAssets';

interface PracticeLabsSectionProps {
  onOpenTerminalWithCmd: (cmd: string) => void;
  setView: (view: ViewMode) => void;
}

export const PracticeLabsSection: React.FC<PracticeLabsSectionProps> = ({
  onOpenTerminalWithCmd,
  setView
}) => {
  const labs: PracticeLab[] = [
    {
      id: 'beginner-lab',
      title: 'Beginner Lab: Linux SUID Misconfiguration',
      category: 'Linux',
      difficulty: 'Easy',
      timeMinutes: 25,
      participants: 1420,
      description: 'Identify misconfigured SUID binaries on Linux servers and execute privilege escalation.',
      objective: 'Locate SUID binary with `find / -perm -4000 2>/dev/null` and spawn root shell.',
      initialCommand: 'find / -perm -4000 -type f 2>/dev/null'
    },
    {
      id: 'web-challenge',
      title: 'Web Challenge: SQLi Authentication Bypass',
      category: 'Web Security',
      difficulty: 'Medium',
      timeMinutes: 45,
      participants: 890,
      description: 'Audit vulnerable login forms using boolean-based and blind SQL injection payloads.',
      objective: 'Bypass admin login with payload `admin\' OR \'1\'=\'1\' --` and extract flag.',
      initialCommand: 'python sqlmap.py -u "http://target.lab/login.php" --data="user=admin&pass=test" --dbs'
    },
    {
      id: 'linux-sandbox',
      title: 'Linux Sandbox: POSIX Shell Automation',
      category: 'Linux',
      difficulty: 'Easy',
      timeMinutes: 20,
      participants: 2100,
      description: 'Write custom shell scripts to parse system access logs and auto-ban malicious IPs.',
      objective: 'Filter failed SSH login attempts from auth.log and generate fail2ban rules.',
      initialCommand: 'grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c'
    },
    {
      id: 'privilege-escalation',
      title: 'Privilege Escalation: Kernel Capabilities',
      category: 'Red Team',
      difficulty: 'Hard',
      timeMinutes: 60,
      participants: 530,
      description: 'Exploit Linux file capabilities (`cap_setuid`) to elevate privileges from low-priv user.',
      objective: 'Enumerate capabilities using getcap -r / 2>/dev/null and exploit python3 cap_setuid.',
      initialCommand: 'getcap -r / 2>/dev/null'
    },
    {
      id: 'android-lab',
      title: 'Android Lab: APK Static Decompilation',
      category: 'Android',
      difficulty: 'Medium',
      timeMinutes: 50,
      participants: 740,
      description: 'Decompile Android APK using jadx/apktool, analyze AndroidManifest.xml, and extract API keys.',
      objective: 'Extract hardcoded secret credentials from decompiled Android DEX bytecodes.',
      initialCommand: 'jadx -d ~/out_apk app-release.apk'
    },
    {
      id: 'forensics-lab',
      title: 'Forensics: Memory Dump & PCAP Packet Analysis',
      category: 'Blue Team',
      difficulty: 'Hard',
      timeMinutes: 40,
      participants: 310,
      description: 'Analyze network PCAP capture files in tshark/tcpdump to identify exfiltrated data.',
      objective: 'Extract HTTP GET parameters and cleartext FTP credentials from network pcap stream.',
      initialCommand: 'tshark -r capture.pcap -Y "http.request.method == POST" -T fields -e http.file_data'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header Banner with Sandbox Illustration */}
      <div className="bg-[#2563EB] text-white rounded-2xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="p-6 md:col-span-8 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
              Interactive Hands-On Environment
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Zap className="w-6 h-6 text-amber-300" />
            <span>Interactive Practice Labs</span>
          </h2>
          <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
            Real-time, isolated cloud sandbox environments for practical hands-on Linux, networking, and security auditing skills.
          </p>

          <button
            onClick={() => setView('labs')}
            className="px-4 py-2 bg-white hover:bg-blue-50 text-[#2563EB] rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer inline-flex"
          >
            <span>Explore All Labs</span>
            <ChevronRight className="w-4 h-4 text-[#2563EB]" />
          </button>
        </div>

        <div className="md:col-span-4 h-full min-h-[140px] relative overflow-hidden hidden md:block">
          <img
            src="/src/assets/images/labs_sandbox_art_1786148350194.jpg"
            alt="Open Source Sandbox Illustration"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Corporate Security Stateful Inspection Topology Vector */}
      <FirewallTopologyDiagram />

      {/* Grid of Lab Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              
              {/* Top Row: Difficulty Badge + Participants Live Counter */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                  lab.difficulty === 'Easy' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20' :
                  lab.difficulty === 'Medium' ? 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20' :
                  'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
                }`}>
                  {lab.difficulty}
                </span>

                <div className="flex items-center space-x-1.5 text-xs text-[#6B7280] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                  <Users className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>{lab.participants.toLocaleString()} Active</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                  {lab.title}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mt-1">
                  {lab.description}
                </p>
              </div>

              {/* Lab Scenario Objective Note */}
              <div className="p-3 bg-[#F6F9FC] border border-[#E5E7EB] rounded-xl text-xs space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#2563EB] uppercase">Objective</div>
                <p className="text-[#111827] text-[11px] leading-snug line-clamp-2">
                  {lab.objective}
                </p>
              </div>

            </div>

            {/* Bottom Row: Duration & Start Lab Button */}
            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="flex items-center space-x-1 text-xs text-[#6B7280] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{lab.timeMinutes} mins</span>
              </span>

              <button
                onClick={() => onOpenTerminalWithCmd(lab.initialCommand || 'ls -la')}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Lab</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
