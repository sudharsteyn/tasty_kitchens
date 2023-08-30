import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FiMenu} from 'react-icons/fi'
import {IoCloseCircle} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {showNavItems: false}

  displayNavItems = () => {
    this.setState(prevState => ({showNavItems: !prevState.showNavItems}))
  }

  hideNavItems = () => {
    this.setState({showNavItems: false})
  }

  onUserLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMobileNavItem = (homeClassName, cartClassName) => (
    <div className="navigation-container">
      <ul className="nav-item-list">
        <Link
          className="nav-link"
          to="/"
          onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        >
          <li className={`nav-text ${homeClassName}`}>Home</li>
        </Link>
        <Link
          className="nav-link"
          to="/cart"
          onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        >
          <li className={`nav-text ${cartClassName}`}>Cart</li>
        </Link>
        <li>
          {/*<Popup
            modal
            lockScroll
            trigger={
              <button
                onClick={this.onUserLogout}
                className="nav-logout-btn"
                type="button"
              >
                Logout
              </button>
            }
          >
            {close => (
              <div className="confirm-logout-container">
                <p className="confirmation-msg">
                  Are you sure, you want to logout?
                </p>
                <div className="logout-btn-container">
                  <button
                    className="confirmation-btn cancel-btn"
                    onClick={() => close()}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="confirmation-btn confirm-btn"
                    onClick={this.onUserLogout}
                    type="button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>*/}
          <button
            onClick={this.onUserLogout}
            className="nav-logout-btn"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
      <button
        onClick={this.hideNavItems}
        className="menu-close-btn"
        type="button"
      >
        <IoCloseCircle size="25" color="#334155" />
      </button>
    </div>
  )

  render() {
    const {showNavItems} = this.state
    const {location} = this.props
    const {pathname} = location
    const homeClassName = pathname === '/' ? 'active-nav-section' : ''
    const cartClassName = pathname === '/cart' ? 'active-nav-section' : ''
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            className="header-app-logo-container nav-link"
            to="/"
            onClick={() =>
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }
          >
            <img
              className="header-app-logo"
              src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692378754/Frame_274_yvaarg.png"
              alt="website logo"
            />
            <h1 className="header-app-name">Tasty Kitchens</h1>
          </Link>
          <button
            onClick={this.displayNavItems}
            className="menu-btn"
            type="button"
          >
            <FiMenu size="25" color="#183B56" />
          </button>
        </div>
        <ul className="nav-item-list-large">
          <Link
            className="nav-link"
            to="/"
            onClick={() =>
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }
          >
            <li className={`nav-text-large ${homeClassName}`}>Home</li>
          </Link>
          <Link
            className="nav-link"
            to="/cart"
            onClick={() =>
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }
          >
            <li className={`nav-text-large ${cartClassName}`}>Cart</li>
          </Link>
          <li>
            <button
              onClick={this.onUserLogout}
              className="logout-large"
              type="button"
            >
              Logout
            </button>
            {/*<Popup
              modal
              lockScroll
              trigger={
                <button
                  onClick={this.onUserLogout}
                  className="logout-large"
                  type="button"
                >
                  Logout
                </button>
              }
            >
              {close => (
                <div className="confirm-logout-container">
                  <p className="confirmation-msg">
                    Are you sure, you want to logout?
                  </p>
                  <div className="logout-btn-container">
                    <button
                      className="confirmation-btn cancel-btn"
                      onClick={() => close()}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="confirmation-btn confirm-btn"
                      onClick={this.onUserLogout}
                      type="button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>*/}
          </li>
        </ul>
        {showNavItems && this.renderMobileNavItem(homeClassName, cartClassName)}
      </nav>
    )
  }
}

export default withRouter(Header)
