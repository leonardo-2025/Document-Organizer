"use client";
import React from 'react';

export default function OrganizerOptions({ onOptionChange, selectedOption, extensions, onExtensionToggle }) {
    return (
        <div className="options-container">
            <h2>How should we organize your files?</h2>

            <div className="options-grid">
                <div
                    className={`option-card ${selectedOption === 'all' ? 'selected' : ''}`}
                    onClick={() => onOptionChange('all')}
                >
                    <div className="radio-circle"></div>
                    <div className="option-content">
                        <h3>Group All By Extension</h3>
                        <p>Create a folder for every file type found (e.g., /pdf, /docx, /mp4)</p>
                    </div>
                </div>

                <div
                    className={`option-card ${selectedOption === 'specific' ? 'selected' : ''}`}
                    onClick={() => onOptionChange('specific')}
                >
                    <div className="radio-circle"></div>
                    <div className="option-content">
                        <h3>Group Specific Extensions</h3>
                        <p>Only group specific file types into folders, leave others as is.</p>
                    </div>
                </div>
            </div>

            {selectedOption === 'specific' && (
                <div className="extension-selector">
                    <h3>Select extensions to group:</h3>
                    <div className="tags">
                        {['pdf', 'docx', 'txt', 'mp4', 'mkv', 'jpg', 'png'].map(ext => (
                            <button
                                key={ext}
                                className={`tag ${extensions.includes(ext) ? 'active' : ''}`}
                                onClick={() => onExtensionToggle(ext)}
                            >
                                .{ext}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
        .options-container {
          margin: 3rem 0;
          animation: fadeIn 0.5s ease;
        }

        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .option-card {
          display: flex;
          align-items: flex-start;
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: var(--bg-primary);
        }

        .option-card:hover {
          border-color: var(--accent-primary);
        }

        .option-card.selected {
          border-color: var(--accent-primary);
          background: rgba(216, 180, 254, 0.05);
          box-shadow: 0 0 0 2px var(--accent-primary);
        }

        .radio-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          margin-right: 1rem;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .option-card.selected .radio-circle {
          border-color: var(--accent-primary);
          background: var(--accent-primary);
          box-shadow: inset 0 0 0 3px var(--bg-primary);
        }

        h3 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .extension-selector {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 16px;
          margin-top: 1rem;
        }

        .tags {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .tag {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .tag:hover {
          border-color: var(--accent-primary);
        }

        .tag.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
