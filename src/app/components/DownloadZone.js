"use client";
import React from 'react';

export default function DownloadZone({ onDownload, onReset, isProcessing }) {
    return (
        <div className="download-container">
            {isProcessing ? (
                <div className="processing">
                    <div className="spinner"></div>
                    <h3>Organizing your files...</h3>
                    <p>This might take a moment depending on the file size.</p>
                </div>
            ) : (
                <div className="success">
                    <div className="check-icon">✓</div>
                    <h2>All Done!</h2>
                    <p>Your files have been organized successfully.</p>

                    <div className="actions">
                        <button className="btn-primary" onClick={onDownload}>
                            Download Zip
                        </button>
                        <button className="btn-secondary" onClick={onReset}>
                            Finish & Cleanup
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        .download-container {
          text-align: center;
          padding: 3rem;
          background: var(--bg-secondary);
          border-radius: 24px;
          margin: 2rem 0;
          animation: fadeIn 0.5s ease;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid var(--border-color);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          animation: spin 1s linear infinite;
        }

        .check-icon {
          width: 60px;
          height: 60px;
          background: var(--success);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }

        h2, h3 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        button {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: transform 0.2s;
          border: none;
        }

        button:hover {
          transform: translateY(-2px);
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .btn-secondary:hover {
          border-color: var(--text-primary);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
