import { TermuxCommand } from '../types';

export const TERMUX_COMMANDS: TermuxCommand[] = [
  {
    id: 'cmd-pkg-update',
    name: 'Package Manager Update',
    command: 'pkg update && pkg upgrade -y',
    category: 'Package Manager',
    shortDesc: 'Update Termux package repositories and upgrade all installed packages.',
    detailedDesc: 'Syncs package list index from Termux mirrors and upgrades outdated software to current stable releases.',
    syntax: 'pkg update && pkg upgrade [-y]',
    examples: [
      { cmd: 'pkg update && pkg upgrade -y', note: 'Silently answer yes to all prompts during upgrade' }
    ],
    tags: ['pkg', 'update', 'upgrade', 'install', 'apt']
  },
  {
    id: 'cmd-termux-setup-storage',
    name: 'Setup Internal Storage Link',
    command: 'termux-setup-storage',
    category: 'Storage & System',
    shortDesc: 'Grant Android storage permissions and link /sdcard directories.',
    detailedDesc: 'Prompts Android runtime permission and creates ~/storage directory with symlinks to dcim, downloads, movies, music, and shared internal storage.',
    syntax: 'termux-setup-storage',
    examples: [
      { cmd: 'termux-setup-storage', note: 'Creates symlinks in ~/storage/' }
    ],
    tags: ['storage', 'sdcard', 'permission', 'download']
  },
  {
    id: 'cmd-nmap-scan',
    name: 'Nmap Quick Scan',
    command: 'nmap -sV -F <target-ip>',
    category: 'Network & Recon',
    shortDesc: 'Scan top 100 open ports and detect service versions.',
    detailedDesc: 'Network Mapper utility that probes specified host IP address for open TCP ports and determines active application versions.',
    syntax: 'nmap [flags] <target-ip-or-domain>',
    examples: [
      { cmd: 'nmap -sV -F scanme.nmap.org', note: 'Scan top 100 ports with version detection' },
      { cmd: 'nmap -p 80,443,8080 192.168.1.1', note: 'Scan specific web ports' }
    ],
    safetyWarning: 'Only scan hosts you own or have explicit written permission to audit.',
    tags: ['nmap', 'port', 'scan', 'recon', 'network', 'service']
  },
  {
    id: 'cmd-sqlmap-scan',
    name: 'SQLMap Database Enumeration',
    command: 'python sqlmap.py -u "<url>?id=1" --dbs',
    category: 'Web Exploitation',
    shortDesc: 'Automated test for GET parameter SQL injection vulnerabilities.',
    detailedDesc: 'Sends dynamic payloads to specified web endpoint parameter to test for SQLi and enumerate database schemas.',
    syntax: 'python sqlmap.py -u "<target-url>" [options]',
    examples: [
      { cmd: 'python sqlmap.py -u "http://target.com/page?id=1" --batch --dbs', note: 'Automated scan without manual prompts' }
    ],
    safetyWarning: 'Running SQLMap against unauthorized web applications is illegal.',
    tags: ['sqlmap', 'sqli', 'web', 'python', 'vulnerability']
  },
  {
    id: 'cmd-termux-vibrate',
    name: 'Termux API Device Vibration',
    command: 'termux-vibrate -d 1000',
    category: 'Termux API',
    shortDesc: 'Vibrate the Android hardware device for duration in ms.',
    detailedDesc: 'Invokes Termux:API addon to interact directly with hardware sensors and vibration motor.',
    syntax: 'termux-vibrate -d <milliseconds>',
    examples: [
      { cmd: 'termux-vibrate -d 500', note: 'Vibrate device for half a second' }
    ],
    tags: ['vibrate', 'api', 'android', 'hardware']
  },
  {
    id: 'cmd-termux-battery',
    name: 'Termux Battery Status JSON',
    command: 'termux-battery-status',
    category: 'Termux API',
    shortDesc: 'Get battery percentage, temperature, and charging status in JSON.',
    detailedDesc: 'Queries Android battery manager service and outputs real-time battery status object.',
    syntax: 'termux-battery-status',
    examples: [
      { cmd: 'termux-battery-status', note: 'Outputs percentage, health, and temperature' }
    ],
    tags: ['battery', 'android', 'json', 'api', 'hardware']
  },
  {
    id: 'cmd-curl-headers',
    name: 'Inspect HTTP Response Headers',
    command: 'curl -I https://target.com',
    category: 'Network & Recon',
    shortDesc: 'Fetch HTTP response headers to inspect security headers and server version.',
    detailedDesc: 'Sends a HEAD request to target server to reveal headers such as Server, Strict-Transport-Security, Content-Security-Policy, and Cookies.',
    syntax: 'curl -I [url]',
    examples: [
      { cmd: 'curl -I https://github.com', note: 'Display security headers for GitHub' }
    ],
    tags: ['curl', 'http', 'headers', 'web', 'recon']
  },
  {
    id: 'cmd-chmod-exec',
    name: 'Grant Script Execution Permission',
    command: 'chmod +x script.sh',
    category: 'Shell Utilities',
    shortDesc: 'Make shell, python, or binary files executable.',
    detailedDesc: 'Modifies POSIX file mode bits to enable execution flag (+x) for user, group, and others.',
    syntax: 'chmod +x <filename>',
    examples: [
      { cmd: 'chmod +x *.sh', note: 'Make all bash scripts in directory executable' }
    ],
    tags: ['chmod', 'permission', 'executable', 'bash']
  },
  {
    id: 'cmd-netstat-ports',
    name: 'List Active Network Connections',
    command: 'netstat -tuln',
    category: 'Network & Recon',
    shortDesc: 'Show listening TCP/UDP ports and sockets in Termux.',
    detailedDesc: 'Displays network status including listening sockets (-l), TCP (-t), UDP (-u), and numeric addresses (-n).',
    syntax: 'netstat [options]',
    examples: [
      { cmd: 'netstat -tuln', note: 'Display all listening ports on localhost' }
    ],
    tags: ['netstat', 'ports', 'tcp', 'udp', 'network']
  },
  {
    id: 'cmd-proot-distro',
    name: 'PRoot Linux Distribution Installer',
    command: 'pkg install proot-distro -y && proot-distro install ubuntu',
    category: 'Storage & System',
    shortDesc: 'Run complete Linux distros (Ubuntu, Kali, Arch) inside Termux without root.',
    detailedDesc: 'PRoot emulates chroot using ptrace, enabling full Linux distributions to run in userland inside Termux.',
    syntax: 'proot-distro install <distro-name>',
    examples: [
      { cmd: 'proot-distro login ubuntu', note: 'Start Ubuntu Linux container' }
    ],
    tags: ['proot', 'ubuntu', 'kali', 'arch', 'distro', 'chroot']
  }
];
