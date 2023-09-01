import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = restaurantDetails
  return (
    <Link
      className="restaurant-link"
      onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
      to={`/restaurant/${id}`}
    >
      <li className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-img" />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="review-rating-container">
            <AiFillStar size="12" color="#ffcc00" />
            <p className="total-rating">{userRating.rating}</p>
            <p className="total-review">({userRating.totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
