import React from 'react';

const Loader = ({ text = 'Generating your resume...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-surface-700" />
        <div className="absolute inset-0 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full bg-brand-500/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-slate-300 font-medium">{text}</p>
        <p className="text-slate-500 text-sm mt-1">DeepSeek AI is crafting your resume</p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
