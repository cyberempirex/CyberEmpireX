import React, { useState } from 'react';
import { Sparkles, Send, Terminal, X, Bot, Shield, Check, Copy, HelpCircle, RefreshCw } from 'lucide-react';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: (cmdStr?: string) => void;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Hello! I am **CyberEmpireX AI Coach**, powered by Gemini 3.6 Flash.\n\nAsk me anything about:\n- **Termux Commands & Packages** (\`pkg install\`, \`proot-distro\`, storage setup)\n- **Security Tools** (Nmap, SQLMap, Metasploit, Wireshark, HydravsJohn)\n- **Bash Scripting & Customization** (\`.bashrc\`, aliases, banners)\n- **White-Hat Ethical Guidelines & CTF Scenarios**\n\nHow can I help your ethical hacking journey today?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputQuery, setInputQuery] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    'How do I install Metasploit in Termux safely?',
    'Explain Nmap flags: -sS, -sV, -A, -p-',
    'How to setup storage permission using termux-setup-storage?',
    'Write a Bash script that updates Termux and clears cache',
    'What is SQL Injection and how to test GET parameters?'
  ];

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, context: 'ethical-hacking-tutor' })
      });
      const data = await res.json();
      setLoading(false);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'No response returned from AI Coach.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      setLoading(false);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: '⚠️ Network error communicating with CyberEmpireX AI server.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const copyText = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      
      <div className="relative w-full max-w-3xl bg-slate-950 border border-purple-900/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-1.5">
                <span>CyberEmpireX AI Coach</span>
                <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 text-[10px] rounded font-mono border border-purple-500/30">
                  Gemini 3.6 Flash
                </span>
              </h2>
              <p className="text-[10px] text-slate-400">White-Hat Ethical Hacking & Termux Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold px-1 whitespace-nowrap">
            Ask AI:
          </span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset)}
              className="px-2.5 py-1 bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 text-[11px] rounded-lg border border-purple-800/40 whitespace-nowrap transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 relative group ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-1 border-b border-slate-800/50 pb-1">
                  <span className="font-mono font-bold">
                    {msg.sender === 'user' ? 'You' : 'CyberEmpireX AI'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap leading-relaxed space-y-2">
                  {msg.text.split('\n\n').map((block, idx) => {
                    if (block.startsWith('```')) {
                      const codeSnippet = block.replace(/```[a-z]*/g, '').trim();
                      return (
                        <div key={idx} className="my-2 p-2.5 bg-slate-950 rounded-xl border border-purple-900/50 font-mono text-[11px] text-cyan-300 relative">
                          <pre className="overflow-x-auto whitespace-pre-wrap">{codeSnippet}</pre>
                          <div className="mt-2 flex items-center justify-end space-x-2">
                            <button
                              onClick={() => copyText(codeSnippet, `${msg.id}-${idx}`)}
                              className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]"
                            >
                              {copiedId === `${msg.id}-${idx}` ? 'Copied' : 'Copy'}
                            </button>
                            <button
                              onClick={() => {
                                onClose();
                                onOpenTerminal(codeSnippet);
                              }}
                              className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] flex items-center space-x-1"
                            >
                              <Terminal className="w-3 h-3 text-emerald-400" />
                              <span>Run in Terminal</span>
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return <p key={idx}>{block}</p>;
                  })}
                </div>

                {msg.sender === 'ai' && (
                  <button
                    onClick={() => copyText(msg.text, msg.id)}
                    className="absolute top-2 right-2 p-1 text-slate-500 hover:text-purple-300 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy full message"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-purple-900/50 p-3 rounded-2xl rounded-tl-none text-purple-300 text-xs flex items-center space-x-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Ethical Hacker Coach generating response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-900 border-t border-purple-900/40 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about Termux, Nmap, SQLMap, Bash scripts..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none placeholder:text-slate-600 font-sans"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </form>

      </div>
    </div>
  );
};
