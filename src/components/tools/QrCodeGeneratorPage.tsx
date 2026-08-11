import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  Settings, 
  QrCode, 
  Type, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  Wifi, 
  User, 
  Upload, 
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  drawQrToCanvas, 
  generateQrSvgString, 
  QrRenderOptions, 
  QrStyle, 
  ErrorCorrectionLevel 
} from '../../lib/qrRenderer';

interface QrCodeGeneratorPageProps {
  onBack: () => void;
}

type ContentType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard';
type SelectedDesignMode = QrStyle | 'all';

export const QrCodeGeneratorPage: React.FC<QrCodeGeneratorPageProps> = ({ onBack }) => {
  // 1. Content Type State
  const [contentType, setContentType] = useState<ContentType>('url');

  // Form Fields per Content Type
  const [urlContent, setUrlContent] = useState('https://example.com');
  const [textContent, setTextContent] = useState('CyberEmpireX — Open Source Security Platform');
  
  // Email
  const [emailTo, setEmailTo] = useState('contact@cyberempirex.org');
  const [emailSubject, setEmailSubject] = useState('Security Audit Request');
  const [emailBody, setEmailBody] = useState('Hello CyberEmpireX team, I would like to inquire about...');

  // Phone
  const [phoneNum, setPhoneNum] = useState('+1 (555) 019-2831');

  // SMS
  const [smsPhone, setSmsPhone] = useState('+1 (555) 019-2831');
  const [smsMsg, setSmsMsg] = useState('Security verification payload confirmed.');

  // Wi-Fi
  const [wifiSsid, setWifiSsid] = useState('CyberEmpireX_Secure');
  const [wifiPass, setWifiPass] = useState('CyberEmpireX2026!');
  const [wifiEnc, setWifiEnc] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);

  // vCard Contact
  const [vFirstName, setVFirstName] = useState('Alex');
  const [vLastName, setVLastName] = useState('Vance');
  const [vOrg, setVOrg] = useState('CyberEmpireX');
  const [vPhone, setVPhone] = useState('+1 (555) 019-2831');
  const [vEmail, setVEmail] = useState('alex@cyberempirex.org');
  const [vUrl, setVUrl] = useState('https://cyberempirex.org');

  // 2. Design Selection State (Classic, Rounded, Dots, Minimal, All 4)
  const [designMode, setDesignMode] = useState<SelectedDesignMode>('classic');

  // 3. Advanced Settings State (Collapsed by default)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [qrSize, setQrSize] = useState<number>(512);
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [ecl, setEcl] = useState<ErrorCorrectionLevel>('M');
  const [margin, setMargin] = useState<number>(2);
  const [outputFormat, setOutputFormat] = useState<'png' | 'svg'>('png');
  const [logoOption, setLogoOption] = useState<'none' | 'cyberempirex' | 'custom'>('cyberempirex');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  // Generation Trigger & Copy Notification Status
  const [generatedTrigger, setGeneratedTrigger] = useState<number>(0);
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Canvas Refs
  const singleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const classicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const roundedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const minimalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Formatted Payload Construction
  const getFormattedPayload = (): string => {
    switch (contentType) {
      case 'url':
        return urlContent.trim().startsWith('http') ? urlContent.trim() : `https://${urlContent.trim()}`;
      case 'text':
        return textContent;
      case 'email':
        return `mailto:${emailTo.trim()}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNum.trim()}`;
      case 'sms':
        return `smsto:${smsPhone.trim()}:${smsMsg}`;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEnc};P:${wifiPass};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
N:${vLastName};${vFirstName};;;
FN:${vFirstName} ${vLastName}
ORG:${vOrg}
TEL;TYPE=CELL:${vPhone}
EMAIL:${vEmail}
URL:${vUrl}
END:VCARD`;
      default:
        return textContent;
    }
  };

  const currentPayload = getFormattedPayload();

  // Common Options
  const getRenderOptions = (style: QrStyle): QrRenderOptions => ({
    size: qrSize,
    fgColor,
    bgColor,
    transparentBg,
    margin,
    style,
    ecl,
    logo: logoOption,
    customLogoUrl
  });

  // Re-draw QR onto Canvases
  useEffect(() => {
    if (designMode !== 'all') {
      if (singleCanvasRef.current) {
        drawQrToCanvas(singleCanvasRef.current, currentPayload, getRenderOptions(designMode));
      }
    } else {
      if (classicCanvasRef.current) drawQrToCanvas(classicCanvasRef.current, currentPayload, getRenderOptions('classic'));
      if (roundedCanvasRef.current) drawQrToCanvas(roundedCanvasRef.current, currentPayload, getRenderOptions('rounded'));
      if (dotsCanvasRef.current) drawQrToCanvas(dotsCanvasRef.current, currentPayload, getRenderOptions('dots'));
      if (minimalCanvasRef.current) drawQrToCanvas(minimalCanvasRef.current, currentPayload, getRenderOptions('minimal'));
    }
  }, [
    currentPayload,
    designMode,
    qrSize,
    fgColor,
    bgColor,
    transparentBg,
    ecl,
    margin,
    logoOption,
    customLogoUrl,
    generatedTrigger
  ]);

  // Primary Action Button Click
  const handleGenerate = () => {
    setGeneratedTrigger(prev => prev + 1);
    setHasGenerated(true);
  };

  // Reset to Defaults
  const handleReset = () => {
    setContentType('url');
    setUrlContent('https://example.com');
    setTextContent('CyberEmpireX — Open Source Security Platform');
    setEmailTo('contact@cyberempirex.org');
    setEmailSubject('Security Audit Request');
    setEmailBody('Hello CyberEmpireX team...');
    setPhoneNum('+1 (555) 019-2831');
    setSmsPhone('+1 (555) 019-2831');
    setSmsMsg('Security verification payload confirmed.');
    setWifiSsid('CyberEmpireX_Secure');
    setWifiPass('CyberEmpireX2026!');
    setWifiEnc('WPA');
    setWifiHidden(false);
    setVFirstName('Alex');
    setVLastName('Vance');
    setVOrg('CyberEmpireX');
    setVPhone('+1 (555) 019-2831');
    setVEmail('alex@cyberempirex.org');
    setVUrl('https://cyberempirex.org');
    setDesignMode('classic');
    setShowAdvanced(false);
    setQrSize(512);
    setFgColor('#000000');
    setBgColor('#FFFFFF');
    setTransparentBg(false);
    setEcl('M');
    setMargin(2);
    setLogoOption('cyberempirex');
    setCustomLogoUrl(null);
    setGeneratedTrigger(prev => prev + 1);
  };

  // Upload Custom Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setCustomLogoUrl(evt.target.result as string);
          setLogoOption('custom');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Download PNG from Canvas
  const downloadCanvasPng = (canvas: HTMLCanvasElement | null, filename: string) => {
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download SVG
  const downloadSvg = (style: QrStyle, filename: string) => {
    const svgStr = generateQrSvgString(currentPayload, getRenderOptions(style));
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy Canvas Image to Clipboard
  const handleCopyImage = async (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopyStatus('Image copied to clipboard!');
          setTimeout(() => setCopyStatus(null), 2500);
        }
      });
    } catch (err) {
      console.error('Clipboard write error', err);
      setCopyStatus('Could not copy image. Please use Download PNG.');
      setTimeout(() => setCopyStatus(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 px-4 sm:px-6 lg:px-8 font-sans text-[#111827] animate-in fade-in duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Link & Page Title Header */}
        <div className="space-y-3 pb-2 border-b border-[#E5E7EB]">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Security Utilities</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                QR Code Generator
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 leading-relaxed">
                Generate professional QR codes instantly. Customize content, design, and settings.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-mono text-[#2563EB] font-bold shadow-xs flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Client-Side Generation</span>
              </span>
            </div>
          </div>
        </div>

        {/* MAIN GENERATOR CONTAINER (Single White Bordered Card) */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
          
          {/* SECTION 1: CONTENT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h2 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider font-mono flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>Content</span>
              </h2>
              <span className="text-xs text-[#6B7280]">Select payload category & enter details</span>
            </div>

            {/* Content Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#374151] block">Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] cursor-pointer transition-all"
              >
                <option value="url">URL (Website link)</option>
                <option value="text">Plain Text</option>
                <option value="email">Email Message</option>
                <option value="phone">Phone Number</option>
                <option value="sms">SMS Text</option>
                <option value="wifi">Wi-Fi Network Credentials</option>
                <option value="vcard">Contact Details (vCard)</option>
              </select>
            </div>

            {/* Dynamic Inputs according to Content Type */}
            <div className="pt-2">
              
              {/* URL */}
              {contentType === 'url' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#374151]">Target URL</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={urlContent}
                      onChange={(e) => setUrlContent(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#111827] font-mono placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Standard web URL format beginning with https:// or http://
                  </p>
                </div>
              )}

              {/* Text */}
              {contentType === 'text' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#374151]">Text Content</label>
                    <span className="text-[11px] font-mono text-[#6B7280]">{textContent.length} characters</span>
                  </div>
                  <textarea
                    rows={4}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter text payload, notes, or verification details..."
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3.5 text-xs sm:text-sm text-[#111827] font-mono placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              )}

              {/* Email */}
              {contentType === 'email' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-[#374151]">Recipient Email</label>
                    <input
                      type="email"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      placeholder="admin@cyberempirex.org"
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-[#374151]">Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Security Audit Request"
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-[#374151]">Email Body</label>
                    <textarea
                      rows={3}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder="Write message content..."
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3 text-xs sm:text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* Phone */}
              {contentType === 'phone' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#374151]">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="+1 (555) 019-2831"
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                  />
                  <p className="text-[11px] text-[#6B7280]">
                    Include international prefix code (e.g. +1 or +44)
                  </p>
                </div>
              )}

              {/* SMS */}
              {contentType === 'sms' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-[#374151]">Phone Number</label>
                    <input
                      type="tel"
                      value={smsPhone}
                      onChange={(e) => setSmsPhone(e.target.value)}
                      placeholder="+1 (555) 019-2831"
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-[#374151]">SMS Message</label>
                    <textarea
                      rows={2}
                      value={smsMsg}
                      onChange={(e) => setSmsMsg(e.target.value)}
                      placeholder="Message content..."
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3 text-xs sm:text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* Wi-Fi */}
              {contentType === 'wifi' && (
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#374151]">Network SSID</label>
                      <input
                        type="text"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                        placeholder="CyberEmpireX_Secure"
                        className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#374151]">Password</label>
                      <input
                        type="text"
                        value={wifiPass}
                        onChange={(e) => setWifiPass(e.target.value)}
                        placeholder="Security key..."
                        className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#111827] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#374151]">Encryption Type</label>
                      <select
                        value={wifiEnc}
                        onChange={(e) => setWifiEnc(e.target.value as any)}
                        className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3</option>
                        <option value="WEP">WEP Legacy</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 pt-5">
                      <input
                        type="checkbox"
                        id="wifiHiddenCheck"
                        checked={wifiHidden}
                        onChange={(e) => setWifiHidden(e.target.checked)}
                        className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer"
                      />
                      <label htmlFor="wifiHiddenCheck" className="text-xs text-[#374151] font-medium cursor-pointer">
                        Hidden Network SSID
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* vCard */}
              {contentType === 'vcard' && (
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151]">First Name</label>
                    <input
                      type="text"
                      value={vFirstName}
                      onChange={(e) => setVFirstName(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151]">Last Name</label>
                    <input
                      type="text"
                      value={vLastName}
                      onChange={(e) => setVLastName(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151]">Organization</label>
                    <input
                      type="text"
                      value={vOrg}
                      onChange={(e) => setVOrg(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151]">Phone</label>
                    <input
                      type="text"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-mono text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-[#374151]">Email</label>
                    <input
                      type="email"
                      value={vEmail}
                      onChange={(e) => setVEmail(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* SECTION 2: DESIGN (5 Horizontal Cards on Desktop, Grid on Mobile) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h2 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider font-mono flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>Design</span>
              </h2>
              <span className="text-xs text-[#6B7280]">Select visual QR pattern or generate all</span>
            </div>

            {/* 5 Selectable Design Cards in 1 Row on Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { 
                  id: 'classic', 
                  title: 'Classic', 
                  desc: 'Standard square modules',
                  icon: (
                    <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="3" height="3" />
                      <rect x="18" y="18" width="3" height="3" />
                    </svg>
                  ) 
                },
                { 
                  id: 'rounded', 
                  title: 'Rounded', 
                  desc: 'Rounded module corners',
                  icon: (
                    <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="2" />
                      <rect x="14" y="3" width="7" height="7" rx="2" />
                      <rect x="3" y="14" width="7" height="7" rx="2" />
                      <rect x="14" y="14" width="3" height="3" rx="1" />
                      <rect x="18" y="18" width="3" height="3" rx="1" />
                    </svg>
                  ) 
                },
                { 
                  id: 'dots', 
                  title: 'Dots', 
                  desc: 'Circular dot matrix',
                  icon: (
                    <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="6.5" cy="6.5" r="3.5" />
                      <circle cx="17.5" cy="6.5" r="3.5" />
                      <circle cx="6.5" cy="17.5" r="3.5" />
                      <circle cx="15.5" cy="15.5" r="1.5" />
                      <circle cx="19.5" cy="19.5" r="1.5" />
                    </svg>
                  ) 
                },
                { 
                  id: 'minimal', 
                  title: 'Minimal', 
                  desc: 'Sleek minimalist style',
                  icon: (
                    <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="6.5" cy="6.5" r="2.5" />
                      <circle cx="17.5" cy="6.5" r="2.5" />
                      <circle cx="6.5" cy="17.5" r="2.5" />
                      <rect x="14" y="14" width="6" height="6" rx="1" />
                    </svg>
                  ) 
                },
                { 
                  id: 'all', 
                  title: 'All 4 Designs', 
                  desc: 'Batch generate all styles',
                  icon: <Layers className="w-6 h-6 text-current" />
                }
              ].map((item) => {
                const isSelected = designMode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setDesignMode(item.id as SelectedDesignMode)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 relative ${
                      isSelected
                        ? 'bg-[#EEF4FF] border-2 border-[#2563EB] text-[#2563EB] shadow-xs'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:border-[#2563EB]/40 hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#2563EB] text-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}

                    <div className={isSelected ? 'text-[#2563EB]' : 'text-[#6B7280]'}>
                      {item.icon}
                    </div>

                    <div>
                      <div className="text-xs font-extrabold text-[#111827] flex items-center space-x-1">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[10px] text-[#6B7280] leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: GENERATE BUTTON (One Prominent Blue Button) */}
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center space-x-2 active:scale-[0.99]"
            >
              <QrCode className="w-5 h-5" />
              <span>Generate QR Code</span>
            </button>
          </div>

          {/* SECTION 4: ADVANCED SETTINGS (Collapsed by default) */}
          <div className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-[#F8FAFC] transition-all">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#F1F5F9] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center space-x-2.5">
                <Settings className="w-4 h-4 text-[#2563EB]" />
                <span className="text-xs sm:text-sm font-bold text-[#111827]">
                  ⚙ Advanced Settings
                </span>
                <span className="text-[11px] text-[#6B7280] hidden sm:inline">(Resolution, Colors, Margins, Logo)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-[#2563EB] font-semibold">
                <span>{showAdvanced ? 'Hide' : 'Show'}</span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showAdvanced && (
              <div className="p-5 border-t border-[#E5E7EB] bg-white space-y-5 text-xs">
                
                {/* QR Size */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#374151] block">QR Code Resolution</label>
                  <div className="flex items-center space-x-2">
                    {[256, 512, 1024].map((size) => (
                      <button
                        key={size}
                        onClick={() => setQrSize(size)}
                        className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                          qrSize === size
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {size}px {size === 512 && '(Default)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Foreground & Background Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#374151] block">Foreground Color</label>
                    <div className="flex items-center space-x-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="bg-transparent font-mono text-[#111827] focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#374151] block">Background Color</label>
                    <div className="flex items-center space-x-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-2">
                      <input
                        type="color"
                        value={bgColor}
                        disabled={transparentBg}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent disabled:opacity-30"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        disabled={transparentBg}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="bg-transparent font-mono text-[#111827] focus:outline-none w-full disabled:opacity-30"
                      />
                    </div>
                  </div>
                </div>

                {/* Transparent Background Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="transparentBgAdv"
                    checked={transparentBg}
                    onChange={(e) => setTransparentBg(e.target.checked)}
                    className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer"
                  />
                  <label htmlFor="transparentBgAdv" className="font-medium text-[#374151] cursor-pointer">
                    Transparent Background (PNG & SVG)
                  </label>
                </div>

                {/* Error Correction Level */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#374151] block">Error Correction Capacity</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { ecl: 'L', label: 'L (7%)' },
                      { ecl: 'M', label: 'M (15%)' },
                      { ecl: 'Q', label: 'Q (25%)' },
                      { ecl: 'H', label: 'H (30%)' }
                    ].map((item) => (
                      <button
                        key={item.ecl}
                        onClick={() => setEcl(item.ecl as ErrorCorrectionLevel)}
                        className={`py-2 rounded-lg text-xs font-mono font-bold text-center border transition-all cursor-pointer ${
                          ecl === item.ecl
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiet Zone Margin */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#374151]">Quiet Zone Margin</label>
                    <span className="font-mono text-[#2563EB] font-bold">{margin} modules</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={6}
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>

                {/* Center Branding Logo */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#374151] block">Center Emblem Logo</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLogoOption('none')}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        logoOption === 'none'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      None
                    </button>
                    <button
                      onClick={() => setLogoOption('cyberempirex')}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        logoOption === 'cyberempirex'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      CyberEmpireX Logo
                    </button>
                    <label
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                        logoOption === 'custom'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{customLogoUrl ? 'Uploaded' : 'Upload Logo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* SECTION 5: PREVIEW CARD (Separate White Surface Card Below) */}
        {hasGenerated && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F1F5F9] pb-4 gap-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#111827]">
                    Generated QR Code Preview
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    {designMode === 'all' ? 'All 4 design variations generated from payload' : `${designMode.toUpperCase()} design variation`}
                  </p>
                </div>
              </div>

              {/* Reset Action */}
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>

            {/* Notification Toast */}
            {copyStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold text-center animate-in fade-in">
                {copyStatus}
              </div>
            )}

            {/* SINGLE DESIGN PREVIEW */}
            {designMode !== 'all' && (
              <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
                {/* Large Scannable Canvas Container */}
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl shadow-xs w-full aspect-square flex items-center justify-center overflow-hidden">
                  <canvas
                    ref={singleCanvasRef}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Download / Copy Action Buttons */}
                <div className="w-full space-y-2.5">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => downloadCanvasPng(singleCanvasRef.current, `qr-code-${designMode}-cyberempirex.png`)}
                      className="py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      onClick={() => downloadSvg(designMode, `qr-code-${designMode}-cyberempirex.svg`)}
                      className="py-3 px-4 bg-white hover:bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB] hover:border-[#2563EB]/40 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4 text-[#2563EB]" />
                      <span>Download SVG</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyImage(singleCanvasRef.current)}
                    className="w-full py-2.5 px-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#111827] border border-[#E5E7EB] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Copy Image to Clipboard</span>
                  </button>
                </div>
              </div>
            )}

            {/* ALL 4 DESIGNS MATRIX PREVIEW */}
            {designMode === 'all' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'classic', title: 'Classic', ref: classicCanvasRef },
                  { id: 'rounded', title: 'Rounded', ref: roundedCanvasRef },
                  { id: 'dots', title: 'Dots', ref: dotsCanvasRef },
                  { id: 'minimal', title: 'Minimal', ref: minimalCanvasRef }
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl flex flex-col items-center space-y-4"
                  >
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#111827]">
                        {item.title} Style
                      </span>
                      <span className="text-[10px] font-mono text-[#2563EB] bg-white px-2 py-0.5 rounded border border-[#E5E7EB]">
                        Vector Scannable
                      </span>
                    </div>

                    <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl aspect-square w-full max-w-[220px] flex items-center justify-center">
                      <canvas
                        ref={item.ref}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full pt-1">
                      <button
                        onClick={() => downloadCanvasPng(item.ref.current, `qr-${item.id}-cyberempirex.png`)}
                        className="py-2 px-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>PNG</span>
                      </button>

                      <button
                        onClick={() => downloadSvg(item.id as QrStyle, `qr-${item.id}-cyberempirex.svg`)}
                        className="py-2 px-2 bg-white hover:bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB] text-[11px] font-bold rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-[#2563EB]" />
                        <span>SVG</span>
                      </button>

                      <button
                        onClick={() => handleCopyImage(item.ref.current)}
                        className="py-2 px-2 bg-white hover:bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB] text-[11px] font-bold rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer"
                        title="Copy Image"
                      >
                        <Copy className="w-3 h-3 text-[#2563EB]" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
