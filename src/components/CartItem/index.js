import {Component} from 'react'
import {FiMinus, FiPlus} from 'react-icons/fi'

import TastyKitchensContext from '../../context/TastyKitchensContext'

import './index.css'

class CartItem extends Component {
  render() {
    const {itemDetails} = this.props
    console.log(itemDetails)
    const {id, imageUrl, name, cost, quantity} = itemDetails
    const itemPrice = quantity * cost
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {increaseItem, decreaseItem} = value
          const onIncreaseQuantity = () => {
            increaseItem(id)
          }
          const onDecreaseQuantity = () => {
            decreaseItem(id)
          }
          return (
            <li className="cart-item">
              <div className="item-dish-container">
                <img className="cart-item-img" src={imageUrl} alt={name} />
                <p className="item-name-large">{name}</p>
              </div>
              <div className="cart-quantity-container-large">
                <button
                  onClick={onDecreaseQuantity}
                  className="cart-item-btn"
                  type="button"
                >
                  <FiMinus size="10" color="#3E4C59" />
                </button>
                <p className="cart-item-quantity">{quantity}</p>
                <button
                  onClick={onIncreaseQuantity}
                  className="cart-item-btn"
                  type="button"
                >
                  <FiPlus size="10" color="#3E4C59" />
                </button>
              </div>
              <p className="item-price-large">₹ {itemPrice}.00</p>
              <div className="cart-item-detail">
                <p className="cart-item-name">{name}</p>
                <div className="cart-item-change-container">
                  <button
                    onClick={onDecreaseQuantity}
                    className="cart-item-btn"
                    type="button"
                  >
                    <FiMinus size="10" color="#3E4C59" />
                  </button>
                  <p className="cart-item-quantity">{quantity}</p>
                  <button
                    onClick={onIncreaseQuantity}
                    className="cart-item-btn"
                    type="button"
                  >
                    <FiPlus size="10" color="#3E4C59" />
                  </button>
                </div>
                <p className="cart-item-total-price">₹ {itemPrice}.00</p>
              </div>
            </li>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default CartItem
