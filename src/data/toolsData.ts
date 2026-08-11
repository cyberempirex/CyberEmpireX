import { ViewMode } from '../types';

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: 'Generators' | 'Encryption / Decryption' | 'IP / Domain Lookup' | 'Network Tools';
  icon: string; // Lucide icon identifier
  isLocal: boolean;
  tags: string[];
  popular?: boolean;
}

export const TOOL_CATEGORIES = [
  'Generators',
  'Encryption / Decryption',
  'IP / Domain Lookup',
  'Network Tools'
] as const;

export type ToolCategory = typeof TOOL_CATEGORIES[number];

export const ALL_TOOLS: ToolDefinition[] = [
  // Generators
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Generate high-contrast, downloadable vector QR codes for URLs, WiFi networks, and crypto addresses.',
    category: 'Generators',
    icon: 'QrCode',
    isLocal: true,
    tags: ['SVG', 'PNG', 'Offline', 'vCard', 'WiFi'],
    popular: true
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Cryptographically strong random password generator with entropy bit analysis and custom rule parameters.',
    category: 'Generators',
    icon: 'KeyRound',
    isLocal: true,
    tags: ['Entropy', 'WebCrypto', 'High-Security', 'Custom Rules'],
    popular: true
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Compute cryptographic message digests (SHA-256, SHA-512, SHA-384, SHA-1, MD5, RIPEMD160).',
    category: 'Generators',
    icon: 'Hash',
    isLocal: true,
    tags: ['SHA256', 'SHA512', 'MD5', 'Checksum'],
    popular: true
  },
  {
    id: 'token-generator',
    title: 'Token Generator',
    description: 'Generate secure API keys, OAuth secrets, UUID v4, Bearer tokens, Base64 keys, and HMAC signatures.',
    category: 'Generators',
    icon: 'Key',
    isLocal: true,
    tags: ['UUIDv4', 'API Key', 'JWT Secret', 'Hex'],
    popular: false
  },

  // Encryption / Decryption
  {
    id: 'encryption-decryption',
    title: 'Encryption / Decryption',
    description: 'Multi-cipher engine supporting AES-256-GCM, Base64, ROT13, Caesar Cipher, Hex, and URL Encoding.',
    category: 'Encryption / Decryption',
    icon: 'Lock',
    isLocal: true,
    tags: ['AES-256', 'Base64', 'ROT13', 'Hex', 'URL'],
    popular: true
  },

  // IP / Domain Lookup
  {
    id: 'ip-domain-lookup',
    title: 'IP / Domain Lookup',
    description: 'Inspect IP geolocation, ASN information, host reputation, subnet masks, and ISP network provider.',
    category: 'IP / Domain Lookup',
    icon: 'Globe',
    isLocal: false,
    tags: ['GeoIP', 'ASN', 'ISP', 'Host Info'],
    popular: true
  },

  // Network Tools
  {
    id: 'dns-lookup',
    title: 'DNS Lookup',
    description: 'Query authoritative DNS zone records (A, AAAA, MX, TXT, NS, SOA, CNAME, CAA) with response TTLs.',
    category: 'Network Tools',
    icon: 'Search',
    isLocal: false,
    tags: ['A Record', 'MX', 'TXT', 'SPF', 'DKIM'],
    popular: true
  },
  {
    id: 'whois-lookup',
    title: 'WHOIS Lookup',
    description: 'Fetch domain registrar details, registration timestamps, expiration countdown, and nameserver delegation.',
    category: 'Network Tools',
    icon: 'FileSearch',
    isLocal: false,
    tags: ['Registrar', 'RDAP', 'Domain Info', 'Expiration'],
    popular: false
  },
  {
    id: 'reverse-dns',
    title: 'Reverse DNS',
    description: 'Perform reverse PTR record queries for IPv4 and IPv6 addresses to resolve canonical hostnames.',
    category: 'Network Tools',
    icon: 'ArrowLeftRight',
    isLocal: false,
    tags: ['PTR Record', 'IPv4', 'IPv6', 'Hostname'],
    popular: false
  },
  {
    id: 'ssl-checker',
    title: 'SSL Certificate Checker',
    description: 'Inspect SSL/TLS certificate validity, SAN alternative names, issuer CA, expiration warnings, and TLS version.',
    category: 'Network Tools',
    icon: 'ShieldCheck',
    isLocal: false,
    tags: ['TLS 1.3', 'X.509', 'Issuer', 'Expiry Warning'],
    popular: true
  }
];
