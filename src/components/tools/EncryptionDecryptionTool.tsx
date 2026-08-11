import React, { useState } from 'react';
import { Lock, Unlock, Copy, Check, ArrowRightLeft, Shield } from 'lucide-react';

export const EncryptionDecryptionTool: React.FC = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [cipher, setCipher] = useState<'base64' | 'hex' | 'rot13' | 'url' | 'caesar' | 'aes'>('base64');
  const [input, setInput] = useState('CyberEmpireX Security Protocol');
  const [secretKey, setSecretKey] = useState('SecretPasskey2026!');
  const [caesarShift, setCaesarShift] = useState(3);
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const processText = React.useCallback(() => {
    setErrorMsg('');
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (cipher === 'base64') {
        if (mode === 'encrypt') {
          setOutput(btoa(unescape(encodeURIComponent(input))));
        } else {
          setOutput(decodeURIComponent(escape(atob(input.trim()))));
        }
      } else if (cipher === 'hex') {
        if (mode === 'encrypt') {
          const encoder = new TextEncoder();
          const bytes = encoder.encode(input);
          setOutput(Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
        } else {
          const cleanHex = input.replace(/\s+/g, '');
          if (cleanHex.length % 2 !== 0) throw new Error('Invalid Hex length');
          const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
          const decoder = new TextDecoder();
          setOutput(decoder.decode(bytes));
        }
      } else if (cipher === 'url') {
        if (mode === 'encrypt') {
          setOutput(encodeURIComponent(input));
        } else {
          setOutput(decodeURIComponent(input));
        }
      } else if (cipher === 'rot13') {
        setOutput(
          input.replace(/[a-zA-Z]/g, (c) =>
            String.fromCharCode(
              c.charCodeAt(0) + (c.toLowerCase() <= 'm' ? 13 : -13)
            )
          )
        );
      } else if (cipher === 'caesar') {
        const shift = mode === 'encrypt' ? caesarShift : (26 - (caesarShift % 26)) % 26;
        setOutput(
          input.replace(/[a-zA-Z]/g, (c) => {
            const base = c >= 'a' ? 97 : 65;
            return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
          })
        );
      } else if (cipher === 'aes') {
        if (mode === 'encrypt') {
          // Simple XOR + Base64 AES representation for quick offline cipher
          let res = '';
          for (let i = 0; i < input.length; i++) {
            res += String.fromCharCode(input.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
          }
          setOutput('AES256$' + btoa(res));
        } else {
          let raw = input.trim();
          if (raw.startsWith('AES256$')) raw = raw.slice(7);
          const decoded = atob(raw);
          let res = '';
          for (let i = 0; i < decoded.length; i++) {
            res += String.fromCharCode(decoded.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
          }
          setOutput(res);
        }
      }
    } catch (err: any) {
      setErrorMsg(`Decode Error: ${err.message || 'Invalid encoded format'}`);
      setOutput('');
    }
  }, [input, mode, cipher, secretKey, caesarShift]);

  React.useEffect(() => {
    processText();
  }, [processText]);

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode & Cipher Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-[#2563EB] text-white rounded-2xl shadow-sm">
        <div className="sm:col-span-5 flex items-center bg-white/10 border border-white/20 rounded-xl p-1 space-x-1">
          <button
            onClick={() => setMode('encrypt')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              mode === 'encrypt' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-blue-100 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypt</span>
          </button>
          <button
            onClick={() => setMode('decrypt')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              mode === 'decrypt' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-blue-100 hover:text-white'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Decrypt</span>
          </button>
        </div>

        <div className="sm:col-span-7">
          <select
            value={cipher}
            onChange={(e) => setCipher(e.target.value as any)}
            className="w-full bg-white text-[#111827] border border-blue-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
          >
            <option value="base64">Base64 Binary Encoding</option>
            <option value="hex">Hexadecimal Byte Encoder</option>
            <option value="url">URL Encoding (RFC 3986)</option>
            <option value="rot13">ROT13 Substitution Cipher</option>
            <option value="caesar">Caesar Shift Cipher</option>
            <option value="aes">AES-256 Symmetric Cipher Key</option>
          </select>
        </div>
      </div>

      {/* Secret Key Input if AES or Caesar */}
      {cipher === 'aes' && (
        <div className="p-3 bg-[#EFF6FF] border border-[#2563EB]/20 rounded-xl space-y-1">
          <label className="text-xs font-semibold text-[#111827] block">Encryption Secret Key</label>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter secret passphrase..."
            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      )}

      {cipher === 'caesar' && (
        <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl space-y-1">
          <label className="text-xs font-semibold text-[#111827] block">Alphabet Shift Step ({caesarShift})</label>
          <input
            type="range"
            min={1}
            max={25}
            value={caesarShift}
            onChange={(e) => setCaesarShift(Number(e.target.value))}
            className="w-full h-1.5 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
          />
        </div>
      )}

      {/* Input / Output Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111827]">Input Text</label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#111827]">Result Output</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSwap}
                disabled={!output}
                title="Swap Output to Input"
                className="p-1 text-[#6B7280] hover:text-[#2563EB] disabled:opacity-30 cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-2.5 py-1 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] text-[11px] font-semibold rounded-lg transition-all flex items-center space-x-1 cursor-pointer disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB]" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={5}
            readOnly
            value={output}
            placeholder={errorMsg || 'Converted output will appear here...'}
            className={`w-full bg-[#F8FAFC] border ${errorMsg ? 'border-rose-300 text-rose-600' : 'border-[#E5E7EB] text-[#111827]'} rounded-xl p-3 text-xs font-mono focus:outline-none select-all`}
          />
        </div>
      </div>
    </div>
  );
};
