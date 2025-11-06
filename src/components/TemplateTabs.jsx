import React from 'react';

const tabs = [
  { key: 'Normal', label: 'Normal' },
  { key: 'One', label: 'One' },
  { key: 'Slide', label: 'Slide' }
];

export default function TemplateTabs({ active, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${active === t.key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
