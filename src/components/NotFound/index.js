import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="error-img"
      src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692637338/Group_i9ow3i.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-describe">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link className="not-found-link" to="/">
      <button className="not-found-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
