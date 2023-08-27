import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-app-name-container">
        <img
          className="footer-logo-icon"
          src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692911261/Frame_275_kgrykz.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-app-name">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food.
        <br /> Contact us on
      </p>
      <div className="social-media-container">
        <a target="_blank" rel="noreferrer" href="https://in.pinterest.com/">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="social-icons"
          />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/sudhaxrx/"
        >
          <FaInstagram
            testid="instagram-social-icon"
            className="social-icons"
          />
        </a>
        <a target="_blank" rel="noreferrer" href="https://twitter.com/">
          <FaTwitter testid="twitter-social-icon" className="social-icons" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/people/Sudharsan/pfbid07uMUB9TZwqDBBDWGuFCJ73tNKfZi2ahtWecXbZcT4gfWT8iiAzaWhX44GD4H1NPal/?mibextid=ZbWKwL"
        >
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="social-icons"
          />
        </a>
      </div>
    </div>
  )
}
