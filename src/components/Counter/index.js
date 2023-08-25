import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onIncrement = () => {
    const {onIncreasePage} = this.props
    onIncreasePage()
  }

  onDecrement = () => {
    const {onDecreasePage} = this.props
    onDecreasePage()
  }

  render() {
    const {currentPage, totalPage} = this.props
    return (
      <div className="pagination-container">
        <button
          className="page-btn"
          type="button"
          onClick={this.onDecrement}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-icon"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.87352 2L11 3.15074L6.25296 8L11 12.8493L9.87352 14L4.68479 8.69953C4.30425 8.3108 4.30425 7.68919 4.68479 7.30046L9.87352 2Z"
              fill="#334155"
            />
          </svg>
        </button>
        <p className="page-list">
          {currentPage} of {totalPage}
        </p>
        <button
          className="page-btn"
          type="button"
          onClick={this.onIncrement}
          disabled={currentPage === totalPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-icon"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.12648 14L5 12.8493L9.74704 8L5 3.15074L6.12648 2L11.3152 7.30047C11.6957 7.6892 11.6957 8.31081 11.3152 8.69954L6.12648 14Z"
              fill="#334155"
            />
          </svg>
        </button>
      </div>
    )
  }
}

export default Counter
