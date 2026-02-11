import './AboutUs.css';

function AboutUs({ onBack }) {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/wardrobegen',
      icon: '📸',
      handle: '@wardrobegen'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/wardrobegen',
      icon: '🐦',
      handle: '@wardrobegen'
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@wardrobegen',
      icon: '🎵',
      handle: '@wardrobegen'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/wardrobegen',
      icon: '👍',
      handle: 'Wardrobe Generator'
    }
  ];

  return (
    <div className="about-us">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          ← Back to Generator
        </button>
      )}

      <h1 className="about-title">About Us</h1>
      <p className="about-tagline">Your AI-Powered Style Companion</p>

      <div className="about-card">
        <p className="about-description">
          Welcome to <strong>Wardrobe Generator</strong> — your smart outfit picker 
          powered by AI. We help you discover the perfect outfit for any occasion, 
          whether you're dressing for a casual day out, an important work meeting, 
          a fun party, or an active sport session.
        </p>
        
        <p className="about-description">
          No matter the season — sunny summer days, cozy winter evenings, 
          refreshing spring mornings, or crisp fall afternoons — we've got you covered. 
          Our intelligent algorithm considers weather, dress codes, and color coordination 
          to generate outfits that make you look and feel your best.
        </p>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">What We Offer</h2>
        <div className="features-list">
          <div className="feature-item">🌞 Season-smart outfit suggestions</div>
          <div className="feature-item">👔 Occasion-appropriate styling</div>
          <div className="feature-item">🎨 Color palette matching</div>
          <div className="feature-item">💾 Save your favorite outfits</div>
          <div className="feature-item">🎰 Fun, randomized generation</div>
        </div>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">Follow Us</h2>
        <p className="about-social-subtitle">Stay connected for style tips and outfit inspiration!</p>
        
        <div className="social-links">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={`Follow us on ${social.name}`}
            >
              <span className="social-icon">{social.icon}</span>
              <span className="social-name">{social.name}</span>
              <span className="social-handle">{social.handle}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">Meet Our Pro Stylists</h2>
        <div className="stylists-list">
          <div className="stylist-item">Zoe Barnswell</div>
          <div className="stylist-item">Will Ziesing</div>
          <div className="stylist-item">Faisal Shaikh</div>
          <div className="stylist-item">Ryan Aznar</div>
          <div className="stylist-item">Noah Zender</div>
          <div className="stylist-item">Audrey Leung</div>
        </div>
      </div>

      <footer className="about-footer">
        <p>Made with ❤️ by our Pro Stylists</p>
      </footer>
    </div>
  );
}

export default AboutUs;
