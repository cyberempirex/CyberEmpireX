import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  ChevronRight, 
  Copy, 
  Check, 
  Search, 
  ExternalLink,
  Layers,
  Lock,
  Server
} from 'lucide-react';
import { ViewMode } from '../types';

interface KnowledgeSectionProps {
  initialCategory?: 'linux' | 'networking' | 'termux' | 'concepts';
  setView: (view: ViewMode) => void;
  onOpenTerminalWithCmd?: (cmd: string) => void;
}

export const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({
  initialCategory = 'linux',
  setView,
  onOpenTerminalWithCmd
}) => {
  const [activeCategory, setActiveCategory] = useState<'linux' | 'networking' | 'termux' | 'concepts'>(initialCategory);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const knowledgeData = {
    linux: {
      title: 'Linux Fundamentals & POSIX Architecture',
      icon: Terminal,
      description: 'Core concepts of Linux operating systems, process management, file permissions, and shell scripting.',
      articles: [
        {
          id: 'l1',
          title: 'POSIX File Permissions & SUID Bits',
          readTime: '5 min read',
          summary: 'Understanding octal notation (755, 644), special permission bits (SUID 4000, SGID 2000, Sticky Bit 1000), and privilege escalation risks.',
          commands: ['ls -la', 'chmod 4755 script.sh', 'find / -perm -4000 2>/dev/null'],
          content: 'Linux permissions use a 9-bit matrix representing Read (4), Write (2), and Execute (1) for User, Group, and Others. When SUID (Set User ID) is set on an executable file, any user running it acquires the privileges of the file owner (e.g. root).'
        },
        {
          id: 'l2',
          title: 'Process Management & Signals',
          readTime: '6 min read',
          summary: 'Interacting with Linux processes using ps, top, htop, kill, and understanding POSIX signals like SIGTERM (15) and SIGKILL (9).',
          commands: ['ps aux | grep nginx', 'kill -9 <PID>', 'htop'],
          content: 'Every program running on Linux is assigned a Process ID (PID). Process states include Running (R), Sleeping (S), Uninterruptible Sleep (D), and Zombie (Z). Signals are asynchronous notifications sent to processes.'
        },
        {
          id: 'l3',
          title: 'Linux Networking Stack & iptables',
          readTime: '7 min read',
          summary: 'Packet filtering, NAT rules, port forwarding, and configuring stateful Linux firewall rules with iptables and ufw.',
          commands: ['iptables -L -n -v', 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT', 'ufw status'],
          content: 'The Linux kernel netfilter framework processes network packets using chains: PREROUTING, INPUT, FORWARD, OUTPUT, and POSTROUTING. Tables like filter, nat, and mangle apply packet manipulation policies.'
        }
      ]
    },
    networking: {
      title: 'Computer Networking & Protocols',
      icon: Globe,
      description: 'Understanding OSI & TCP/IP layers, packet structures, routing vectors, and network protocol inspection.',
      articles: [
        {
          id: 'n1',
          title: 'OSI 7-Layer vs TCP/IP Model',
          readTime: '6 min read',
          summary: 'Comprehensive breakdown of Application, Presentation, Session, Transport, Network, Data Link, and Physical layers.',
          commands: ['ping -c 4 1.1.1.1', 'traceroute 8.8.8.8', 'ip route show'],
          content: 'The OSI model standardizes network communication. Layer 7 (Application) interfaces with software; Layer 4 (Transport) manages TCP/UDP sockets; Layer 3 (Network) handles IP routing across hosts.'
        },
        {
          id: 'n2',
          title: 'TCP 3-Way Handshake & Connection States',
          readTime: '5 min read',
          summary: 'SYN, SYN-ACK, ACK handshake sequence, TCP flags (FIN, RST, PSH, URG), and netstat/ss connection monitoring.',
          commands: ['ss -tulpn', 'netstat -an | grep ESTABLISHED', 'tcpdump -i eth0 tcp'],
          content: 'Reliable communication begins with a 3-way handshake: Client sends SYN, Server replies with SYN-ACK, Client sends ACK. Session teardown uses FIN or RST flags to release port bindings.'
        },
        {
          id: 'n3',
          title: 'Domain Name System (DNS) Architecture',
          readTime: '6 min read',
          summary: 'Recursive resolvers, authoritative DNS servers, DNS query flows, and querying A, AAAA, MX, TXT, and CNAME records.',
          commands: ['dig +short A google.com', 'dig MX github.com', 'nslookup -type=TXT _dmarc.google.com'],
          content: 'DNS translates human-readable domain names into IP addresses. DNS records include A (IPv4), AAAA (IPv6), MX (Mail Exchange), TXT (Verification & SPF/DKIM), and CNAME (Aliases).'
        }
      ]
    },
    termux: {
      title: 'Termux Android Terminal Environment',
      icon: Cpu,
      description: 'Advanced Linux environment on Android without root privileges, command customization, and Termux API integration.',
      articles: [
        {
          id: 't1',
          title: 'Termux Package Architecture & Mirrors',
          readTime: '4 min read',
          summary: 'Using pkg and apt package managers, configuring official Termux repository mirrors, and installing development tools.',
          commands: ['pkg update && pkg upgrade', 'pkg install -y python git clang', 'termux-change-repo'],
          content: 'Termux builds packages compiled specifically for Android bionic libc architecture instead of glibc. Using pkg ensures compatible dependency resolution.'
        },
        {
          id: 't2',
          title: 'Termux Android Storage & API Extensions',
          readTime: '5 min read',
          summary: 'Accessing shared device storage (/sdcard) and using Termux:API to query battery, SMS, camera, and sensors from shell scripts.',
          commands: ['termux-setup-storage', 'termux-battery-status', 'termux-wifi-connectioninfo'],
          content: 'Executing termux-setup-storage creates symlinks (~/storage) pointing to Android shared internal storage, downloads, photos, and SD card locations.'
        },
        {
          id: 't3',
          title: 'PRoot Linux Distribution Containers',
          readTime: '7 min read',
          summary: 'Running full Ubuntu, Debian, or Arch Linux distributions inside Termux without requiring Android root access using PRoot.',
          commands: ['pkg install -y proot-distro', 'proot-distro install ubuntu', 'proot-distro login ubuntu'],
          content: 'PRoot uses ptrace system calls to emulate chroot and fake root user privileges, allowing standard Linux binaries to execute transparently on Android devices.'
        }
      ]
    },
    concepts: {
      title: 'Core Cybersecurity & Threat Concepts',
      icon: ShieldCheck,
      description: 'Essential security principles, threat models, Zero Trust architecture, and framework methodologies.',
      articles: [
        {
          id: 'c1',
          title: 'CIA Triad & Defense-in-Depth',
          readTime: '5 min read',
          summary: 'Confidentiality, Integrity, and Availability principles, along with multi-layered defensive strategies.',
          commands: ['openssl enc -aes-256-cbc', 'sha256sum file.txt', 'fail2ban-client status'],
          content: 'The CIA Triad forms the core foundation of information security. Confidentiality prevents unauthorized access; Integrity prevents unauthorized modification; Availability ensures system uptime.'
        },
        {
          id: 'c2',
          title: 'Zero Trust Architecture (ZTA)',
          readTime: '6 min read',
          summary: 'Never trust, always verify: Identity-centric access control, microsegmentation, and continuous authorization.',
          commands: ['ssh -i ~/.ssh/id_ed25519 user@host', 'curl -H "Authorization: Bearer <TOKEN>"'],
          content: 'Zero Trust eliminates implicit trust based on network location. Every access request is continuously authenticated, authorized, and encrypted before granting least-privilege access.'
        },
        {
          id: 'c3',
          title: 'MITRE ATT&CK Framework Methodology',
          readTime: '7 min read',
          summary: 'Categorizing adversary tactics, techniques, and procedures (TTPs) across initial access, execution, and persistence.',
          commands: ['nmap -sS -O target', 'hydra -l admin -P pass.txt ssh://target'],
          content: 'MITRE ATT&CK is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations. It provides a common language for threat intelligence and security operations.'
        }
      ]
    }
  };

  const currentData = knowledgeData[activeCategory];

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
              <h1 className="text-xl font-extrabold text-[#111827]">Security Knowledge Base</h1>
            </div>
            <p className="text-xs text-[#6B7280]">
              In-depth technical guides, protocol specifications, and security reference documentation.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E5E7EB]">
            {(
              [
                { id: 'linux', label: 'Linux' },
                { id: 'networking', label: 'Networking' },
                { id: 'termux', label: 'Termux' },
                { id: 'concepts', label: 'Security Concepts' }
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#111827]">{currentData.title}</h2>
          <p className="text-xs text-[#6B7280]">{currentData.description}</p>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {currentData.articles.map((art) => (
          <div 
            key={art.id}
            className="bg-white border border-[#E5E7EB] hover:border-[#2563EB]/40 rounded-2xl p-5 shadow-xs transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-[#111827] flex items-center space-x-2">
                <currentData.icon className="w-4 h-4 text-[#2563EB]" />
                <span>{art.title}</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-[#6B7280] bg-[#F8FAFC] px-2.5 py-0.5 rounded-full border border-[#E5E7EB]">
                {art.readTime}
              </span>
            </div>

            <p className="text-xs font-semibold text-[#111827]">{art.summary}</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">{art.content}</p>

            {/* Example Commands Block */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#6B7280] block mb-1.5">Essential Terminal Commands:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {art.commands.map((cmd, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between bg-[#F8FAFC] border border-[#E5E7EB] p-2 rounded-xl text-xs font-mono group"
                  >
                    <span className="text-[#2563EB] font-bold truncate mr-1">{cmd}</span>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => handleCopy(cmd)}
                        className="p-1 hover:bg-white text-[#6B7280] hover:text-[#111827] rounded transition-colors cursor-pointer"
                        title="Copy command"
                      >
                        {copiedCmd === cmd ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => {
                          if (onOpenTerminalWithCmd) {
                            onOpenTerminalWithCmd(cmd);
                          } else {
                            setView('terminal-lab');
                          }
                        }}
                        className="p-1 hover:bg-[#2563EB] hover:text-white text-[#2563EB] rounded transition-colors cursor-pointer"
                        title="Run in Terminal Lab"
                      >
                        <Terminal className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
