import React, { useState } from 'react';
import { Download, Copy, Check, RefreshCw, QrCode } from 'lucide-react';
import { generateQrSvg } from '../../lib/qrCode';

export const QrCodeTool: React.FC = () => {
  const [qrText, setQrText] = useState('https://cyberempirex.org');
  const [fgColor, setFgColor] = useState('#111827');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'url' | 'wifi' | 'text'>('url');

  // WiFi helper state
  const [wifiSsid, setWifiSsid] = useState('CyberEmpireX_Secure');
  const [wifiPass, setWifiPass] = useState('CyberSec2026!');
  const [wifiEnc, setWifiEnc] = useState('WPA');

  const getEffectiveText = () => {
    if (mode === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiEnc};P:${wifiPass};;`;
    }
    return qrText;
  };

  const svgContent = generateQrSvg(getEffectiveText(), 256, fgColor, bgColor);

  const handleCopySvg = () => {
    navigator.clipboard.writeText(svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-code-cyberempirex.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Input Mode Selector */}
      <div className="flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
        <button
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'url' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC]'
          }`}
        >
          URL Link
        </button>
        <button
          onClick={() => setMode('wifi')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'wifi' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC]'
          }`}
        >
          WiFi Network
        </button>
        <button
          onClick={() => setMode('text')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === 'text' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC]'
          }`}
        >
          Plain Text / Secret
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Inputs */}
        <div className="md:col-span-7 space-y-4">
          {mode === 'wifi' ? (
            <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB]">
              <div>
                <label className="text-xs font-semibold text-[#111827] block mb-1">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#111827] block mb-1">Password</label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#111827] block mb-1">Encryption</label>
                <select
                  value={wifiEnc}
                  onChange={(e) => setWifiEnc(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open (No Password)</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1">
                {mode === 'url' ? 'Target URL' : 'Text Content'}
              </label>
              <textarea
                rows={4}
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter URL, text, or crypto wallet address..."
                className="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] font-mono"
              />
              <span className="text-[10px] text-[#6B7280] mt-1 block">
                {qrText.length} characters entered
              </span>
            </div>
          )}

          {/* Color pickers */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-medium text-[#6B7280] block mb-1">Foreground Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-[#E5E7EB] cursor-pointer"
                />
                <span className="text-xs font-mono text-[#111827]">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] block mb-1">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-[#E5E7EB] cursor-pointer"
                />
                <span className="text-xs font-mono text-[#111827]">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Preview */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl space-y-4">
          <div 
            className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-xs"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />

          <div className="flex items-center space-x-2 w-full pt-2">
            <button
              onClick={handleCopySvg}
              className="flex-1 py-2 px-3 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB]" />}
              <span>{copied ? 'Copied SVG!' : 'Copy SVG'}</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="flex-1 py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SVG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
