import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {FiMinus, FiPlus} from 'react-icons/fi'

import TastyKitchensContext from '../../context/TastyKitchensContext'

import './index.css'

class FoodItem extends Component {
  addItemToCart = () => {}

  render() {
    const {foodDetail} = this.props
    const {id, imageUrl, name, cost, rating} = foodDetail
    return (
      <TastyKitchensContext.Consumer>
        {value => {
          const {cartItem, addItemToCart, increaseItem, decreaseItem} = value
          const addNewItemToCart = () => {
            addItemToCart(foodDetail)
          }
          const onIncreaseItem = () => {
            increaseItem(id)
          }
          const onDecreaseItem = () => {
            decreaseItem(id)
          }
          const isItemExist = cartItem.find(
            eachItem => eachItem.id === foodDetail.id,
          )
          return (
            <li className="food-item">
              <img className="food-image" src={imageUrl} alt={name} />
              <div className="food-info-container">
                <h1 className="food-name">{name}</h1>
                <p className="food-cost">{cost}</p>
                <div className="food-rating-container">
                  <AiFillStar size="12" color="#ffcc00" />
                  <p className="food-rating">{rating}</p>
                </div>
                {isItemExist ? (
                  <div className="add-more-item-container">
                    <button
                      onClick={onDecreaseItem}
                      className="item-increase-decrease-btn"
                      type="button"
                    >
                      <FiMinus size="10" color="#3E4C59" />
                    </button>
                    <p className="item-quantity">{isItemExist.quantity}</p>
                    <button
                      onClick={onIncreaseItem}
                      className="item-increase-decrease-btn"
                      type="button"
                    >
                      <FiPlus size="10" color="#3E4C59" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={addNewItemToCart}
                    className="food-add-btn"
                    type="button"
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </TastyKitchensContext.Consumer>
    )
  }
}

export default FoodItem
