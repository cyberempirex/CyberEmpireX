import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Key, Shield } from 'lucide-react';

export const TokenGeneratorTool: React.FC = () => {
  const [tokenType, setTokenType] = useState<'uuid' | 'apiKey' | 'hexSecret' | 'base64Secret' | 'jwt'>('uuid');
  const [quantity, setQuantity] = useState(3);
  const [tokens, setTokens] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateTokens = () => {
    const list: string[] = [];

    for (let i = 0; i < quantity; i++) {
      if (tokenType === 'uuid') {
        list.push(crypto.randomUUID());
      } else if (tokenType === 'apiKey') {
        const bytes = new Uint8Array(24);
        crypto.getRandomValues(bytes);
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        list.push(`cx_live_${hex}`);
      } else if (tokenType === 'hexSecret') {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        list.push(Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
      } else if (tokenType === 'base64Secret') {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        list.push(btoa(String.fromCharCode(...bytes)));
      } else if (tokenType === 'jwt') {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({ sub: `user_${Math.floor(1000 + Math.random() * 9000)}`, role: 'sec_admin', iat: Math.floor(Date.now() / 1000) }));
        const sig = 'cx_' + btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)))).replace(/=/g, '');
        list.push(`${header}.${payload}.${sig}`);
      }
    }
    setTokens(list);
  };

  React.useEffect(() => {
    generateTokens();
  }, [tokenType, quantity]);

  const handleCopySingle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(tokens.join('\n'));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 space-y-1">
          <label className="text-xs font-semibold text-[#111827]">Token Type Specification</label>
          <select
            value={tokenType}
            onChange={(e) => setTokenType(e.target.value as any)}
            className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
          >
            <option value="uuid">UUID v4 (RFC 4122 Standard)</option>
            <option value="apiKey">Platform API Key (cx_live_...)</option>
            <option value="hexSecret">256-bit Hex Secret Key (64 hex chars)</option>
            <option value="base64Secret">256-bit Base64 Encoded Secret</option>
            <option value="jwt">Mock Signed JWT Web Token Format</option>
          </select>
        </div>

        <div className="sm:col-span-4 space-y-1">
          <label className="text-xs font-semibold text-[#111827]">Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
          >
            <option value={1}>1 Token</option>
            <option value={3}>3 Tokens</option>
            <option value={5}>5 Tokens</option>
            <option value={10}>10 Tokens</option>
          </select>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex items-center justify-between p-4 bg-[#2563EB] text-white rounded-2xl shadow-sm">
        <span className="text-xs font-mono font-bold text-blue-100">
          Cryptographically Secure Output ({tokens.length})
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={generateTokens}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 cursor-pointer border border-white/20"
          >
            <RefreshCw className="w-3.5 h-3.5 text-white" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 bg-white hover:bg-blue-50 text-[#2563EB] text-xs font-bold rounded-lg transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
          >
            {copiedIndex === -1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB]" />}
            <span>{copiedIndex === -1 ? 'Copied All' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      {/* Generated list */}
      <div className="space-y-2.5">
        {tokens.map((tok, idx) => (
          <div key={idx} className="flex items-center space-x-2 p-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs text-[#111827]">
            <span className="text-[10px] text-[#2563EB] font-bold w-6">{idx + 1}.</span>
            <input
              type="text"
              readOnly
              value={tok}
              className="w-full bg-transparent border-none focus:outline-none truncate select-all text-[#111827]"
            />
            <button
              onClick={() => handleCopySingle(tok, idx)}
              className="p-1.5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] rounded-lg transition-all cursor-pointer shadow-2xs shrink-0"
              title="Copy"
            >
              {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB]" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
