import React from 'react';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Organize Your Digital Chaos</h1>
                <p className="subtitle">
                    Upload your documents and videos, and let us sort them into neat folders.
                    <br />
                    <strong>Privacy First:</strong> Your files are processed locally and deleted immediately after download.
                </p>

                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Upload</h3>
                        <p>Drag & drop up to 10GB of files.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Organize</h3>
                        <p>Choose how you want to group them.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Download</h3>
                        <p>Get your organized zip and we clean up.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hero {
          text-align: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }
        
        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to right, var(--text-primary), var(--accent-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .steps-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .step-card {
          background: var(--bg-primary);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          width: 250px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border-color: var(--accent-primary);
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: var(--accent-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 0 auto 1rem;
          font-size: 1.2rem;
        }

        h3 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
        </section>
    );
}
