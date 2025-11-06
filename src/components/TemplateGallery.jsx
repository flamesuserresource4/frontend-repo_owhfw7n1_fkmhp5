import React, { useMemo } from 'react';

function colorFromASS(assColor) {
  // ASS color like &HAABBGGRR -> convert to CSS rgba. We'll ignore alpha for preview simplicity.
  if (!assColor || !assColor.startsWith('&H')) return '#ffffff';
  const hex = assColor.replace('&H','');
  // hex can be AABBGGRR; take RRGGBB
  const rr = hex.slice(-2);
  const gg = hex.slice(-4, -2);
  const bb = hex.slice(-6, -4);
  return `#${rr}${gg}${bb}`;
}

export default function TemplateGallery({ templates, activeCategory, selectedId, onSelect }) {
  const filtered = useMemo(() => templates.filter(t => t.category === activeCategory), [templates, activeCategory]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
      {filtered.map(t => {
        const textColor = colorFromASS(t.style.primary_colour);
        const outline = t.style.outline_width > 0 ? 'drop-shadow(0 0 0 black)' : 'none';
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className={`group rounded-xl p-3 text-left border transition-all ${selectedId === t.id ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
              <div className="text-2xl font-bold" style={{ color: textColor, filter: outline }}>
                {t.previewText}
              </div>
            </div>
            <div className="mt-2">
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-gray-500">{t.category} style</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
