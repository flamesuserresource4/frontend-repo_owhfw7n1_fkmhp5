import React from 'react';

export default function VideoUploader({ videoFile, onFileChange, videoPreviewUrl, onGenerate, disabled, loading }) {
  return (
    <div className="flex flex-col h-full">
      <div className="border rounded-xl bg-white/60 backdrop-blur p-4 flex-1 flex flex-col">
        <label className="block text-sm font-medium text-gray-700">Upload video</label>
        <input
          type="file"
          accept="video/*"
          onChange={onFileChange}
          className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <div className="mt-4 flex-1 rounded-lg overflow-hidden bg-black aspect-[9/16] flex items-center justify-center">
          {videoPreviewUrl ? (
            <video
              className="h-full w-full object-contain"
              src={videoPreviewUrl}
              controls
            />
          ) : (
            <div className="text-gray-400 text-sm">Preview will appear here</div>
          )}
        </div>
      </div>
      <button
        onClick={onGenerate}
        disabled={disabled || loading}
        className={`mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white transition-colors ${disabled || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {loading ? 'Processing…' : 'Generate Video'}
      </button>
    </div>
  );
}
