import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { 
  Terminal as TerminalIcon, 
  RotateCcw, 
  Eraser, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  ShieldCheck, 
  BookOpen, 
  Copy, 
  Check, 
  X, 
  ChevronRight, 
  Code,
  Layers,
  HelpCircle
} from 'lucide-react';
import { UserProgress, ViewMode } from '../types';
import { FilesystemTreeVisual, LinuxPackageSymbol, GitRepositoryMark } from './CexTechAssets';

interface TerminalLabProps {
  initialCommand?: string;
  onOpenAiExplain?: (cmd: string) => void;
  setView: (view: ViewMode) => void;
  setUserProgress?: React.Dispatch<React.SetStateAction<UserProgress>>;
}

interface FileItem {
  name: string;
  isDir: boolean;
  content?: string;
  executable?: boolean;
}

interface GuidedLab {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate';
  summary: string;
  tasks: {
    description: string;
    expectedCmd: string | RegExp;
    hint: string;
  }[];
}

const GUIDED_LABS: GuidedLab[] = [
  {
    id: 'lab-1',
    title: 'Linux CLI & File Navigation',
    category: 'Foundations',
    difficulty: 'Beginner',
    summary: 'Master fundamental terminal commands for navigating directories and reading files in Termux/Linux.',
    tasks: [
      {
        description: '1. Check your current working directory using `pwd`.',
        expectedCmd: /^pwd$/,
        hint: 'Type `pwd` and press Enter to output your current path.'
      },
      {
        description: '2. List all files and hidden directories using `ls -la`.',
        expectedCmd: /^ls(\s+-la|\s+-al|\s+-l|\s+-a)?$/,
        hint: 'Type `ls -la` to see detailed file permissions and contents.'
      },
      {
        description: '3. Navigate into the `docs` folder using `cd docs`.',
        expectedCmd: /^cd\s+docs\/?$/,
        hint: 'Type `cd docs` to change your current directory.'
      },
      {
        description: '4. Read the contents of `welcome.txt` using `cat welcome.txt`.',
        expectedCmd: /^cat\s+welcome\.txt$/,
        hint: 'Type `cat welcome.txt` to print out file text.'
      }
    ]
  },
  {
    id: 'lab-2',
    title: 'Termux Package Management',
    category: 'Environment Setup',
    difficulty: 'Beginner',
    summary: 'Learn how to keep package repositories updated and safely install open source security utilities.',
    tasks: [
      {
        description: '1. Synchronize package repository lists using `pkg update`.',
        expectedCmd: /^pkg\s+update$/,
        hint: 'Type `pkg update` to refresh the Termux package indices.'
      },
      {
        description: '2. Install the Nmap network scanner package using `pkg install nmap`.',
        expectedCmd: /^pkg\s+install\s+nmap$/,
        hint: 'Type `pkg install nmap` to simulate installing Nmap.'
      },
      {
        description: '3. Verify installed tools using `pkg list-installed`.',
        expectedCmd: /^pkg\s+list-installed$/,
        hint: 'Type `pkg list-installed` to list all installed CLI binaries.'
      }
    ]
  },
  {
    id: 'lab-3',
    title: 'Network Diagnostics & Port Scanning',
    category: 'Reconnaissance',
    difficulty: 'Intermediate',
    summary: 'Practice safe, authorized network diagnostics and local port audits in a controlled sandbox.',
    tasks: [
      {
        description: '1. Send 3 ICMP echo requests to localhost using `ping -c 3 127.0.0.1`.',
        expectedCmd: /^ping\s+(-c\s+3\s+)?(127\.0\.0\.1|localhost)/,
        hint: 'Type `ping -c 3 127.0.0.1` to check local network latency.'
      },
      {
        description: '2. Scan local service ports using `nmap 192.168.1.1`.',
        expectedCmd: /^nmap\s+(192\.168\.1\.1|127\.0\.0\.1|localhost)/,
        hint: 'Type `nmap 192.168.1.1` to perform an authorized port audit.'
      },
      {
        description: '3. Inspect HTTP headers with `curl -I http://127.0.0.1`.',
        expectedCmd: /^curl\s+-I\s+http:\/\/(127\.0\.0\.1|localhost)\/?$/,
        hint: 'Type `curl -I http://127.0.0.1` to retrieve HTTP header metadata.'
      }
    ]
  },
  {
    id: 'lab-4',
    title: 'Shell Scripting & Permissions',
    category: 'Automation',
    difficulty: 'Intermediate',
    summary: 'Create custom shell scripts, grant execution permissions, and run executable scripts.',
    tasks: [
      {
        description: '1. Create a directory named `scripts` using `mkdir scripts`.',
        expectedCmd: /^mkdir\s+scripts\/?$/,
        hint: 'Type `mkdir scripts` to create a new folder.'
      },
      {
        description: '2. Write a bash echo statement into `scripts/run.sh`.',
        expectedCmd: /echo\s+['"].*['"]\s*>\s*scripts\/run\.sh/,
        hint: 'Type `echo \'echo "Hello World"\' > scripts/run.sh` to populate the script.'
      },
      {
        description: '3. Make the script executable using `chmod +x scripts/run.sh`.',
        expectedCmd: /^chmod\s+\+x\s+scripts\/run\.sh$/,
        hint: 'Type `chmod +x scripts/run.sh` to assign execution permissions.'
      },
      {
        description: '4. Execute your script using `./scripts/run.sh` or `bash scripts/run.sh`.',
        expectedCmd: /^(\.\/scripts\/run\.sh|bash\s+scripts\/run\.sh)$/,
        hint: 'Type `./scripts/run.sh` to run the executable bash script.'
      }
    ]
  },
  {
    id: 'lab-5',
    title: 'Troubleshooting Command Errors',
    category: 'Debugging',
    difficulty: 'Beginner',
    summary: 'Understand common Linux error messages like command not found, permission denied, and file missing.',
    tasks: [
      {
        description: '1. Intentionally trigger `command not found` by typing `invalid_cmd`.',
        expectedCmd: /^invalid_cmd$/,
        hint: 'Type `invalid_cmd` and hit enter to observe how the shell handles missing binaries.'
      },
      {
        description: '2. Try reading a non-existent file with `cat missing.txt`.',
        expectedCmd: /^cat\s+missing\.txt$/,
        hint: 'Type `cat missing.txt` to see the standard missing file error message.'
      },
      {
        description: '3. Attempt running an unpermitted script `./scan.sh`.',
        expectedCmd: /^\.\/scan\.sh$/,
        hint: 'Type `./scan.sh` to trigger a `Permission denied` error.'
      },
      {
        description: '4. Fix the permission issue with `chmod +x scan.sh` and re-run `./scan.sh`.',
        expectedCmd: /^chmod\s+\+x\s+scan\.sh$/,
        hint: 'Type `chmod +x scan.sh` to grant execution rights.'
      }
    ]
  }
];

// Initial Virtual File System state
const INITIAL_FS: Record<string, FileItem[]> = {
  '/home/user': [
    { name: 'welcome.txt', isDir: false, content: 'Welcome to CyberEmpireX Interactive Terminal Lab!\nThis environment runs safely inside your browser.\nPractice Linux CLI, Termux tools, and script automation with total peace of mind.' },
    { name: 'notes.txt', isDir: false, content: 'CyberEmpireX Security Policy:\n1. White-hat testing only.\n2. Always obtain written authorization.\n3. Respect privacy and system bounds.' },
    { name: 'demo.py', isDir: false, content: 'print("[CyberEmpireX] Python 3 REPL active.")\nprint("Security automation script executed successfully.")' },
    { name: 'scan.sh', isDir: false, content: 'echo "[+] Scanning local targets..."\necho "[+] All services secured."', executable: false },
    { name: 'docs', isDir: true },
  ],
  '/home/user/docs': [
    { name: 'welcome.txt', isDir: false, content: 'Termux Quick Reference:\n- pkg update: Sync package lists\n- pkg install <tool>: Download utility\n- nmap: Scan open ports' },
    { name: 'commands.txt', isDir: false, content: 'Essential Linux CLI Commands:\nls, cd, pwd, cat, echo, mkdir, rm, chmod, grep, curl, ping, nmap' }
  ],
  '/etc': [
    { name: 'hostname', isDir: false, content: 'cyberempirex-lab-box' },
    { name: 'os-release', isDir: false, content: 'NAME="Termux Security Linux"\nVERSION="2026.1-LTS"\nID=termux' }
  ]
};

export const TerminalLab: React.FC<TerminalLabProps> = ({
  initialCommand,
  onOpenAiExplain,
  setView,
  setUserProgress
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  // Shell State
  const [currentDir, setCurrentDir] = useState<string>('/home/user');
  const [virtualFS, setVirtualFS] = useState<Record<string, FileItem[]>>(INITIAL_FS);
  const [installedPackages, setInstalledPackages] = useState<string[]>(['coreutils', 'bash', 'python3', 'git', 'curl']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState<string>('');

  // Guided Exercises State
  const [activeLabId, setActiveLabId] = useState<string>('lab-1');
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [completedTaskIndices, setCompletedTaskIndices] = useState<number[]>([]);
  const [hintVisible, setHintVisible] = useState<boolean>(false);

  // AI Command Inspector State
  const [isAiExplainModalOpen, setIsAiExplainModalOpen] = useState<boolean>(false);
  const [selectedCmdForExplain, setSelectedCmdForExplain] = useState<string>('');
  const [aiBreakdownData, setAiBreakdownData] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const activeLab = GUIDED_LABS.find(l => l.id === activeLabId) || GUIDED_LABS[0];

  // Helper to format prompt prefix
  const getPromptString = (dir: string) => {
    const formattedDir = dir === '/home/user' ? '~' : dir.replace('/home/user/', '~/');
    return `\x1b[1;32muser@cyberempirex\x1b[0m:\x1b[1;34m${formattedDir}\x1b[0m$ `;
  };

  // Write line with xterm formatting
  const printToTerminal = (term: Terminal, text: string) => {
    const lines = text.split('\n');
    lines.forEach(l => term.writeln(l));
  };

  // Reset Session Handler
  const handleResetSession = () => {
    setVirtualFS(JSON.parse(JSON.stringify(INITIAL_FS)));
    setCurrentDir('/home/user');
    setInstalledPackages(['coreutils', 'bash', 'python3', 'git', 'curl']);
    setCommandHistory([]);
    setHistoryIndex(-1);
    setActiveTaskIndex(0);
    setCompletedTaskIndices([]);
    setHintVisible(false);

    if (xtermRef.current) {
      xtermRef.current.clear();
      xtermRef.current.writeln('\x1b[1;36m[+] Session environment reset to pristine default state.\x1b[0m');
      xtermRef.current.writeln('\x1b[90mType "help" or select a guided exercise on the right to start.\x1b[0m\n');
      xtermRef.current.write(getPromptString('/home/user'));
    }
  };

  // Clear Terminal Handler
  const handleClearTerminal = () => {
    if (xtermRef.current) {
      xtermRef.current.clear();
      xtermRef.current.write(getPromptString(currentDir));
    }
  };

  // AI Command Breakdown Handler
  const handleInspectCommand = async (cmdToExplain?: string) => {
    const targetCmd = cmdToExplain || currentInput.trim() || 'pkg install nmap';
    setSelectedCmdForExplain(targetCmd);
    setIsAiExplainModalOpen(true);
    setAiLoading(true);
    setAiBreakdownData(null);

    try {
      const res = await fetch('/api/ai/explain-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: targetCmd })
      });
      const data = await res.json();
      if (data.breakdown) {
        setAiBreakdownData(data.breakdown);
      } else {
        setAiBreakdownData({
          command: targetCmd,
          summary: `Command breakdown for "${targetCmd}"`,
          parts: [
            { part: targetCmd.split(' ')[0], description: 'Primary CLI executable' },
            { part: targetCmd.split(' ').slice(1).join(' ') || 'N/A', description: 'Arguments / options' }
          ],
          safetyTip: 'Always verify target authorization before executing network queries.'
        });
      }
    } catch (e) {
      setAiBreakdownData({
        command: targetCmd,
        summary: `Command analysis for "${targetCmd}"`,
        parts: [
          { part: targetCmd.split(' ')[0], description: 'Executable binary' },
          { part: targetCmd.split(' ').slice(1).join(' ') || 'N/A', description: 'Flags / arguments' }
        ],
        safetyTip: 'Client-side isolated simulation mode active.'
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Process Virtual Command Execution
  const processCommand = (term: Terminal, input: string) => {
    const rawCmd = input.trim();
    if (!rawCmd) {
      term.writeln('');
      term.write(getPromptString(currentDir));
      return;
    }

    term.writeln(''); // Move to new line after enter
    setCommandHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const parts = rawCmd.split(/\s+/);
    const mainCmd = parts[0];
    const args = parts.slice(1);

    // Lab Task Verification Check
    const currentTask = activeLab.tasks[activeTaskIndex];
    if (currentTask && currentTask.expectedCmd) {
      let isMatch = false;
      if (typeof currentTask.expectedCmd === 'string') {
        isMatch = rawCmd.toLowerCase() === currentTask.expectedCmd.toLowerCase();
      } else if (currentTask.expectedCmd instanceof RegExp) {
        isMatch = currentTask.expectedCmd.test(rawCmd);
      }

      if (isMatch) {
        if (!completedTaskIndices.includes(activeTaskIndex)) {
          setCompletedTaskIndices(prev => [...prev, activeTaskIndex]);
          if (activeTaskIndex < activeLab.tasks.length - 1) {
            setActiveTaskIndex(prev => prev + 1);
          } else {
            // Lab completed award XP
            if (setUserProgress) {
              setUserProgress(prev => ({
                ...prev,
                xp: prev.xp + 50,
                completedLabIds: [...(prev.completedLabIds || []), activeLab.id]
              }));
            }
          }
        }
      }
    }

    // Engine Commands Implementation
    let outputDir = currentDir;

    switch (mainCmd) {
      case 'clear':
        term.clear();
        term.write(getPromptString(currentDir));
        return;

      case 'pwd':
        term.writeln(currentDir);
        break;

      case 'whoami':
        term.writeln('user');
        break;

      case 'date':
        term.writeln(new Date().toUTCString());
        break;

      case 'uname':
        if (args.includes('-a')) {
          term.writeln('Linux cyberempirex-lab 6.1.0-termux #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux');
        } else {
          term.writeln('Linux');
        }
        break;

      case 'help':
        term.writeln('\x1b[1;36m=== CyberEmpireX Terminal Lab Commands ===\x1b[0m');
        term.writeln('  \x1b[1;32mpwd\x1b[0m                 Print current working directory');
        term.writeln('  \x1b[1;32mls [-la]\x1b[0m            List files and directory contents');
        term.writeln('  \x1b[1;32mcd <dir>\x1b[0m            Change current directory');
        term.writeln('  \x1b[1;32mcat <file>\x1b[0m          Read file text');
        term.writeln('  \x1b[1;32mmkdir <dir>\x1b[0m         Create new directory');
        term.writeln('  \x1b[1;32mecho "text" > file\x1b[0m Write text to file');
        term.writeln('  \x1b[1;32mchmod +x <file>\x1b[0m    Set executable permissions');
        term.writeln('  \x1b[1;32mpkg [update|install]\x1b[0m Termux package manager');
        term.writeln('  \x1b[1;32mping <host>\x1b[0m         Simulate ICMP ping test');
        term.writeln('  \x1b[1;32mnmap <target>\x1b[0m       Simulate network port audit');
        term.writeln('  \x1b[1;32mcurl -I <url>\x1b[0m       Fetch HTTP header response');
        term.writeln('  \x1b[1;32mpython3 <script>\x1b[0m    Execute Python script');
        term.writeln('  \x1b[1;32mclear\x1b[0m               Clear terminal screen');
        term.writeln('  \x1b[1;32mreset\x1b[0m               Reset entire sandbox environment\n');
        break;

      case 'ls': {
        const files = virtualFS[currentDir] || [];
        const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');

        const filtered = files.filter(f => showHidden || !f.name.startsWith('.'));
        if (longFormat) {
          term.writeln('total ' + filtered.length * 4);
          filtered.forEach(f => {
            const perm = f.isDir ? 'drwxr-xr-x' : (f.executable ? '-rwxr-xr-x' : '-rw-r--r--');
            const size = f.isDir ? 4096 : (f.content?.length || 128);
            const colorName = f.isDir ? `\x1b[1;34m${f.name}/\x1b[0m` : (f.executable ? `\x1b[1;32m${f.name}*\x1b[0m` : f.name);
            term.writeln(`${perm} 1 user user ${size.toString().padStart(6, ' ')} Aug 08 01:00 ${colorName}`);
          });
        } else {
          const names = filtered.map(f => {
            if (f.isDir) return `\x1b[1;34m${f.name}/\x1b[0m`;
            if (f.executable) return `\x1b[1;32m${f.name}*\x1b[0m`;
            return f.name;
          });
          term.writeln(names.join('  '));
        }
        break;
      }

      case 'cd': {
        const target = args[0] || '~';
        if (target === '~' || target === '/home/user') {
          outputDir = '/home/user';
          setCurrentDir('/home/user');
        } else if (target === '..') {
          if (currentDir !== '/home/user') {
            const lastSlash = currentDir.lastIndexOf('/');
            const parent = currentDir.substring(0, lastSlash) || '/home/user';
            outputDir = parent;
            setCurrentDir(parent);
          }
        } else {
          const resolvePath = target.startsWith('/') ? target : `${currentDir}/${target.replace(/\/$/, '')}`;
          if (virtualFS[resolvePath] || (virtualFS[currentDir] && virtualFS[currentDir].some(f => f.name === target && f.isDir))) {
            outputDir = resolvePath;
            setCurrentDir(resolvePath);
          } else {
            term.writeln(`\x1b[31mbash: cd: ${target}: No such file or directory\x1b[0m`);
          }
        }
        break;
      }

      case 'cat': {
        if (args.length === 0) {
          term.writeln('\x1b[31mcat: missing filename operand\x1b[0m');
          term.writeln('Try `cat --help` or specify a valid file e.g. `cat welcome.txt`');
          break;
        }
        const fileName = args[0];
        const files = virtualFS[currentDir] || [];
        const found = files.find(f => f.name === fileName && !f.isDir);

        if (found) {
          term.writeln(found.content || '(empty file)');
        } else {
          term.writeln(`\x1b[31mcat: ${fileName}: No such file or directory\x1b[0m`);
        }
        break;
      }

      case 'mkdir': {
        if (args.length === 0) {
          term.writeln('\x1b[31mmkdir: missing operand\x1b[0m');
          break;
        }
        const dirName = args[0].replace(/\/$/, '');
        const newDirPath = `${currentDir}/${dirName}`;

        setVirtualFS(prev => {
          const currentFiles = prev[currentDir] || [];
          if (!currentFiles.some(f => f.name === dirName)) {
            return {
              ...prev,
              [currentDir]: [...currentFiles, { name: dirName, isDir: true }],
              [newDirPath]: []
            };
          }
          return prev;
        });
        term.writeln(`\x1b[32m[+] Directory created: ${dirName}\x1b[0m`);
        break;
      }

      case 'echo': {
        const fullEchoText = args.join(' ');
        if (fullEchoText.includes('>')) {
          const [textPart, filePart] = fullEchoText.split('>');
          const cleanText = textPart.trim().replace(/^['"]|['"]$/g, '');
          const targetFile = filePart.trim();

          setVirtualFS(prev => {
            const currentFiles = prev[currentDir] || [];
            const existingIdx = currentFiles.findIndex(f => f.name === targetFile);
            if (existingIdx >= 0) {
              const updated = [...currentFiles];
              updated[existingIdx] = { ...updated[existingIdx], content: cleanText };
              return { ...prev, [currentDir]: updated };
            } else {
              return {
                ...prev,
                [currentDir]: [...currentFiles, { name: targetFile, isDir: false, content: cleanText, executable: false }]
              };
            }
          });
          term.writeln(`\x1b[32m[+] Written to file: ${targetFile}\x1b[0m`);
        } else {
          term.writeln(fullEchoText.replace(/^['"]|['"]$/g, ''));
        }
        break;
      }

      case 'chmod': {
        if (args.length < 2) {
          term.writeln('\x1b[31mchmod: missing operand\x1b[0m');
          term.writeln('Usage: chmod +x <filename>');
          break;
        }
        const targetFile = args[1];
        setVirtualFS(prev => {
          const files = prev[currentDir] || [];
          const idx = files.findIndex(f => f.name === targetFile);
          if (idx >= 0) {
            const updated = [...files];
            updated[idx] = { ...updated[idx], executable: true };
            return { ...prev, [currentDir]: updated };
          }
          return prev;
        });
        term.writeln(`\x1b[32m[+] Executable permissions (+x) set for ${targetFile}\x1b[0m`);
        break;
      }

      case 'pkg': {
        const sub = args[0];
        if (sub === 'update' || sub === 'upgrade') {
          term.writeln('\x1b[33mGet:1 https://termux.org/packages stable InRelease [14.2 kB]\x1b[0m');
          term.writeln('Get:2 https://termux.org/packages root InRelease [10.1 kB]');
          term.writeln('\x1b[32m[+] Reading package lists... Done\x1b[0m');
          term.writeln('\x1b[32m[+] All repositories synchronized up-to-date.\x1b[0m');
        } else if (sub === 'install') {
          const pkgName = args[1];
          if (!pkgName) {
            term.writeln('\x1b[31mpkg: missing package name\x1b[0m');
            term.writeln('Usage: pkg install <package-name>');
            break;
          }
          term.writeln(`Reading package lists... Done`);
          term.writeln(`Building dependency tree... Done`);
          term.writeln(`Setting up ${pkgName} (2026.1-1)...`);
          term.writeln(`\x1b[32m[+] Package '${pkgName}' installed successfully in Termux sandbox.\x1b[0m`);
          if (!installedPackages.includes(pkgName)) {
            setInstalledPackages(prev => [...prev, pkgName]);
          }
        } else if (sub === 'list-installed') {
          term.writeln('\x1b[1;36mInstalled Termux Packages:\x1b[0m');
          installedPackages.forEach(p => term.writeln(` - ${p}/stable,now 2026.1-1 amd64 [installed]`));
        } else {
          term.writeln('\x1b[31mUsage: pkg [update|upgrade|install <pkg>|list-installed]\x1b[0m');
        }
        break;
      }

      case 'ping': {
        const host = args.find(a => !a.startsWith('-')) || '127.0.0.1';
        term.writeln(`PING ${host} (${host}) 56(84) bytes of data.`);
        term.writeln(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.042 ms`);
        term.writeln(`64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.038 ms`);
        term.writeln(`64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.045 ms`);
        term.writeln(`--- ${host} ping statistics ---`);
        term.writeln(`3 packets transmitted, 3 received, 0% packet loss, time 2003ms`);
        term.writeln(`rtt min/avg/max/mdev = 0.038/0.041/0.045/0.003 ms`);
        break;
      }

      case 'nmap': {
        const targetHost = args[0] || '192.168.1.1';
        term.writeln(`Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-08 01:30 UTC`);
        term.writeln(`Nmap scan report for ${targetHost}`);
        term.writeln(`Host is up (0.0012s latency).`);
        term.writeln(`Not shown: 997 closed tcp ports (reset)`);
        term.writeln(`PORT     STATE SERVICE    VERSION`);
        term.writeln(`22/tcp   open  ssh        OpenSSH 9.3p1 (protocol 2.0)`);
        term.writeln(`80/tcp   open  http       Nginx 1.24.0`);
        term.writeln(`443/tcp  open  ssl/https  Nginx 1.24.0`);
        term.writeln(`\x1b[32m[+] Nmap audit completed: 3 open ports discovered on ${targetHost}.\x1b[0m`);
        break;
      }

      case 'curl': {
        const url = args[args.length - 1] || 'http://127.0.0.1';
        if (args.includes('-I')) {
          term.writeln(`HTTP/1.1 200 OK`);
          term.writeln(`Server: CyberEmpireX-Lab/2026.1`);
          term.writeln(`Date: ${new Date().toUTCString()}`);
          term.writeln(`Content-Type: text/html; charset=UTF-8`);
          term.writeln(`Content-Length: 512`);
          term.writeln(`Connection: keep-alive`);
        } else {
          term.writeln(`<!DOCTYPE html><html><head><title>CyberEmpireX Sandbox</title></head><body><h1>Open Source Security Platform</h1></body></html>`);
        }
        break;
      }

      case 'python':
      case 'python3': {
        if (args.length === 0) {
          term.writeln('Python 3.12.2 (main, Termux Build, Feb 2026)');
          term.writeln('[GCC 12.2.0] on linux');
          term.writeln('Type "help", "copyright", "credits" or "license" for more information.');
          term.writeln('>>> print("[+] CyberEmpireX Interactive Python Environment")');
          term.writeln('[+] CyberEmpireX Interactive Python Environment');
        } else {
          const pyFile = args[0];
          const files = virtualFS[currentDir] || [];
          const found = files.find(f => f.name === pyFile);
          if (found) {
            term.writeln(`\x1b[32m[+] Executing Python script: ${pyFile}\x1b[0m`);
            term.writeln('[CyberEmpireX] Python 3 REPL active.');
            term.writeln('Security automation script executed successfully.');
          } else {
            term.writeln(`python3: can't open file '${pyFile}': [Errno 2] No such file or directory`);
          }
        }
        break;
      }

      default: {
        // Handle executing `./script.sh`
        if (rawCmd.startsWith('./') || rawCmd.startsWith('bash ')) {
          const scriptName = rawCmd.replace('./', '').replace('bash ', '');
          const files = virtualFS[currentDir] || [];
          const found = files.find(f => f.name === scriptName);

          if (!found) {
            term.writeln(`\x1b[31mbash: ${rawCmd}: No such file or directory\x1b[0m`);
          } else if (!found.executable && rawCmd.startsWith('./')) {
            term.writeln(`\x1b[31mbash: ${rawCmd}: Permission denied\x1b[0m`);
            term.writeln('\x1b[33mTip: Grant execution rights using `chmod +x ' + scriptName + '`\x1b[0m');
          } else {
            term.writeln(`\x1b[32m[+] Running script ${scriptName}...\x1b[0m`);
            term.writeln(found.content || '[+] Script completed.');
          }
        } else {
          term.writeln(`\x1b[31mbash: command not found: ${mainCmd}\x1b[0m`);
          term.writeln(`\x1b[90mType "help" to view available open source terminal commands or select a guided exercise.\x1b[0m`);
        }
        break;
      }
    }

    term.write(getPromptString(outputDir));
  };

  // Initialize xterm.js instance
  useEffect(() => {
    if (!terminalRef.current) return;

    // Destroy stale instance if re-rendered
    if (xtermRef.current) {
      xtermRef.current.dispose();
    }

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'block',
      fontSize: 13,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#0F172A', // Slate 900
        foreground: '#F8FAFC',
        cursor: '#38BDF8',
        selectionBackground: '#1E293B',
        black: '#000000',
        red: '#EF4444',
        green: '#22C55E',
        yellow: '#F59E0B',
        blue: '#3B82F6',
        magenta: '#EC4899',
        cyan: '#06B6D4',
        white: '#FFFFFF',
      },
      rows: 18,
      convertEol: true
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Welcome banner
    term.writeln('\x1b[1;34m=================================================================\x1b[0m');
    term.writeln('\x1b[1;36m   CyberEmpireX Safe Browser Terminal Lab (Termux Environment)\x1b[0m');
    term.writeln('\x1b[1;34m=================================================================\x1b[0m');
    term.writeln('\x1b[32m[+] Isolated execution engine active. Zero host or server exposure.\x1b[0m');
    term.writeln('\x1b[90mType "help" for a list of available Linux CLI tools or choose a lab.\x1b[0m\n');

    term.write(getPromptString('/home/user'));

    // Handle Keyboard Input
    let lineBuffer = '';

    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Enter key
      if (code === 13) {
        processCommand(term, lineBuffer);
        lineBuffer = '';
        setCurrentInput('');
      } 
      // Backspace
      else if (code === 127) {
        if (lineBuffer.length > 0) {
          lineBuffer = lineBuffer.slice(0, -1);
          setCurrentInput(lineBuffer);
          term.write('\b \b');
        }
      } 
      // Ctrl+C
      else if (code === 3) {
        term.writeln('^C');
        lineBuffer = '';
        setCurrentInput('');
        term.write(getPromptString(currentDir));
      }
      // Printable characters
      else if (code >= 32 && code <= 126) {
        lineBuffer += data;
        setCurrentInput(lineBuffer);
        term.write(data);
      }
    });

    // Auto-fit terminal on container resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };
    window.addEventListener('resize', handleResize);

    // Run initial command if passed as prop
    if (initialCommand) {
      setTimeout(() => {
        term.write(initialCommand);
        lineBuffer = initialCommand;
        setCurrentInput(initialCommand);
      }, 300);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  // Run a command directly when user clicks "Run" button from guided exercises
  const executeDirectCommand = (cmd: string) => {
    if (xtermRef.current) {
      xtermRef.current.write(cmd);
      processCommand(xtermRef.current, cmd);
      setCurrentInput('');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Header Banner */}
      <div className="bg-[#2563EB] text-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Isolated Sandbox
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Client-Side Safe</span>
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <TerminalIcon className="w-6 h-6 text-blue-100" />
              <span>CyberEmpireX Integrated Terminal Lab</span>
            </h1>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
              Browser-isolated Linux & Termux shell engine powered by xterm.js. Practice Linux CLI navigation, package management, scripting, and safe command debugging without exposing server credentials or infrastructure.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setView('learning-beginner')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Course Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Terminal Lab Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Terminal Shell Window & Control Actions */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Terminal Window Frame */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
            
            {/* Window Titlebar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                  termux@cyberempirex:~ {currentDir.replace('/home/user', '~')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  xterm.js Active
                </span>
              </div>
            </div>

            {/* xterm.js Container */}
            <div className="p-3 bg-[#0F172A] min-h-[380px]">
              <div ref={terminalRef} className="w-full h-full" />
            </div>

            {/* Terminal Quick Control Actions Bar */}
            <div className="bg-slate-900/90 px-4 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                {/* Clear Terminal */}
                <button
                  onClick={handleClearTerminal}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Clear terminal screen"
                >
                  <Eraser className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clear Screen</span>
                </button>

                {/* Reset Session */}
                <button
                  onClick={handleResetSession}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-amber-950/60 text-amber-300 border border-amber-900/40 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Reset virtual file system and terminal state"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reset Session</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {/* Hint Button */}
                <button
                  onClick={() => setHintVisible(!hintVisible)}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
                    hintVisible 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{hintVisible ? 'Hide Hint' : 'Show Hint'}</span>
                </button>

                {/* AI Explain Button */}
                <button
                  onClick={() => handleInspectCommand()}
                  className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-100" />
                  <span>AI Explain</span>
                </button>
              </div>
            </div>

          </div>

          {/* Hint Card Box */}
          {hintVisible && activeLab && activeLab.tasks[activeTaskIndex] && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs space-y-1.5 animate-in slide-in-from-top-2">
              <div className="flex items-center space-x-2 font-bold text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Task Hint ({activeLab.title})</span>
              </div>
              <p className="leading-relaxed">
                {activeLab.tasks[activeTaskIndex].hint}
              </p>
            </div>
          )}

          {/* Command Error Safety Note */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-xs text-[#6B7280] space-y-1">
            <div className="flex items-center space-x-2 font-bold text-[#111827]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side Isolated Execution Guarantee</span>
            </div>
            <p className="leading-relaxed">
              All commands run inside an in-memory virtual machine. Network scans, package installations, and script runs affect only this browser tab.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Guided Exercises & Lab Modules */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Lab Selector Tabs */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-sm font-bold text-[#111827]">Guided Lab Exercises</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#EEF4FF] px-2.5 py-0.5 rounded-full border border-blue-200">
                {completedTaskIndices.length} / {activeLab.tasks.length} Tasks Done
              </span>
            </div>

            {/* Select Active Guided Lab */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111827]">Choose Exercise Module:</label>
              <select
                value={activeLabId}
                onChange={(e) => {
                  setActiveLabId(e.target.value);
                  setActiveTaskIndex(0);
                  setCompletedTaskIndices([]);
                  setHintVisible(false);
                }}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#2563EB]"
              >
                {GUIDED_LABS.map(lab => (
                  <option key={lab.id} value={lab.id}>
                    [{lab.difficulty}] {lab.title} ({lab.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Lab Overview */}
            <div className="p-3.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111827]">{activeLab.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-[#E5E7EB] text-[#2563EB] rounded font-bold">
                  {activeLab.difficulty}
                </span>
              </div>
              <p className="text-[#6B7280] leading-relaxed">{activeLab.summary}</p>
            </div>

            {/* Step-by-Step Interactive Tasks */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider font-mono text-[10px] text-[#6B7280]">
                Interactive Tasks:
              </h4>

              {activeLab.tasks.map((task, idx) => {
                const isCompleted = completedTaskIndices.includes(idx);
                const isActive = activeTaskIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all text-xs space-y-2 ${
                      isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : isActive
                        ? 'bg-[#EEF4FF] border-[#2563EB] shadow-2xs'
                        : 'bg-[#F8FAFC] border-[#E5E7EB] opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            isActive ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-slate-300 text-slate-400'
                          }`}>
                            {idx + 1}
                          </div>
                        )}
                        <span className={`font-semibold ${isCompleted ? 'text-emerald-900 line-through' : 'text-[#111827]'}`}>
                          {task.description}
                        </span>
                      </div>
                    </div>

                    {/* Quick Command Execution Suggestion */}
                    <div className="flex items-center justify-between pt-1">
                      <code className="text-[11px] font-mono text-[#2563EB] font-bold bg-white px-2 py-1 rounded border border-[#E5E7EB]">
                        {typeof task.expectedCmd === 'string' 
                          ? task.expectedCmd 
                          : task.expectedCmd.source.replace('^', '').replace('$', '').replace('\\', '')}
                      </code>

                      <button
                        onClick={() => {
                          const sampleCmd = typeof task.expectedCmd === 'string'
                            ? task.expectedCmd
                            : (task.hint.match(/`([^`]+)`/) || [])[1] || 'pwd';
                          executeDirectCommand(sampleCmd);
                        }}
                        className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-lg text-[10px] font-mono flex items-center space-x-1 transition-all cursor-pointer shadow-2xs"
                      >
                        <Play className="w-3 h-3" />
                        <span>Run Command</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* CEX Visual Vocabulary Assets */}
          <div className="space-y-4">
            <FilesystemTreeVisual />
            <LinuxPackageSymbol pkgName="nmap-termux-core" hash="sha256:7f8a19b..." />
            <GitRepositoryMark />
          </div>

        </div>

      </div>

      {/* AI COMMAND INSPECTOR MODAL */}
      {isAiExplainModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center space-x-2.5 text-[#2563EB]">
                <div className="p-2 rounded-xl bg-[#EEF4FF] border border-blue-200">
                  <Sparkles className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827]">AI Command Inspector</h3>
                  <p className="text-xs text-[#6B7280]">Syntax & Safety Breakdown</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiExplainModalOpen(false)}
                className="p-1 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {aiLoading ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-[#6B7280] font-medium">Analyzing command syntax with Gemini AI...</p>
              </div>
            ) : aiBreakdownData ? (
              <div className="space-y-4 text-xs">
                
                <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-[#2563EB] font-bold">
                  $ {aiBreakdownData.command}
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-[#111827]">Summary:</span>
                  <p className="text-[#6B7280] leading-relaxed">{aiBreakdownData.summary}</p>
                </div>

                {aiBreakdownData.parts && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-[#111827]">Parameter Breakdown:</span>
                    <div className="space-y-1.5">
                      {aiBreakdownData.parts.map((pt: any, i: number) => (
                        <div key={i} className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-start space-x-2">
                          <code className="text-[11px] font-mono text-[#2563EB] font-bold bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB] shrink-0">
                            {pt.part}
                          </code>
                          <span className="text-[#6B7280] text-[11px] leading-relaxed">{pt.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aiBreakdownData.safetyTip && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 space-y-1">
                    <span className="font-bold text-emerald-900 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>White-Hat Guidelines</span>
                    </span>
                    <p className="text-[11px] leading-relaxed">{aiBreakdownData.safetyTip}</p>
                  </div>
                )}

              </div>
            ) : null}

            <div className="pt-2 border-t border-[#E5E7EB] flex justify-end">
              <button
                onClick={() => setIsAiExplainModalOpen(false)}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
