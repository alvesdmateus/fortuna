import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Hand, Sparkles, RefreshCw, Camera, AlertCircle } from 'lucide-react';
import { analyzePalm, getAIMode } from '../services/ai';
import type { PalmReadingResult } from '../services/ai';
import './PalmReading.css';

export default function PalmReading() {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PalmReadingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiMode = getAIMode();

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      // Extract base64 without the data: prefix
      const base64 = dataUrl.split(',')[1];
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const reading = await analyzePalm(image);
      setResult(reading);
    } catch {
      setError('The reading could not be completed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const lines = result ? [
    { label: 'Life Line', icon: '🌿', content: result.lifeLine },
    { label: 'Heart Line', icon: '💞', content: result.heartLine },
    { label: 'Head Line', icon: '✨', content: result.headLine },
    { label: 'Fate Line', icon: '🌟', content: result.fateLine },
  ] : [];

  return (
    <div className="palm-page page-enter">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ paddingTop: '60px' }}>
          <p className="eyebrow">Ancient Art, Modern Vision</p>
          <h1 className="gradient-text">Palm Reading</h1>
          <p>Upload a clear photo of your open palm. Our AI reads the ancient language of your lines — life, heart, head, and fate.</p>
          {aiMode === 'local' && (
            <div className="mode-notice">
              <AlertCircle size={14} />
              Running in demo mode — add a Gemini API key in Settings for AI-powered vision readings
            </div>
          )}
        </div>

        <div className="palm-layout">
          {/* Upload Zone */}
          <div className="upload-panel">
            {!preview ? (
              <motion.div
                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  id="palm-upload"
                  style={{ display: 'none' }}
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div className="upload-icon">
                  <Hand size={40} />
                </div>
                <h3>Upload Your Palm</h3>
                <p>Drag & drop or click to select</p>
                <div className="upload-tips">
                  <span>📸 Good lighting</span>
                  <span>🖐️ Open palm, flat</span>
                  <span>🔍 Clear lines visible</span>
                </div>
                <button className="btn btn-ghost upload-btn" type="button">
                  <Upload size={16} />
                  Choose Image
                </button>
              </motion.div>
            ) : (
              <div className="preview-panel">
                <div className="preview-image-wrap">
                  <img src={preview} alt="Your palm" className="preview-img" />
                  <div className="preview-overlay">
                    <div className="scan-line" />
                  </div>
                </div>
                <div className="preview-actions">
                  <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading}>
                    {loading ? (
                      <>
                        <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                        Reading the Lines...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Read My Palm
                      </>
                    )}
                  </button>
                  <button className="btn btn-ghost" onClick={reset}>
                    <RefreshCw size={16} />
                    New Image
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="error-banner">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Palm Guide */}
            <div className="palm-guide glass-card">
              <h4>📖 Tips for Best Results</h4>
              <ul>
                <li>Use your dominant hand</li>
                <li>Photograph in natural light</li>
                <li>Keep palm flat and fingers together</li>
                <li>Ensure all major lines are clearly visible</li>
                <li>Avoid strong shadows across the palm</li>
              </ul>
            </div>
          </div>

          {/* Reading Result */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                className="reading-loading glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-orb">
                  <div className="loading-inner">🔮</div>
                </div>
                <h3>Reading the ancient lines...</h3>
                <p>The mystic vision peers into the language written on your palm</p>
                <div className="loading-steps">
                  {['Detecting palm lines', 'Analyzing patterns', 'Channeling wisdom', 'Composing your reading'].map((step, i) => (
                    <motion.div
                      key={step}
                      className="loading-step"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.6 }}
                    >
                      <span className="step-dot" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                className="reading-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="result-header glass-card">
                  <span className="result-icon">🖐️</span>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '6px' }}>Your Palm Reading</p>
                    <h2>{result.headline}</h2>
                    <p className="result-overall">{result.overall}</p>
                  </div>
                </div>

                <div className="lines-grid">
                  {lines.map((line, i) => (
                    <motion.div
                      key={line.label}
                      className="line-card glass-card"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      <div className="line-header">
                        <span className="line-icon">{line.icon}</span>
                        <h4>{line.label}</h4>
                      </div>
                      <p>{line.content}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="advice-card glass-card">
                  <h4>🌟 The Oracle Advises</h4>
                  <p className="advice-text">"{result.advice}"</p>
                </div>

                <button className="btn btn-ghost btn-full" onClick={reset}>
                  <Camera size={16} />
                  Start a New Reading
                </button>
              </motion.div>
            )}

            {!loading && !result && !preview && (
              <motion.div
                key="placeholder"
                className="placeholder-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="placeholder-illustration">
                  <div className="palm-svg">
                    <span className="palm-big">🖐️</span>
                    <div className="palm-lines">
                      <div className="pline pline-1" />
                      <div className="pline pline-2" />
                      <div className="pline pline-3" />
                    </div>
                  </div>
                </div>
                <h3>Your story is written in your hands</h3>
                <p>Every line, curve, and marking on your palm carries the imprint of your journey. Upload your palm to reveal what the ancient art of palmistry sees in you.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
