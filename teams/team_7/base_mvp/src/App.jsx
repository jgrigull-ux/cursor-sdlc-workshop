import { useState } from 'react';
import HatGallery from './components/HatGallery';
import HatControls from './components/HatControls';
import CameraCapture from './components/CameraCapture';
import { hats } from './data/hats';
import './App.css';

function App() {
  const [selectedHat, setSelectedHat] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [hatPosition, setHatPosition] = useState({ top: 10, left: 50 });
  const [hatSize, setHatSize] = useState(30);
  const [showCamera, setShowCamera] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (dataUrl) => {
    setUploadedPhoto(dataUrl);
    setShowCamera(false);
  };

  const handleHatSelect = (hatId) => {
    setSelectedHat(hatId);
  };

  const selectedHatData = hats.find(hat => hat.id === selectedHat);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hat Try-On</h1>
        <p>Upload a photo and try on different hats!</p>
      </header>

      <main className="app-main">
        <div className="upload-section">
          <label htmlFor="photo-upload" className="upload-label">
            Upload Photo
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="upload-input"
          />
          <button
            type="button"
            className="upload-label upload-label-button"
            onClick={() => setShowCamera(true)}
            aria-label="Take a photo with your camera"
          >
            Take Photo
          </button>
        </div>

        {showCamera && (
          <CameraCapture
            onCapture={handleCameraCapture}
            onCancel={() => setShowCamera(false)}
          />
        )}

        <div className="preview-section">
          {uploadedPhoto ? (
            <div className="photo-container">
              <img src={uploadedPhoto} alt="Uploaded" className="uploaded-photo" />
              {selectedHatData && (
                <img
                  src={selectedHatData.imagePath}
                  alt={selectedHatData.name}
                  className="hat-overlay"
                  style={{
                    top: `${hatPosition.top}%`,
                    left: `${hatPosition.left}%`,
                    width: `${hatSize}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              )}
            </div>
          ) : (
            <div className="placeholder">
              <p>Upload a photo to get started</p>
            </div>
          )}
        </div>

        {uploadedPhoto && selectedHatData && (
          <HatControls
            hatPosition={hatPosition}
            onPositionChange={setHatPosition}
            hatSize={hatSize}
            onSizeChange={setHatSize}
          />
        )}

        <HatGallery
          hats={hats}
          selectedHatId={selectedHat}
          onHatSelect={handleHatSelect}
        />
      </main>
    </div>
  );
}

export default App;
