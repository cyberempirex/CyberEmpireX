import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Terminal, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Zap, 
  Lock, 
  Layers, 
  Code, 
  Globe, 
  Cpu 
} from 'lucide-react';
import { ViewMode } from '../types';
import { NetworkNodeTopologyDiagram } from './CexTechAssets';

interface LearningPathsPageProps {
  initialLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  setView: (view: ViewMode) => void;
  onOpenTerminalWithCmd?: (cmd: string) => void;
}

export const LearningPathsPage: React.FC<LearningPathsPageProps> = ({
  initialLevel = 'Beginner',
  setView,
  onOpenTerminalWithCmd
}) => {
  const [activeLevel, setActiveLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(initialLevel);

  const levelTracks = {
    Beginner: {
      title: 'Cybersecurity Fundamentals (Beginner)',
      badge: 'Level 1-3 · Starter Track',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Master the core pillars of computing, command line operations, basic networking, and security principles.',
      modules: [
        {
          id: 'b1',
          title: 'Linux Shell & POSIX Basics',
          duration: '2.5 hrs',
          topics: ['File Navigation (cd, ls, pwd)', 'File Manipulation (touch, mkdir, cp, rm)', 'Permissions & chmod / chown', 'Environment Variables & PATH'],
          recommendedCmd: 'help && uname -a && pwd',
          labLink: 'terminal-lab' as ViewMode
        },
        {
          id: 'b2',
          title: 'Termux Android Environment',
          duration: '3.0 hrs',
          topics: ['Package Management (pkg install, apt update)', 'Termux Storage Access (termux-setup-storage)', 'Running Python & Node.js on Mobile', 'SSH Server Setup'],
          recommendedCmd: 'pkg update && pkg install -y nmap python git',
          labLink: 'terminal-lab' as ViewMode
        },
        {
          id: 'b3',
          title: 'Networking Essentials',
          duration: '4.0 hrs',
          topics: ['IP Addressing & Subnet Masks', 'TCP/UDP Port Basics', 'DNS Resolution & Hosts File', 'Ping & Traceroute Diagnostics'],
          recommendedCmd: 'ping -c 4 1.1.1.1 && traceroute google.com',
          labLink: 'labs' as ViewMode
        },
        {
          id: 'b4',
          title: 'Basic Cryptography & Hashing',
          duration: '3.0 hrs',
          topics: ['Symmetric vs Asymmetric Encryption', 'Hashing Algorithms (SHA256, MD5)', 'Public Key Infrastructure (PKI)', 'SSL/TLS Handshakes'],
          recommendedCmd: 'echo -n "CyberEmpireX" | sha256sum',
          labLink: 'tools' as ViewMode
        }
      ]
    },
    Intermediate: {
      title: 'Practical Security & Reconnaissance (Intermediate)',
      badge: 'Level 4-7 · Operational Track',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Perform active network enumeration, web application auditing, packet inspection, and vulnerability management.',
      modules: [
        {
          id: 'i1',
          title: 'Network Reconnaissance with Nmap',
          duration: '4.5 hrs',
          topics: ['Port Scanning Types (-sS, -sT, -sU)', 'Service Version Detection (-sV)', 'OS Fingerprinting (-O)', 'Nmap Scripting Engine (NSE)'],
          recommendedCmd: 'nmap -sV -p 80,443,22 scanme.nmap.org',
          labLink: 'terminal-lab' as ViewMode
        },
        {
          id: 'i2',
          title: 'Web Application Security & OWASP Top 10',
          duration: '5.0 hrs',
          topics: ['SQL Injection (SQLi) Mechanics', 'Cross-Site Scripting (XSS) Attack Vectors', 'Broken Access Control', 'CSRF & Session Hijacking'],
          recommendedCmd: 'curl -I https://httpbin.org/headers',
          labLink: 'challenges' as ViewMode
        },
        {
          id: 'i3',
          title: 'Packet Analysis & Traffic Sniffing',
          duration: '4.0 hrs',
          topics: ['Wireshark Display Filters', 'Tcpdump Command Line Captures', 'PCAP File Inspection', 'Analyzing Unencrypted Protocols'],
          recommendedCmd: 'tcpdump -i eth0 -c 10 port 80',
          labLink: 'labs' as ViewMode
        },
        {
          id: 'i4',
          title: 'Security Automation with Python & Bash',
          duration: '4.5 hrs',
          topics: ['Writing Port Scanners in Python', 'Parsing Server Logs with awk/grep', 'Automating HTTP API Requests', 'Custom Exploitation Scripts'],
          recommendedCmd: 'python3 -c "import socket; print(socket.gethostbyname(\'google.com\'))"',
          labLink: 'terminal-lab' as ViewMode
        }
      ]
    },
    Advanced: {
      title: 'Advanced Exploitation & Defensive Engineering (Advanced)',
      badge: 'Level 8-10 · Expert Track',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Master binary analysis, privilege escalation, Active Directory security, reverse engineering, and threat hunting.',
      modules: [
        {
          id: 'a1',
          title: 'Linux & Windows Privilege Escalation',
          duration: '6.0 hrs',
          topics: ['SUID / SGID Executable Exploitation', 'Sudo Misconfigurations & GTFOBins', 'Kernel Vulnerability Analysis', 'Token Manipulation & Service Hijacking'],
          recommendedCmd: 'find / -perm -4000 -type f 2>/dev/null',
          labLink: 'labs' as ViewMode
        },
        {
          id: 'a2',
          title: 'Binary Exploitation & Reverse Engineering',
          duration: '7.0 hrs',
          topics: ['x86/x64 Assembly Fundamentals', 'Buffer Overflow Attacks', 'GDB & Radare2 Debugging', 'Bypassing DEP / ASLR Protections'],
          recommendedCmd: 'gdb -batch -ex "disassemble main" ./binary',
          labLink: 'terminal-lab' as ViewMode
        },
        {
          id: 'a3',
          title: 'Wireless Security & Mobile Auditing',
          duration: '5.5 hrs',
          topics: ['802.11 Wi-Fi Handshake Capture', 'WPA2/WPA3 Cracking Techniques', 'Android APK Decompilation (jadx/apktool)', 'Dynamic Instrumentation with Frida'],
          recommendedCmd: 'airmon-ng check kill',
          labLink: 'challenges' as ViewMode
        },
        {
          id: 'a4',
          title: 'Threat Hunting & SIEM Log Analysis',
          duration: '6.0 hrs',
          topics: ['Sigma Rule Creation', 'Analyzing Sysmon & Event Logs', 'Memory Forensics with Volatility', 'Incident Response Playbooks'],
          recommendedCmd: 'grep -i "failed" /var/log/auth.log | head -n 10',
          labLink: 'labs' as ViewMode
        }
      ]
    }
  };

  const currentTrack = levelTracks[activeLevel];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Top Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                <BookOpen className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-extrabold text-[#111827]">Cybersecurity Learning Paths</h1>
            </div>
            <p className="text-xs text-[#6B7280]">
              Structured curriculum designed for hands-on skill development from beginner shell usage to advanced pentesting.
            </p>
          </div>

          {/* Level Switcher Buttons */}
          <div className="flex items-center space-x-1.5 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E5E7EB] shrink-0">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLevel === lvl
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Level Overview Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border ${currentTrack.color}`}>
              {currentTrack.badge}
            </span>
            <h2 className="text-lg font-bold text-[#111827] mt-1">{currentTrack.title}</h2>
            <p className="text-xs text-[#6B7280]">{currentTrack.description}</p>
          </div>

          <button
            onClick={() => setView('terminal-lab')}
            className="px-4 py-2 bg-[#EEF4FF] hover:bg-blue-100 border border-[#2563EB]/30 text-[#2563EB] text-xs font-bold rounded-xl transition-all flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Practice Shell</span>
          </button>
        </div>
      </div>

      {/* Zero-Trust Architecture Diagram Vector */}
      <NetworkNodeTopologyDiagram />

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentTrack.modules.map((mod, idx) => (
          <div 
            key={mod.id}
            className="bg-white border border-[#E5E7EB] hover:border-[#2563EB]/40 rounded-2xl p-5 shadow-xs transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-[#2563EB] text-white font-mono font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#6B7280]">Module {idx + 1}</span>
                </div>
                <span className="text-[10px] font-mono text-[#6B7280] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E5E7EB]">
                  {mod.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                {mod.title}
              </h3>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] font-bold">Key Learning Objectives:</span>
                <ul className="space-y-1">
                  {mod.topics.map((t, i) => (
                    <li key={i} className="text-xs text-[#111827] flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono bg-[#F8FAFC] p-2 rounded-lg border border-[#E5E7EB]">
                <span className="text-[#6B7280]">Try in terminal:</span>
                <code className="text-[#2563EB] font-bold">{mod.recommendedCmd}</code>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    if (onOpenTerminalWithCmd) {
                      onOpenTerminalWithCmd(mod.recommendedCmd);
                    } else {
                      setView('terminal-lab');
                    }
                  }}
                  className="text-xs text-[#2563EB] hover:text-[#1D4ED8] font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Execute Command</span>
                </button>

                <button
                  onClick={() => setView(mod.labLink)}
                  className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Start Module</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
