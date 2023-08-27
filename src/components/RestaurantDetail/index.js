import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class RestaurantDetail extends Component {
  state = {
    restaurantDetail: {},
    foodItems: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getRestaurantDetail()
  }

  onRetryApiCall = () => {
    this.getRestaurantDetail()
  }

  getRestaurantDetail = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const restaurantDetailApi = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantDetailApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedRestaurantData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const updatedFoodItems = data.food_items.map(eachFood => ({
        id: eachFood.id,
        name: eachFood.name,
        imageUrl: eachFood.image_url,
        foodType: eachFood.food_type,
        cost: eachFood.cost,
        rating: eachFood.rating,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        restaurantDetail: updatedRestaurantData,
        foodItems: updatedFoodItems,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderFoodItems = () => {
    const {foodItems} = this.state
    return (
      <ul className="food-item-list">
        {foodItems.map(eachFood => (
          <FoodItem key={eachFood.id} foodDetail={eachFood} />
        ))}
      </ul>
    )
  }

  renderRestaurantDetail = () => {
    const {restaurantDetail} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetail
    return (
      <>
        <div className="restaurant-banner">
          <img
            className="restaurant-image"
            src={imageUrl}
            alt="restaurant-img"
          />
          <div className="restaurant-detailed-container">
            <h1 className="banner-restaurant-name">{name}</h1>
            <p className="banner-restaurant-cuisine">{cuisine}</p>
            <p className="banner-restaurant-location">{location}</p>
            <div className="banner-additional-info-container">
              <div className="banner-review-rating-container">
                <div className="banner-rating-container">
                  <AiFillStar size="12" color="#FFFFFF" />
                  <p className="banner-rating">{rating}</p>
                </div>
                <p className="banner-review">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="separator-line-banner" />
              <div className="banner-cast-container">
                <p className="banner-cost-for-two">₹ {costForTwo}</p>
                <p className="cast-for-two-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.renderFoodItems()}
      </>
    )
  }

  renderFailureView = () => (
    <div className="loading-container">
      <h1 className="failure-text">Failed to fetch data</h1>
      <button onClick={this.onRetryApiCall} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderRestaurantDetail()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-route">
        <Header />
        <div className="restaurant-container">{this.renderApiStatus()}</div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetail
