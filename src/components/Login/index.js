import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {
      username: userName,
      password,
    }
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {userName} = this.state
    return (
      <div className="input-container">
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.onChangeUserName}
          value={userName}
          className="login-input-field"
          id="username"
          type="text"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="input-container">
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          value={password}
          className="login-input-field"
          id="password"
          type="password"
        />
        {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-image-container">
          <h1 className="login-text">Login</h1>
          <img
            className="login-food-img"
            src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692354888/Rectangle_1457_rdl7g6.png"
            alt="website login"
          />
        </div>
        <div className="form-container">
          <form className="login-form" onSubmit={this.onSubmitLogin}>
            <div className="login-details">
              <img
                className="app-logo"
                src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692378754/Frame_274_yvaarg.png"
                alt="website logo"
              />
              <h1 className="app-name">Tasty Kitchens</h1>
              <h1 className="login-text-large">Login</h1>
              {this.renderUserNameField()}
              {this.renderPasswordField()}
              <button className="login-btn" type="submit">
                Login
              </button>
            </div>
          </form>
          <img
            className="login-image"
            src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692354935/367d1981f2a409a617ac848670d29c7e_u1ysp6.jpg"
            alt="login-img"
          />
        </div>
      </div>
    )
  }
}

export default Login
