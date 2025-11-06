import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import VideoUploader from './components/VideoUploader';
import TemplateTabs from './components/TemplateTabs';
import TemplateGallery from './components/TemplateGallery';

const allTemplates = [
  {
    id: 'one-yellow',
    category: 'One',
    name: 'Classic Yellow',
    previewText: 'Classic',
    style: {
      fontname: 'Arial',
      fontsize: 45,
      primary_colour: '&H00FFFF00',
      secondary_colour: '&H00FFFF00',
      outline_colour: '&H00000000',
      back_colour: '&H00000000',
      outline_width: 2,
      shadow_depth: 3
    }
  },
  {
    id: 'one-white',
    category: 'One',
    name: 'Clean White',
    previewText: 'Clean',
    style: {
      fontname: 'Helvetica',
      fontsize: 50,
      primary_colour: '&H00FFFFFF',
      secondary_colour: '&H00FFFFFF',
      outline_colour: '&H00000000',
      back_colour: '&H00000000',
      outline_width: 2,
      shadow_depth: 1
    }
  },
  {
    id: 'one-blue',
    category: 'One',
    name: 'Ocean Blue',
    previewText: 'Ocean',
    style: {
      fontname: 'Verdana',
      fontsize: 48,
      primary_colour: '&H00FF9900',
      secondary_colour: '&H00FF9900',
      outline_colour: '&H00000000',
      back_colour: '&H00000000',
      outline_width: 2,
      shadow_depth: 2
    }
  },
  {
    id: 'normal-basic',
    category: 'Normal',
    name: 'Simple Read',
    previewText: 'Simple',
    style: {
      fontname: 'Roboto',
      fontsize: 30,
      primary_colour: '&H00FFFFFF',
      secondary_colour: '&H00FFFFFF',
      outline_colour: '&H99000000',
      back_colour: '&H99000000',
      outline_width: 0,
      shadow_depth: 0
    }
  },
  {
    id: 'normal-contrast',
    category: 'Normal',
    name: 'High Contrast',
    previewText: 'Contrast',
    style: {
      fontname: 'Inter',
      fontsize: 32,
      primary_colour: '&H0000FFFF',
      secondary_colour: '&H0000FFFF',
      outline_colour: '&H00000000',
      back_colour: '&H88000000',
      outline_width: 2,
      shadow_depth: 2
    }
  },
  {
    id: 'normal-soft',
    category: 'Normal',
    name: 'Soft Shadow',
    previewText: 'Soft',
    style: {
      fontname: 'Georgia',
      fontsize: 28,
      primary_colour: '&H00FFFFFF',
      secondary_colour: '&H00FFFFFF',
      outline_colour: '&H22000000',
      back_colour: '&H22000000',
      outline_width: 1,
      shadow_depth: 1
    }
  },
  {
    id: 'slide-bold',
    category: 'Slide',
    name: 'Bold Pop',
    previewText: 'Bold',
    style: {
      fontname: 'Impact',
      fontsize: 54,
      primary_colour: '&H0000FF00',
      secondary_colour: '&H0000FF00',
      outline_colour: '&H00000000',
      back_colour: '&H00000000',
      outline_width: 3,
      shadow_depth: 4
    }
  },
  {
    id: 'slide-glow',
    category: 'Slide',
    name: 'Neon Glow',
    previewText: 'Glow',
    style: {
      fontname: 'Montserrat',
      fontsize: 44,
      primary_colour: '&H0000FFFF',
      secondary_colour: '&H0000FFFF',
      outline_colour: '&H00000000',
      back_colour: '&H00000000',
      outline_width: 2,
      shadow_depth: 5
    }
  },
  {
    id: 'slide-warm',
    category: 'Slide',
    name: 'Warm Sunset',
    previewText: 'Warm',
    style: {
      fontname: 'Manrope',
      fontsize: 40,
      primary_colour: '&H0000AAFF',
      secondary_colour: '&H0000AAFF',
      outline_colour: '&H00111111',
      back_colour: '&H00111111',
      outline_width: 2,
      shadow_depth: 2
    }
  }
];

export default function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('One');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

  const templatesByTab = useMemo(() => allTemplates.filter(t => t.category === activeTab), [activeTab]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  };

  const handleGenerate = async () => {
    if (!videoFile || !selectedTemplate) return;
    try {
      setLoading(true);
      const form = new FormData();
      form.append('video', videoFile);
      form.append('style', JSON.stringify(selectedTemplate.style));

      const res = await fetch(`${backendUrl}/api/generate`, {
        method: 'POST',
        body: form
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to generate');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'final_video.mp4';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || 'Error generating video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <VideoUploader
            videoFile={videoFile}
            onFileChange={handleFileChange}
            videoPreviewUrl={videoPreviewUrl}
            onGenerate={handleGenerate}
            disabled={!videoFile || !selectedTemplate}
            loading={loading}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Templates</h2>
            <TemplateTabs active={activeTab} onChange={setActiveTab} />
          </div>
          <TemplateGallery
            templates={allTemplates}
            activeCategory={activeTab}
            selectedId={selectedTemplate?.id}
            onSelect={setSelectedTemplate}
          />
          <div className="mt-3 text-xs text-gray-500">
            Timing is currently word-by-word for all templates. Style controls color, font, and size.
          </div>
        </div>
      </main>
    </div>
  );
}
