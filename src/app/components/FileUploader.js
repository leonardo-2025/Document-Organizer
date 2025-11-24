"use client";
import React, { useState, useRef } from 'react';

export default function FileUploader({ onFilesSelected, isUploading }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isUploading) setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (isUploading) return;

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onFilesSelected(files);
        }
    };

    const handleClick = () => {
        if (!isUploading) fileInputRef.current.click();
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            onFilesSelected(files);
        }
    };

    return (
        <div
            className={`upload-zone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInput}
                disabled={isUploading}
            />

            {isUploading ? (
                <div className="loading-content">
                    <div className="spinner"></div>
                    <h3>Uploading your files...</h3>
                    <p>Please wait while we secure your documents.</p>
                </div>
            ) : (
                <>
                    <div className="icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>

                    <h3>Drop files here or click to upload</h3>
                    <p>Support for Documents (PDF, DOCX, TXT) and Videos (MP4, MKV)</p>
                    <p className="limit">Max file size: 10GB total</p>
                </>
            )}

            <style jsx>{`
        .upload-zone {
          border: 2px dashed var(--border-color);
          border-radius: 24px;
          padding: 4rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--bg-secondary);
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .upload-zone:hover:not(.uploading), .upload-zone.dragging {
          border-color: var(--accent-primary);
          background: rgba(216, 180, 254, 0.05);
          transform: scale(1.01);
        }

        .upload-zone.uploading {
          cursor: default;
          border-style: solid;
        }

        .icon {
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        p {
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .limit {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
