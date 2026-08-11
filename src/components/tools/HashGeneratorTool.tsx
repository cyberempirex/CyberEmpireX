import React, { useState, useEffect } from 'react';
import { Copy, Check, Hash, CheckCircle2, AlertTriangle } from 'lucide-react';

export const HashGeneratorTool: React.FC = () => {
  const [inputText, setInputText] = useState('CyberEmpireX Open Source Platform 2026');
  const [uppercase, setUppercase] = useState(false);
  const [compareHash, setCompareHash] = useState('');
  const [copiedAlgo, setCopiedAlgo] = useState<string | null>(null);

  const [hashes, setHashes] = useState<{
    sha256: string;
    sha512: string;
    sha384: string;
    sha1: string;
    md5: string;
  }>({
    sha256: '',
    sha512: '',
    sha384: '',
    sha1: '',
    md5: ''
  });

  // Calculate hashes asynchronously
  useEffect(() => {
    let isMounted = true;

    async function computeAll() {
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      try {
        // Web Crypto API algorithms
        const buf256 = await window.crypto.subtle.digest('SHA-256', data);
        const buf512 = await window.crypto.subtle.digest('SHA-512', data);
        const buf384 = await window.crypto.subtle.digest('SHA-384', data);
        const buf1 = await window.crypto.subtle.digest('SHA-1', data);

        const hex256 = Array.from(new Uint8Array(buf256)).map(b => b.toString(16).padStart(2, '0')).join('');
        const hex512 = Array.from(new Uint8Array(buf512)).map(b => b.toString(16).padStart(2, '0')).join('');
        const hex384 = Array.from(new Uint8Array(buf384)).map(b => b.toString(16).padStart(2, '0')).join('');
        const hex1 = Array.from(new Uint8Array(buf1)).map(b => b.toString(16).padStart(2, '0')).join('');
        const md5Val = computeMd5(inputText);

        if (isMounted) {
          setHashes({
            sha256: hex256,
            sha512: hex512,
            sha384: hex384,
            sha1: hex1,
            md5: md5Val
          });
        }
      } catch (err) {
        console.error('Hash calculation error:', err);
      }
    }

    computeAll();

    return () => {
      isMounted = false;
    };
  }, [inputText]);

  // Simple MD5 implementation for standard string hashing
  function computeMd5(string: string): string {
    function rotateLeft(lValue: number, iShiftBits: number) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function addUnsigned(lX: number, lY: number) {
      const lX4 = (lX & 0x40000000) ? 1 : 0;
      const lY4 = (lY & 0x40000000) ? 1 : 0;
      const lX8 = (lX & 0x80000000) ? 1 : 0;
      const lY8 = (lY & 0x80000000) ? 1 : 0;
      const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
      return (lResult ^ lX8 ^ lY8);
    }
    function F(x: number, y: number, z: number) { return (x & y) | ((~x) & z); }
    function G(x: number, y: number, z: number) { return (x & z) | (y & (~z)); }
    function H(x: number, y: number, z: number) { return (x ^ y ^ z); }
    function I(x: number, y: number, z: number) { return (y ^ (x | (~z))); }

    function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(str: string) {
      let lMessageLength = str.length;
      let lNumberOfWords_temp1 = lMessageLength + 8;
      let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      let lWordArray = Array(lNumberOfWords - 1);
      let lBytePosition = 0;
      let lByteCount = 0;
      while (lByteCount < lMessageLength) {
        let lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
      }
      let lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    }

    function wordToHex(lValue: number) {
      let WordToHexValue = '', WordToHexValue_temp = '', lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = '0' + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
    }

    let x = convertToWordArray(string);
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    let S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    let S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    let S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
      AA = a; BB = b; CC = c; DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756); c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A); c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF); c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193); c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
      a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340); c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], S22, 0x2441453); c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6); c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
      a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8); c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
      a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681); c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
      a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9); c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA); c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5); c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
      a = II(a, b, c, d, x[k + 0], S41, 0xF4292244); d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97); c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92); c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0); c = II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
      a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }

  const formatHash = (str: string) => (uppercase ? str.toUpperCase() : str.toLowerCase());

  const handleCopy = (algoName: string, text: string) => {
    navigator.clipboard.writeText(formatHash(text));
    setCopiedAlgo(algoName);
    setTimeout(() => setCopiedAlgo(null), 2000);
  };

  const isMatching = (hashVal: string) => {
    if (!compareHash.trim()) return null;
    return formatHash(hashVal) === compareHash.trim().toLowerCase() || formatHash(hashVal) === compareHash.trim().toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Input string area */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-[#111827]">Input Text / Payload</label>
          <label className="flex items-center space-x-2 text-xs font-medium text-[#6B7280] cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-3.5 h-3.5 text-[#2563EB] rounded focus:ring-0"
            />
            <span>UPPERCASE Output</span>
          </label>
        </div>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste plain text string to compute hashes..."
          className="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] font-mono"
        />
      </div>

      {/* Hash Verification / Compare Input */}
      <div className="p-4 bg-[#2563EB] text-white border border-blue-400/30 rounded-2xl space-y-2 shadow-sm">
        <label className="text-xs font-semibold text-blue-100 block">Compare Checksum (Optional Verification)</label>
        <input
          type="text"
          value={compareHash}
          onChange={(e) => setCompareHash(e.target.value)}
          placeholder="Paste expected hash to verify match..."
          className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-xs text-[#111827] font-mono focus:outline-none"
        />
      </div>

      {/* Generated Hashes List */}
      <div className="space-y-3">
        {[
          { name: 'SHA-256', val: hashes.sha256, bits: '256 bits (32 bytes)' },
          { name: 'SHA-512', val: hashes.sha512, bits: '512 bits (64 bytes)' },
          { name: 'SHA-384', val: hashes.sha384, bits: '384 bits (48 bytes)' },
          { name: 'SHA-1', val: hashes.sha1, bits: '160 bits (Legacy)' },
          { name: 'MD5', val: hashes.md5, bits: '128 bits (Checksum)' }
        ].map((algo) => {
          const matched = isMatching(algo.val);
          return (
            <div key={algo.name} className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#111827] font-mono">{algo.name}</span>
                  <span className="text-[10px] text-[#6B7280] font-mono">({algo.bits})</span>
                </div>
                {matched === true && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Exact Match</span>
                  </span>
                )}
                {matched === false && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    <span>Mismatch</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <code className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] font-mono break-all select-all">
                  {formatHash(algo.val) || 'Computing...'}
                </code>
                <button
                  onClick={() => handleCopy(algo.name, algo.val)}
                  className="p-2.5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] rounded-lg transition-all cursor-pointer shadow-2xs"
                  title="Copy Hash"
                >
                  {copiedAlgo === algo.name ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB]" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
