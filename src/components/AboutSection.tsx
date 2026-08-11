import React from 'react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Learn',
      description: 'Structured, hands-on cybersecurity courses covering POSIX terminal commands, Linux fundamentals, and network auditing.',
      icon: (
        /* Tux / Linux SVG */
        <svg className="w-5 h-5 text-[#111827]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.003 2c-2.22 0-4.015 1.79-4.015 4 0 .7.18 1.36.5 1.94C6.543 8.89 5.003 11.23 5.003 14c0 1.66.57 3.19 1.53 4.41C5.603 19.16 5.003 20.25 5.003 21.5c0 .28.22.5.5.5h12.997c.28 0 .5-.22.5-.5 0-1.25-.6-2.34-1.53-3.09.96-1.22 1.53-2.75 1.53-4.41 0-2.77-1.54-5.11-3.485-6.06.32-.58.5-1.24.5-1.94 0-2.21-1.795-4-4.012-4zm0 2c1.12 0 2.015.89 2.015 2s-.895 2-2.015 2c-1.11 0-2.015-.89-2.015-2s.905-2 2.015-2z"/>
        </svg>
      )
    },
    {
      title: 'Build',
      description: 'Develop and deploy open-source security CLI tools, scripts, and automation workflows directly in integrated workspaces.',
      icon: (
        /* Git SVG */
        <svg className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.38-.071 1.892.441.516.516.66 1.256.442 1.902l2.66 2.66c.646-.218 1.387-.074 1.899.441.706.706.706 1.85 0 2.556-.706.707-1.85.707-2.556 0-.522-.522-.663-1.272-.433-1.921L12.7 8.784v6.236c.216.113.417.266.589.438.706.707.706 1.85 0 2.557-.707.706-1.85.706-2.557 0-.706-.707-.706-1.85 0-2.557.217-.217.472-.375.748-.466V8.672c-.276-.091-.531-.249-.748-.466-.525-.525-.662-1.278-.426-1.928L7.545 3.518.454 10.61c-.605.604-.605 1.582 0 2.187l10.48 10.478c.604.605 1.582.605 2.186 0l10.426-10.426c.605-.603.605-1.582 0-2.187z"/>
        </svg>
      )
    },
    {
      title: 'Practice',
      description: 'Engage with isolated, safe sandbox laboratories to analyze vulnerability vectors and test defense mechanisms.',
      icon: (
        /* Terminal / Bash SVG */
        <svg className="w-5 h-5 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      )
    },
    {
      title: 'Contribute',
      description: 'Collaborate with global security researchers through open-source repositories, discussions, and code reviews.',
      icon: (
        /* GitHub SVG */
        <svg className="w-5 h-5 text-[#181717]" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-6 space-y-8">
      {/* Title & Description */}
      <div className="max-w-3xl space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
          Why CyberEmpireX?
        </h2>
        <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
          CyberEmpireX is an enterprise-grade open-source platform focused on cybersecurity education, practical labs, developer tools, open-source collaboration, and community-driven innovation.
        </p>
      </div>

      {/* Four Highlights with Real Open Source SVG Logos (No neon blue boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-2">
        {highlights.map((item, idx) => (
          <div key={idx} className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-[#111827]">
              {item.title}
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
