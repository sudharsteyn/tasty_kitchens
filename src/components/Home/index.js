import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Counter from '../Counter'
import Footer from '../Footer'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const jwtToken = Cookies.get('jwt_token')

const limit = 9

class Home extends Component {
  state = {
    carouselData: [],
    carouselApiStatus: apiStatusConstant.initial,
    sortBy: sortByOptions[1].value,
    restaurantsData: [],
    restaurantsApiStatus: apiStatusConstant.initial,
    totalPage: '-',
    currentPage: 1,
  }

  componentDidMount() {
    this.getCarouselData()
    this.getRestaurantsDetail()
  }

  onRetryApiCall = () => {
    this.getCarouselData()
    this.getRestaurantsDetail()
  }

  getCarouselData = async () => {
    this.setState({carouselApiStatus: apiStatusConstant.inProgress})
    const carouselApi = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(carouselApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(eachData => ({
        id: eachData.id,
        imageUrl: eachData.image_url,
      }))
      this.setState({
        carouselApiStatus: apiStatusConstant.success,
        carouselData: updatedData,
      })
    } else {
      this.setState({carouselApiStatus: apiStatusConstant.failure})
    }
  }

  getRestaurantsDetail = async () => {
    this.setState({restaurantsApiStatus: apiStatusConstant.inProgress})
    const {sortBy, currentPage} = this.state
    const offset = (currentPage - 1) * limit
    const restaurantsApi = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(eachRestaurant => ({
        id: eachRestaurant.id,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        groupByTime: eachRestaurant.group_by_time,
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        hasTableBooking: eachRestaurant.has_table_booking,
        imageUrl: eachRestaurant.image_url,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        location: eachRestaurant.location,
        menuType: eachRestaurant.menu_type,
        name: eachRestaurant.name,
        opensAt: eachRestaurant.opens_at,
        userRating: {
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          ratingText: eachRestaurant.user_rating.rating_text,
          totalReviews: eachRestaurant.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsApiStatus: apiStatusConstant.success,
        restaurantsData: updatedData,
        totalPage: Math.ceil(data.total / limit),
      })
    } else {
      this.setState({restaurantsApiStatus: apiStatusConstant.failure})
    }
  }

  showCarouselImg = carousel => (
    <li key={carousel.id} className="carousel-item">
      <img
        key={carousel.id}
        className="carousel-image"
        src={carousel.imageUrl}
        alt={`carousel ${carousel.id}`}
      />
    </li>
  )

  onChangeSortOption = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantsDetail)
  }

  renderCarousel = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      cssEase: 'linear',
      fade: true,
      arrows: false,
      appendDots: dots => <ul className="slick-dots"> {dots} </ul>,
    }
    return (
      <ul className="carousel-container">
        <Slider {...settings}>
          {carouselData.map(eachCarousel => this.showCarouselImg(eachCarousel))}
        </Slider>
      </ul>
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

  renderCarouselLoadingView = () => (
    <div testid="restaurants-offers-loader" className="loading-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantLoadingView = () => (
    <div testid="restaurants-list-loader" className="loading-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderCarouselApiStatus = () => {
    const {carouselApiStatus} = this.state
    switch (carouselApiStatus) {
      case apiStatusConstant.success:
        return this.renderCarousel()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderCarouselLoadingView()
      default:
        return null
    }
  }

  renderRestaurants = () => {
    const {restaurantsData} = this.state
    return (
      <ul className="restaurants-list">
        {restaurantsData.map(eachRestaurant => (
          <RestaurantItem
            key={eachRestaurant.id}
            restaurantDetails={eachRestaurant}
          />
        ))}
      </ul>
    )
  }

  renderRestaurantApiStatus = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiStatusConstant.success:
        return this.renderRestaurants()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderRestaurantLoadingView()
      default:
        return null
    }
  }

  onIncreasePage = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage + 1}),
      this.getRestaurantsDetail,
    )
  }

  onDecreasePage = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage - 1}),
      this.getRestaurantsDetail,
    )
  }

  render() {
    const {sortBy, totalPage, currentPage} = this.state
    return (
      <div className="home-route">
        <Header />
        <div className="home-container">
          {this.renderCarouselApiStatus()}
          <div className="restaurants-view-container">
            <h1 className="popular-restaurant-text">Popular Restaurants</h1>
            <div className="describe-and-sort-container">
              <p className="home-describe-text">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <button type="button" className="sort-by-filter">
                <BsFilterLeft size="24" color="#475569" />
                <div className="filter-container">
                  <p className="sort-by-text">Sort by </p>
                  <select
                    onChange={this.onChangeSortOption}
                    value={sortBy}
                    className="filter-dropdown"
                  >
                    {sortByOptions.map(eachOption => (
                      <option value={eachOption.value} key={eachOption.id}>
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </button>
            </div>
            <hr className="horizon-line" />
            {this.renderRestaurantApiStatus()}
            <Counter
              currentPage={currentPage}
              totalPage={totalPage}
              onIncreasePage={this.onIncreasePage}
              onDecreasePage={this.onDecreasePage}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
