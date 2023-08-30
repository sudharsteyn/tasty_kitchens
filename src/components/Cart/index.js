import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsCheckCircleFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import TastyKitchensContext from '../../context/TastyKitchensContext'

import './index.css'

class Cart extends Component {
  state = {isPaymentSuccess: false}

  renderPaymentSuccessView = () => (
    <div className="payment-success-container">
      <BsCheckCircleFill className="payment-success-icon" />
      <h1 className="payment-done-heading">Payment Successful</h1>
      <p className="payment-done-describe">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link
        className="cart-link"
        onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        to="/"
      >
        <button className="go-home-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderOrderedItem = (cartItem, clearCart) => {
    let totalAmount = 0
    cartItem.forEach(eachItem => {
      totalAmount += eachItem.cost * eachItem.quantity
    })
    const onOrderPlace = () => {
      this.setState({isPaymentSuccess: true}, clearCart())
    }
    return (
      <>
        <div className="cart-container">
          <div className="cart-column-head">
            <p className="column-title">Item</p>
            <p className="column-title">Quantity</p>
            <p className="column-title">Price</p>
          </div>
          <ul className="cart-item-list">
            {cartItem.map(eachItem => (
              <CartItem key={eachItem.id} itemDetails={eachItem} />
            ))}
          </ul>
          <hr className="cart-dash-line" />
          <div className="total-container">
            <h1 className="order-total-head">Order Total :</h1>
            <p testid="total-price" className="order-total-amount">
              ₹ {totalAmount}.00
            </p>
          </div>
          <div className="place-order-btn-container">
            <button
              onClick={onOrderPlace}
              className="place-order-btn"
              type="button"
            >
              Place Order
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderNoOrder = () => (
    <div className="no-order-container">
      <img
        className="no-order-img"
        src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692818222/cooking_1_zyfkrr.png"
        alt="empty cart"
      />
      <h1 className="no-order-heading">No Order Yet!</h1>
      <p className="no-order-describe">
        Your cart is empty. Add something from the menu.
      </p>
      <Link
        className="cart-link"
        onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        to="/"
      >
        <button className="order-now-btn" type="button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderOrderView = (cartItem, clearCart) =>
    cartItem.length > 0
      ? this.renderOrderedItem(cartItem, clearCart)
      : this.renderNoOrder()

  render() {
    const {isPaymentSuccess} = this.state
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {cartItem, clearCart} = value
          return (
            <div className="cart-route">
              <Header />
              {isPaymentSuccess
                ? this.renderPaymentSuccessView()
                : this.renderOrderView(cartItem, clearCart)}
            </div>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default Cart
