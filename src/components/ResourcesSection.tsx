import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Newspaper, 
  Sparkles, 
  Terminal, 
  Globe, 
  ChevronRight,
  Code
} from 'lucide-react';
import { ViewMode } from '../types';

interface ResourcesSectionProps {
  setView: (view: ViewMode) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ setView }) => {
  const resources = [
    {
      id: 'r1',
      category: 'Latest Tutorials',
      title: 'Mastering eBPF for Kernel Runtime Security',
      subtitle: 'Writing custom Nmap NSE scripts and socket filters.',
      icon: <BookOpen className="w-4 h-4 text-[#2563EB]" />,
      badge: 'Guide'
    },
    {
      id: 'r2',
      category: 'Latest Research',
      title: 'Zero-Day Vulnerability Trends in Cloud Containers 2026',
      subtitle: 'Static analysis of container image escape vectors.',
      icon: <FileText className="w-4 h-4 text-[#4F46E5]" />,
      badge: 'Paper'
    },
    {
      id: 'r3',
      category: 'Security News',
      title: 'Critical Patch Advisory: OpenSSL & Linux Kernel 6.10',
      subtitle: 'Emergency patch notes for memory buffer bounds checks.',
      icon: <Newspaper className="w-4 h-4 text-[#EF4444]" />,
      badge: 'Advisory'
    },
    {
      id: 'r4',
      category: 'Release Notes',
      title: 'CyberEmpireX v2.4: Real-time Live Sandbox & WebShell',
      subtitle: 'Multi-threaded terminal emulation & POSIX support.',
      icon: <Sparkles className="w-4 h-4 text-[#F59E0B]" />,
      badge: 'Changelog'
    },
    {
      id: 'r5',
      category: 'Documentation',
      title: 'API Reference, SDK Setup, and CLI Commands',
      subtitle: 'Integrate CyberEmpireX tools into your CI/CD pipelines.',
      icon: <Terminal className="w-4 h-4 text-[#2563EB]" />,
      badge: 'Docs'
    },
    {
      id: 'r6',
      category: 'API Updates',
      title: 'GraphQL Security Endpoint v2 Officially Released',
      subtitle: 'Automated schema introspections & rate limits.',
      icon: <Globe className="w-4 h-4 text-[#22C55E]" />,
      badge: 'v2 API'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Resources & Knowledge Base</h2>
          <p className="text-xs text-[#6B7280]">
            Latest cybersecurity tutorials, technical research papers, advisories, and documentation.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((res) => (
          <div
            key={res.id}
            onClick={() => setView('disclaimer')}
            className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-[#2563EB] tracking-wider flex items-center space-x-1.5">
                  {res.icon}
                  <span>{res.category}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F9FC] text-[#6B7280] border border-[#E5E7EB]">
                  {res.badge}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors leading-snug">
                {res.title}
              </h3>
              <p className="text-xs text-[#6B7280] line-clamp-2">
                {res.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] flex justify-end text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
              <span className="flex items-center space-x-0.5">
                <span>Read Article</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
