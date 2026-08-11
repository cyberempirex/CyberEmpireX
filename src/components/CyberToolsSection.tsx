import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wrench, 
  Search, 
  QrCode, 
  KeyRound, 
  Hash, 
  Key, 
  Lock, 
  Globe, 
  FileSearch, 
  ArrowLeftRight, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  SlidersHorizontal,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { ALL_TOOLS, TOOL_CATEGORIES, ToolDefinition, ToolCategory } from '../data/toolsData';
import { ToolRunnerModal } from './tools/ToolRunnerModal';
import { QrCodeGeneratorPage } from './tools/QrCodeGeneratorPage';
import { ViewMode } from '../types';

interface CyberToolsSectionProps {
  onOpenTerminalWithCmd?: (cmd: string) => void;
  setView?: (view: ViewMode) => void;
  initialToolId?: string;
}

export const CyberToolsSection: React.FC<CyberToolsSectionProps> = ({ setView, initialToolId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [activeTool, setActiveTool] = useState<ToolDefinition | null>(null);
  const [dedicatedToolId, setDedicatedToolId] = useState<string | null>(null);

  useEffect(() => {
    if (initialToolId) {
      if (initialToolId === 'qr-generator') {
        setDedicatedToolId('qr-generator');
      } else {
        const foundTool = ALL_TOOLS.find(t => t.id === initialToolId);
        if (foundTool) {
          setActiveTool(foundTool);
        }
      }
    }
  }, [initialToolId]);

  // Helper to map icon names to Lucide icon components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode':
        return <QrCode className="w-5 h-5 text-white" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-white" />;
      case 'Hash':
        return <Hash className="w-5 h-5 text-white" />;
      case 'Key':
        return <Key className="w-5 h-5 text-white" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-white" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-white" />;
      case 'Search':
        return <Search className="w-5 h-5 text-white" />;
      case 'FileSearch':
        return <FileSearch className="w-5 h-5 text-white" />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight className="w-5 h-5 text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-white" />;
      default:
        return <Wrench className="w-5 h-5 text-white" />;
    }
  };

  // Handle Tool Click
  const handleToolClick = (tool: ToolDefinition) => {
    if (tool.id === 'qr-generator') {
      setDedicatedToolId('qr-generator');
    } else {
      setActiveTool(tool);
    }
  };

  // Filter tools based on search and selected category
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Group filtered tools by category
  const groupedTools = useMemo(() => {
    const map: Record<string, ToolDefinition[]> = {};
    
    TOOL_CATEGORIES.forEach((cat) => {
      const items = filteredTools.filter((t) => t.category === cat);
      if (items.length > 0) {
        map[cat] = items;
      }
    });

    return map;
  }, [filteredTools]);

  const toggleCategoryCollapse = (categoryName: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // If dedicated tool like QR Generator is selected, render its dedicated page view
  if (dedicatedToolId === 'qr-generator') {
    return <QrCodeGeneratorPage onBack={() => setDedicatedToolId(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Banner with Open Source Illustration */}
      <div className="bg-[#2563EB] text-white rounded-2xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="p-6 md:col-span-8 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
              Security Utilities
            </span>
            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[11px] font-mono text-emerald-300 font-semibold flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side Encryption</span>
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Cybersecurity Utility Engine
          </h1>
          <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
            Client-side cryptographic generators, ciphers, network diagnostic analyzers, and open-source lookup tools.
          </p>
        </div>
        <div className="md:col-span-4 h-full min-h-[120px] relative overflow-hidden hidden md:block">
          <img
            src="/src/assets/images/tools_workspace_art_1786148325283.jpg"
            alt="Open Source Tools & Workspace Illustration"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Main Full-Width Category Sections - Clean & Professional without Box Containers */}
      <div className="w-full space-y-8">
        {(Object.entries(groupedTools) as [string, ToolDefinition[]][]).map(([categoryName, toolsList]) => (
          <div key={categoryName} className="space-y-4">
            {/* Category Section Header - Clean line divider */}
            <div className="flex items-center space-x-3 pb-2 border-b border-[#E5E7EB]">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#111827] tracking-tight">
                  {categoryName}
                </h2>
                <span className="text-xs text-[#6B7280] font-mono">
                  {toolsList.length} {toolsList.length === 1 ? 'utility' : 'utilities'}
                </span>
              </div>
            </div>

            {/* Grid of BLUE Tool Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolsList.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="group relative bg-[#2563EB] hover:bg-[#1D4ED8] border border-blue-400/30 hover:border-blue-300 rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md text-white"
                >
                  <div className="space-y-3">
                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all flex items-center justify-center text-white shadow-2xs">
                        {renderIcon(tool.icon)}
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {tool.isLocal && (
                          <span className="text-[10px] font-mono font-bold text-white bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                            Local
                          </span>
                        )}
                        {tool.popular && (
                          <span className="text-[10px] font-mono font-bold text-white bg-amber-400/20 px-2 py-0.5 rounded border border-amber-300/30">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-100 transition-colors flex items-center justify-between">
                        <span>{tool.title}</span>
                      </h3>
                      <p className="text-xs text-blue-100/90 leading-relaxed mt-1.5 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Tags & Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[70%] overflow-hidden">
                      {tool.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono bg-blue-900/40 text-blue-100 px-2 py-0.5 rounded border border-blue-400/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-white group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>Open</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Tool Runner Modal for modal tools */}
      <ToolRunnerModal
        tool={activeTool}
        onClose={() => setActiveTool(null)}
      />
    </div>
  );
};

