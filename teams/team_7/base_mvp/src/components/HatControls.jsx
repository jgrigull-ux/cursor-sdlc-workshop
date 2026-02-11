import './HatControls.css';

function HatControls({ hatPosition, onPositionChange, hatSize, onSizeChange }) {
  return (
    <div className="hat-controls" role="region" aria-label="Hat position and size">
      <h3 className="hat-controls-title">Position the hat</h3>
      <p className="hat-controls-desc">Use the sliders to move and resize the hat so it fits on your head.</p>

      <div className="slider-group">
        <label htmlFor="hat-top">
          <span>Vertical (up/down)</span>
          <input
            id="hat-top"
            type="range"
            min="0"
            max="25"
            value={hatPosition.top}
            onChange={(e) =>
              onPositionChange((prev) => ({ ...prev, top: Number(e.target.value) }))
            }
            aria-label="Hat vertical position"
          />
          <span className="value">{hatPosition.top}%</span>
        </label>
      </div>

      <div className="slider-group">
        <label htmlFor="hat-left">
          <span>Horizontal (left/right)</span>
          <input
            id="hat-left"
            type="range"
            min="30"
            max="70"
            value={hatPosition.left}
            onChange={(e) =>
              onPositionChange((prev) => ({ ...prev, left: Number(e.target.value) }))
            }
            aria-label="Hat horizontal position"
          />
          <span className="value">{hatPosition.left}%</span>
        </label>
      </div>

      <div className="slider-group">
        <label htmlFor="hat-size">
          <span>Size</span>
          <input
            id="hat-size"
            type="range"
            min="15"
            max="50"
            value={hatSize}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            aria-label="Hat size"
          />
          <span className="value">{hatSize}%</span>
        </label>
      </div>
    </div>
  );
}

export default HatControls;
