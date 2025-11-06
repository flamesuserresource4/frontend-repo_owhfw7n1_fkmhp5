import React from 'react';

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500" />
          <h1 className="text-lg font-semibold tracking-tight">Caption Burner</h1>
        </div>
        <p className="text-sm text-gray-500">Upload a video, pick a style, and generate</p>
      </div>
    </header>
  );
}
