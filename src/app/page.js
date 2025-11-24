"use client";
import React, { useState } from 'react';
import Hero from './components/Hero';
import FileUploader from './components/FileUploader';
import OrganizerOptions from './components/OrganizerOptions';
import DownloadZone from './components/DownloadZone';

export default function Home() {
  const [step, setStep] = useState('upload'); // upload, options, processing, done
  const [files, setFiles] = useState([]);
  const [groupingOption, setGroupingOption] = useState('all');
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesSelected = async (selectedFiles) => {
    setFiles(selectedFiles);
    setIsUploading(true);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setSessionId(data.sessionId);
      setStep('options');
    } catch (error) {
      console.error(error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleExtensionToggle = (ext) => {
    setSelectedExtensions(prev =>
      prev.includes(ext)
        ? prev.filter(e => e !== ext)
        : [...prev, ext]
    );
  };

  const handleProcess = async () => {
    setStep('processing');

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          groupingOption,
          selectedExtensions
        }),
      });

      if (!response.ok) throw new Error('Processing failed');

      setStep('done');
    } catch (error) {
      console.error(error);
      alert('Failed to process files.');
      setStep('options');
    }
  };

  const handleDownload = () => {
    if (!sessionId) return;
    window.location.href = `/api/download?sessionId=${sessionId}`;
  };

  const handleReset = async () => {
    if (sessionId) {
      try {
        await fetch('/api/cleanup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      } catch (error) {
        console.error('Cleanup failed:', error);
      }
    }

    setFiles([]);
    setStep('upload');
    setGroupingOption('all');
    setSelectedExtensions([]);
    setSessionId(null);
  };

  return (
    <main className="main-container">
      <nav className="navbar">
        <div className="logo">DocOrganizer</div>
        <button
          className="theme-toggle"
          onClick={() => {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
          }}
        >
          Toggle Theme
        </button>
      </nav>

      <Hero />

      <div className="app-container">
        {step === 'upload' && (
          <FileUploader
            onFilesSelected={handleFilesSelected}
            isUploading={isUploading}
          />
        )}

        {step === 'options' && (
          <>
            <OrganizerOptions
              selectedOption={groupingOption}
              onOptionChange={setGroupingOption}
              extensions={selectedExtensions}
              onExtensionToggle={handleExtensionToggle}
            />
            <div className="action-bar">
              <button className="btn-back" onClick={() => setStep('upload')}>Back</button>
              <button className="btn-primary" onClick={handleProcess}>Organize Files</button>
            </div>
          </>
        )}

        {(step === 'processing' || step === 'done') && (
          <DownloadZone
            isProcessing={step === 'processing'}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        )}
      </div>

      <style jsx>{`
        .main-container {
          min-height: 100vh;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .logo {
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .theme-toggle {
          background: transparent;
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: all 0.2s;
          cursor: pointer;
        }

        .theme-toggle:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .app-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .action-bar {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        button {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: transform 0.2s;
          border: none;
          cursor: pointer;
        }

        button:hover {
          transform: translateY(-2px);
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
        }

        .btn-back {
          background: transparent;
          color: var(--text-secondary);
        }
      `}</style>
    </main>
  );
}
