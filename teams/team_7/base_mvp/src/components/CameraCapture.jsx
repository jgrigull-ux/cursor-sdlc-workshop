import { useRef, useEffect, useState } from 'react';
import './CameraCapture.css';

function CameraCapture({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setReady(true);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not access camera');
        }
      }
    }

    startCamera();
    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream || video.readyState !== 4) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    stream.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    onCapture(dataUrl);
  };

  const handleCancel = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    onCancel();
  };

  return (
    <div className="camera-capture" role="dialog" aria-modal="true" aria-label="Take a photo">
      <div className="camera-capture-inner">
        {error ? (
          <div className="camera-error">
            <p>{error}</p>
            <p className="camera-error-hint">
              Allow camera access in your browser settings, or use &quot;Upload Photo&quot; instead.
            </p>
            <button type="button" className="camera-btn camera-btn-secondary" onClick={handleCancel}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="camera-preview-wrap">
              <video
                ref={videoRef}
                className="camera-preview"
                autoPlay
                playsInline
                muted
                aria-label="Camera preview"
              />
            </div>
            <div className="camera-actions">
              <button
                type="button"
                className="camera-btn camera-btn-cancel"
                onClick={handleCancel}
                aria-label="Cancel and close camera"
              >
                Cancel
              </button>
              <button
                type="button"
                className="camera-btn camera-btn-capture"
                onClick={handleCapture}
                disabled={!ready}
                aria-label="Capture photo"
              >
                Capture
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;
