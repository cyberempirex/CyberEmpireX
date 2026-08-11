import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    const u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const l = 'abcdefghijklmnopqrstuvwxyz';
    const n = '0123456789';
    const s = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (useUpper) chars += u;
    if (useLower) chars += l;
    if (useNumbers) chars += n;
    if (useSymbols) chars += s;

    if (excludeAmbiguous) {
      chars = chars.replace(/[Il1O0]/g, '');
    }

    if (!chars) {
      setPassword('');
      return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate entropy in bits = length * log2(poolSize)
  const getPoolSize = () => {
    let count = 0;
    if (useUpper) count += 26;
    if (useLower) count += 26;
    if (useNumbers) count += 10;
    if (useSymbols) count += 26;
    if (excludeAmbiguous) count -= 5;
    return Math.max(1, count);
  };

  const poolSize = getPoolSize();
  const entropyBits = Math.round(length * Math.log2(poolSize));

  const getStrengthBadge = () => {
    if (entropyBits < 40) return { label: 'Weak', color: 'bg-rose-100 text-rose-700 border-rose-200' };
    if (entropyBits < 70) return { label: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    if (entropyBits < 100) return { label: 'Strong', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    return { label: 'Military-Grade (100+ bits)', color: 'bg-blue-100 text-blue-800 border-blue-200' };
  };

  const strength = getStrengthBadge();

  return (
    <div className="space-y-6">
      {/* Generated Output Display Box in Rich Blue */}
      <div className="p-5 bg-[#2563EB] text-white border border-blue-400/30 rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-blue-100">Generated Password</span>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${strength.color}`}>
            {strength.label} ({entropyBits} bits entropy)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={password || 'Select at least one character set'}
            className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold text-[#111827] focus:outline-none tracking-wider select-all shadow-inner"
          />
          <button
            onClick={generatePassword}
            title="Regenerate"
            className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all cursor-pointer shadow-2xs border border-white/20"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-white hover:bg-blue-50 text-[#2563EB] text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm whitespace-nowrap"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#2563EB]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-4">
        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[#111827]">
            <span>Password Length</span>
            <span className="font-mono text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#2563EB]/20">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#6B7280]">
            <span>6 (Short)</span>
            <span>32 (Standard)</span>
            <span>64 (Vault)</span>
            <span>128 (Max)</span>
          </div>
        </div>

        {/* Character Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-center space-x-2.5 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#2563EB]/40 transition-all">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="w-4 h-4 text-[#2563EB] rounded focus:ring-0 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-semibold text-[#111827] block">Uppercase Letters</span>
              <span className="text-[#6B7280] font-mono text-[10px]">A-Z</span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#2563EB]/40 transition-all">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="w-4 h-4 text-[#2563EB] rounded focus:ring-0 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-semibold text-[#111827] block">Lowercase Letters</span>
              <span className="text-[#6B7280] font-mono text-[10px]">a-z</span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#2563EB]/40 transition-all">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="w-4 h-4 text-[#2563EB] rounded focus:ring-0 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-semibold text-[#111827] block">Numeric Digits</span>
              <span className="text-[#6B7280] font-mono text-[10px]">0-9</span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#2563EB]/40 transition-all">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="w-4 h-4 text-[#2563EB] rounded focus:ring-0 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-semibold text-[#111827] block">Special Symbols</span>
              <span className="text-[#6B7280] font-mono text-[10px]">!@#$%^&amp;*()_+-=</span>
            </div>
          </label>
        </div>

        <label className="flex items-center space-x-2.5 p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={excludeAmbiguous}
            onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            className="w-4 h-4 text-[#2563EB] rounded focus:ring-0 cursor-pointer"
          />
          <span className="text-xs font-medium text-[#111827]">
            Exclude Ambiguous Characters (e.g. <code className="bg-white px-1 border rounded">I, l, 1, O, 0</code>)
          </span>
        </label>
      </div>
    </div>
  );
};
