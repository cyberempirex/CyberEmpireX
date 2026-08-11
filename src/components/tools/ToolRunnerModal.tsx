import React from 'react';
import { X, Wrench, Shield, Sparkles, ExternalLink, Zap } from 'lucide-react';
import { ToolDefinition } from '../../data/toolsData';

// Import individual tools
import { QrCodeTool } from './QrCodeTool';
import { PasswordGeneratorTool } from './PasswordGeneratorTool';
import { HashGeneratorTool } from './HashGeneratorTool';
import { TokenGeneratorTool } from './TokenGeneratorTool';
import { EncryptionDecryptionTool } from './EncryptionDecryptionTool';
import { IpDomainLookupTool } from './IpDomainLookupTool';
import { DnsLookupTool } from './DnsLookupTool';
import { WhoisLookupTool } from './WhoisLookupTool';
import { ReverseDnsTool } from './ReverseDnsTool';
import { SslCheckerTool } from './SslCheckerTool';

interface ToolRunnerModalProps {
  tool: ToolDefinition | null;
  onClose: () => void;
}

export const ToolRunnerModal: React.FC<ToolRunnerModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'qr-generator':
        return <QrCodeTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'hash-generator':
        return <HashGeneratorTool />;
      case 'token-generator':
        return <TokenGeneratorTool />;
      case 'encryption-decryption':
        return <EncryptionDecryptionTool />;
      case 'ip-domain-lookup':
        return <IpDomainLookupTool />;
      case 'dns-lookup':
        return <DnsLookupTool />;
      case 'whois-lookup':
        return <WhoisLookupTool />;
      case 'reverse-dns':
        return <ReverseDnsTool />;
      case 'ssl-checker':
        return <SslCheckerTool />;
      default:
        return (
          <div className="p-8 text-center text-[#6B7280]">
            <p className="text-xs font-mono">Tool utility module initializing...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5E7EB] flex items-start justify-between bg-[#F8FAFC]">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
                {tool.category}
              </span>
              {tool.isLocal && (
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Local Browser Processing
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] flex items-center space-x-2">
              <span>{tool.title}</span>
            </h2>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xl">
              {tool.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB]/50 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {renderToolComponent()}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
          <div className="flex items-center space-x-1.5 font-mono text-[11px]">
            <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>CyberEmpireX Secure Environment</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] font-semibold rounded-lg transition-all cursor-pointer text-xs"
          >
            Close Utility
          </button>
        </div>
      </div>
    </div>
  );
};
