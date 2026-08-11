import { Challenge } from '../types';

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'ctf-01-perm',
    title: 'Level 1: Executable Access Denied',
    difficulty: 'Easy',
    category: 'Termux CLI',
    points: 100,
    scenario: 'You downloaded a security audit script `check_ports.sh` into Termux, but when running `./check_ports.sh` you get "Permission denied".',
    objective: 'What command fixes permission denied so you can run the script?',
    targetHint: 'Think about modifying file execution bits (+x).',
    expectedCommandOrAnswer: 'chmod +x check_ports.sh',
    explanation: '`chmod +x check_ports.sh` adds the execution bit to the file permission mode, allowing the shell to run it.',
    badge: 'Permission Specialist'
  },
  {
    id: 'ctf-02-nmap',
    title: 'Level 2: Stealth Port Identification',
    difficulty: 'Easy',
    category: 'Reconnaissance',
    points: 150,
    scenario: 'You are conducting an authorized reconnaissance scan against `target.lab`. You need to quickly discover open ports and active service versions on port 80 and 443.',
    objective: 'Which Nmap command format checks ports 80 and 443 with service version detection?',
    targetHint: 'Use -sV for version detection and -p to specify ports.',
    expectedCommandOrAnswer: 'nmap -sV -p 80,443 target.lab',
    explanation: '`nmap -sV -p 80,443 target.lab` probes ports 80 and 443 specifically and queries service banners for version details.',
    badge: 'Recon Specialist'
  },
  {
    id: 'ctf-03-storage',
    title: 'Level 3: Android Storage Link',
    difficulty: 'Easy',
    category: 'Termux Setup',
    points: 100,
    scenario: 'You created a script output log in Termux, but want to copy it to your Android phone Downloads folder (`/sdcard/Download`).',
    objective: 'What Termux command creates the required storage symlink in your home folder?',
    targetHint: 'It starts with termux-setup-...',
    expectedCommandOrAnswer: 'termux-setup-storage',
    explanation: '`termux-setup-storage` prompts for storage access and creates `~/storage/downloads` pointing to `/sdcard/Download`.',
    badge: 'Termux Pioneer'
  },
  {
    id: 'ctf-04-alias',
    title: 'Level 4: Termux Shorthand Alias',
    difficulty: 'Medium',
    category: 'Bash Customization',
    points: 200,
    scenario: 'You want to create a shorthand command `cls` that clears the Termux screen every time you type `cls`.',
    objective: 'What bash alias syntax line should be added to `~/.bashrc`?',
    targetHint: 'alias command_name=\'original_command\'',
    expectedCommandOrAnswer: 'alias cls=\'clear\'',
    explanation: '`alias cls=\'clear\'` maps the custom command `cls` to run `clear`.',
    badge: 'Script Master'
  },
  {
    id: 'ctf-05-headers',
    title: 'Level 5: HTTP Security Header Inspection',
    difficulty: 'Medium',
    category: 'Web Security',
    points: 250,
    scenario: 'You are auditing a web app at `https://secure.app`. You want to view the server response HTTP headers (X-Frame-Options, Content-Security-Policy) using Curl without fetching the HTML body.',
    objective: 'What curl command fetches only the HEAD response headers?',
    targetHint: 'Use the capital -I flag.',
    expectedCommandOrAnswer: 'curl -I https://secure.app',
    explanation: '`curl -I https://secure.app` sends an HTTP HEAD request and prints out only response headers.',
    badge: 'Web Pentester'
  }
];
